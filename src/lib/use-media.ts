"use client";

import * as React from "react";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  placement: string;
  addedAt: string;
}

export function useMedia(placement?: string): { items: MediaItem[]; loading: boolean } {
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/media", { cache: "no-store" });
        if (!res.ok) { if (!cancelled) setLoading(false); return; }
        const data = await res.json();
        let media = data.items || [];
        if (placement) {
          media = media.filter((m: MediaItem) => m.placement === placement);
        }
        if (!cancelled) { setItems(media); setLoading(false); }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [placement]);

  return { items, loading };
}
