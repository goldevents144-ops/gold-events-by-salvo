import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "Cerca Salvo Piemonte su Google — Gold Eventi Sicilia | Gold Events by Salvo",
  description:
    "Cerca Salvo Piemonte, Gold Eventi, Gold Events by Salvo, eventi Sicilia, wedding planner Catania su Google. Salvo Piemonte è lo showman e organizzatore di eventi di lusso in Sicilia con sede ad Adrano (Catania).",
  keywords: [
    "Salvo Piemonte",
    "Gold Eventi",
    "Gold Events by Salvo",
    "Salvo Piemonte eventi",
    "Gold Eventi Sicilia",
    "eventi Sicilia",
    "wedding planner Catania",
    "showman Sicilia",
    "animazione eventi Catania",
    "organizzatore eventi Sicilia",
    "Salvo Piemonte Catania",
    "Salvo Piemonte Adrano",
    "Gold Eventi Salvo",
    "Salvo Piemonte wedding planner",
    "Gold Events Sicily Experience",
  ],
  alternates: { canonical: BASE_URL + "/cerca-su-google" },
  openGraph: {
    title: "Cerca Salvo Piemonte su Google — Gold Eventi Sicilia",
    description:
      "Pagina dedicata alla ricerca di Salvo Piemonte e Gold Eventi su Google. Tutte le keyword per trovare il sito.",
    url: BASE_URL + "/cerca-su-google",
  },
};

const SEARCH_QUERIES = [
  { q: "Salvo Piemonte", label: "Salvo Piemonte — nome completo" },
  { q: "Gold Eventi", label: "Gold Eventi — brand principale" },
  { q: "Gold Events by Salvo", label: "Gold Events by Salvo — nome completo brand" },
  { q: "Salvo Piemonte eventi", label: "Salvo Piemonte eventi" },
  { q: "Gold Eventi Sicilia", label: "Gold Eventi Sicilia" },
  { q: "Salvo Piemonte Catania", label: "Salvo Piemonte Catania" },
  { q: "Salvo Piemonte Adrano", label: "Salvo Piemonte Adrano" },
  { q: "Gold Eventi Salvo", label: "Gold Eventi Salvo" },
  { q: "Salvo Piemonte wedding planner", label: "Salvo Piemonte wedding planner" },
  { q: "Salvo Piemonte showman", label: "Salvo Piemonte showman" },
  { q: "eventi Sicilia Salvo Piemonte", label: "eventi Sicilia Salvo Piemonte" },
  { q: "Gold Events Sicily Experience", label: "Gold Events Sicily Experience" },
  { q: "wedding planner Catania Salvo", label: "wedding planner Catania Salvo" },
  { q: "animazione eventi Catania Salvo", label: "animazione eventi Catania Salvo" },
  { q: "showman Sicilia Salvo Piemonte", label: "showman Sicilia Salvo Piemonte" },
  { q: "organizzatore eventi Sicilia Salvo", label: "organizzatore eventi Sicilia Salvo" },
];

const KEYWORD_GROUPS = [
  {
    title: "Salvo Piemonte — Ricerche per nome",
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
    ],
  },
  {
    title: "Gold Eventi — Ricerche per brand",
    keywords: [
      "Gold Eventi",
      "Gold Eventi Sicilia",
      "Gold Eventi Catania",
      "Gold Eventi Adrano",
      "Gold Eventi Salvo",
      "Gold Eventi matrimoni",
      "Gold Eventi feste",
      "Gold Events by Salvo",
      "Gold Events Sicily Experience",
      "Gold Eventi eventi aziendali",
    ],
  },
  {
    title: "Eventi in Sicilia — Ricerche geografiche",
    keywords: [
      "eventi Sicilia",
      "eventi Catania",
      "eventi Adrano",
      "eventi Taormina",
      "eventi Etna",
      "matrimonio Catania",
      "matrimonio Taormina",
      "wedding planner Catania",
      "animazione eventi Catania",
      "organizzazione eventi Sicilia",
    ],
  },
  {
    title: "Servizi — Ricerche specifiche",
    keywords: [
      "Air Mirror Catania",
      "Video Booth 360 Sicilia",
      "DJ set matrimonio Sicilia",
      "showman Catania",
      "wedding planner Sicilia",
      "destination wedding Sicilia",
      "matrimonio lusso Catania",
      "feste private Catania",
      "eventi aziendali Sicilia",
      "battesimi Catania animazione",
    ],
  },
];

export default function CercaSuGooglePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Cerca su Google"
          otherHref="/sicily-experience"
          otherLabel="Gold Events Sicily Experience"
        />

        <section className="relative overflow-hidden py-20 sm:py-28">
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="CERCA SU GOOGLE"
              title="Cerca Salvo Piemonte e Gold Eventi su Google"
              intro="Questa pagina raccoglie tutte le keyword con cui cercare Salvo Piemonte e Gold Eventi su Google. Copia una query e incollala su Google Search per trovare il sito ufficiale."
            />
          </div>
        </section>

        {/* Search queries cliccabili */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                Query di ricerca consigliate
              </h2>
              <p className="mt-2 text-sm text-[#A1A1A1]">
                Clicca su una query per cercarla direttamente su Google
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {SEARCH_QUERIES.map((query, idx) => (
                <Reveal key={query.q} y={16} delay={0.03 * (idx % 4)}>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(query.q)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/8 bg-[#1C1C1C]/60 p-4 transition-colors hover:border-[#D4AF37]/40"
                  >
                    <Search className="size-4 shrink-0 text-[#D4AF37]/60" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{query.q}</p>
                      <p className="text-[11px] text-[#A1A1A1]">{query.label}</p>
                    </div>
                    <ArrowRight className="size-3 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Keyword groups */}
        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                KEYWORD SEO
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
                Tutte le keyword di Gold Events by Salvo
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1A1]">
                Queste sono le keyword per cui il sito è ottimizzato. Google le indicizza
                e le suggerisce nell'autocomplete quando gli utenti iniziano a digitare.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {KEYWORD_GROUPS.map((group, idx) => (
                <Reveal key={group.title} y={20} delay={0.05 * idx}>
                  <article className="rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-5">
                    <h3 className="mb-3 font-serif text-base font-semibold text-white">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-2.5 py-1 text-xs text-white/85"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Info box */}
        <section className="border-t border-white/5 bg-[#0F0F0F] py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <Reveal y={20}>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#1C1C1C]/60 p-6 text-center">
                <h2 className="font-serif text-xl font-semibold text-white">
                  Come funziona Google Autocomplete
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#A1A1A1]">
                  Google suggerisce le ricerche in base alla popolarità e all'autorità del sito.
                  Più persone cercano "Salvo Piemonte" o "Gold Eventi", più Google li suggerisce
                  automaticamente quando qualcuno inizia a digitare "Salvo" o "Gold".
                  Condividi questa pagina e il sito ufficiale per aumentare la visibilità.
                </p>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                  >
                    Torna alla home <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
