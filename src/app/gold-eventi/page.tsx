import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, Sparkles, Star, Users, Award } from "lucide-react";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "Gold Eventi — Matrimoni, Feste & Eventi di Lusso in Sicilia | Gold Events by Salvo",
  description:
    "Gold Eventi by Salvo Piemonte: matrimoni di lusso, feste private, eventi aziendali, battesimi, compleanni in Sicilia Orientale. Sede ad Adrano (Catania). Air Mirror, Video Booth 360, Dj Set. Trasferta gratuita entro 30km.",
  keywords: [
    "Gold Eventi",
    "Gold Eventi Sicilia",
    "Gold Eventi Catania",
    "Gold Eventi Adrano",
    "Gold Eventi Salvo",
    "Gold Eventi matrimoni",
    "Gold Eventi feste",
    "Gold Eventi eventi aziendali",
    "Gold Events by Salvo",
    "Gold Events Sicily Experience",
    "Salvo Piemonte",
    "matrimoni Sicilia",
    "feste private Catania",
    "eventi lusso Sicilia",
    "wedding planner Catania",
    "showman Catania",
    "organizzatore eventi Sicilia",
  ],
  alternates: { canonical: BASE_URL + "/gold-eventi" },
  openGraph: {
    title: "Gold Eventi — Matrimoni, Feste & Eventi di Lusso in Sicilia",
    description:
      "Gold Eventi by Salvo Piemonte. Matrimoni, feste private, eventi aziendali in Sicilia Orientale. Air Mirror, Video Booth 360, Dj Set.",
    url: BASE_URL + "/gold-eventi",
    type: "website",
    images: [
      {
        url: "/images/collage/matrimoni-couple-toast.jpg",
        width: 800,
        height: 600,
        alt: "Gold Eventi — matrimonio di lusso in Sicilia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Eventi — Matrimoni, Feste & Eventi di Lusso in Sicilia",
    description:
      "Gold Eventi by Salvo Piemonte. Matrimoni, feste private, eventi aziendali in Sicilia Orientale.",
  },
};

const EVENTI = [
  {
    title: "Matrimoni di Lusso",
    icon: "💝",
    price: "da 600€",
    desc: "Conduzione totale del ricevimento, regia completa, coordinamento catering e fotografi, primo ballo, taglio torta, lancio bouquet. 7-9 ore di servizio.",
    features: ["Regia totale evento", "Coordinamento catering", "Microfonaggio professionale", "DJ Set matrimonio"],
  },
  {
    title: "Battesimi, Comunioni, Cresime",
    icon: "🕊️",
    price: "da 350€",
    desc: "Atmosfera calda ed elegante per unire tutte le generazioni della famiglia. Giochi per bambini, gestione brindisi, momento della torta.",
    features: ["Conduzione familiare", "Giochi per bambini", "DJ Set soft incluso", "Trasferta gratuita"],
  },
  {
    title: "Compleanni (18, 30, 50, 70)",
    icon: "🎉",
    price: "da 350€",
    desc: "Conduzione energica e personalizzata in base all'età del festeggiato. Video Booth 360 per i 18esimi, Air Mirror per i compleanni adulti.",
    features: ["Conduzione personalizzata", "DJ Set commerciale", "Video Booth 360 opzionale", "Air Mirror opzionale"],
  },
  {
    title: "Eventi Aziendali & Team Building",
    icon: "💼",
    price: "su richiesta",
    desc: "Feste aziendali, team building, eventi corporate con 50-200+ partecipanti. Coordinamento sala, microfonaggio, DJ Set.",
    features: ["Coordinamento completo", "Microfonaggio professionale", "DJ Set aziendale", "Tecnologie esclusive"],
  },
  {
    title: "Lauree",
    icon: "🎓",
    price: "da 350€",
    desc: "Festa di laurea con conduzione giovane ed energica. Video Booth 360 per video virali su Instagram e TikTok, DJ Set commerciale.",
    features: ["Conduzione giovane", "Video Booth 360 consigliato", "DJ Set commerciale", "Trasferta gratuita"],
  },
  {
    title: "Feste a Tema",
    icon: "🎭",
    price: "su richiesta",
    desc: "Feste a tema personalizzate: serate giochi, party a tema, eventi speciali. Conduzione scenografica e creativa.",
    features: ["Conduzione creativa", "Set scenografico neon", "DJ Set tematico", "Personalizzazione totale"],
  },
];

const EXTRA_TECH = [
  {
    name: "Air Mirror",
    desc: "Specchio magico fotobooth con stampe illimitate, kit gadget, operatore dedicato, condivisione QR Code, grafiche personalizzate.",
  },
  {
    name: "Video Booth 360",
    desc: "Pedana rotante professionale per video slow-motion cinematografici. Fino a 4-5 persone per video, condivisione diretta su TikTok/Instagram.",
  },
  {
    name: "Audio Guest Book Phone",
    desc: "Telefono vintage con registrazione video e audio professionale. Gli ospiti lasciano dediche, auguri e momenti spontanei.",
  },
  {
    name: "Set Scenografico Neon",
    desc: "Fondale neon personalizzato con grafiche e testi dell'evento. Sfondo perfetto per foto d'atmosfera.",
  },
];

const COMUNI_SERVITI = [
  "Adrano", "Catania", "Paternò", "Belpasso", "Biancavilla", "Nicolosi", "Pedara",
  "Trecastagni", "Zafferana Etnea", "Acireale", "Aci Castello", "Aci Trezza",
  "Giarre", "Riposto", "Mascali", "Fiumefreddo", "Calatabiano", "Taormina",
  "Giardini Naxos", "Letojanni", "Castelmola", "Castiglione di Sicilia",
  "Linguaglossa", "Randazzo", "Bronte", "Maniace", "Cesarò", "Caltagirone",
  "Piazza Armerina", "Enna", "Noto", "Siracusa", "Ragusa", "Modica", "Vittoria",
];

export default function GoldEventiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Gold Eventi"
          otherHref="/sicily-experience"
          otherLabel="Gold Events Sicily Experience"
        />

        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#0F0F0F] to-[#1C1C1C]"
          />
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="GOLD EVENTI"
              title="Gold Eventi by Salvo Piemonte — Eventi di Lusso in Sicilia"
              intro="Gold Eventi è il brand di Salvo Piemonte per matrimoni, feste private, eventi aziendali, battesimi, compleanni e cerimonie di lusso in Sicilia Orientale. Sede ad Adrano (Catania), operiamo in tutta la Sicilia con tecnologie esclusive."
            />

            <Reveal y={24} delay={0.1} className="mt-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Sede" value="Adrano (CT)" />
                <StatCard label="Servizi" value="9" />
                <StatCard label="Bundle" value="3" />
                <StatCard label="Extra tech" value="4" />
              </div>
            </Reveal>

            <Reveal y={20} delay={0.2} className="mt-8">
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/gold-events#contatti"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                >
                  Richiedi preventivo <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://wa.me/393442322176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
                <a
                  href="tel:+393442322176"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:border-[#D4AF37]/50 hover:text-white"
                >
                  <Phone className="size-4" /> Chiama
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Eventi serviti */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                TIPOLOGIE EVENTI
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                Quali Gold Eventi organizza Salvo
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Ogni Gold Evento è curato da Salvo Piemonte personalmente, dalla progettazione alla
                conduzione. Scegli la tipologia e richiedi un preventivo su misura.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EVENTI.map((evt, idx) => (
                <Reveal key={evt.title} y={20} delay={0.04 * idx}>
                  <article className="h-full rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-5 transition-colors hover:border-[#D4AF37]/30">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <span className="text-3xl">{evt.icon}</span>
                      <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                        {evt.price}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-white">{evt.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#A1A1A1]">{evt.desc}</p>
                    <ul className="mt-3 space-y-1.5">
                      {evt.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-white/85">
                          <Star className="size-3 shrink-0 fill-[#D4AF37] text-[#D4AF37]" />
                          {f}
                        </li>
                      ))}
                    </ul>
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
                Tecnologie esclusive Gold Eventi
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Gold Eventi di Salvo Piemonte offre tecnologie esclusive per rendere indimenticabile
                ogni evento. Da abbinare a qualsiasi conduzione base.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {EXTRA_TECH.map((tech, idx) => (
                <Reveal key={tech.name} y={20} delay={0.05 * idx}>
                  <article className="h-full rounded-2xl border border-[#D4AF37]/20 bg-[#1C1C1C]/60 p-5">
                    <div className="mb-3 inline-flex size-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
                      <Sparkles className="size-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-white">{tech.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#A1A1A1]">{tech.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Comuni serviti */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                DOVE OPERA
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                Comuni serviti da Gold Eventi
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Gold Eventi di Salvo Piemonte opera in tutta la Sicilia Orientale. Trasferta gratuita
                entro 30km da Adrano. Per eventi fuori Sicilia o all'estero, preventivo personalizzato.
              </p>
            </div>
            <Reveal y={20}>
              <div className="flex flex-wrap justify-center gap-2">
                {COMUNI_SERVITI.map((comune) => (
                  <span
                    key={comune}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[#1C1C1C]/60 px-3 py-1.5 text-xs font-medium text-white/90"
                  >
                    {comune}
                  </span>
                ))}
              </div>
            </Reveal>
            <div className="mt-8 text-center">
              <Link
                href="/dove-opero"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
              >
                Vedi tutti i comuni <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Reveal y={20}>
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                Vuoi organizzare un Gold Evento?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A1A1]">
                Salvo Piemonte ti risponde entro 24 ore con una proposta personalizzata per il tuo
                evento in Sicilia. Scegli il canale che preferisci.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/gold-events#contatti"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                >
                  Richiedi preventivo <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://wa.me/393442322176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
                <Link
                  href="/salvo-piemonte"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:border-[#D4AF37]/50 hover:text-white"
                >
                  Scopri Salvo Piemonte <ArrowRight className="size-4" />
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#1C1C1C]/60 p-4 text-center">
      <p className="font-serif text-xl font-bold text-[#D4AF37] sm:text-2xl">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A1A1A1]">
        {label}
      </p>
    </div>
  );
}
