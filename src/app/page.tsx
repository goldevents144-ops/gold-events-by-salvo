"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

/**
 * Cinematic landing page — Hollywood-style intro + bivio.
 *
 * Flow:
 *  1. Intro animazione cinematografica (logo oro che si materializza, drappeggio scuro)
 *  2. Fade-in del bivio: due "mondi" affiancati
 *     - LEFT: Gold Events by Salvo (eventi locali, IT)
 *     - RIGHT: Gold Events Sicily Experience (turismo internazionale, IT/EN)
 *  3. User clicks one → navigate alla rispettiva sottopagina
 *
 * Le animazioni sono sequenziali: intro 0-3.5s, poi bivio 3.5s+.
 * Skip button in basso-destra per chi non vuole aspettare.
 */

export default function HomePage() {
  const [introComplete, setIntroComplete] = React.useState(false);
  const [skipIntro, setSkipIntro] = React.useState(false);

  // Auto-complete intro after 3.5s
  React.useEffect(() => {
    if (skipIntro) {
      setIntroComplete(true);
      return;
    }
    const t = setTimeout(() => setIntroComplete(true), 3800);
    return () => clearTimeout(t);
  }, [skipIntro]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F0F0F] text-white">
      {/* === CINEMATIC INTRO OVERLAY === */}
      <AnimatePresence>
        {!introComplete && <CinematicIntro onComplete={() => setIntroComplete(true)} />}
      </AnimatePresence>

      {/* === BIVIO (visibile dopo l'intro) === */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-screen"
          >
            <Bivio />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button during intro */}
      {!introComplete && (
        <button
          type="button"
          onClick={() => setSkipIntro(true)}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#0F0F0F]/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A1A1A1] backdrop-blur-sm transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        >
          Salta intro
          <ChevronDown className="size-3" />
        </button>
      )}
    </div>
  );
}

// =====================================
// Cinematic intro — Hollywood style
// =====================================
function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#0F0F0F]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
    >
      {/* Animated gold particle field background */}
      <ParticleField />

      {/* Cinematic letterbox bars (top + bottom black bars that shrink like film) */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/3 bg-black"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        transition={{ delay: 3.0, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-black"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        transition={{ delay: 3.0, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Gold dust shimmer sweeping across */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ delay: 0.5, duration: 2.2, ease: "easeInOut" }}
      />

      {/* Logo materializzazione — sized-down for cinematic proportion */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 sm:gap-5">
        {/* Gold "GE" monogram in a circle */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotateZ: -8 }}
          animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-[#D4AF37]/60 sm:size-24">
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#D4AF37]/30 blur-2xl"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Inner rotating gold ring */}
            <motion.div
              className="absolute inset-2 rounded-full border border-dashed border-[#D4AF37]/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-serif text-3xl font-bold text-[#D4AF37] sm:text-4xl"
            >
              GE
            </motion.span>
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
            GOLD EVENTS
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.5em] text-[#D4AF37] sm:text-[10px]"
          >
            by Salvo · Sicilia
          </motion.p>
        </motion.div>

        {/* Loading line that fills up */}
        <motion.div
          className="relative mt-6 h-px w-40 bg-white/10 sm:w-56"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#D4AF37]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 2.4, duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Final tagline that fades in */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className="text-center text-xs uppercase tracking-[0.32em] text-[#A1A1A1] sm:text-sm"
        >
          Il Tuo Evento, Il Tuo Viaggio
        </motion.p>
      </div>
    </motion.div>
  );
}

// =====================================
// Animated particle field (gold dust)
// =====================================
function ParticleField() {
  // Pre-computed particle positions (deterministic for SSR-safety)
  const particles = React.useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -20, -40],
            x: [0, p.id % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// =====================================
// Bivio — choice between two worlds
// =====================================
function Bivio() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-[#0F0F0F] to-[#1C1C1C]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#D4AF37]/15 to-transparent"
      />

      {/* Eyebrow + tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 px-6 pt-10 text-center sm:pt-12"
      >
        <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#D4AF37] sm:text-[11px]">
          Sede ad Adrano · Disponibile ovunque · Sicilia e oltre
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-3 max-w-3xl font-serif text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl"
        >
          Due Mondi. <span className="text-[#D4AF37]">Una Solo Voce.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#A1A1A1] sm:text-sm"
        >
          Salvo Piemonte presenta due universi paralleli: l'eleganza degli eventi
          e la magia delle esperienze di lusso in Sicilia e ovunque venga richiesto.
          Scegli il tuo mondo.
        </motion.p>

        {/* Elenco eventi che Salvo realizza */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mx-auto mt-6 max-w-3xl"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]/90 sm:text-[11px]">
            Eventi che seguiamo
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {[
              "Battesimi",
              "Comunioni",
              "Cresime",
              "Lauree",
              "Compleanni",
              "Matrimoni",
              "Feste Private",
              "Feste a Tema",
              "Feste Aziendali",
              "Dj Set",
              "Serate Organizzate",
            ].map((event, i) => (
              <span
                key={event}
                className="inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#0F0F0F]/60 px-2.5 py-1 text-[10px] font-medium text-white/90 transition-colors hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 sm:px-3 sm:text-[11px]"
              >
                {event}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Two worlds */}
      <div className="relative z-10 mx-auto mt-8 grid w-full max-w-6xl flex-1 grid-cols-1 gap-3 px-4 py-4 sm:mt-10 sm:gap-4 md:grid-cols-2 md:px-6">
        <WorldCard
          variant="local"
          image="/images/collage/matrimoni-couple-toast.jpg"
          icon={<Sparkles className="size-5" strokeWidth={1.5} />}
          eyebrow="Eventi & Cerimonie · IT"
          title="Gold Events"
          subtitle="by Salvo"
          description="Matrimoni, battesimi, compleanni, feste aziendali. Showman, conduzione, animazione e tecnologie esclusive: Air Mirror, Video Booth 360, Dj Set. Disponibile ovunque venga richiesto."
          languages="Italiano"
          href="/gold-events"
          cta="Entra nel mondo eventi"
          delay={1.1}
        />
        <WorldCard
          variant="international"
          image="/images/collage/sicily-aerial-etna-taormina.jpg"
          icon={<MapPin className="size-5" strokeWidth={1.5} />}
          eyebrow="Destination & Experiences · IT / EN"
          title="Gold Events Sicily"
          subtitle="Experience"
          description="Destination weddings, tour sull'Etna, degustazioni in cantina, agriturismo, beach party a Taormina. Salvo curatore di esperienze indimenticabili in Sicilia Orientale."
          languages="Italiano · English"
          href="/sicily-experience"
          cta="Entra nel mondo esperienze"
          delay={1.3}
        />
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="relative z-10 px-6 py-8 text-center"
      >
        <p className="text-[10px] uppercase tracking-[0.32em] text-[#6B6B6B]">
          Salvo Piemonte · +39 344 232 2176 · goldeventssicilyexperience@outlook.com
        </p>
      </motion.div>
    </div>
  );
}

// =====================================
// World card — full-screen entry point
// =====================================
function WorldCard({
  variant,
  image,
  icon,
  eyebrow,
  title,
  subtitle,
  description,
  languages,
  href,
  cta,
  delay,
}: {
  variant: "local" | "international";
  image: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  languages: string;
  href: string;
  cta: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#1C1C1C]/80 transition-colors hover:border-[#D4AF37]/60"
    >
      <Link href={href} prefetch={true} className="flex size-full flex-col" aria-label={`${title} ${subtitle}`}>
        {/* === Cover image — 4:3 landscape, contained, no overflow === */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#0F0F0F]">
          { }
          <img
            src={image}
            alt={`${title} ${subtitle}`}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Variant badge overlayed on image */}
          <div className="pointer-events-none absolute right-2.5 top-2.5 z-10">
            <span className="rounded-full border border-[#D4AF37]/40 bg-[#0F0F0F]/85 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-sm sm:text-[10px]">
              {variant === "international" ? "IT / EN" : "IT"}
            </span>
          </div>
          {/* Bottom gradient fade into card body for legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1C1C1C] to-transparent"
          />
        </div>

        {/* === Card body — text content === */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
            className="mb-2.5 inline-flex size-9 items-center justify-center rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] sm:size-10"
          >
            {icon}
          </motion.div>

          {/* Eyebrow */}
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-[10px]">
            {eyebrow}
          </p>

          {/* Title */}
          <h2 className="mt-1.5 font-serif text-lg font-bold leading-tight text-white sm:text-xl">
            {title}
          </h2>
          <p className="font-serif text-base font-light italic text-[#D4AF37] sm:text-lg">
            {subtitle}
          </p>

          {/* Description */}
          <p className="mt-2 flex-1 text-xs leading-relaxed text-[#A1A1A1] sm:text-sm">
            {description}
          </p>

          {/* CTA */}
          <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37] sm:text-[11px]">
            {cta}
            <ArrowRight
              className="size-3 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </div>
        </div>
      </Link>

      {/* Gold hairline that animates on hover (outside Link, doesn't block clicks) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#D4AF37] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  );
}
