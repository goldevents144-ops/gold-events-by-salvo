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

      {/* Logo materializzazione */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        {/* Gold "GE" monogram in a circle */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotateZ: -8 }}
          animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative flex size-32 items-center justify-center rounded-full border-2 border-[#D4AF37]/60 sm:size-40">
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
              className="font-serif text-5xl font-bold text-[#D4AF37] sm:text-6xl"
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
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
            GOLD EVENTS
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="mt-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D4AF37] sm:text-xs"
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
        className="relative z-10 px-6 pt-12 text-center sm:pt-16"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF37] sm:text-xs">
          Adrano · Catania · Sicilia Orientale
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-4xl font-serif text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
        >
          Due Mondi. <span className="text-[#D4AF37]">Un Solo Regista.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#A1A1A1] sm:text-base"
        >
          Salvo Piemonte presenta due universi paralleli: l'eleganza degli eventi
          siciliani e la magia delle esperienze di lusso nel territorio. Scegli il
          tuo mondo.
        </motion.p>
      </motion.div>

      {/* Two worlds */}
      <div className="relative z-10 mx-auto mt-12 grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 px-4 py-6 sm:mt-16 sm:gap-6 md:grid-cols-2 md:px-6">
        <WorldCard
          variant="local"
          image="/images/collage/matrimoni-couple-toast.jpg"
          icon={<Sparkles className="size-7" strokeWidth={1.5} />}
          eyebrow="Eventi & Cerimonie · IT"
          title="Gold Events"
          subtitle="by Salvo"
          description="Matrimoni, battesimi, compleanni, feste aziendali. Showman, conduzione, animazione e tecnologie esclusive: Air Mirror, Video Booth 360, Dj Set. Catania e provincia."
          languages="Italiano"
          href="/gold-events"
          cta="Entra nel mondo eventi"
          delay={1.1}
        />
        <WorldCard
          variant="international"
          image="/images/collage/sicily-aerial-etna-taormina.jpg"
          icon={<MapPin className="size-7" strokeWidth={1.5} />}
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
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[28rem] overflow-hidden rounded-3xl border border-[#D4AF37]/30 sm:h-[32rem]"
    >
      <Link href={href} className="block size-full overflow-hidden rounded-3xl">
        {/* Cover image — contained within rounded card */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={`${title} ${subtitle}`}
            className="size-full object-cover opacity-60 transition-all duration-[1.2s] group-hover:scale-110 group-hover:opacity-80"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-[#0F0F0F]/30"
          />
        </div>

        {/* Variant badge */}
        <div className="absolute right-4 top-4 z-10">
          <span className="rounded-full border border-[#D4AF37]/40 bg-[#0F0F0F]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] backdrop-blur-sm">
            {variant === "international" ? "IT / EN" : "IT"}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-10">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.6 }}
            className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl border border-[#D4AF37]/50 bg-[#0F0F0F]/60 text-[#D4AF37] backdrop-blur-sm"
          >
            {icon}
          </motion.div>

          {/* Eyebrow */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
            {eyebrow}
          </p>

          {/* Title */}
          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="font-serif text-2xl font-light italic text-[#D4AF37] sm:text-3xl">
            {subtitle}
          </p>

          {/* Description */}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            {description}
          </p>

          {/* CTA */}
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            {cta}
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-2"
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Gold hairline that animates on hover */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-[#D4AF37] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </Link>
    </motion.div>
  );
}
