import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, Users, Heart, Cake, GraduationCap, Building2, Drama, Disc3, Dices, Baby, Sparkles, MapPin } from "lucide-react";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "Eventi in Sicilia — Matrimoni, Feste, Aziendali, Battesimi | Gold Events by Salvo Piemonte",
  description:
    "Eventi in Sicilia con Salvo Piemonte: matrimoni di lusso, feste private, eventi aziendali, battesimi, comunioni, cresime, compleanni, lauree. Sede ad Adrano (Catania), operiamo in tutta la Sicilia Orientale. Air Mirror, Video Booth 360, Dj Set. Trasferta gratuita entro 30km.",
  keywords: [
    "eventi Sicilia",
    "eventi Catania",
    "eventi Adrano",
    "eventi Taormina",
    "eventi Etna",
    "organizzazione eventi Sicilia",
    "organizzazione eventi Catania",
    "organizzatore eventi Adrano",
    "animazione eventi",
    "eventi lusso Sicilia",
    "matrimoni Sicilia",
    "feste private Catania",
    "eventi aziendali Sicilia",
    "battesimi Catania",
    "comunioni Catania",
    "cresime Catania",
    "compleanni Sicilia",
    "lauree Catania",
    "feste a tema Sicilia",
    "serate giochi eventi",
    "DJ set eventi",
    "Salvo Piemonte eventi",
    "Gold Eventi",
    "Gold Events by Salvo",
  ],
  alternates: { canonical: BASE_URL + "/eventi" },
  openGraph: {
    title: "Eventi in Sicilia — Matrimoni, Feste, Aziendali, Battesimi | Gold Events",
    description:
      "Organizzazione eventi di lusso in Sicilia con Salvo Piemonte. Matrimoni, feste private, eventi aziendali, battesimi, compleanni. Sede ad Adrano (Catania).",
    url: BASE_URL + "/eventi",
    type: "website",
    images: [
      {
        url: "/images/collage/matrimoni-couple-toast.jpg",
        width: 800,
        height: 600,
        alt: "Eventi di lusso in Sicilia con Gold Events by Salvo Piemonte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventi in Sicilia — Gold Events by Salvo Piemonte",
    description:
      "Organizzazione eventi di lusso in Sicilia. Matrimoni, feste private, eventi aziendali, battesimi, compleanni.",
  },
};

const TIPOLOGIE_EVENTI = [
  {
    icon: Heart,
    nome: "Matrimoni",
    desc: "Matrimoni di lusso con conduzione totale del ricevimento. Regia completa, coordinamento catering e fotografi, primo ballo, taglio torta, lancio bouquet. Bundle Luxury Wedding da 600€.",
    location: "Catania, Taormina, Adrano, Acireale, Etna",
    durata: "7-9 ore",
    prezzo: "da 600€",
  },
  {
    icon: Baby,
    nome: "Battesimi, Comunioni, Cresime",
    desc: "Cerimonie familiari calde ed eleganti, pensate per unire tutte le generazioni. Conduzione misurata, accoglienza parenti, gestione brindisi, momento della torta con regia musicale.",
    location: "Adrano, Paternò, Belpasso, Nicolosi, Pedara",
    durata: "Flessibile",
    prezzo: "da 350€",
  },
  {
    icon: Cake,
    nome: "Compleanni (18, 30, 40, 50, 70)",
    desc: "Divertimento puro, energia e personalizzazione totale in base all'età del festeggiato. Video Booth 360 per i 18esimi, Air Mirror per i compleanni adulti.",
    location: "Catania, Adrano, Acireale, Giarre",
    durata: "Flessibile",
    prezzo: "da 350€",
  },
  {
    icon: GraduationCap,
    nome: "Lauree",
    desc: "Festa di laurea con conduzione giovane ed energica. Video Booth 360 per video virali su Instagram e TikTok, DJ Set commerciale, animazione al microfono.",
    location: "Catania, Adrano, provincia etnea",
    durata: "Flessibile",
    prezzo: "da 350€",
  },
  {
    icon: Building2,
    nome: "Eventi Aziendali & Team Building",
    desc: "Feste aziendali, team building, eventi corporate con 50-200+ partecipanti. Coordinamento sala, microfonaggio professionale, DJ Set, tecnologie esclusive per coinvolgere i team.",
    location: "Tutta la Sicilia Orientale",
    durata: "Personalizzata",
    prezzo: "su richiesta",
  },
  {
    icon: Drama,
    nome: "Feste Private",
    desc: "Feste private esclusive con conduzione personalizzata. Atmosfera intima o energica in base alle preferenze. Set scenografico neon, Audio Guest Book, DJ Set.",
    location: "Catania, Taormina, ville siciliane",
    durata: "Flessibile",
    prezzo: "su richiesta",
  },
  {
    icon: Sparkles,
    nome: "Feste a Tema",
    desc: "Feste a tema personalizzate: serate anni '80, party in maschera, eventi a tema cinema, serate exclusive. Set scenografico neon, costumi, animazione tematica.",
    location: "Tutta la Sicilia",
    durata: "Flessibile",
    prezzo: "su richiesta",
  },
  {
    icon: Disc3,
    nome: "DJ Set Eventi",
    desc: "DJ Set professionale per eventi di ogni tipo. Console professionale, cassa, illuminazione di base inclusa. Musica commerciale, house, evergreen, lounge in base all'evento.",
    location: "Catania, Adrano, Taormina, Sicilia",
    durata: "4-8 ore",
    prezzo: "su richiesta",
  },
  {
    icon: Dices,
    nome: "Serate Giochi",
    desc: "Organizzazione serate giochi per eventi aziendali, feste private, compleanni. Quiz a premi, giochi a squadre, animazione interattiva per coinvolgere tutti gli ospiti.",
    location: "Catania, Adrano, Sicilia Orientale",
    durata: "2-4 ore",
    prezzo: "su richiesta",
  },
];

const EXTRA_TECH = [
  {
    name: "Air Mirror",
    desc: "Specchio magico fotobooth con stampe illimitate. Kit gadget, operatore dedicato, condivisione QR Code, grafiche personalizzate.",
  },
  {
    name: "Video Booth 360",
    desc: "Pedana rotante professionale per video slow-motion cinematografici. Fino a 4-5 persone per video. Condivisione diretta su TikTok/Instagram.",
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

const COMUNI = [
  "Adrano", "Catania", "Paternò", "Belpasso", "Biancavilla", "Nicolosi", "Pedara",
  "Trecastagni", "Zafferana Etnea", "Acireale", "Aci Castello", "Aci Trezza",
  "Giarre", "Riposto", "Mascali", "Fiumefreddo", "Calatabiano", "Taormina",
  "Giardini Naxos", "Letojanni", "Castelmola", "Castiglione di Sicilia",
  "Linguaglossa", "Randazzo", "Bronte", "Maniace", "Cesarò", "Caltagirone",
  "Piazza Armerina", "Enna", "Noto", "Siracusa", "Ragusa", "Modica", "Vittoria",
];

export default function EventiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Eventi"
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
              eyebrow="EVENTI IN SICILIA"
              title="Eventi di Lusso in Sicilia con Salvo Piemonte"
              intro="Organizzazione eventi di lusso in Sicilia Orientale. Matrimoni, feste private, eventi aziendali, battesimi, comunioni, cresime, compleanni, lauree, feste a tema. Sede ad Adrano (Catania), operiamo in tutta la Sicilia con tecnologie esclusive."
            />

            <Reveal y={24} delay={0.1} className="mt-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Tipologie eventi" value="9+" />
                <StatCard label="Comuni serviti" value="38+" />
                <StatCard label="Extra tech" value="4" />
                <StatCard label="Sede" value="Adrano (CT)" />
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

        {/* Tipologie eventi */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                TIPOLOGIE EVENTI
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                Quali eventi organizza Salvo Piemonte
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Ogni evento è curato personalmente da Salvo Piemonte, dalla progettazione alla
                conduzione. Scegli la tipologia e richiedi un preventivo su misura.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TIPOLOGIE_EVENTI.map((evt, idx) => {
                const Icon = evt.icon;
                return (
                  <Reveal key={evt.nome} y={20} delay={0.04 * idx}>
                    <article className="group h-full rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-5 transition-all hover:border-[#D4AF37]/40 hover:bg-[#1C1C1C]/90">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="inline-flex size-11 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
                          <Icon className="size-5" />
                        </div>
                        <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                          {evt.prezzo}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-white">{evt.nome}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#A1A1A1]">{evt.desc}</p>
                      <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-3 text-[11px] text-[#A1A1A1]">
                        <MapPin className="size-3 text-[#D4AF37]/70" />
                        <span>{evt.location}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-[#6B6B6B]">Durata: {evt.durata}</p>
                    </article>
                  </Reveal>
                );
              })}
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
                Tecnologie esclusive per eventi
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Tecnologie esclusive per rendere indimenticabile ogni evento. Da abbinare a
                qualsiasi conduzione base.
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
                Comuni serviti per eventi
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Salvo Piemonte organizza eventi in tutta la Sicilia Orientale. Trasferta gratuita
                entro 30km da Adrano. Per eventi fuori Sicilia o all'estero, preventivo personalizzato.
              </p>
            </div>
            <Reveal y={20}>
              <div className="flex flex-wrap justify-center gap-2">
                {COMUNI.map((comune) => (
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
                Vuoi organizzare un evento in Sicilia?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A1A1]">
                Salvo Piemonte organizza eventi di lusso in tutta la Sicilia Orientale. Risposta
                garantita entro 24 ore con proposta personalizzata.
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
