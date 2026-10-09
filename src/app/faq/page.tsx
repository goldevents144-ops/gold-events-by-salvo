import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "FAQ — Domande Frequenti su Gold Events by Salvo",
  description:
    "Risposte alle domande più frequenti: costi, servizi, location, Air Mirror, Video Booth 360, matrimoni, battesimi, feste aziendali. Tutto quello che devi sapere prima di contattare Salvo Piemonte.",
  keywords: [
    "FAQ Gold Events by Salvo",
    "domande frequenti animatore",
    "come funziona Air Mirror",
    "prezzo matrimonio Catania",
    "trasferta gratuita Adrano",
    "cosa include conduzione",
    "matrimonio lusso Sicilia costo",
    "animazione eventi come funziona",
    "Salvo Piemonte FAQ",
    "battesimo animazione prezzo",
  ],
  alternates: { canonical: BASE_URL + "/faq" },
  openGraph: {
    title: "FAQ — Gold Events by Salvo",
    description:
      "Tutte le risposte alle domande più frequenti su servizi, prezzi, location, tecnologie esclusive.",
    url: BASE_URL + "/faq",
  },
};

interface FAQItem {
  q: string;
  a: string;
  categoria: string;
}

const FAQ: FAQItem[] = [
  // Prezzi e preventivi
  {
    categoria: "Prezzi e preventivi",
    q: "Quanto costa un matrimonio con Gold Events by Salvo?",
    a: "Il bundle Luxury Wedding parte da 600€ per 7-9 ore di conduzione totale del ricevimento. Include regia e coordinamento totale, interfaccia con direttore di sala, catering e fotografi, conduzione primo ballo, taglio torta e lancio bouquet. I prezzi degli extra tecnologici (Air Mirror, Video Booth 360, Audio Guest Book Phone) sono su richiesta e personalizzati in base ai servizi scelti. L'Ora Extra costa +70€/h. La trasferta è gratuita entro 30 km da Adrano (Catania), con supplemento 40-60€ per destinazioni oltre.",
  },
  {
    categoria: "Prezzi e preventivi",
    q: "Quanto costa un battesimo, comunione o cresima?",
    a: "Il bundle Family & Joy parte da 350€ per cerimonie familiari (battesimi, comunioni, cresime). Include conduzione misurata e familiare, accoglienza parenti, coordinamento tempi sala, gestione brindisi con microfonaggio curato, momento della torta con regia musicale, giochi per bambini, DJ Set soft incluso (lounge, Italian classic). Trasferta gratuita entro 30km da Adrano.",
  },
  {
    categoria: "Prezzi e preventivi",
    q: "Quanto costa una festa di compleanno?",
    a: "Il bundle Party & Style parte da 350€ per feste private, 18esimi, lauree, compleanni adulti. Include conduzione energica e personalizzata in base all'età del festeggiato, accoglienza ospiti, microfonaggio, brindisi, DJ Set commerciale incluso, giochi e animazione per coinvolgere la sala. Per i 18esimi spesso si aggiunge il Video Booth 360, per i 50/60/70 l'Air Mirror classico.",
  },
  {
    categoria: "Prezzi e preventivi",
    q: "Come posso richiedere un preventivo personalizzato?",
    a: "Compila il modulo nella sezione Contatti del sito goldeventsbysalvo.it. Dopo l'invio, riceverai un messaggio pre-compilato da inviare via WhatsApp al +39 344 232 2176 o via email a goldeventssicilyexperience@outlook.com. Il messaggio include automaticamente nome, tipo di evento, data, location, numero ospiti, email, telefono e servizi desiderati. Risposta garantita entro 24 ore con proposta personalizzata da Salvo Piemonte.",
  },
  {
    categoria: "Prezzi e preventivi",
    q: "C'è uno sconto per eventi con molti ospiti?",
    a: "Per eventi con più di 100 ospiti, le tariffe sono personalizzate su richiesta. Più il numero di ospiti cresce, più il costo orario medio si riduce proporzionalmente. Per feste aziendali o eventi con 200+ ospiti, il preventivo è su misura e include un team di supporto se necessario.",
  },

  // Servizi
  {
    categoria: "Servizi",
    q: "Quali servizi offre Gold Events by Salvo?",
    a: "Gold Events by Salvo di Salvo Piemonte offre 9 servizi di conduzione: Battesimi, Comunioni, Cresime, Compleanni, Matrimoni, Lauree, Feste Private, Feste a Tema, Feste Aziendali, Dj Set e Organizzazione Serate Giochi. Affianca a queste conduzioni 4 servizi extra tecnologici: Air Mirror (specchio magico fotobooth con stampe illimitate), 360 Video Booth Experience (pedana rotante per video slow-motion), Video Guest Book Phone Experience (telefono vintage per registrazioni video), Set Scenografico Premium (fondale neon personalizzato).",
  },
  {
    categoria: "Servizi",
    q: "Cosa include esattamente la conduzione?",
    a: "La conduzione include: accoglienza degli ospiti, coordinamento della sala e del catering, microfonaggio professionale per brindisi e annunci, gestione dei momenti clou (primo ballo, taglio torta, lancio bouquet per i matrimoni), presentazione scenografica del festeggiato, animazione per coinvolgere la sala, DJ Set incluso (soft per cerimonie, commerciale per feste giovani), regia musicale, gestione imprevisti. Per i matrimoni include anche interfaccia con fotografi e direttore di sala.",
  },
  {
    categoria: "Servizi",
    q: "L'Air Mirror ha stampe fotografiche illimitate?",
    a: "Sì, le stampe fotografiche dell'Air Mirror di Gold Events by Salvo sono totalmente illimitate per tutta la durata dell'evento. Per i matrimoni è inclusa la regola della doppia copia: una stampa per gli sposi e una per gli ospiti. Include anche kit gadget (occhiali, parrucche, cartelli), operatore dedicato, condivisione QR Code e grafiche personalizzate con nome sposi o festeggiato.",
  },
  {
    categoria: "Servizi",
    q: "Cos'è il 360 Video Booth Experience?",
    a: "Il 360 Video Booth Experience è una pedana rotante professionale che permette agli ospiti di registrare video dinamici in slow motion con effetti cinematografici, musica personalizzata e grafiche dell'evento. I video vengono elaborati in pochi secondi e condivisi direttamente tramite smartphone su TikTok e Instagram. Capace fino a 4-5 persone per video, include operatore dedicato per tutta la serata. Prezzo su richiesta.",
  },
  {
    categoria: "Servizi",
    q: "Cos'è il Video Guest Book Phone Experience?",
    a: "Il Video Guest Book Phone Experience è una postazione scenografica con telefono vintage dotato di sistema di registrazione video e audio professionale. Gli ospiti sollevano la cornetta e registrano dediche, auguri e momenti spontanei. Al termine dell'evento, tutti i video vengono raccolti e consegnati in formato digitale. Ideale per matrimoni, compleanni, lauree, anniversari ed eventi aziendali. Prezzo su richiesta.",
  },
  {
    categoria: "Servizi",
    q: "Cos'è il Set Scenografico Neon?",
    a: "Il Set Scenografico Neon è un fondale neon personalizzato con grafiche e testi dell'evento (nome sposi, data, logo azienda, nome festeggiato). Crea lo sfondo perfetto per foto d'atmosfera. Include installazione e smontaggio, illuminazione scenografica, photo set per tutta la serata. Prezzo su richiesta.",
  },

  // Location e trasferte
  {
    categoria: "Location e trasferte",
    q: "Dove opera Gold Events by Salvo?",
    a: "La sede operativa è ad Adrano (Catania), in Sicilia. Salvo Piemonte opera ovunque venga richiesto, non solo a Catania e provincia. Copre tutta la Sicilia Orientale (Catania, Taormina, Etna, Giardini Naxos, Letojanni, Bronte, Nicolosi, Paternò, Belpasso, Acireale, Giarre, Riposto, Mascali, Castiglione di Sicilia, Linguaglossa, Randazzo, Maniace, Caltagirone, Piazza Armerina, Enna, Ragusa, Modica, Noto, Siracusa) ed è disponibile per eventi in tutta Italia e all'estero.",
  },
  {
    categoria: "Location e trasferte",
    q: "Quanto costa la trasferta?",
    a: "La trasferta è gratuita entro 30 km da Adrano. Comprende quasi tutta la provincia di Catania: Paternò, Belpasso, Biancavilla, Santa Maria di Licodia, Ragalna, Nicolosi, Pedara, Trecastagni, Zafferana Etnea, Bronte, Maniace, Linguaglossa, Castiglione di Sicilia. Per destinazioni oltre 30km (Taormina, Catania città, Siracusa, Ragusa, Noto), il supplemento è di 40-60€ in base alla distanza. Per eventi fuori Sicilia, il preventivo è personalizzato.",
  },
  {
    categoria: "Location e trasferte",
    q: "Gold Events by Salvo fa eventi fuori dalla Sicilia?",
    a: "Sì, Salvo Piemonte opera ovunque venga richiesto. La sede operativa è ad Adrano (Catania), ma è disponibile per eventi in tutta Italia e all'estero. La trasferta è gratuita entro 30 km da Adrano; per destinazioni oltre (Taormina, Caltagirone, Ragusa, Noto) il supplemento è di 40-60€. Per eventi fuori Sicilia, il preventivo è personalizzato in base alla destinazione.",
  },
  {
    categoria: "Location e trasferte",
    q: "Conosce già le ville e i saloni della zona?",
    a: "Sì, Salvo Piemonte lavora da anni in Sicilia Orientale e conosce le location migliori di Adrano, Paternò, Belpasso, Nicolosi, Pedara, Acireale, Catania, Taormina, Bronte, Linguaglossa, Castiglione di Sicilia, Ragusa, Noto. Può consigliare ville, saloni, agriturismi, cantine, hotel in base al tipo di evento e al numero di ospiti. Conosce anche i catering, i fotografi e i fornitori più affidabili del territorio.",
  },

  // Chi è Salvo
  {
    categoria: "Chi è Salvo Piemonte",
    q: "Chi è Salvo Piemonte?",
    a: "Salvo Piemonte è il fondatore e organizzatore di eventi di Gold Events by Salvo, con sede ad Adrano (Catania), Sicilia. È showman, presentatore e conducente di eventi di lusso. Gestisce matrimoni, battesimi, compleanni, feste aziendali e serate giochi in tutta la Sicilia e ovunque venga richiesto. Offre anche tecnologie esclusive come Air Mirror, 360 Video Booth Experience e Video Guest Book Phone Experience.",
  },
  {
    categoria: "Chi è Salvo Piemonte",
    q: "Che esperienza ha Salvo Piemonte?",
    a: "Salvo Piemonte ha maturato esperienza pluriennale nella conduzione di eventi in Sicilia Orientale. Ha gestito matrimoni di lusso, feste private di alto livello, eventi aziendali per grandi numeri, cerimonie familiari intime. È specializzato nel segmento lusso e nel destination wedding internazionale. Conosce bene le dinamiche del catering, della fotografia evento e del coordinamento sala.",
  },
  {
    categoria: "Chi è Salvo Piemonte",
    q: "Cosa rende Gold Events by Salvo diverso da altri animatori?",
    a: "Tre cose distinguono Gold Events by Salvo: 1) Regia totale dell'evento (non solo animazione, ma coordinamento catering, fotografi, sala); 2) Tecnologie esclusive (Air Mirror con stampe illimitate, Video Booth 360, Audio Guest Book Phone, Set Neon); 3) Personalizzazione totale in base all'evento e al cliente. Salvo non fa animazione standardizzata: ogni evento è curato su misura.",
  },

  // Prenotazione e contratti
  {
    categoria: "Prenotazione e contratti",
    q: "Come si prenota una data?",
    a: "Per prenotare una data è necessario compilare il form di contatto sul sito goldeventsbysalvo.it. Si riceve risposta entro 24 ore con disponibilità, preventivo e condizioni. La prenotazione si conferma con un acconto del 30% del totale pattuito e la firma del contratto. Il saldo è dovuto il giorno dell'evento o nei giorni immediatamente successivi, secondo le modalità concordate.",
  },
  {
    categoria: "Prenotazione e contratti",
    q: "C'è un contratto formale?",
    a: "Sì, ogni evento è regolato da un contratto formale che specifica: data, location, durata, servizi inclusi, prezzo totale, acconto versato, saldo residuo, condizioni di cancellazione, termini e condizioni. Il contratto protegge sia il cliente che Salvo, ed è obbligatorio per confermare la prenotazione.",
  },
  {
    categoria: "Prenotazione e contratti",
    q: "Cosa succede se devo cancellare l'evento?",
    a: "Le condizioni di cancellazione sono specificate nel contratto. In generale: cancellazione oltre 60 giorni dall'evento: acconto restituito al 50%; cancellazione tra 30 e 60 giorni: acconto restituito al 25%; cancellazione entro 30 giorni: acconto non restituito. Per cause di forza maggiore (malattia documentata, lutto, problemi familiari gravi), è possibile concordare un recupero della data entro 12 mesi.",
  },
  {
    categoria: "Prenotazione e contratti",
    q: "Con quanto anticipo devo prenotare?",
    a: "Per i matrimoni è consigliabile prenotare con 6-12 mesi di anticipo, soprattutto per le date di alta stagione (maggio-settembre). Per battesimi, comunioni, compleanni, 2-3 mesi di anticipo sono generalmente sufficienti. Per eventi aziendali, 1-2 mesi di anticipo. Per le feste di fine anno (dicembre) e Carnevale, è meglio prenotare con 3-4 mesi di anticipo.",
  },

  // Tecnologie e attrezzature
  {
    categoria: "Tecnologie e attrezzature",
    q: "L'Air Mirror funziona anche all'aperto?",
    a: "Sì, l'Air Mirror di Gold Events by Salvo è predisposto per funzionare sia al chiuso che all'aperto, con un sistema di protezione per il display e le attrezzature. Per eventi all'aperto è comunque necessario avere una copertura in caso di pioggia (tende, gazebo, padiglioni). L'operatore dedicato gestisce tutta la logistica.",
  },
  {
    categoria: "Tecnologie e attrezzature",
    q: "Quanto spazio serve per il Video Booth 360?",
    a: "Il Video Booth 360 richiede uno spazio minimo di 3x3 metri (pedana + area di sicurezza per il braccio rotante). Per garantire la migliore esperienza, è consigliabile uno spazio di 4x4 metri. L'operatore dedicato si occupa del montaggio, della gestione e dello smontaggio. Funziona sia al chiuso che all'aperto.",
  },
  {
    categoria: "Tecnologie e attrezzature",
    q: "Avete un DJ Set o solo animazione?",
    a: "Sì, ogni conduzione include il DJ Set. Per le cerimonie familiari (battesimi, comunioni) il DJ Set è soft (lounge, Italian classic, evergreen). Per i matrimoni è personalizzato in base ai gusti degli sposi (classica, lounge, commerciale, evergreen). Per i compleanni giovani e i 18esimi, il DJ Set è commerciale, house, commerciale internazionale. È inclusa la console professionale, le casse, l'illuminazione di base.",
  },
];

const CATEGORIE = Array.from(new Set(FAQ.map((f) => f.categoria)));

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="FAQ"
          otherHref="/sicily-experience"
          otherLabel="Gold Events Sicily Experience"
        />

        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeading
              eyebrow="DOMANDE FREQUENTI"
              title="FAQ — Tutto quello che devi sapere"
              intro="Raccolta delle domande più frequenti sui servizi, i prezzi, le tecnologie e le modalità di lavoro di Gold Events by Salvo. Se non trovi la risposta che cerchi, contattami direttamente."
            />
            <Reveal y={20} delay={0.1} className="mt-6">
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIE.map((c) => (
                  <a
                    key={c}
                    href={`#cat-${c.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full border border-[#D4AF37]/30 bg-[#1C1C1C]/60 px-4 py-1.5 text-xs font-medium text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                  >
                    {c}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ per categoria */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {CATEGORIE.map((cat) => {
              const items = FAQ.filter((f) => f.categoria === cat);
              return (
                <div key={cat} id={`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`} className="mb-12 scroll-mt-24">
                  <Reveal y={20}>
                    <h2 className="mb-6 font-serif text-2xl font-semibold text-white sm:text-3xl">
                      {cat}
                    </h2>
                  </Reveal>
                  <div className="space-y-3">
                    {items.map((item, idx) => (
                      <Reveal key={item.q} y={16} delay={0.03 * (idx % 3)}>
                        <details className="group rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-5 transition-colors hover:border-[#D4AF37]/30">
                          <summary className="cursor-pointer list-none">
                            <div className="flex items-start justify-between gap-3">
                              <p className="font-medium text-white">{item.q}</p>
                              <span className="text-[#D4AF37] transition-transform group-open:rotate-45">
                                +
                              </span>
                            </div>
                          </summary>
                          <p className="mt-3 text-sm leading-relaxed text-[#A1A1A1]">
                            {item.a}
                          </p>
                        </details>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Reveal y={20}>
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                Non hai trovato la tua risposta?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A1A1]">
                Contattami direttamente. Rispondo personalmente a ogni richiesta entro 24 ore.
              </p>
              <div className="mt-8">
                <Link
                  href="/gold-events#contatti"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                >
                  Contattami
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
