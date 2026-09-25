"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clapperboard, Users, Mic2 } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

const philosophyParagraphs = [
  "Ogni evento ha un suo ritmo, un'emozione unica e un pubblico diverso. Che si tratti del tuo matrimonio, di un diciottesimo spettacolare, di una laurea o di una festa privata, il mio obiettivo è uno solo: prendermi cura del divertimento dei tuoi ospiti e coordinare la serata dall'inizio alla fine.",
  "Non sono un semplice fornitore. Sono il conduttore della tua festa. Gestisco i tempi della serata, l'intrattenimento al microfono, l'interazione con la sala e la regia dei momenti clou (dall'ingresso al taglio della torta), lavorando in perfetta armonia con il catering e i fotografi. Tu devi solo pensare a divertirti.",
];

const pillars = [
  {
    icon: Clapperboard,
    title: "Regia totale",
    description: "Dall'ingresso al taglio della torta, ogni momento è orchestrato.",
  },
  {
    icon: Users,
    title: "Coordinamento catering & fotografi",
    description:
      "Interfaccia diretta con staff del locale e fornitori per eliminare i tempi morti.",
  },
  {
    icon: Mic2,
    title: "Intrattenimento elegante",
    description:
      "Voce calda, misura, carisma. Mai invadente, sempre presente quando serve.",
  },
];

export function Philosophy() {
  return (
    <section
      id="chi-sono"
      aria-labelledby="philosophy-title"
      className="relative scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CHI SONO & FILOSOFIA"
          title={
            <>
              La Conduzione Perfetta
              <span className="block text-gold-gradient">
                Per Il Tuo Giorno Più Bello
              </span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait placeholder */}
          <Reveal y={28} className="flex justify-center lg:justify-start">
            <figure className="relative flex w-full max-w-sm flex-col items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1C1C1C] via-[#0F0F0F] to-[#1C1C1C]">
                {/* Initials avatar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-[8rem] font-bold text-gold-gradient sm:text-[10rem]"
                  >
                    S
                  </motion.span>
                </div>
                {/* Decorative gold frame */}
                <div className="absolute inset-3 rounded-xl border border-[#D4AF37]/20" />
                <div
                  aria-hidden
                  className="absolute -top-8 -left-8 size-24 rounded-full bg-[#D4AF37]/10 blur-2xl"
                />
                <div
                  aria-hidden
                  className="absolute -right-8 -bottom-8 size-24 rounded-full bg-[#D4AF37]/10 blur-2xl"
                />
              </div>
              <figcaption className="mt-5 text-center">
                <p className="font-serif text-lg font-semibold text-white">
                  Salvo
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">
                  Showman · Presentatore · Regista di sala
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* Text + pillars */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              {philosophyParagraphs.map((p, i) => (
                <Reveal key={i} y={20} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                    <span className="mr-2 font-serif text-2xl text-[#D4AF37]">
                      &ldquo;
                    </span>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {pillars.map((pillar, idx) => (
                <Reveal key={pillar.title} y={20} delay={idx * 0.08}>
                  <article className="group flex h-full flex-col gap-3 rounded-xl border border-white/8 bg-[#1C1C1C]/60 p-5 transition-colors hover:border-[#D4AF37]/40">
                    <span className="inline-flex size-10 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] transition-transform group-hover:scale-105">
                      <pillar.icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <h3 className="font-serif text-base font-semibold leading-snug text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#A1A1A1]">
                      {pillar.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
