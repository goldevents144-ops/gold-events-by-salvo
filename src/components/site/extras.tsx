"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Camera, BadgePercent } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { StaggerGroup, itemVariants } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { extras } from "@/lib/site-content";

export function Extras() {
  return (
    <section
      id="extra"
      aria-labelledby="extras-title"
      className="relative scroll-mt-24 border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SERVIZI EXTRA & TECNOLOGIE"
          title="Potenzia Il Tuo Evento Con Le Tecnologie Esclusive"
        />

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
              Le stampe fotografiche dell'Air Mirror
            </span>{" "}
            sono <span className="font-semibold text-white">TOTALMENTE ILLIMITATE</span>.
          </p>
        </motion.div>

        <StaggerGroup
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
          stagger={0.06}
        >
          {extras.map((extra) => (
            <ExtraCard key={extra.id} extra={extra} />
          ))}
        </StaggerGroup>

        <p className="mt-8 text-center text-xs text-[#A1A1A1]">
          I prezzi extra si intendono <span className="text-[#D4AF37]">in abbinamento</span> a una conduzione base. Fuori abbinamento: tariffe separate.
        </p>
      </div>
    </section>
  );
}

function ExtraCard({
  extra,
}: {
  extra: (typeof extras)[number];
}) {
  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/8 bg-[#1C1C1C]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_18px_50px_-20px_rgba(212,175,55,0.4)] sm:p-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-24 rounded-full bg-[#D4AF37]/5 blur-2xl transition-opacity duration-300 group-hover:bg-[#D4AF37]/15"
      />

      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-105">
          <Icon name={extra.icon} className="size-5" />
        </span>
        <span
          title="Prezzo in abbinamento"
          className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]"
        >
          <BadgePercent className="size-3" />
          in abbinamento
        </span>
      </div>

      <h3 className="font-serif text-base font-semibold leading-snug text-white sm:text-lg">
        {extra.name}
      </h3>
      <p className="flex-1 text-[13px] leading-relaxed text-[#A1A1A1] sm:text-sm">
        {extra.description}
      </p>

      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-serif text-2xl font-bold text-[#D4AF37] sm:text-3xl">
          {extra.priceLabel}
        </span>
        {extra.strikeThrough && (
          <span className="text-xs text-[#A1A1A1] line-through decoration-[#D4AF37]/50">
            {extra.strikeThrough}
          </span>
        )}
      </div>
    </motion.article>
  );
}
