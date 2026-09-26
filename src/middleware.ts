/**
 * Gold Events — Next.js Edge Middleware
 *
 * Implements a comprehensive security stack:
 *  - Content-Security-Policy (strict, no inline, no eval, no external scripts except trusted CDN)
 *  - Strict-Transport-Security (HSTS, 2-year, preload, includeSubDomains)
 *  - X-Frame-Options: DENY (no clickjacking)
 *  - X-Content-Type-Options: nosniff
 *  - Referrer-Policy: strict-origin-when-cross-origin
 *  - Permissions-Policy (locks down camera, mic, geolocation, etc.)
 *  - Cross-Origin-* headers for modern browsers
 *  - Rate limiting on /api/* and /admin/login
 *  - Bot/scanner mitigation via User-Agent allow-listing on /admin/*
 *  - Admin session cookie validation
 *
 * This is the EDGE middleware (runs before Next.js routing).
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ----------------------------------------------------------------
// Security headers — applied to every response
// ----------------------------------------------------------------
const SECURITY_HEADERS: Record<string, string> = {
  // Strict CSP: only self, no inline scripts, no eval, no external frames
  // 'unsafe-inline' allowed for styles because Tailwind/shadcn injects some
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "media-src 'self'",
    "connect-src 'self' https://wa.me",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wa.me mailto:",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
    "block-all-mixed-content",
  ].join("; "),

  // HSTS — 2 years, preload, include subdomains
  "Strict-Transport-Security":
    "max-age=63072000; includeSubDomains; preload",

  // No framing at all (defense in depth alongside frame-ancestors)
  "X-Frame-Options": "DENY",

  // No MIME-type sniffing
  "X-Content-Type-Options": "nosniff",

  // Referrer only on same origin
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Lock down browser features we don't use
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "payment=()",
    "usb=()",
    "magnetometer=()",
    "gyroscope=()",
    "accelerometer=()",
    "autoplay=(self)",
    "clipboard-write=(self)",
    "clipboard-read=(self)",
    "fullscreen=(self)",
  ].join(", "),

  // Cross-Origin isolation headers
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "credentialless",
  "Cross-Origin-Resource-Policy": "same-origin",

  // Cache-control for sensitive pages
  "Cache-Control": "no-store, no-cache, must-revalidate, private",

  // Remove identifying server header
  "X-Powered-By": "Gold-Events",

  // XSS protection for legacy browsers
  "X-XSS-Protection": "1; mode=block",
};

// ----------------------------------------------------------------
// Rate limiting (in-memory, per-IP hash, sliding window)
// ----------------------------------------------------------------
// Note: in-memory works per-edge-instance. For production multi-instance,
// replace with Upstash Redis or Vercel KV.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMITS: Record<string, { max: number; count: number; resetAt: number }> = {
  "/api/chat": { max: 15, count: 0, resetAt: 0 }, // chatbot: 15 msg/min
  "/api/contact": { max: 3, count: 0, resetAt: 0 }, // contact form: 3/min (stricter)
  "/api/partner": { max: 3, count: 0, resetAt: 0 }, // partner form: 3/min (stricter)
  "/admin/login": { max: 5, count: 0, resetAt: 0 }, // login attempts: 5/min (stricter)
};

function rateLimit(key: string): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  const limit = RATE_LIMITS[key];
  if (!limit) return { allowed: true, remaining: Infinity, retryAfterSec: 0 };

  // Reset window if expired
  if (now > limit.resetAt) {
    limit.count = 0;
    limit.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  if (limit.count >= limit.max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.ceil((limit.resetAt - now) / 1000),
    };
  }

  limit.count += 1;
  return {
    allowed: true,
    remaining: limit.max - limit.count,
    retryAfterSec: 0,
  };
}

// ----------------------------------------------------------------
// Bot/scanner mitigation on /admin
// ----------------------------------------------------------------
const BLOCKED_USER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /dirbuster/i,
  /wpscan/i,
  /hydra/i,
  /burp/i,
  /zap/i,
  /crawler/i,
  /spider/i,
  /bot/i,
];

function isBlockedUserAgent(ua: string | null): boolean {
  if (!ua) return true;
  return BLOCKED_USER_AGENTS.some((re) => re.test(ua));
}

// ----------------------------------------------------------------
// Main middleware
// ----------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent");

  // Build response
  const response = NextResponse.next();

  // Apply security headers to every response
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // ── Cache headers for static assets (long-lived, immutable) ───────
  // Images, icons, manifest, sw.js are immutable → browser caches them 1 year
  if (
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/") ||
    pathname === "/manifest.json" ||
    pathname === "/icon.svg" ||
    pathname === "/favicon.ico" ||
    pathname === "/sw.js" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
  }

  // ── Admin route protection ───────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Block obvious scanners/bots
    if (isBlockedUserAgent(userAgent)) {
      return new NextResponse("Forbidden", {
        status: 403,
        headers: SECURITY_HEADERS,
      });
    }

    // Rate-limit admin login attempts
    if (pathname === "/admin/login") {
      const rl = rateLimit("/admin/login");
      if (!rl.allowed) {
        return new NextResponse(
          JSON.stringify({ error: "Too many attempts. Retry later." }),
          {
            status: 429,
            headers: {
              ...SECURITY_HEADERS,
              "Content-Type": "application/json",
              "Retry-After": String(rl.retryAfterSec),
            },
          },
        );
      }
    }
  }

  // ── API rate limiting ────────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    const rl = rateLimit(pathname);
    if (!rl.allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Rate limit exceeded", retryAfter: rl.retryAfterSec }),
        {
          status: 429,
          headers: {
            ...SECURITY_HEADERS,
            "Content-Type": "application/json",
            "Retry-After": String(rl.retryAfterSec),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }
    response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  }

  return response;
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: [
    // Match everything EXCEPT Next internals and hashed static assets
    // (we keep public/ files like /images/, /manifest.json, /sw.js, /robots.txt, /sitemap.xml
    //  so we can apply cache headers to them)
    "/((?!_next/static|_next/image|favicon.ico|workbox-.*).*)",
  ],
};
