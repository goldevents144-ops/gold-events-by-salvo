import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import { Check, ArrowRight, Phone, MessageCircle } from "lucide-react";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "Prezzi Trasparenti — Gold Events by Salvo | Listino Completo 2026",
  description:
    "Listino prezzi trasparente: matrimoni da 600€, battesimi e compleanni da 350€, Air Mirror con stampe illimitate, Video Booth 360, Audio Guest Book Phone, Set Scenografico Neon. Ora extra 70€/h, trasferta gratuita entro 30km da Adrano.",
  keywords: [
    "prezzo animatore Catania",
    "prezzo matrimonio Catania",
    "costo animazione eventi",
    "prezzo wedding planner Sicilia",
    "quanto costa Air Mirror",
    "prezzo Video Booth 360",
    "listino prezzi animatore",
    "preventivo eventi Sicilia",
    "costo festa compleanno Catania",
    "prezzo conduzione matrimonio",
    "trasferta gratuita Adrano",
    "Salvo Piemonte prezzi",
    "Gold Events by Salvo listino",
    "bundle Party Style prezzo",
    "bundle Family Joy prezzo",
    "bundle Luxury Wedding prezzo",
  ],
  alternates: { canonical: BASE_URL + "/prezzi" },
  openGraph: {
    title: "Prezzi Trasparenti — Gold Events by Salvo",
    description:
      "Listino prezzi completo: conduzioni da 350€, matrimoni da 600€, extra tecnologici su richiesta. Trasferta gratuita entro 30km da Adrano.",
    url: BASE_URL + "/prezzi",
  },
};

interface PrezzoItem {
  nome: string;
  prezzo: string;
  prezzoNum: number;
  descrizione: string;
  incluso: string[];
  popolare?: boolean;
  durata?: string;
}

const BUNDLES: PrezzoItem[] = [
  {
    nome: "Party & Style",
    prezzo: "350€",
    prezzoNum: 350,
    descrizione:
      "Per feste private, 18esimi, lauree, compleanni adulti. Conduzione energica e personalizzata in base all'età del festeggiato.",
    incluso: [
      "Conduzione di Salvo Piemonte",
      "Accoglienza ospiti e coordinamento sala",
      "Microfonaggio e presentazione festeggiato",
      "Brindisi e momenti clou gestiti",
      "DJ Set commerciale incluso (lounge/evergreen)",
      "Giochi e animazione per coinvolgere la sala",
      "Trasferta gratuita entro 30km da Adrano",
    ],
    durata: "Durata flessibile",
  },
  {
    nome: "Family & Joy",
    prezzo: "350€",
    prezzoNum: 350,
    descrizione:
      "Per battesimi, comunioni, cresime. Atmosfera calda ed elegante per unire tutte le generazioni della famiglia.",
    incluso: [
      "Conduzione misurata e familiare",
      "Accoglienza parenti stretti",
      "Coordinamento tempi sala e catering",
      "Gestione brindisi con microfonaggio curato",
      "Momento della torta con regia musicale",
      "Giochi per bambini (quiz, schede a premi)",
      "DJ Set soft incluso (lounge, Italian classic)",
      "Trasferta gratuita entro 30km da Adrano",
    ],
    durata: "Durata flessibile",
  },
  {
    nome: "Luxury Wedding",
    prezzo: "600€",
    prezzoNum: 600,
    descrizione:
      "Per matrimoni ed eventi aziendali di gala. Conduzione di alto livello, regia totale del ricevimento.",
    incluso: [
      "Regia totale del ricevimento (7-9 ore)",
      "Coordinamento catering e fotografi",
      "Interfaccia con direttore di sala",
      "Conduzione primo ballo, taglio torta, lancio bouquet",
      "Microfonaggio professionale per brindisi e annuncio",
      "DJ Set matrimonio (classica, lounge, commerciale)",
      "Animazione degli ospiti e momenti di coinvolgimento",
      "Trasferta gratuita entro 30km da Adrano",
      "Il più richiesto",
    ],
    popolare: true,
    durata: "7-9 ore",
  },
];

const EXTRA: PrezzoItem[] = [
  {
    nome: "Air Mirror",
    prezzo: "Su richiesta",
    prezzoNum: 0,
    descrizione:
      "Specchio magico fotobooth di ultima generazione con stampe fotografiche illimitate. Il top per matrimoni e feste.",
    incluso: [
      "Stampe illimitate in tempo reale",
      "Kit gadget (occhiali, parrucche, cartelli)",
      "Operatore dedicato per tutta la serata",
      "Condivisione digitale tramite QR Code",
      "Grafiche personalizzate (nome sposi/festeggiato)",
      "Doppia copia per i matrimoni",
    ],
  },
  {
    nome: "Video Booth 360",
    prezzo: "Su richiesta",
    prezzoNum: 0,
    descrizione:
      "Pedana rotante professionale per video slow-motion virali. Il top per 18esimi ed eventi social.",
    incluso: [
      "Pedana rotante professionale",
      "Video slow-motion cinematografici",
      "Musica personalizzata e grafiche evento",
      "Condivisione diretta su TikTok/Instagram",
      "Operatore dedicato per tutta la serata",
      "Fino a 4-5 persone per video",
    ],
  },
  {
    nome: "Video Guest Book Phone",
    prezzo: "Su richiesta",
    prezzoNum: 0,
    descrizione:
      "Telefono vintage con registrazione video e audio. Gli ospiti lasciano dediche e auguri spontanei.",
    incluso: [
      "Telefono vintage scenografico",
      "Registrazione video e audio professionale",
      "Consegna di tutti i video in formato digitale",
      "Postazione scenografica a tema",
      "Idea per matrimoni, compleanni, anniversari",
    ],
  },
  {
    nome: "Set Scenografico Neon",
    prezzo: "Su richiesta",
    prezzoNum: 0,
    descrizione:
      "Fondale neon personalizzato con grafiche e testi dell'evento. Crea lo sfondo perfetto per foto d'atmosfera.",
    incluso: [
      "Fondale neon personalizzato",
      "Grafiche su misura (nome sposi, data, logo azienda)",
      "Installazione e smontaggio",
      "Illuminazione scenografica",
      "Photo set per tutta la serata",
    ],
  },
];

const EXTRA_PRICES: { label: string; value: string; note: string }[] = [
  {
    label: "Ora Extra (oltre durata prevista)",
    value: "+70€/ora",
    note: "Per eventi che si protraggono oltre la durata pattuita",
  },
  {
    label: "Trasferta oltre 30km da Adrano",
    value: "+40-60€",
    note: "Per Taormina, Catania città, Siracusa. Personalizzato per fuori Sicilia",
  },
  {
    label: "Sconto 100+ ospiti",
    value: "Personalizzato",
    note: "Per eventi con più di 100 ospiti, tariffe personalizzate su richiesta",
  },
  {
    label: "Matrimonio fuori Sicilia",
    value: "Personalizzato",
    note: "Preventivo su misura in base a destinazione, durata e servizi",
  },
];

export default function PrezziPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Prezzi"
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
              eyebrow="LISTINO PREZZI 2026"
              title="Prezzi Trasparenti"
              intro="Credo nella trasparenza. Ecco il mio listino prezzi completo: conduzioni, bundle e extra tecnologici. Nessun costo nascosto, nessuna sorpresa."
            />
            <Reveal y={24} delay={0.1} className="mt-8">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[#D4AF37]/30 bg-[#1C1C1C]/60 px-5 py-2">
                <span className="text-xs uppercase tracking-[0.18em] text-[#A1A1A1]">
                  Da
                </span>
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                  350€
                </span>
                <span className="text-xs text-[#A1A1A1]">
                  · trasferta gratuita entro 30km
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Bundle principali */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                CONDUZIONI BASE
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                3 bundle, tutto incluso
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Ogni bundle include conduzione, DJ Set, microfonaggio, coordinamento e trasferta entro 30km da Adrano. Prezzi IVA inclusa.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {BUNDLES.map((b, idx) => (
                <Reveal key={b.nome} y={20} delay={0.05 * idx}>
                  <article
                    className={`relative flex h-full flex-col rounded-3xl border p-6 transition-all ${
                      b.popolare
                        ? "border-[#D4AF37] bg-[#1C1C1C]/90 shadow-[0_30px_60px_-30px_rgba(212,175,55,0.4)]"
                        : "border-white/8 bg-[#1C1C1C]/60 hover:border-[#D4AF37]/30"
                    }`}
                  >
                    {b.popolare && (
                      <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#D4AF37] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0F0F0F]">
                        Il più richiesto
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {b.nome}
                    </h3>
                    {b.durata && (
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#A1A1A1]">
                        {b.durata}
                      </p>
                    )}
                    <div className="mt-4">
                      <span className="font-serif text-4xl font-bold text-[#D4AF37]">
                        {b.prezzo}
                      </span>
                      <span className="ml-1 text-xs text-[#A1A1A1]">a partire</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#A1A1A1]">
                      {b.descrizione}
                    </p>
                    <ul className="mt-4 flex-1 space-y-2">
                      {b.incluso.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-relaxed text-white/85"
                        >
                          <Check className="mt-0.5 size-3.5 shrink-0 text-[#D4AF37]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/gold-events#contatti"
                      className={`mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                        b.popolare
                          ? "bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#E5C75A]"
                          : "border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                      }`}
                    >
                      Richiedi questo bundle
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Extra tecnologici */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                EXTRA TECNOLOGICI
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                Servizi aggiuntivi su richiesta
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Da abbinare a una conduzione base. I prezzi sono su richiesta perché dipendono dalla durata dell'evento, dalla location e dai servizi scelti.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {EXTRA.map((e, idx) => (
                <Reveal key={e.nome} y={16} delay={0.04 * idx}>
                  <article className="h-full rounded-2xl border border-white/8 bg-[#0F0F0F]/60 p-5 transition-colors hover:border-[#D4AF37]/30">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg font-semibold text-white">
                        {e.nome}
                      </h3>
                      <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                        {e.prezzo}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#A1A1A1]">
                      {e.descrizione}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {e.incluso.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-white/85"
                        >
                          <Check className="mt-0.5 size-3 shrink-0 text-[#D4AF37]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Extra prices */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                COSTI AGGIUNTIVI
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                Trasparenza totale
              </h2>
            </div>
            <Reveal y={20}>
              <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#1C1C1C]/60">
                {EXTRA_PRICES.map((p, idx) => (
                  <div
                    key={p.label}
                    className={`grid gap-2 p-5 sm:grid-cols-3 sm:items-center ${
                      idx > 0 ? "border-t border-white/5" : ""
                    }`}
                  >
                    <div className="sm:col-span-2">
                      <p className="text-sm font-semibold text-white">{p.label}</p>
                      <p className="mt-1 text-xs text-[#A1A1A1]">{p.note}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                        {p.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Reveal y={20}>
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                Vuoi un preventivo personalizzato?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A1A1]">
                Compila il form di contatto con i dettagli del tuo evento: data, location, numero ospiti, servizi desiderati. Ti rispondo entro 24 ore con una proposta personalizzata.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/gold-events#contatti"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                >
                  Richiedi preventivo
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://wa.me/393442322176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+393442322176"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:border-[#D4AF37]/50 hover:text-white"
                >
                  <Phone className="size-4" />
                  Chiama
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
