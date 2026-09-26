"use client";

import * as React from "react";

/**
 * Client component that registers the service worker (PWA).
 * Renders nothing visible. Mounted once in layout.tsx (inside LangProvider).
 *
 * The service worker lives at /sw.js (public folder). It does NOT cache /api/* or
 * /admin/* (security) and only handles same-origin GET with stale-while-revalidate.
 */
export function RegisterSW() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // Only register in production OR when explicitly enabled.
    // In dev, Next.js fast-refresh + SW caching fight each other, so we skip.
    if (process.env.NODE_ENV !== "production") {
      // Allow opt-in via ?sw=1 for local testing.
      const params = new URLSearchParams(window.location.search);
      if (params.get("sw") !== "1") return;
    }
    const onLoad = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => {
          // Silently fail — PWA is a progressive enhancement.
           
          console.warn("[sw] registration failed:", err);
        });
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
