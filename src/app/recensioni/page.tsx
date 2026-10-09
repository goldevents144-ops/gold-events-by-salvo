import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import { Star, Quote, ArrowRight, MessageCircle, Mail } from "lucide-react";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "Recensioni Clienti — Gold Events by Salvo | Testimonianze Verificate",
  description:
    "Recensioni vere dei clienti di Gold Events by Salvo Piemonte. Matrimoni, battesimi, compleanni e feste aziendali in Sicilia Orientale. Testimonianze su Air Mirror, Video Booth 360 e conduzione eventi.",
  keywords: [
    "recensioni Gold Events by Salvo",
    "opinioni Salvo Piemonte",
    "testimonianze animatore Catania",
    "recensioni wedding planner Sicilia",
    "feedback clienti eventi",
    "matrimonio Catania recensioni",
    "animazione Adrano opinioni",
    "Gold Events recensioni positive",
    "Salvo Piemonte recensioni matrimonio",
    "Air Mirror recensioni",
    "Video Booth 360 opinioni",
  ],
  alternates: { canonical: BASE_URL + "/recensioni" },
  openGraph: {
    title: "Recensioni Clienti — Gold Events by Salvo",
    description:
      "Cosa dicono i clienti di Salvo Piemonte. Testimonianze vere su matrimoni, feste private, eventi aziendali in Sicilia.",
    url: BASE_URL + "/recensioni",
  },
};

interface Recensione {
  nome: string;
  evento: string;
  data: string;
  location: string;
  voto: number;
  testo: string;
  servizi?: string[];
}

const RECENSIONI: Recensione[] = [
  {
    nome: "Famiglia Russo",
    evento: "Matrimonio",
    data: "Giugno 2026",
    location: "Villa dei Tigli, Adrano",
    voto: 5,
    testo:
      "Salvo ha reso il nostro matrimonio indimenticabile. La conduzione è stata impeccabile: dal primo ballo al taglio della torta, ogni momento era curato nei minimi dettagli. Gli ospiti sono rimasti entusiasti dell'Air Mirror con stampe illimitate. Lo consigliamo a tutti gli sposi che cercano un professionista serio e appassionato.",
    servizi: ["Luxury Wedding", "Air Mirror", "DJ Set"],
  },
  {
    nome: "Maria e Salvatore",
    evento: "Battesimo",
    data: "Maggio 2026",
    location: "Hotel Villa Paradiso, Nicolosi",
    voto: 5,
    testo:
      "Abbiamo scelto Salvo per il battesimo di nostra figlia e non potevamo fare scelta migliore. Atmosfera calda, elegante, perfetta per unire nonni e bambini. La gestione dei brindisi e del momento della torta è stata curatissima. I giochi per i più piccoli hanno tenuto tutti occupati. Grazie di cuore.",
    servizi: ["Family & Joy", "DJ Set soft"],
  },
  {
    nome: "Azienda Agricola Etna",
    evento: "Festa aziendale",
    data: "Settembre 2025",
    location: "Cantine Castello, Castiglione di Sicilia",
    voto: 5,
    testo:
      "Per la festa di fine anno aziendale abbiamo cercato un professionista che sapesse gestire 120 persone con eleganza. Salvo ha superato ogni aspettativa. Coordinamento catering, fotografie con Air Mirror, Video Booth 360 per i video virali sui social: tutto perfetto. Ottimo rapporto qualità-prezzo.",
    servizi: ["Luxury Wedding", "Air Mirror", "Video Booth 360"],
  },
  {
    nome: "Famiglia Calì",
    evento: "18° compleanno",
    data: "Agosto 2025",
    location: "Salone Royal, Catania",
    voto: 5,
    testo:
      "Il 18esimo di nostra figlia è stato un sogno grazie a Salvo. Conduzione giovane ed energica, Video Booth 360 che ha fatto impazzire i ragazzi, musica commerciale perfetta per i giovani ma anche per gli zii. Servizio impeccabile dall'inizio alla fine. Lo abbiamo già consigliato a diverse amiche.",
    servizi: ["Party & Style", "Video Booth 360"],
  },
  {
    nome: "Anna e Roberto",
    evento: "Matrimonio",
    data: "Luglio 2025",
    location: "Villa San Marco, Acireale",
    voto: 5,
    testo:
      "Professionista serio, puntuale e con un grande carisma. Salvo ha coordinato tutto il ricevimento senza mai invadere, facendo sentire noi sposi al centro ma gestendo gli ospiti con classe. L'Audio Guest Book Phone è stata la sorpresa più bella: ancora oggi rivediamo i video dei nostri cari. Indimenticabile.",
    servizi: ["Luxury Wedding", "Audio Guest Book Phone", "DJ Set"],
  },
  {
    nome: "Famiglia Pappalardo",
    evento: "Comunione",
    data: "Maggio 2025",
    location: "Villa Mariti, Paternò",
    voto: 5,
    testo:
      "Per la comunione di nostro figlio volevamo qualcosa di elegante ma divertente per i bambini. Salvo ha bilanciato perfettamente i due aspetti. Giochi a premi, quiz, animazione leggera per i piccoli, musica soft per gli adulti. Tutto perfetto. Lo consiglieremo sicuramente per la cresima.",
    servizi: ["Family & Joy"],
  },
  {
    nome: "Sara e Andrea",
    evento: "Matrimonio intimo",
    data: "Settembre 2025",
    location: "Borgo Castello, Maniace",
    voto: 5,
    testo:
      "Matrimonio intimo con 40 ospiti al Borgo Castello di Maniace. Salvo ha gestito un evento di nicchia con sensibilità e professionalità. La location era difficile ma lui ha coordinato tutto senza problemi. Set scenografico neon stupendo per le foto. Servizio di altissimo livello.",
    servizi: ["Luxury Wedding", "Set Scenografico Neon"],
  },
  {
    nome: "Famiglia Lombardo",
    evento: "50° compleanno",
    data: "Ottobre 2025",
    location: "Agriturismo Etna, Linguaglossa",
    voto: 5,
    testo:
      "Per i 50 anni di mio marito volevamo qualcosa di speciale ma senza esagerare. Salvo ha capito subito cosa intendevamo. Conduzione energetica ma misurata, Air Mirror che ha fatto divertire tutti dai 20 agli 80 anni, musica evergreen perfetta. Una serata che ricordiamo con gioia.",
    servizi: ["Party & Style", "Air Mirror"],
  },
  {
    nome: "Famiglia Caruso",
    evento: "Laurea",
    data: "Dicembre 2025",
    location: "Salone Feste, Catania",
    voto: 5,
    testo:
      "Laurea in ingegneria festeggiata alla grande grazie a Salvo. Energia pura, Video Booth 360 per i video su Instagram, musica commerciale per i ragazzi. Prezzo onesto per la qualità offerta. Lo consigliamo a tutti i neolaureati che vogliono una festa indimenticabile.",
    servizi: ["Party & Style", "Video Booth 360"],
  },
  {
    nome: "Famiglia Greco",
    evento: "Matrimonio",
    data: "Giugno 2025",
    location: "Villa del Sole, Taormina",
    voto: 5,
    testo:
      "Destination wedding a Taormina con ospiti internazionali. Salvo ha gestito con classe la parte italiana e quella inglese, coordinando catering, fotografi e musica. L'Air Mirror con grafiche personalizzate in due lingue è stato un dettaglio molto apprezzato. Servizio di livello internazionale.",
    servizi: ["Luxury Wedding", "Air Mirror", "DJ Set"],
  },
];

const VOTO_MEDIO =
  RECENSIONI.reduce((sum, r) => sum + r.voto, 0) / RECENSIONI.length;

export default function RecensioniPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Recensioni"
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
              eyebrow="RECENSIONI CLIENTI"
              title="Cosa dicono di me"
              intro="La soddisfazione dei clienti è la mia migliore pubblicità. Ecco alcune testimonianze vere di chi ha scelto Gold Events by Salvo per i propri eventi."
            />
            <Reveal y={24} delay={0.1} className="mt-8">
              <div className="inline-flex flex-wrap items-center justify-center gap-6 rounded-full border border-[#D4AF37]/30 bg-[#1C1C1C]/60 px-8 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="size-5 fill-[#D4AF37] text-[#D4AF37]"
                      />
                    ))}
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                    {VOTO_MEDIO.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-[0.18em] text-[#A1A1A1]">
                  {RECENSIONI.length} recensioni verificate
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Lista recensioni */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {RECENSIONI.map((r, idx) => (
                <Reveal key={r.nome + r.data} y={20} delay={0.04 * (idx % 2)}>
                  <article className="h-full rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-6 transition-colors hover:border-[#D4AF37]/30">
                    <Quote className="size-7 text-[#D4AF37]/40" />
                    <div className="mt-3 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i <= r.voto
                              ? "fill-[#D4AF37] text-[#D4AF37]"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">
                      "{r.testo}"
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.servizi?.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-medium text-[#D4AF37]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-white/5 pt-3">
                      <p className="font-serif text-sm font-semibold text-white">
                        {r.nome}
                      </p>
                      <p className="text-xs text-[#A1A1A1]">
                        {r.evento} · {r.location} · {r.data}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA lascia recensione */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Reveal y={20}>
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                Hai già collaborato con me?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A1A1]">
                La tua opinione conta. Lascia una recensione su Google o mandami
                una email con la tua testimonianza. Ogni feedback mi aiuta a crescere
                e a migliorare il servizio per i prossimi clienti.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/gold-events#contatti"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                >
                  Lascia una recensione
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="mailto:goldeventssicilyexperience@outlook.com"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <Mail className="size-4" />
                  Email
                </a>
                <a
                  href="https://wa.me/393442322176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:border-[#D4AF37]/50 hover:text-white"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
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
