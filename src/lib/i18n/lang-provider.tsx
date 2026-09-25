"use client";

import * as React from "react";
import { useLang } from "./use-lang";
import { LANG_HTML_ATTR, RTL_LANGS } from "./dictionaries";

/**
 * LangProvider — a client component that:
 *  - Hydrates the persisted `lang` choice from localStorage (via zustand persist).
 *  - Updates <html lang> and <html dir> attributes whenever the language changes.
 *
 * Wrap children with this once at the layout level (or in page.tsx).
 * Server-rendered children stay server-rendered; only this provider is client.
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useLang((s) => s.lang);
  const hydrated = useLang((s) => s.hydrated);
  const setHydrated = useLang((s) => s.setHydrated);

  // Mark hydrated on mount (so components know the persisted choice has applied)
  React.useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  // Reflect active lang + dir onto <html> whenever it changes.
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.lang = LANG_HTML_ATTR[lang];
    html.dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
  }, [lang]);

  // Mark hydration in case the user has JS but localStorage read was slow
  // (the persist middleware handles its own hydration, this is defensive).
  React.useEffect(() => {
    if (!hydrated) setHydrated();
  }, [hydrated, setHydrated]);

  return <>{children}</>;
}
