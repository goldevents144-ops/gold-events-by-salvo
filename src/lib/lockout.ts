/**
 * Brute-force lockout — tracks failed login attempts per IP hash + per identifier.
 * After MAX_FAILED attempts within WINDOW_MS, blocks further attempts for LOCKOUT_MS.
 *
 * In-memory (per-edge-instance). For multi-instance production, swap with Redis/Upstash.
 */

interface FailureEntry {
  count: number;
  firstAttemptAt: number;
  lockedUntil: number | null;
}

const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes sliding window
const LOCKOUT_MS = 15 * 60 * 1000; // 15 min lockout after threshold

const store = new Map<string, FailureEntry>();

export function isLocked(key: string): {
  locked: boolean;
  remainingMs: number;
  attemptsLeft: number;
} {
  const entry = store.get(key);
  if (!entry || !entry.lockedUntil) {
    return { locked: false, remainingMs: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }
  const now = Date.now();
  if (now >= entry.lockedUntil) {
    // Lockout expired — reset
    store.delete(key);
    return { locked: false, remainingMs: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }
  return {
    locked: true,
    remainingMs: entry.lockedUntil - now,
    attemptsLeft: 0,
  };
}

export function recordFailure(key: string): {
  locked: boolean;
  attemptsLeft: number;
} {
  const now = Date.now();
  let entry = store.get(key);

  if (!entry || now - entry.firstAttemptAt > WINDOW_MS) {
    entry = { count: 0, firstAttemptAt: now, lockedUntil: null };
  }

  entry.count += 1;
  if (entry.count >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS;
    store.set(key, entry);
    return { locked: true, attemptsLeft: 0 };
  }

  store.set(key, entry);
  return {
    locked: false,
    attemptsLeft: MAX_FAILED_ATTEMPTS - entry.count,
  };
}

export function clearFailures(key: string): void {
  store.delete(key);
}

/** Cleanup old entries periodically (every 5 minutes). */
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store.entries()) {
      if (v.lockedUntil && now > v.lockedUntil + 60_000) {
        store.delete(k);
      } else if (!v.lockedUntil && now - v.firstAttemptAt > WINDOW_MS) {
        store.delete(k);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}
