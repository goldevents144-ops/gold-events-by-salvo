"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Calendar } from "lucide-react";

function scrollTo(href: string) {
  if (typeof document === "undefined") return;
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Hero specific to /gold-events — local events & ceremonies brand identity.
 * Different from the cinematic bivio hero (which lives on /).
 */
export function GoldEventsHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#0F0F0F]"
      aria-labelledby="ge-hero-title"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          { }
          <img
            src="/images/collage/matrimoni-couple-toast.jpg"
            alt=""
            aria-hidden
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover opacity-50"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,15,15,0.65) 0%, rgba(15,15,15,0.85) 60%, #0F0F0F 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.18), transparent 60%)",
            }}
          />
        </motion.div>
      </div>

      <div className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-4 pb-12 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center gap-2"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Sparkles className="size-3.5" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37] sm:text-[11px]">
            Eventi · Cerimonie · Feste Private · Sicilia
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          id="ge-hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Il Tuo Evento Unico,{" "}
          <span className="text-gold-gradient">Dall'Animazione Alla Tecnologia.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A1A1A1] sm:text-base"
        >
          Showman, presentatore e servizi esclusivi per matrimoni, feste private ed
          eventi aziendali ovunque venga richiesto. Conduzione di Salvo Piemonte,
          tecnologie esclusive: Air Mirror, Video Booth 360, Dj Set.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center"
        >
          <button
            type="button"
            onClick={() => scrollTo("#contatti")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] shadow-[0_10px_30px_-8px_rgba(212,175,55,0.6)] transition-all hover:bg-[#E5C75A] sm:px-6"
          >
            <Calendar className="size-3.5" strokeWidth={2.5} />
            Richiedi la disponibilità
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#servizi")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0F0F0F] sm:px-6"
          >
            Scopri i servizi
            <ArrowRight className="size-3.5" strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9 }}
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/8 pt-4 text-[10px] uppercase tracking-[0.2em] text-[#A1A1A1] sm:text-xs"
        >
          <span><span className="font-bold text-[#D4AF37]">9</span> Servizi</span>
          <span><span className="font-bold text-[#D4AF37]">3</span> Bundle</span>
          <span><span className="font-bold text-[#D4AF37]">6</span> Tecnologie extra</span>
          <span><span className="font-bold text-[#D4AF37]">∞</span> possibilità</span>
        </motion.div>
      </div>
    </section>
  );
}
