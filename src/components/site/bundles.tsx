"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { toast } from "sonner";

import { SectionHeading } from "@/components/site/section-heading";
import { StaggerGroup, itemVariants } from "@/components/site/reveal";
import { bundles, type Bundle } from "@/lib/site-content";
import { usePreferredBundle } from "@/lib/use-preferred-bundle";
import { useDict } from "@/lib/i18n/use-lang";
import { useContentOverrides } from "@/lib/use-content-overrides";
import { cn } from "@/lib/utils";

export function Bundles() {
  const t = useDict();
  const { overrides } = useContentOverrides();

  // Apply price overrides to bundles (AI can change prices from admin panel)
  const bundlesWithOverrides = bundles.map((bundle) => {
    const overrideKey = `bundle.${bundle.id}.price`;
    const overrideValue = overrides[overrideKey];
    if (overrideValue) {
      const num = parseInt(overrideValue.replace(/[^\d]/g, ""), 10);
      if (Number.isFinite(num) && num > 0) {
        return { ...bundle, price: num };
      }
    }
    return bundle;
  });

  return (
    <section
      id="bundles"
      aria-labelledby="bundles-title"
      className="relative scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.eyebrow.bundles}
          title={t.bundlesTitle}
          intro={t.bundlesIntro}
        />

        <StaggerGroup
          className="mt-14 grid gap-5 md:grid-cols-3 md:items-stretch"
          stagger={0.1}
        >
          {bundlesWithOverrides.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              badgeLabel={
                bundle.id === "family-joy"
                  ? t.bundleBadgeFamilyJoy
                  : bundle.id === "luxury-wedding"
                    ? t.bundleBadgeLuxury
                    : bundle.badge
              }
              ctaLabel={t.bundlesCta}
              priceFromLabel={t.bundlesPriceFrom}
            />
          ))}
        </StaggerGroup>

        <p className="mt-8 text-center text-xs text-[#A1A1A1]">
          {t.bundlesFooterNote}
        </p>
      </div>
    </section>
  );
}

function BundleCard({
  bundle,
  badgeLabel,
  ctaLabel,
  priceFromLabel,
}: {
  bundle: Bundle;
  badgeLabel?: string;
  ctaLabel: string;
  priceFromLabel: string;
}) {
  const setPreferredBundle = usePreferredBundle((s) => s.setPreferredBundle);

  const handleSelect = () => {
    setPreferredBundle(bundle.id);
    toast.success(`${bundle.name} preselezionato`, {
      description: "Ti aspettiamo nel modulo di contatto.",
    });
    document
      .querySelector("#contatti")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const highlighted = bundle.highlighted;

  return (
    <motion.article
      variants={itemVariants}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300",
        highlighted
          ? "border-2 border-[#D4AF37] bg-gradient-to-b from-[#1C1C1C] to-[#0F0F0F] shadow-[0_24px_60px_-20px_rgba(212,175,55,0.45)] md:-translate-y-3"
          : "border border-white/8 bg-[#1C1C1C]/70 hover:-translate-y-1 hover:border-[#D4AF37]/40",
      )}
    >
      {highlighted && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
        />
      )}

      {/* Badge */}
      {badgeLabel && (
        <span
          className={cn(
            "absolute right-5 top-5 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
            highlighted
              ? "bg-[#D4AF37] text-[#0F0F0F]"
              : "border border-[#D4AF37]/40 text-[#D4AF37]",
          )}
        >
          {highlighted && <Star className="size-3 fill-current" />}
          {badgeLabel}
        </span>
      )}

      <div className="flex-1">
        <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
          {bundle.name}
        </h3>
        <p className="mt-1.5 text-sm text-[#A1A1A1]">{bundle.audience}</p>

        {bundle.duration && (
          <p className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
            <Check className="size-3.5" strokeWidth={2.5} />
            {bundle.duration}
          </p>
        )}

        <p className="mt-5 text-sm leading-relaxed text-white/85">
          {bundle.description}
        </p>

        {/* Itemized inclusions */}
        <ul className="mt-6 flex flex-col gap-2.5">
          {bundle.inclusions.map((inc, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-white/85">
              <Check
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  highlighted ? "text-[#D4AF37]" : "text-[#D4AF37]/80",
                )}
                strokeWidth={2.5}
              />
              <span className="leading-snug">{inc}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-baseline gap-2">
          {bundle.showPrice === false ? (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#A1A1A1]">
                Prezzo
              </span>
              <span className="font-serif text-xl font-semibold text-gold-gradient sm:text-2xl">
                Su richiesta
              </span>
              <span className="text-[10px] text-[#6B6B6B]">
                Preventivo personalizzato in base ai servizi
              </span>
            </div>
          ) : (
            <>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#A1A1A1]">
                {priceFromLabel}
              </span>
              <span className="font-serif text-4xl font-bold text-gold-gradient sm:text-5xl">
                {bundle.price}€
              </span>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSelect}
        className={cn(
          "mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-xs font-semibold uppercase tracking-[0.18em] transition-all",
          highlighted
            ? "bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#E5C75A]"
            : "border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F0F]",
        )}
      >
        {ctaLabel}
        <ArrowRight className="size-3.5" strokeWidth={2} />
      </button>
    </motion.article>
  );
}
