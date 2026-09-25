"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Mail, MessageCircle, MapPin, Instagram, Facebook, User } from "lucide-react";

import { contactInfo, navItems as defaultNavItems } from "@/lib/site-content";
import { useDict } from "@/lib/i18n/use-lang";

function scrollTo(href: string) {
  if (typeof document === "undefined") return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  const year = new Date().getFullYear();
  const t = useDict();

  // Map our 6 nav items to translated labels.
  const navItems = [
    { href: "#chi-sono", label: t.nav["chi-sono"] },
    { href: "#servizi", label: t.nav.servizi },
    { href: "#bundles", label: t.nav.bundle },
    { href: "#extra", label: t.nav.extra },
    { href: "#sicily-experience", label: t.nav["sicily-experience"] },
    { href: "#contatti", label: t.nav.contatti },
  ];

  return (
    <footer
      className="mt-auto border-t border-[#D4AF37]/15 bg-[#0A0A0A]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {t.footerSrTitle}
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Link
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3"
              aria-label="Gold Events by Salvo — torna su"
            >
              <span className="flex size-10 items-center justify-center rounded-full border border-[#D4AF37]/50 text-[#D4AF37]">
                <Sparkles className="size-4" strokeWidth={1.6} />
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
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#A1A1A1]">
              {t.footerTagline}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs text-white/90">
              <User className="size-3.5 text-[#D4AF37]" />
              <span className="font-semibold">{contactInfo.personName}</span>
              <span className="text-[#A1A1A1]">· {contactInfo.brandRole}</span>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-[#A1A1A1]">
              <MapPin className="size-3.5 text-[#D4AF37]" />
              {contactInfo.location}
            </p>

            {/* Brand split note */}
            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B]">
              <span className="text-[#D4AF37]">Gold Events by Salvo</span>{" "}
              ·{" "}
              <span className="text-[#A1A1A1]">
                Gold Events Sicily Experience
              </span>
            </p>
          </div>

          {/* Quick links */}
          <nav
            aria-label={t.footerNavLabel}
            className="md:col-span-3"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              {t.footerNavLabel}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="text-sm text-[#A1A1A1] transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#partner"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#partner");
                  }}
                  className="text-sm text-[#A1A1A1] transition-colors hover:text-white"
                >
                  {t.footerPartnerLink}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact CTAs */}
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              {t.footerContactsLabel}
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#1C1C1C]/60 px-4 py-3 transition-colors hover:border-[#D4AF37]/60 hover:bg-[#1C1C1C]"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                  <MessageCircle className="size-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A1A1A1]">
                    {t.footerWhatsapp}
                  </span>
                  <span className="text-sm text-white">
                    {contactInfo.whatsapp}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="group inline-flex items-center gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#1C1C1C]/60 px-4 py-3 transition-colors hover:border-[#D4AF37]/60 hover:bg-[#1C1C1C]"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Mail className="size-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A1A1A1]">
                    {t.footerEmail}
                  </span>
                  <span className="text-sm text-white">
                    {contactInfo.email}
                  </span>
                </span>
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A1A1A1]">
                {t.footerFollow}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${contactInfo.instagramHandle}`}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                >
                  <Instagram className="size-4" />
                </a>
                <a
                  href={contactInfo.tikTok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                >
                  <span className="text-xs font-bold">TT</span>
                </a>
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                >
                  <Facebook className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-[#6B6B6B]">
            © {year} {t.footerCopyright}
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B]">
            {t.footerRegion}
          </p>
        </div>
      </div>
    </footer>
  );
}
