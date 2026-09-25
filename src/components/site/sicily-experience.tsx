"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, StaggerGroup, itemVariants } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { cn } from "@/lib/utils";
import {
  sicilyExperiences,
  sicilyExperienceCopy,
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
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/8 bg-[#1C1C1C]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_18px_50px_-20px_rgba(212,175,55,0.4)] sm:p-6"
    >
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
