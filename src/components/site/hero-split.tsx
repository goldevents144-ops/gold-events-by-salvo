"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDict } from "@/lib/i18n/use-lang";

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

export function HeroSplit() {
  const t = useDict();

  const brandCards: BrandCardData[] = [
    {
      variant: "local",
      icon: <Sparkles className="size-6" strokeWidth={1.5} />,
      title: t.hero.cardLocalTitle,
      subtitle: t.hero.cardLocalSubtitle,
      tag: t.hero.cardLocalTag,
      href: "#servizi",
      cta: t.hero.cardLocalCta,
    },
    {
      variant: "international",
      icon: <MapPin className="size-6" strokeWidth={1.5} />,
      title: t.hero.cardIntlTitle,
      subtitle: t.hero.cardIntlSubtitle,
      tag: t.hero.cardIntlTag,
      badge: t.hero.cardIntlBadge,
      href: "#sicily-experience",
      cta: t.hero.cardIntlCta,
    },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#0F0F0F]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {/* Generated Etna-at-dusk hero image as base */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-etna-dusk.png"
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-55"
          />
          {/* Dark overlay for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.75) 50%, #0F0F0F 100%)",
            }}
          />
          {/* Gold radial accent */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.18), transparent 60%)",
            }}
          />
        </motion.div>
        {/* Geometric dotted grid */}
        <div className="hero-grid absolute inset-0 opacity-40" />
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
            {t.hero.locationBadge}
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
          {t.hero.titleLine1}
          <span className="block text-gold-gradient">
            {t.hero.titleLine2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-[#A1A1A1] sm:text-lg"
        >
          {t.hero.subtitle}
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
              {t.hero.primaryCta}
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
              {t.hero.secondaryCta}
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
              {t.hero.brandSplitLabel}
            </span>
            <span className="h-px w-10 bg-[#D4AF37]/40" />
          </motion.div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
            {/* Left: Gold Events by Salvo */}
            <motion.div
              key={brandCards[0].title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BrandCard card={brandCards[0]} />
            </motion.div>

            {/* Center: collage (real photo) */}
            <motion.figure
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto hidden w-full max-w-xs overflow-hidden rounded-2xl border border-[#D4AF37]/30 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)] md:block"
            >
              <div className="aspect-[3/2] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/collage-original.jpg"
                  alt="Gold Events by Salvo — momenti di lusso in Sicilia"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Dark vignette overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]/30"
              />
              {/* Gold frame hairline */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-xl border border-[#D4AF37]/30"
              />
              {/* Caption */}
              <figcaption className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D4AF37]/40 bg-[#0F0F0F]/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                Salvo Piemonte · Sicilia
              </figcaption>
            </motion.figure>

            {/* Right: Gold Events Sicily Experience */}
            <motion.div
              key={brandCards[1].title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BrandCard card={brandCards[1]} />
            </motion.div>
          </div>

          {/* Mobile: collage shown below the two cards (stacked) */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-4 overflow-hidden rounded-2xl border border-[#D4AF37]/30 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)] md:hidden"
          >
            <div className="aspect-[3/2] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/collage-original.jpg"
                alt="Gold Events by Salvo — momenti di lusso in Sicilia"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]/30"
            />
            <figcaption className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D4AF37]/40 bg-[#0F0F0F]/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              Salvo Piemonte · Sicilia
            </figcaption>
          </motion.figure>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        type="button"
        onClick={() => scrollTo("#chi-sono")}
        aria-label={t.hero.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[#D4AF37]/70 transition-colors hover:text-[#D4AF37] sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t.hero.scrollHint}</span>
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
