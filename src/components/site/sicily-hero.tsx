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
      {/* Background image — aerial Sicily with Etna + Taormina */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          { }
          <img
            src="/images/collage/sicily-aerial-etna-taormina.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-55"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.85) 60%, #0F0F0F 100%)",
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

      <div className="mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-center px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center gap-2"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Plane className="size-4" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
            Destination Sicily · IT / EN
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          id="se-hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Destination Sicily:{" "}
          <span className="text-gold-gradient">Non Solo Feste, Ma Esperienze Indimenticabili.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-[#A1A1A1] sm:text-lg"
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
          className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <button
            type="button"
            onClick={() => scrollTo("#contatti")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] shadow-[0_14px_40px_-10px_rgba(212,175,55,0.65)] transition-all hover:bg-[#E5C75A] hover:shadow-[0_18px_50px_-10px_rgba(212,175,55,0.8)]"
          >
            <MapPin className="size-3.5" strokeWidth={2.5} />
            Pianifica la tua esperienza
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#sicily-experience")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
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
          className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/8 pt-6 text-xs uppercase tracking-[0.22em] text-[#A1A1A1]"
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
