"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Handshake } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, StaggerGroup, itemVariants } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { cn } from "@/lib/utils";
import {
  sicilyExperiences,
  sicilyExperienceCopy,
  sicilyExperienceCategories,
  type SicilyExperience,
} from "@/lib/site-content";

type Lang = "it" | "en";

export function SicilyExperience() {
  const [lang, setLang] = React.useState<Lang>("it");
  const [selected, setSelected] = React.useState<number | null>(null);
  const copy = sicilyExperienceCopy[lang];

  return (
    <section
      id="sicily-experience"
      aria-labelledby="sicily-experience-title"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/5 bg-gradient-to-b from-[#0F0F0F] via-[#101010] to-[#0F0F0F] py-20 sm:py-28"
    >
      {/* Real aerial photo of Sicily as background (from user's collage) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/collage/sicily-aerial-etna-taormina.jpg"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/95 via-[#101010]/85 to-[#0F0F0F]/95" />
      </div>

      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[60%] rounded-full bg-[#D4AF37]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-5">
            <Reveal y={16}>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
                <span className="h-px w-6 bg-[#D4AF37]/60" aria-hidden />
                {copy.eyebrow}
              </span>
            </Reveal>

            {/* Language toggle */}
            <Reveal y={14} delay={0.05}>
              <div
                className="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#1C1C1C]/60 p-1"
                role="group"
                aria-label="Cambia lingua sezione"
              >
                {(["it", "en"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={cn(
                      "relative z-10 min-w-12 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
                      lang === l ? "text-[#0F0F0F]" : "text-[#A1A1A1] hover:text-white",
                    )}
                  >
                    {lang === l && (
                      <motion.span
                        layoutId="lang-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[#D4AF37]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l === "it" ? "IT" : "EN"}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <SectionHeading
          title={copy.title}
          intro={copy.subtitle}
          className="mt-8"
        />

        {/* Chip row of all experience categories (from official brand bio) */}
        <Reveal y={14} delay={0.05} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]/80">
              {lang === "it" ? "Cosa scopriremo insieme:" : "What we'll discover together:"}
            </span>
            {sicilyExperienceCategories.map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-[#D4AF37]/25 bg-[#1C1C1C]/60 px-3 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10"
              >
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <StaggerGroup
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          stagger={0.08}
        >
          {sicilyExperiences.map((exp, idx) => (
            <ExperienceCard
              key={idx}
              exp={exp}
              lang={lang}
              discoverLabel={copy.discover}
              onOpen={() => setSelected(idx)}
            />
          ))}
        </StaggerGroup>

        {/* Partnership clarification — Salvo acts as bridge, not direct provider */}
        <Reveal y={20} delay={0.1} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1C1C1C]/80 to-[#0F0F0F]/80 p-6 sm:p-8">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-[#D4AF37]/10 blur-3xl"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="flex shrink-0 items-start gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Handshake className="size-6" strokeWidth={1.75} />
                </span>
              </div>
              <div className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
                  {copy.partnerNote.label}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-white sm:text-2xl">
                  {copy.partnerNote.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                  {copy.partnerNote.body}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .querySelector("#contatti")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                  >
                    {lang === "it"
                      ? "Richiedi questa esperienza"
                      : "Request this experience"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .querySelector("#partner")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                  >
                    {copy.partnerNote.cta}
                    <ArrowRight className="size-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Inline detail modal */}
      <AnimatePresence>
        {selected !== null && (
          <ExperienceModal
            exp={sicilyExperiences[selected]}
            lang={lang}
            discoverLabel={copy.discover}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ExperienceCard({
  exp,
  lang,
  discoverLabel,
  onOpen,
}: {
  exp: SicilyExperience;
  lang: Lang;
  discoverLabel: string;
  onOpen: () => void;
}) {
  const data = exp[lang];
  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/8 bg-[#1C1C1C]/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_18px_50px_-20px_rgba(212,175,55,0.4)]"
    >
      {/* Experience image */}
      {exp.image && (
        <div className="relative h-32 w-full overflow-hidden sm:h-36">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={exp.image}
            alt={data.title}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/50 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-[#D4AF37]/5 blur-2xl transition-opacity duration-300 group-hover:bg-[#D4AF37]/15"
        />

        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex size-12 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xl text-[#D4AF37] transition-transform duration-300 group-hover:scale-105">
            <span aria-hidden>{exp.emoji}</span>
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-lg border border-white/10 text-[#D4AF37]/70">
            <Icon name={exp.icon} className="size-4" />
          </span>
        </div>

        <h3 className="font-serif text-base font-semibold leading-snug text-white sm:text-lg">
          {data.title}
        </h3>
        <p className="flex-1 text-[13px] leading-relaxed text-[#A1A1A1] sm:text-sm">
          {data.description}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="group/cta mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] transition-colors hover:text-[#E5C75A]"
        >
          {discoverLabel}
          <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-1" strokeWidth={2} />
        </button>
      </div>
    </motion.article>
  );
}

function ExperienceModal({
  exp,
  lang,
  discoverLabel: _discoverLabel,
  onClose,
}: {
  exp: SicilyExperience;
  lang: Lang;
  discoverLabel: string;
  onClose: () => void;
}) {
  const data = exp[lang];
  // Close on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // lock scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={data.title}
        className="gold-scroll relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-[#D4AF37]/30 bg-[#0F0F0F] p-6 sm:rounded-2xl sm:p-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3">
          <span className="inline-flex size-14 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-2xl">
            <span aria-hidden>{exp.emoji}</span>
          </span>
          <span className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-[#D4AF37]">
            <Icon name={exp.icon} className="size-4" />
          </span>
        </div>

        <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
          {data.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
          {data.description}
        </p>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              onClose();
              document
                .querySelector("#contatti")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
          >
            {lang === "it" ? "Richiedi questa esperienza" : "Request this experience"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
