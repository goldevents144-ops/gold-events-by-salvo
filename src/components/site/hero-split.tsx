"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function scrollTo(href: string) {
  if (typeof document === "undefined") return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface BrandCardData {
  variant: "local" | "international";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tag: string;
  badge?: string;
  href: string;
  cta: string;
}

const brandCards: BrandCardData[] = [
  {
    variant: "local",
    icon: <Sparkles className="size-6" strokeWidth={1.5} />,
    title: "Gold Events by Salvo",
    subtitle: "Cerimonie, feste private, matrimoni locali.",
    tag: "IT · Nazionale",
    href: "#servizi",
    cta: "Scopri i servizi",
  },
  {
    variant: "international",
    icon: <MapPin className="size-6" strokeWidth={1.5} />,
    title: "Gold Events Sicily Experience",
    subtitle:
      "Destination Weddings, tour sull'Etna, degustazioni di vini, aperitivi al tramonto.",
    tag: "IT / EN",
    badge: "Bilingue",
    href: "#sicily-experience",
    cta: "Esplora le esperienze",
  },
];

export function HeroSplit() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#0F0F0F]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Layered radial gradients — Etna sunset vibe */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(212,175,55,0.22), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(212,175,55,0.10), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,15,15,0) 0%, rgba(15,15,15,0.65) 55%, #0F0F0F 100%)",
            }}
          />
        </motion.div>
        {/* Geometric dotted grid */}
        <div className="hero-grid absolute inset-0 opacity-60" />
        {/* Volcano silhouette (CSS only) */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 h-[40vh] w-full opacity-30 sm:h-[55vh]"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="etna" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1C1C1C" />
              <stop offset="100%" stopColor="#0F0F0F" />
            </linearGradient>
            <linearGradient id="etnaGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Far range */}
          <path
            fill="url(#etna)"
            d="M0,260 L120,200 L260,225 L420,150 L560,180 L720,90 L880,170 L1040,140 L1180,200 L1320,175 L1440,210 L1440,320 L0,320 Z"
          />
          {/* Glow above peak */}
          <path
            fill="url(#etnaGold)"
            d="M600,120 C640,80 760,60 820,110 C760,90 660,90 600,120 Z"
            opacity="0.7"
          />
          {/* Foreground ridge */}
          <path
            fill="#0F0F0F"
            d="M0,290 L160,250 L320,275 L500,240 L680,265 L840,235 L1020,270 L1200,250 L1320,275 L1440,260 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4AF37] sm:text-[11px]">
            <MapPin className="size-3" />
            Adrano (Catania) · Sicilia Orientale
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mx-auto mt-6 max-w-5xl text-balance text-center font-serif text-[2.6rem] leading-[1.04] font-semibold text-white sm:text-6xl lg:text-7xl"
        >
          Il Tuo Evento Unico,
          <span className="block text-gold-gradient">
            Dall'Animazione Alla Tecnologia
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-[#A1A1A1] sm:text-lg"
        >
          Showman, Presentatore e Servizi Esclusivi per Matrimoni e Feste
          Private a Catania e Provincia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            className="h-12 w-full rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] shadow-[0_14px_40px_-10px_rgba(212,175,55,0.65)] transition-all hover:bg-[#E5C75A] hover:shadow-[0_18px_50px_-10px_rgba(212,175,55,0.8)] sm:w-auto"
          >
            <a
              href="#contatti"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contatti");
              }}
            >
              Richiedi la disponibilità per la tua data
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-full border border-[#D4AF37]/60 bg-transparent px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0F0F0F] sm:w-auto"
          >
            <a
              href="#servizi"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#servizi");
              }}
            >
              Scopri i servizi
            </a>
          </Button>
        </motion.div>

        {/* Brand split */}
        <div className="mx-auto mt-16 w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-[#D4AF37]/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]/90">
              Salvo: unico regista organizzativo
            </span>
            <span className="h-px w-10 bg-[#D4AF37]/40" />
          </motion.div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {brandCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.55 + idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <BrandCard card={card} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        type="button"
        onClick={() => scrollTo("#chi-sono")}
        aria-label="Scorri alla sezione successiva"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[#D4AF37]/70 transition-colors hover:text-[#D4AF37] sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scopri</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}

function BrandCard({ card }: { card: BrandCardData }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 sm:p-7",
        card.variant === "international"
          ? "border-[#D4AF37]/30 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F]"
          : "border-white/10 bg-[#1C1C1C]/80 hover:border-[#D4AF37]/40",
      )}
    >
      {/* Decorative corner */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 size-32 rounded-full bg-[#D4AF37]/10 blur-2xl transition-opacity group-hover:bg-[#D4AF37]/20"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-12 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
          {card.icon}
        </span>
        <span className="flex flex-col items-end gap-1.5">
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
            {card.tag}
          </span>
          {card.badge && (
            <span className="rounded-full bg-[#D4AF37] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0F0F0F]">
              {card.badge}
            </span>
          )}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-serif text-xl font-semibold leading-tight text-white sm:text-2xl">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#A1A1A1] sm:text-base">
          {card.subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={() => scrollTo(card.href)}
        className="group/cta mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:text-[#E5C75A]"
      >
        {card.cta}
        <ArrowRight
          className="size-3.5 transition-transform group-hover/cta:translate-x-1"
          strokeWidth={2}
        />
      </button>
    </article>
  );
}
