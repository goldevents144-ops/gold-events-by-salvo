"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Repeat } from "lucide-react";

/**
 * Sticky banner at the top of subpages — shows current world + link to switch.
 * Lets the user jump from /gold-events to /sicily-experience and vice versa
 * without going back to the bivio landing page.
 */
export function BivioBack({
  currentLabel,
  otherHref,
  otherLabel,
}: {
  currentLabel: string;
  otherHref: string;
  otherLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-16 z-30 border-b border-[#D4AF37]/15 bg-[#0F0F0F]/95 backdrop-blur-xl sm:top-20"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          prefetch={true}
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A1A1A1] transition-colors hover:text-[#D4AF37] sm:text-xs"
        >
          <ArrowLeft className="size-3.5" />
          <span className="hidden sm:inline">Torna al bivio</span>
          <span className="sm:hidden">Bivio</span>
        </Link>

        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] sm:text-xs">
          <Repeat className="size-3.5" />
          <span className="hidden sm:inline">Stai visitando:</span>
          <span className="truncate">{currentLabel}</span>
        </div>

        <Link
          href={otherHref}
          prefetch={true}
          className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-[#D4AF37] sm:text-xs"
        >
          <span className="hidden truncate sm:inline">{otherLabel}</span>
          <span className="sm:hidden">Altro</span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
