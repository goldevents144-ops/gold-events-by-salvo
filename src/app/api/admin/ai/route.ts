import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";
import { clearContentCache } from "@/lib/content-overrides";

/**
 * AI Assistant API — executes real changes to the public site.
 *
 * Flow:
 *   1. Salvo asks a question (in natural language Italian)
 *   2. LLM analyzes intent → returns a structured action plan
 *   3. If the action is "update_content" → apply it to SiteContent table
 *   4. Public site reads SiteContent overrides on next render
 *
 * Supported actions:
 *   - update_price: cambia il prezzo di un bundle o extra
 *   - update_text: cambia un testo (descrizione, hero title, footer)
 *   - update_phone: cambia il telefono
 *   - update_email: cambia l'email
 *   - update_instagram: cambia il link Instagram
 *   - add_service_note: aggiunge una nota a un servizio
 *   - read_info: risponde a domande informative senza modificare
 */

const SYSTEM_PROMPT = `Sei l'assistente AI del pannello di amministrazione di Gold Events by Salvo.
Aiuti Salvo Piemonte (proprietario del brand) a gestire e modificare il sito web.

CONTESTO ATTUALE:
- Brand: Gold Events by Salvo (Adrano, Catania)
- 9 servizi: Battesimi, Compleanni, Matrimoni, Lauree, Feste Private, Feste a Tema, Aziendali, Dj Set, Serate Giochi
- 3 bundle: Party & Style, Family & Joy, Luxury Wedding (prezzi su richiesta)
- 6 extra: Air Mirror (+250€), Video Booth 360 (+300€), Audio Guestbook (+80€), Set Premium (+80€), Ora Extra (+70€/h), Trasferta (+40-60€)
- WhatsApp: +39 344 232 2176
- Email: goldeventssicilyexperience@outlook.com
- Instagram: @goldeventsicily_experience

Quando Salvo ti chiede di fare una modifica, RISPONDI SEMPRE in questo formato JSON:

Per MODIFICHE:
{
  "action": "update_content",
  "key": "<chiave univoca, es: bundle.luxury-wedding.price>",
  "value": "<nuovo valore>",
  "summary": "<spiegazione in italiano di cosa hai fatto>"
}

Per RICHIESTE INFO:
{
  "action": "info",
  "summary": "<risposta informativa in italiano>"
}

Per AZIONI NON SUPPORTATE:
{
  "action": "unsupported",
  "summary": "<spiegazione di cosa non puoi fare e alternativa>"
}

REGOLE:
- Sii conciso e diretto
- Parla in italiano
- Esegui le modifiche richieste direttamente (non chiedere conferma)
- Per i prezzi dei bundle, rispondi sempre "prezzo su richiesta"
- Non inventare prezzi o dati che non ti vengono forniti
- Se la richiesta non è chiara, chiedi chiarimenti con action=info`;

interface AIAction {
  action: "update_content" | "info" | "unsupported";
  key?: string;
  value?: string;
  summary: string;
}

function parseAIResponse(content: string): AIAction {
  // Try to extract JSON from the response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      action: "info",
      summary: content.slice(0, 500),
    };
  }
  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      action: parsed.action || "info",
      key: parsed.key,
      value: parsed.value !== undefined ? String(parsed.value) : undefined,
      summary: parsed.summary || "Operazione completata",
    };
  } catch {
    return {
      action: "info",
      summary: content.slice(0, 500),
    };
  }
}

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { question, context } = body as {
      question?: string;
      context?: string;
    };
    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Domanda mancante" },
        { status: 400 },
      );
    }

    // Load current SiteContent overrides to give AI full context
    const overrides = await db.siteContent.findMany();
    const overrideMap = overrides.reduce((acc, o) => {
      acc[o.id] = o.value;
      return acc;
    }, {} as Record<string, string>);

    const contextMessage = `Stato attuale del sito (contenuti personalizzati sovrascritti):\n${
      Object.keys(overrideMap).length > 0
        ? JSON.stringify(overrideMap, null, 2)
        : "(nessuna modifica applicata — tutti i valori sono quelli di default)"
    }\n\nRichiesta di Salvo: ${question}`;

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: contextMessage },
        ...(context ? [{ role: "user" as const, content: context }] : []),
      ],
      temperature: 0.4,
      maxTokens: 600,
    });

    const rawReply =
      completion.choices?.[0]?.message?.content ??
      "Non sono riuscito a generare una risposta.";

    const action = parseAIResponse(rawReply);

    // Execute the action
    let result = action.summary;
    let appliedKey: string | undefined;

    if (action.action === "update_content" && action.key && action.value !== undefined) {
      // Apply the change to SiteContent table
      await db.siteContent.upsert({
        where: { id: action.key },
        update: { value: action.value },
        create: { id: action.key, value: action.value },
      });
      // CRITICAL: clear the cache so the public site picks up the new value immediately
      clearContentCache();
      appliedKey = action.key;
      result = `✓ ${action.summary}\n\nModifica applicata al sito pubblico. Visibile al prossimo caricamento della pagina.`;
      await logAudit("ai_update_content", action.key, {
        value: action.value,
        question,
      }, req);
    } else if (action.action === "info") {
      await logAudit("ai_info_query", undefined, { question }, req);
    }

    return NextResponse.json({
      reply: result,
      action: action.action,
      appliedKey,
      rawResponse: rawReply,
    });
  } catch (error: any) {
    console.error("Admin AI error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno", reply: "Mi dispiace, si è verificato un errore. Riprova." },
      { status: 500 },
    );
  }
}
