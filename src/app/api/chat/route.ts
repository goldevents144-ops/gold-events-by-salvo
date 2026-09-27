import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import ZAI from "z-ai-web-dev-sdk";

const SYSTEM_PROMPT = `Sei l'assistente virtuale di Gold Events by Salvo, brand di Salvo Piemonte con sede ad Adrano (Catania), Sicilia.

CONTESTO AZIENDALE:
- Salvo Piemonte è organizzatore di eventi con sede ad Adrano (CT)
- WhatsApp: +39 344 232 2176
- Email: goldeventssicilyexperience@outlook.com
- Instagram: @goldeventsicily_experience

9 SERVIZI PRINCIPALI (Gold Events by Salvo):
1. Battesimi, Comunioni e Cresime — Cerimonie familiari
2. Compleanni (18, 30, 40, 50+) — Divertimento puro
3. Matrimoni & Destination Wedding — Regia totale
4. Lauree — Feste giovanili
5. Feste Private — Anniversari, addii al celibato/nubilato
6. Feste a Tema — Anni '80/'90, Halloween, White Party
7. Feste Aziendali & Team Building — Premiazioni, meeting
8. Dj Set — Audio+luce professionale inclusi
9. Organizzazione Serate Giochi — Quiz, karaoke, cervelloni

3 BUNDLE DI CONDUZIONE:
- Party & Style: prezzo su richiesta (feste private, 18esimi, lauree)
- Family & Joy: prezzo su richiesta (battesimi, comunioni, cresime)
- Luxury Wedding: prezzo su richiesta (matrimoni, eventi gala) — PIÙ RICHIESTO

6 SERVIZI EXTRA (prezzi in abbinamento a un bundle):
- Air Mirror: +250€ (stampe illimitate) —origine 450€ se singolo
- 360 Video Booth Experience: +300€ (slow-motion per social)
- Video Guest Book Phone Experience: +80€ (telefono vintage)
- Set Scenografico Premium: +80€ (neon personalizzato)
- Ora Extra: +70€/h
- Fascia Trasferta: gratuito entro 30km Adrano, +40-60€ oltre

GOLD EVENTS SICILY EXPERIENCE (circuit turistico internazionale):
Salvo NON eroga direttamente questi servizi — fa da TRAMITE/curatore con partner locali selezionati:
- Etna Wine Tasting Premium (Milo, Castiglione, Randazzo, Linguaglossa)
- Etna Sunset Party
- Sicilian Food & Agriturismo (Adrano, Bronte, Nicolosi)
- Luxury Beach & Coast Tours (Taormina, Giardini Naxos, Letojanni)

REGOLE PER LE RISPOSTE:
- Sii breve (max 3-4 frasi), cortese, professionale, caloroso
- Parla in ITALIANO se l'utente scrive in italiano, in INGLESE se in inglese, ecc.
- Se l'utente chiede un preventivo specifico, suggerisci di compilare il modulo nella sezione Contatti del sito
- Se l'utente chiede info su prezzi dettagliati, dai i prezzi base sopra indicati
- NON inventare prezzi o servizi non elencati
- Se non sai qualcosa, suggerisci di contattare Salvo direttamente via WhatsApp
- Mantieni il tono luxury ma accessibile`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId, lang = "it" } = body as {
      message?: string;
      sessionId?: string;
      lang?: string;
    };

    if (!message || typeof message !== "string" || message.length > 1000) {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 },
      );
    }

    // Build or load chat session
    let session;
    let history: Array<{ role: "user" | "assistant"; content: string }> = [];
    if (sessionId) {
      try {
        session = await db.chatSession.findUnique({ where: { id: sessionId } });
        if (session) {
          history = JSON.parse(session.messages) as typeof history;
        }
      } catch {
        // ignore, will create new session
      }
    }

    const userMsg = { role: "user" as const, content: message };

    // Initialize ZAI SDK and call LLM
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.slice(-6), // keep last 6 messages for context
        userMsg,
      ],
      temperature: 0.6,
      maxTokens: 400,
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "Mi dispiace, non sono riuscito a generare una risposta. Riprova tra un momento.";

    const assistantMsg = { role: "assistant" as const, content: reply };
    const newMessages = [...history, userMsg, assistantMsg].slice(-20); // cap history

    // Persist or update session
    const userAgent = req.headers.get("user-agent") ?? null;
    if (session) {
      await db.chatSession.update({
        where: { id: session.id },
        data: {
          messages: JSON.stringify(newMessages),
          lang,
          userAgent,
          updatedAt: new Date(),
        },
      });
    } else {
      session = await db.chatSession.create({
        data: {
          messages: JSON.stringify(newMessages),
          lang,
          userAgent,
        },
      });
    }

    return NextResponse.json({ reply, sessionId: session.id });
  } catch (error: any) {
    console.error("Chat API error:", error?.message);
    return NextResponse.json(
      {
        error: "Internal error",
        reply:
          "Mi scuso per l'inconveniente. Riprova tra un momento, oppure contatta Salvo direttamente su WhatsApp +39 344 232 2176.",
      },
      { status: 500 },
    );
  }
}
