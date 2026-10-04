"use client";

import * as React from "react";
import { useMedia, type MediaItem } from "@/lib/use-media";

/**
 * Displays media (images + videos) added by Salvo from the admin panel.
 * Renders a gallery grid. Videos are embedded as YouTube iframes.
 */
export function MediaDisplay({ placement }: { placement?: string }) {
  const { items, loading } = useMedia(placement);

  if (loading || items.length === 0) return null;

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
          Galleria Gold Events
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaCard({ item }: { item: MediaItem }) {
  const isYouTube = item.url.includes("youtube.com") || item.url.includes("youtu.be");
  const isVimeo = item.url.includes("vimeo.com");

  // Extract YouTube video ID
  let youtubeId = "";
  if (isYouTube) {
    const match = item.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (match) youtubeId = match[1];
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#1C1C1C]/70 transition-all duration-300 hover:border-[#D4AF37]/40">
      {item.type === "video" && (isYouTube || isVimeo) ? (
        <div className="aspect-video w-full overflow-hidden">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <iframe
              src={item.url}
              title={item.title}
              allowFullScreen
              className="h-full w-full"
            />
          )}
        </div>
      ) : (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F0F0F]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.url}
            alt={item.title || "Gold Events by Salvo"}
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      {item.title && (
        <div className="p-3">
          <p className="text-sm font-medium text-white">{item.title}</p>
        </div>
      )}
    </article>
  );
}
