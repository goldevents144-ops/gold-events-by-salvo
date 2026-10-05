import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";

function generateReply(question: string): string {
  const q = question.toLowerCase();

  // Media placement
  if (q.includes("metti") || q.includes("posizion") || q.includes("foto") || q.includes("immagine") || q.includes("video") || q.includes("carica")) {
    return `Per aggiungere foto o video al sito:

1. Vai nella tab "Media & File" in alto
2. Scegli tipo: Foto o Video
3. Incolla l'URL dell'immagine o del video YouTube
4. Vedi l'ANTEPRIMA LIVE prima di pubblicare
5. Scegli dove mostrarlo (galleria, hero, servizio specifico)
6. Clicca "Pubblica sul sito"

Il media appare IMMEDIATAMENTE sul sito pubblico.

Per le foto: usa Imgur (gratis, illimitato) o Google Drive
Per i video: usa YouTube (non listato, gratis)

Vuoi che ti aiuti a scegliere la posizione migliore? Dimmi che tipo di evento è!`;
  }

  if (q.includes("prezz") || q.includes("costo") || q.includes("quanto")) {
    return `Prezzi attuali:

📦 BUNDLE:
• Party & Style: a partire da 350€
• Family & Joy: a partire da 350€
• Luxury Wedding: a partire da 600€ (PIÙ RICHIESTO)

✨ EXTRA:
• Air Mirror: su richiesta
• 360 Video Booth: su richiesta
• Video Guest Book Phone: su richiesta
• Set Premium: su richiesta
• Ora Extra: +70€/h
• Trasferta: gratuita entro 30km, +40-60€ oltre

Contatta Salvo Piemonte: +39 344 232 2176`;
  }

  if (q.includes("serviz") || q.includes("offert") || q.includes("cosa fate")) {
    return `9 SERVIZI: Battesimi, Comunioni, Cresime, Compleanni, Matrimoni, Lauree, Feste Private, Feste a Tema, Aziendali, Dj Set, Serate Giochi.

6 EXTRA: Air Mirror, 360 Video Booth, Video Guest Book Phone, Set Premium, Ora Extra, Trasferta.

Salvo Piemonte opera ovunque venga richiesto.`;
  }

  if (q.includes("contatto") || q.includes("whatsapp") || q.includes("email")) {
    return `Contatti:
📞 WhatsApp: +39 344 232 2176
📧 Email: goldeventssicilyexperience@outlook.com
📷 Instagram: @goldeventsicily_experience
👤 Salvo Piemonte`;
  }

  if (q.includes("ciao") || q.includes("salve") || q.includes("buongiorno")) {
    return `Ciao Salvo! 👋 Sono il tuo assistente AI.

Posso aiutarti con:
• Prezzi e servizi
• Contatti
• Aggiungere foto/video al sito (vai su "Media & File")
• Informazioni generali

Cosa posso fare per te?`;
  }

  return `Posso aiutarti con:
• "Prezzi" → elenco prezzi
• "Servizi" → elenco servizi
• "Contatti" → WhatsApp/email
• "Foto" → come aggiungere foto al sito
• "Video" → come aggiungere video

Prova: "Come metto una foto?" o "Quali sono i prezzi?"`;
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
    return NextResponse.json({ reply, action: "info" });
  } catch {
    return NextResponse.json({ reply: "Errore. Riprova." });
  }
}
