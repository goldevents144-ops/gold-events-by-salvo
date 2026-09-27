import { db } from "@/lib/db";

/**
 * Loads content overrides from the SiteContent table.
 * Used by both server components (public site) and the AI assistant.
 *
 * The AI assistant writes to SiteContent via /api/admin/ai.
 * The public site reads these overrides via this function and applies them
 * to the rendered content (bundle prices, contact info, etc.).
 */

export type ContentOverrides = Record<string, string>;

let cachedOverrides: ContentOverrides | null = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 30_000; // 30 seconds — fast, but not too aggressive

export async function getContentOverrides(): Promise<ContentOverrides> {
  // Cache for 30 seconds to avoid hammering the DB on every request
  const now = Date.now();
  if (cachedOverrides && now < cacheExpiry) {
    return cachedOverrides;
  }

  try {
    const rows = await db.siteContent.findMany();
    const map: ContentOverrides = {};
    for (const row of rows) {
      map[row.id] = row.value;
    }
    cachedOverrides = map;
    cacheExpiry = now + CACHE_TTL_MS;
    return map;
  } catch {
    // DB error → return empty (use defaults)
    return {};
  }
}

/** Clear the cache (called when AI applies a new override) */
export function clearContentCache(): void {
  cachedOverrides = null;
  cacheExpiry = 0;
}

/**
 * Get an override value, with type-safe fallback.
 * Returns the override if present, otherwise the fallback.
 */
export function getOverride(
  overrides: ContentOverrides,
  key: string,
  fallback: string,
): string {
  return overrides[key] ?? fallback;
}

/**
 * Get a numeric override (for prices).
 * Returns the override parsed as number, or the fallback.
 */
export function getNumericOverride(
  overrides: ContentOverrides,
  key: string,
  fallback: number,
): number {
  const value = overrides[key];
  if (value === undefined) return fallback;
  const num = parseInt(value.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(num) && num > 0 ? num : fallback;
}
