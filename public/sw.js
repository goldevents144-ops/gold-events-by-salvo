/**
 * Gold Events by Salvo — Service Worker
 * PWA: installable + offline-capable.
 *
 * Strategy:
 *  - Precache a few key shell assets on install (/ + manifest + hero image + icon).
 *  - For same-origin GET requests: stale-while-revalidate.
 *  - Skip /api/* and /admin/* entirely (security + freshness).
 *  - Clean old caches on activate.
 *  - Navigation fallback: when offline, serve the cached "/" shell.
 *
 * NOTE: This file is served as a static asset from /public/sw.js.
 * It runs in the SW context (no Next.js, no React, no TS — plain JS).
 */

const CACHE_VERSION = "ge-v1";
const PRECACHE = [
  "/",
  "/manifest.json",
  "/icon.svg",
  "/icon-192.png",
  "/images/hero-etna-dusk.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      // Use addAll but tolerate failures (so one missing asset doesn't break install).
      await Promise.all(
        PRECACHE.map(async (url) => {
          try {
            const res = await fetch(url, { cache: "reload" });
            if (res.ok) await cache.put(url, res.clone());
          } catch (_e) {
            // Ignore individual failures.
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== CACHE_VERSION)
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin.
  if (url.origin !== self.location.origin) return;

  // Never cache API or admin routes (security + always-fresh).
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/admin")) return;

  // Only handle GET.
  if (req.method !== "GET") return;

  // Navigation requests (HTML pages): network-first with offline fallback.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          // Cache the latest shell.
          const cache = await caches.open(CACHE_VERSION);
          cache.put("/", fresh.clone()).catch(() => {});
          return fresh;
        } catch (_e) {
          // Offline — try the request URL, then "/".
          const cached = await caches.match(req) || await caches.match("/");
          if (cached) return cached;
          return new Response(
            `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Offline — Gold Events by Salvo</title><style>body{margin:0;background:#0F0F0F;color:#fff;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:2rem}h1{color:#D4AF37;font-size:1.5rem;margin:0 0 1rem}p{color:#A1A1A1;max-width:32rem;line-height:1.6}</style></head><body><div><h1>Sei offline</h1><p>Questa pagina non è disponibile senza connessione. Riprova appena torni online — il resto del sito resta accessibile dalla cache.</p></div></body></html>`,
            { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } },
          );
        }
      })(),
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === "basic") {
            cache.put(req, res.clone()).catch(() => {});
          }
          return res;
        })
        .catch(() => undefined);
      return cached || (await network) || Response.error();
    })(),
  );
});
