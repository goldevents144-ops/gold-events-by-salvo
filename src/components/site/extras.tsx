"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Camera, BadgePercent, ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { StaggerGroup, itemVariants } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { extras } from "@/lib/site-content";
import { useDict } from "@/lib/i18n/use-lang";

export function Extras() {
  const t = useDict();
  return (
    <section
      id="extra"
      aria-labelledby="extras-title"
      className="relative scroll-mt-24 border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow.extras} title={t.extrasTitle} />

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 flex max-w-3xl items-center gap-4 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-4 sm:p-5"
        >
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#D4AF37]">
            <Camera className="size-6" strokeWidth={1.5} />
          </span>
          <p className="text-sm leading-relaxed text-white sm:text-base">
            <span className="font-semibold text-[#D4AF37]">
              {t.extrasHighlightPrefix}
            </span>{" "}
            {t.extrasHighlightSuffix}{" "}
            <span className="font-semibold text-white">
              {t.extrasHighlightEmphasis}
            </span>.
          </p>
        </motion.div>

        <StaggerGroup
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
          stagger={0.06}
        >
          {extras.map((extra) => (
            <ExtraCard
              key={extra.id}
              extra={extra}
              badgeLabel={t.extrasBadgeLabel}
              specsLabel={t.extrasSpecsLabel}
            />
          ))}
        </StaggerGroup>

        <p className="mt-8 text-center text-xs text-[#A1A1A1]">
          {t.extrasFooterNote}
        </p>
      </div>
    </section>
  );
}

function ExtraCard({
  extra,
  badgeLabel,
  specsLabel,
}: {
  extra: (typeof extras)[number];
  badgeLabel: string;
  specsLabel: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/8 bg-[#1C1C1C]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_18px_50px_-20px_rgba(212,175,55,0.4)] sm:p-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-24 rounded-full bg-[#D4AF37]/5 blur-2xl transition-opacity duration-300 group-hover:bg-[#D4AF37]/15"
      />

      {/* Optional preview image */}
      {extra.image && (
        <div className="relative -mx-5 -mt-5 mb-1 h-32 overflow-hidden sm:-mx-6 sm:-mt-6 sm:h-36">
          { }
          <img
            src={extra.image}
            alt={extra.name}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/40 to-transparent" />
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-105">
          <Icon name={extra.icon} className="size-5" />
        </span>
        <span
          title={badgeLabel}
          className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]"
        >
          <BadgePercent className="size-3" />
          {badgeLabel}
        </span>
      </div>

      <h3 className="font-serif text-base font-semibold leading-snug text-white sm:text-lg">
        {extra.name}
      </h3>
      <p className="flex-1 text-[13px] leading-relaxed text-[#A1A1A1] sm:text-sm">
        {extra.description}
      </p>

      <div className="mt-1 flex items-baseline gap-2">
        {extra.showPrice === false ? (
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-base font-semibold text-gold-gradient sm:text-lg">
              Prezzo su richiesta
            </span>
            <span className="text-[10px] text-[#6B6B6B]">
              Preventivo personalizzato in base ai servizi
            </span>
          </div>
        ) : (
          <>
            <span className="font-serif text-2xl font-bold text-[#D4AF37] sm:text-3xl">
              {extra.priceLabel}
            </span>
            {extra.strikeThrough && (
              <span className="text-xs text-[#A1A1A1] line-through decoration-[#D4AF37]/50">
                {extra.strikeThrough}
              </span>
            )}
          </>
        )}
      </div>

      {/* Expandable specs */}
      {extra.specs && extra.specs.length > 0 && (
        <div className="mt-2 border-t border-white/8 pt-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]/80 transition-colors hover:text-[#D4AF37]"
          >
            {specsLabel}
            <ChevronDown
              className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              strokeWidth={2}
            />
          </button>
          {open && (
            <dl className="mt-3 flex flex-col gap-2">
              {extra.specs.map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    {s.label}
                  </dt>
                  <dd className="text-xs leading-snug text-white/85 sm:text-[13px]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </motion.article>
  );
}
