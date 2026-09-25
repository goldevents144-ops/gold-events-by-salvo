"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useDict } from "@/lib/i18n/use-lang";
import { LanguageSwitcher } from "@/components/site/language-switcher";

function scrollTo(href: string) {
  if (typeof document === "undefined") return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group flex items-center gap-3"
      aria-label="Gold Events by Salvo — torna su"
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#0F0F0F] text-[#D4AF37] transition-colors group-hover:border-[#D4AF37]",
          compact ? "size-9" : "size-10",
        )}
      >
        <Sparkles className="size-4" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-base font-semibold tracking-wide text-white sm:text-lg">
          GOLD EVENTS
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4AF37] sm:text-[11px]">
          by Salvo
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const t = useDict();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "#chi-sono", label: t.nav["chi-sono"] },
    { href: "#servizi", label: t.nav.servizi },
    { href: "#bundles", label: t.nav.bundle },
    { href: "#extra", label: t.nav.extra },
    { href: "#sicily-experience", label: t.nav["sicily-experience"] },
    { href: "#contatti", label: t.nav.contatti },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[#D4AF37]/15 bg-[#0F0F0F]/90 backdrop-blur-xl"
          : "border-b border-transparent bg-[#0F0F0F]/40 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <BrandMark compact />

        {/* Desktop nav */}
        <nav
          aria-label="Navigazione principale"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-[#A1A1A1] transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher (desktop) */}
          <LanguageSwitcher variant="header" className="hidden sm:inline-flex" />

          <Button
            asChild
            className="hidden h-10 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] shadow-[0_8px_24px_-8px_rgba(212,175,55,0.55)] transition-all hover:bg-[#E5C75A] hover:shadow-[0_10px_30px_-8px_rgba(212,175,55,0.7)] sm:inline-flex"
          >
            <a
              href="#contatti"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contatti");
              }}
            >
              {t.nav.richiediDisponibilita}
            </a>
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="inline-flex size-11 items-center justify-center rounded-full border border-[#D4AF37]/30 text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] lg:hidden"
                aria-label={t.openMenu}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="gold-scroll w-[88%] max-w-sm overflow-y-auto border-l border-[#D4AF37]/20 bg-[#0F0F0F] p-0"
            >
              <SheetHeader className="flex flex-row items-center justify-between gap-2 border-b border-white/5 px-6 py-5">
                <SheetTitle className="text-left">
                  <span className="block font-serif text-base font-semibold tracking-wide text-white">
                    GOLD EVENTS
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4AF37]">
                    by Salvo
                  </span>
                </SheetTitle>
                <SheetClose
                  aria-label={t.closeMenu}
                  className="rounded-full border border-white/10 p-2 text-white/70 transition-colors hover:border-[#D4AF37]/50 hover:text-white"
                >
                  <X className="size-4" />
                </SheetClose>
              </SheetHeader>

              <nav
                aria-label="Navigazione mobile"
                className="flex flex-col px-4 py-4"
              >
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        // Allow sheet to close before scrolling
                        setTimeout(() => scrollTo(item.href), 80);
                      }}
                      className="flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-white transition-colors hover:bg-white/5 hover:text-[#D4AF37]"
                    >
                      {item.label}
                      <span className="text-[#D4AF37]/40">→</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 px-6 pb-8">
                <LanguageSwitcher variant="sheet" />
                <Button
                  asChild
                  className="h-12 w-full rounded-full bg-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] text-[#0F0F0F]"
                >
                  <a
                    href="#contatti"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setTimeout(() => scrollTo("#contatti"), 80);
                    }}
                  >
                    {t.nav.richiediDisponibilita}
                  </a>
                </Button>
                <p className="text-center text-[11px] uppercase tracking-[0.24em] text-[#A1A1A1]">
                  {t.mobileNavLocation}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
