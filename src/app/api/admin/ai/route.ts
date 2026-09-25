import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { authenticate } from "@/lib/admin-auth";

const SYSTEM_PROMPT = `Sei l'assistente AI del pannello di amministrazione di Gold Events by Salvo.
Aiuti Salvo Piemonte (proprietario del brand) a gestire e modificare il sito web.

CONTESTO:
- Brand: Gold Events by Salvo (Adrano, Catania)
- 9 servizi, 3 bundle di conduzione, 6 extra tecnologici
- Sezione Gold Events Sicily Experience (cura esperienze tramite partner territoriali)
- WhatsApp: +39 344 232 2176, Email: goldeventssicilyexperience@outlook.com

REGOLE:
- Le tue risposte sono SOLO SUGGERIMENTI — il proprietario deve approvare ogni modifica prima che sia applicata
- Sii conciso e concreto
- Quando suggerisci una modifica, specifichi: chiave del contenuto, valore attuale, valore proposto, motivazione
- NON inventare prezzi o dettagli non confermati
- Parla in italiano`;

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

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...(context ? [{ role: "user" as const, content: context }] : []),
        { role: "user", content: question },
      ],
      temperature: 0.5,
      maxTokens: 600,
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "Non sono riuscito a generare un suggerimento.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Admin AI error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 },
    );
  }
}
