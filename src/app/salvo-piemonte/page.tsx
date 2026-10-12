import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import { Phone, MessageCircle, Mail, Award, Users, MapPin, Star, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "Salvo Piemonte — Showman, Wedding Planner e Organizzatore Eventi in Sicilia | Gold Events",
  description:
    "Salvo Piemonte è lo showman e organizzatore di eventi dietro Gold Events by Salvo. Sede ad Adrano (Catania), opera in tutta la Sicilia Orientale: matrimoni, feste private, eventi aziendali, battesimi, compleanni. Conduzione, animazione, Air Mirror, Video Booth 360, Dj Set.",
  keywords: [
    "Salvo Piemonte",
    "Salvo Piemonte eventi",
    "Salvo Piemonte animatore",
    "Salvo Piemonte showman",
    "Salvo Piemonte Catania",
    "Salvo Piemonte Adrano",
    "Salvo Piemonte wedding planner",
    "Salvo Piemonte matrimoni",
    "Salvo Piemonte Gold Events",
    "Salvo Piemonte Sicilia",
    "showman Catania",
    "showman Sicilia",
    "organizzatore eventi Catania",
    "wedding planner Catania",
    "Gold Events by Salvo",
    "Gold Eventi Salvo",
  ],
  alternates: { canonical: BASE_URL + "/salvo-piemonte" },
  openGraph: {
    title: "Salvo Piemonte — Showman & Organizzatore Eventi in Sicilia",
    description:
      "Salvo Piemonte, fondatore di Gold Events by Salvo. Showman, wedding planner e organizzatore eventi di lusso in Sicilia Orientale.",
    url: BASE_URL + "/salvo-piemonte",
    type: "profile",
    images: [
      {
        url: "/images/collage/matrimoni-couple-toast.jpg",
        width: 800,
        height: 600,
        alt: "Salvo Piemonte durante un evento Gold Events in Sicilia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salvo Piemonte — Showman & Organizzatore Eventi in Sicilia",
    description:
      "Showman, wedding planner e organizzatore eventi di lusso in Sicilia. Gold Events by Salvo.",
  },
};

const SKILLS = [
  { label: "Conduzione eventi", icon: Users },
  { label: "Wedding planner", icon: Award },
  { label: "Showman & presentatore", icon: Sparkles },
  { label: "DJ Set professionale", icon: Star },
  { label: "Animazione eventi", icon: Users },
  { label: "Coordinamento catering", icon: CheckCircle2 },
  { label: "Regia di ricevimento", icon: Award },
  { label: "Tecnologie esclusive (Air Mirror, Video Booth 360)", icon: Sparkles },
];

const EXPERIENCES = [
  {
    year: "Matrimoni di lusso",
    title: "Wedding Planner & Showman",
    location: "Catania, Taormina, Adrano, Etna",
    desc: "Conduzione totale del ricevimento, coordinamento catering e fotografi, regia del primo ballo, taglio torta, lancio bouquet. Esperienza pluriennale in ville storiche e location di pregio.",
  },
  {
    year: "Battesimi & Comunioni",
    title: "Animazione familiare elegante",
    location: "Adrano, Paternò, Belpasso, Nicolosi",
    desc: "Atmosfera calda ed elegante per unire tutte le generazioni. Giochi per bambini, gestione brindisi, momento della torta con regia musicale curata.",
  },
  {
    year: "Compleanni (18, 30, 50, 70)",
    title: "Personalizzazione totale",
    location: "Catania, Acireale, Giarre, Taormina",
    desc: "Conduzione energica e personalizzata in base all'età del festeggiato. Video Booth 360 per i 18esimi, Air Mirror per i compleanni adulti, Audio Guest Book per le testimonianze.",
  },
  {
    year: "Eventi aziendali",
    title: "Feste aziendali & Team building",
    location: "Tutta la Sicilia Orientale",
    desc: "Gestione di eventi corporate con 50-200+ partecipanti. Coordinamento sala, microfonaggio professionale, DJ Set, tecnologie esclusive per coinvolgere i team.",
  },
  {
    year: "Destination Wedding",
    title: "Wedding planner internazionale",
    location: "Taormina, Giardini Naxos, Siracusa, Noto",
    desc: "Destination wedding per coppie internazionali che scelgono la Sicilia. Comunicazione bilingue italiano/inglese, coordinamento fornitori, gestione logistica ospiti.",
  },
  {
    year: "Sicily Experience",
    title: "Circuito esperienze di lusso",
    location: "Etna, Taormina, cantine etnee",
    desc: "Curatore del circuito Gold Events Sicily Experience: degustazioni vini Etna DOC, agriturismo, beach tour, esperienze personalizzate per turisti internazionali.",
  },
];

const TESTIMONIALS = [
  {
    text: "Salvo ha reso il nostro matrimonio indimenticabile. La conduzione è stata impeccabile, dal primo ballo al taglio della torta. Lo consigliamo a tutti gli sposi che cercano un professionista serio e appassionato.",
    author: "Famiglia Russo",
    event: "Matrimonio · Villa dei Tigli, Adrano",
  },
  {
    text: "Professionista serio, puntuale e con un grande carisma. Salvo ha coordinato tutto il ricevimento senza mai invadere, facendo sentire noi sposi al centro ma gestendo gli ospiti con classe.",
    author: "Anna e Roberto",
    event: "Matrimonio · Villa San Marco, Acireale",
  },
  {
    text: "Per i 50 anni di mio marito volevamo qualcosa di speciale ma senza esagerare. Salvo ha capito subito cosa intendevamo. Conduzione energetica ma misurata, Air Mirror che ha fatto divertire tutti.",
    author: "Famiglia Lombardo",
    event: "50° compleanno · Agriturismo Etna, Linguaglossa",
  },
];

export default function SalvoPiemontePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Salvo Piemonte"
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
              eyebrow="CHI È SALVO PIEMONTE"
              title="Salvo Piemonte — Showman, Wedding Planner & Organizzatore Eventi in Sicilia"
              intro="Sono Salvo Piemonte, fondatore di Gold Events by Salvo. Showman, presentatore e organizzatore di eventi di lusso con sede ad Adrano (Catania), Sicilia. Opero in tutta la Sicilia Orientale per matrimoni, feste private, eventi aziendali e cerimonie intime."
            />

            <Reveal y={24} delay={0.1} className="mt-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Sede" value="Adrano (CT)" />
                <StatCard label="Anni esperienza" value="10+" />
                <StatCard label="Eventi gestiti" value="200+" />
                <StatCard label="Comuni serviti" value="38+" />
              </div>
            </Reveal>

            <Reveal y={20} delay={0.2} className="mt-8">
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/393442322176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                >
                  <MessageCircle className="size-4" /> Contatta Salvo su WhatsApp
                </a>
                <a
                  href="tel:+393442322176"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <Phone className="size-4" /> Chiama +39 344 232 2176
                </a>
                <Link
                  href="/gold-events#contatti"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:border-[#D4AF37]/50 hover:text-white"
                >
                  Richiedi preventivo <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Chi è Salvo — bio lunga SEO */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal y={20}>
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                Chi è Salvo Piemonte
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#A1A1A1]">
                <p>
                  Salvo Piemonte è lo showman, presentatore e organizzatore di eventi dietro il brand
                  <span className="font-semibold text-white"> Gold Events by Salvo</span>, con sede operativa
                  ad <span className="font-semibold text-white">Adrano</span>, in provincia di Catania, Sicilia.
                  Da anni si occupa di matrimoni di lusso, feste private, eventi aziendali, battesimi,
                  comunioni, cresime, compleanni e cerimonie intime in tutta la Sicilia Orientale.
                </p>
                <p>
                  Il suo approccio è quello di un <span className="font-semibold text-white">regista totale dell'evento</span>:
                  non solo animazione, ma coordinamento completo di catering, fotografi, location, musica,
                  tecnologie esclusive. Salvo Piemonte segue ogni evento dall'inizio alla fine, garantendo
                  un'esperienza senza stress per il cliente e un risultato memorabile per gli ospiti.
                </p>
                <p>
                  La sua specializzazione è il <span className="font-semibold text-white">segmento lusso</span>:
                  matrimoni da 80+ ospiti, destination wedding internazionali a Taormina e sull'Etna,
                  eventi aziendali di alto livello. Offre anche tecnologie esclusive come
                  <span className="font-semibold text-white"> Air Mirror</span> (specchio magico fotobooth con
                  stampe illimitate), <span className="font-semibold text-white">Video Booth 360</span> (pedana
                  rotante per video slow-motion virali), <span className="font-semibold text-white">Audio Guest
                  Book Phone</span> (telefono vintage per registrazioni video) e
                  <span className="font-semibold text-white"> Set Scenografico Neon</span>.
                </p>
                <p>
                  Salvo Piemonte opera principalmente in <span className="font-semibold text-white">Sicilia
                  Orientale</span>: Adrano, Catania, Paternò, Belpasso, Nicolosi, Pedara, Zafferana Etnea,
                  Acireale, Giarre, Riposto, Mascali, Taormina, Giardini Naxos, Letojanni, Bronte,
                  Linguaglossa, Randazzo, Castiglione di Sicilia, Maniace, Caltagirone, Siracusa, Ragusa, Noto.
                  Trasferta gratuita entro 30km da Adrano. Per eventi fuori Sicilia o all'estero, preventivo
                  personalizzato.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Skills grid */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                COMPETENZE
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                Cosa fa Salvo Piemonte
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SKILLS.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <Reveal key={skill.label} y={20} delay={0.05 * idx}>
                    <div className="h-full rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-5 transition-colors hover:border-[#D4AF37]/30">
                      <div className="mb-3 inline-flex size-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
                        <Icon className="size-5" />
                      </div>
                      <p className="text-sm font-medium text-white">{skill.label}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experiences timeline */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                ESPERIENZE
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                Gli eventi di Salvo Piemonte
              </h2>
            </div>
            <div className="space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <Reveal key={exp.title} y={20} delay={0.04 * idx}>
                  <article className="rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                          {exp.year}
                        </p>
                        <h3 className="mt-1 font-serif text-lg font-semibold text-white">
                          {exp.title}
                        </h3>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#A1A1A1]">
                          <MapPin className="size-3 text-[#D4AF37]/70" />
                          {exp.location}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#A1A1A1]">
                      {exp.desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                RECENSIONI CLIENTI
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                Cosa dicono di Salvo Piemonte
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t, idx) => (
                <Reveal key={t.author} y={20} delay={0.05 * idx}>
                  <article className="h-full rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="size-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">"{t.text}"</p>
                    <div className="mt-4 border-t border-white/5 pt-3">
                      <p className="font-serif text-sm font-semibold text-white">{t.author}</p>
                      <p className="text-xs text-[#A1A1A1]">{t.event}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Reveal y={20}>
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                Vuoi parlare con Salvo Piemonte?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A1A1]">
                Compila il form di contatto per ricevere un preventivo personalizzato, oppure contatta
                Salvo Piemonte direttamente su WhatsApp. Risposta garantita entro 24 ore.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/393442322176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                >
                  <MessageCircle className="size-4" /> WhatsApp diretto
                </a>
                <a
                  href="tel:+393442322176"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <Phone className="size-4" /> +39 344 232 2176
                </a>
                <a
                  href="mailto:goldeventssicilyexperience@outlook.com"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:border-[#D4AF37]/50 hover:text-white"
                >
                  <Mail className="size-4" /> Email
                </a>
                <Link
                  href="/gold-events#contatti"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:border-[#D4AF37]/50 hover:text-white"
                >
                  Form completo <ArrowRight className="size-4" />
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
