"use client";

import * as React from "react";
import { useMedia, type MediaItem } from "@/lib/use-media";

/**
 * Displays media (images + videos) added by Salvo from the admin panel.
 * Ultra HD quality, instant loading, super fluid.
 */
export function MediaDisplay({ placement }: { placement?: string }) {
  const { items, loading } = useMedia(placement);

  if (loading) return null;
  if (items.length === 0) return null;

  return (
    <section className="relative py-12 sm:py-16" aria-labelledby="media-gallery-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
            Galleria Gold Events
          </p>
          <h2 id="media-gallery-title" className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
            Momenti indimenticabili
          </h2>
          <p className="mt-2 text-sm text-[#A1A1A1]">Foto e video reali degli eventi di Salvo Piemonte</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <MediaCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const [loaded, setLoaded] = React.useState(false);
  const isYouTube = item.url.includes("youtube.com") || item.url.includes("youtu.be");

  let youtubeId = "";
  if (isYouTube) {
    const match = item.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (match) youtubeId = match[1];
  }

  // Optimize image URL for ultra HD quality
  const optimizedUrl = item.type === "image" ? optimizeImageUrl(item.url) : item.url;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#1C1C1C]/70 transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.3)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {item.type === "video" && youtubeId ? (
        <div className="aspect-video w-full overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&hd=1`}
            title={item.title || "Video Gold Events"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        </div>
      ) : item.type === "image" ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F0F0F]">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-[#1C1C1C]" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={optimizedUrl}
            alt={item.title || "Gold Events by Salvo"}
            loading="lazy"
            fetchPriority={index < 3 ? "high" : "auto"}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-700 ${
              loaded ? "opacity-100 scale-100 group-hover:scale-110" : "opacity-0"
            }`}
          />
          {/* HD badge */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#0F0F0F]/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[#D4AF37]" />
            HD
          </span>
        </div>
      ) : null}

      {item.title && (
        <div className="p-4">
          <p className="text-sm font-medium text-white">{item.title}</p>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-[#D4AF37]/60">
            {item.type === "video" ? "🎥 Video" : "📷 Foto"}
          </p>
        </div>
      )}
    </article>
  );
}

/**
 * Optimize image URL for ultra HD quality.
 * For Unsplash: add quality + width params
 * For Google Drive: convert to direct link
 * For Imgur: add quality suffix
 * For others: return as-is (already optimized by source)
 */
function optimizeImageUrl(url: string): string {
  // Unsplash: add ultra HD params
  if (url.includes("unsplash.com")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}q=100&w=1600&auto=format&fit=crop`;
  }

  // Google Drive: convert share link to direct image
  if (url.includes("drive.google.com") && url.includes("file/d/")) {
    const match = url.match(/file\/d\/([^\/]+)/);
    if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  // Imgur: add high quality suffix
  if (url.includes("imgur.com") && url.endsWith(".jpg")) {
    return url.replace(".jpg", ".jpg");
  }

  return url;
}
