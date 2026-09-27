"use client";

import * as React from "react";
import type { ContentOverrides } from "@/lib/content-overrides";

/**
 * Client hook that fetches content overrides from /api/content-overrides.
 * Returns the overrides object, or empty object if not loaded.
 *
 * The overrides are cached client-side for 60 seconds via SWR pattern.
 * When the AI applies a new override, the cache is cleared server-side
 * and the next request will return the new value.
 */

const CACHE_KEY = "ge_content_overrides";
const CACHE_TTL = 60_000; // 60s client-side

export function useContentOverrides(): {
  overrides: ContentOverrides;
  loading: boolean;
} {
  const [overrides, setOverrides] = React.useState<ContentOverrides>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      // Check sessionStorage cache first
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) {
            if (!cancelled) {
              setOverrides(data);
              setLoading(false);
            }
            return;
          }
        }
      } catch {}

      // Fetch fresh
      try {
        const res = await fetch("/api/content-overrides", {
          cache: "no-store",
        });
        if (!res.ok) {
          if (!cancelled) setLoading(false);
          return;
        }
        const data = await res.json();
        const newOverrides = data.overrides || {};
        if (!cancelled) {
          setOverrides(newOverrides);
          setLoading(false);
        }
        // Save to sessionStorage
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: newOverrides, ts: Date.now() }),
          );
        } catch {}
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { overrides, loading };
}
