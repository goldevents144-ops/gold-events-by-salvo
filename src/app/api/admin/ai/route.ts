import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";

/**
 * AI Assistant API — Vercel-compatible (no external SDK needed)
 * Simple keyword-based response system for Salvo's admin panel.
 */

function generateReply(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("prezz") || q.includes("costo") || q.includes("quanto")) {
    return `Ecco i prezzi attuali del sito:

📦 BUNDLE DI CONDUZIONE:
• Party & Style: a partire da 350€ (feste private, 18esimi, lauree)
• Family & Joy: a partire da 350€ (battesimi, comunioni, cresime)
• Luxury Wedding: a partire da 600€ (matrimoni, eventi gala) — PIÙ RICHIESTO

✨ EXTRA TECNOLOGICI:
• Air Mirror: Prezzo su richiesta
• 360 Video Booth Experience: Prezzo su richiesta
• Video Guest Book Phone: Prezzo su richiesta
• Set Scenografico Premium: Prezzo su richiesta
• Ora Extra: +70€/ora
• Fascia Trasferta: gratuito entro 30km Adrano, +40-60€ oltre

Per modificare un prezzo, dimmi quale servizio e il nuovo prezzo.`;
  }

  if (q.includes("serviz") || q.includes("offerta") || q.includes("cosa fate")) {
    return `Gold Events by Salvo offre 9 servizi:
1. Battesimi, Comunioni e Cresime
2. Compleanni (18, 30, 40, 50+)
3. Matrimoni & Destination Wedding
4. Lauree
5. Feste Private
6. Feste a Tema
7. Feste Aziendali & Team Building
8. Dj Set
9. Organizzazione Serate Giochi

6 EXTRA TECNOLOGICI:
• Air Mirror (stampe illimitate)
• 360 Video Booth Experience
• Video Guest Book Phone Experience
• Set Scenografico Premium
• Ora Extra (+70€/h)
• Fascia Trasferta (+40-60€)

Salvo Piemonte opera ovunque venga richiesto, non solo a Catania.`;
  }

  if (q.includes("contatto") || q.includes("whatsapp") || q.includes("email") || q.includes("telefono")) {
    return `I contatti di Gold Events by Salvo:

📞 WhatsApp: +39 344 232 2176
📧 Email: goldeventssicilyexperience@outlook.com
📷 Instagram: @goldeventsicily_experience
📍 Sede: Adrano (Catania), Sicilia — opera ovunque
👤 Titolare: Salvo Piemonte

Per cambiare un contatto, dimmi quale e il nuovo valore.`;
  }

  if (q.includes("ciao") || q.includes("salve") || q.includes("buongiorno")) {
    return `Ciao Salvo! 👋 Sono il tuo assistente AI nel pannello di amministrazione.

Posso aiutarti a:
• Vedere i prezzi dei servizi
• Modificare prezzi e contatti
• Rispondere a domande sui servizi
• Gestire le richieste dei clienti

Cosa posso fare per te?`;
  }

  return `Ho ricevuto la tua domanda: "${question}"

Posso aiutarti con:
• Prezzi e costi dei servizi
• Elenco dei servizi offerti
• Contatti (WhatsApp, email, Instagram)
• Modifiche al sito pubblico

Prova a chiedermi: "Quali sono i prezzi?" o "Quali servizi offrite?"`;
}

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { question } = body as { question?: string };

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Domanda mancante" }, { status: 400 });
    }

    const reply = generateReply(question);

    return NextResponse.json({
      reply,
      action: "info",
      summary: "Risposta generata dall'assistente AI",
    });
  } catch (error: any) {
    console.error("Admin AI error:", error?.message);
    return NextResponse.json({
      reply: "Mi dispiace, si è verificato un errore. Riprova.",
    });
  }
}
