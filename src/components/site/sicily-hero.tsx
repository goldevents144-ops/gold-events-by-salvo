"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Plane } from "lucide-react";

function scrollTo(href: string) {
  if (typeof document === "undefined") return;
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Hero specific to /sicily-experience — international destination brand identity.
 * Different from the cinematic bivio hero (which lives on /).
 */
export function SicilyHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#0F0F0F]"
      aria-labelledby="se-hero-title"
    >
      {/* Background image — contained, no overflow */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/collage/sicily-aerial-etna-taormina.jpg"
            alt=""
            aria-hidden
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover opacity-45"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,15,15,0.70) 0%, rgba(15,15,15,0.88) 60%, #0F0F0F 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.20), transparent 60%)",
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
            <Plane className="size-3.5" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37] sm:text-[11px]">
            Destination Sicily · IT / EN
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          id="se-hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Destination Sicily:{" "}
          <span className="text-gold-gradient">Non Solo Feste, Ma Esperienze Indimenticabili.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A1A1A1] sm:text-base"
        >
          Stai pianificando il tuo matrimonio o un evento aziendale in Sicilia? Gold Events by Salvo
          unisce la magia del territorio all'intrattenimento di lusso. Esperienze
          nei luoghi più iconici della Sicilia Orientale, in collaborazione con i
          migliori partner locali.
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
            <MapPin className="size-3.5" strokeWidth={2.5} />
            Pianifica la tua esperienza
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#sicily-experience")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0F0F0F] sm:px-6"
          >
            Esplora le esperienze
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
          <span><span className="font-bold text-[#D4AF37]">4</span> Esperienze</span>
          <span><span className="font-bold text-[#D4AF37]">9</span> Categorie</span>
          <span><span className="font-bold text-[#D4AF37]">2</span> Lingue</span>
          <span><span className="font-bold text-[#D4AF37]">∞</span> Possibilità</span>
        </motion.div>
      </div>
    </section>
  );
}
