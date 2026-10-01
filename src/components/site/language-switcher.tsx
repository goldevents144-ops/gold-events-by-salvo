"use client";

import * as React from "react";
import { Check, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { LANG_META, LANGS, type Lang } from "@/lib/i18n/dictionaries";
import { useLang } from "@/lib/i18n/use-lang";

interface LanguageSwitcherProps {
  variant?: "header" | "sheet";
  className?: string;
}

/**
 * Simple language switcher with native dropdown (no Radix UI).
 * Works on Vercel serverless without issues.
 */
export function LanguageSwitcher({
  variant = "header",
  className,
}: LanguageSwitcherProps) {
  const lang = useLang((s) => s.lang);
  const setLang = useLang((s) => s.setLang);
  const meta = LANG_META[lang];
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const triggerClass = cn(
    "inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0F0F0F]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 cursor-pointer",
    variant === "sheet" && "w-full justify-center py-2.5",
    className,
  );

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-label={`Change language — current: ${meta.english}`}
        className={triggerClass}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe className="size-3.5" strokeWidth={2} />
        <span>{meta.short}</span>
      </button>

      {open && (
        <div
          className="gold-scroll absolute right-0 top-full z-[100] mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-xl border border-[#D4AF37]/25 bg-[#0F0F0F] py-2 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)]"
          style={{ minWidth: "200px" }}
        >
          <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Lingua · Language
          </div>
          <div className="mx-3 mb-1 h-px bg-white/8" />
          {LANGS.map((l: Lang) => {
            const m = LANG_META[l];
            const active = l === lang;
            return (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-[#D4AF37]/15 text-white"
                    : "text-white/85 hover:bg-[#D4AF37]/8 hover:text-white",
                )}
              >
                <span className="flex flex-col text-left">
                  <span className="font-medium leading-tight">{m.native}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#A1A1A1]">
                    {m.english}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                    {m.short}
                  </span>
                  {active && <Check className="size-3.5 text-[#D4AF37]" strokeWidth={2.5} />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
