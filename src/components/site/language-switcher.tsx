"use client";

import * as React from "react";
import { Check, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { LANG_META, LANGS, type Lang } from "@/lib/i18n/dictionaries";
import { useLang } from "@/lib/i18n/use-lang";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  variant?: "header" | "sheet";
  className?: string;
}

/**
 * Compact pill-style language switcher. Renders the active language code.
 * On click, opens a dropdown listing all 15 supported languages (endonym + EN gloss).
 */
export function LanguageSwitcher({
  variant = "header",
  className,
}: LanguageSwitcherProps) {
  const lang = useLang((s) => s.lang);
  const setLang = useLang((s) => s.setLang);
  const meta = LANG_META[lang];

  const triggerClass = cn(
    "inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0F0F0F]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/10",
    variant === "sheet" && "w-full justify-center py-2.5",
    className,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Change language — current: ${meta.english}`}
        className={cn(triggerClass, "outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60")}
      >
        <Globe className="size-3.5" strokeWidth={2} />
        <span>{meta.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={variant === "sheet" ? "center" : "end"}
        sideOffset={8}
        className="gold-scroll max-h-[70vh] overflow-y-auto border border-[#D4AF37]/25 bg-[#0F0F0F] text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]"
      >
        <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
          Lingua · Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/8" />
        {LANGS.map((l: Lang) => {
          const m = LANG_META[l];
          const active = l === lang;
          return (
            <DropdownMenuItem
              key={l}
              onSelect={(e) => {
                e.preventDefault();
                setLang(l);
              }}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm transition-colors",
                "focus:bg-[#D4AF37]/10 focus:text-white",
                active
                  ? "bg-[#D4AF37]/15 text-white"
                  : "text-white/85 hover:bg-[#D4AF37]/8 hover:text-white",
              )}
            >
              <span className="flex flex-col">
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
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
