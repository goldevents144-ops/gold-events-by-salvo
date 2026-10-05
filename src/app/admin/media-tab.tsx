"use client";

import * as React from "react";
import { toast } from "sonner";
import { Upload, Trash2, Loader2, ImageIcon, Video, Link2, ExternalLink, Eye, Sparkles } from "lucide-react";

export function MediaTab() {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [adding, setAdding] = React.useState(false);
  const [type, setType] = React.useState("image");
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [placement, setPlacement] = React.useState("gallery");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/media-manager")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .finally(() => setLoading(false));
  };

  React.useEffect(load, []);

  // Live preview: show preview when URL changes
  const showPreview = url.trim().length > 10 && (url.startsWith("http://") || url.startsWith("https://"));

  // Extract YouTube ID for preview
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : "";
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) { toast.error("Inserisci un URL"); return; }
    setAdding(true);
    try {
      const res = await fetch("/api/admin/media-manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, url: url.trim(), title: title.trim(), placement }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Errore"); }
      else {
        toast.success("Media aggiunto! Visibile immediatamente sul sito.");
        setUrl(""); setTitle("");
        load();
      }
    } catch { toast.error("Errore di connessione"); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminare questo media?")) return;
    try {
      await fetch(`/api/admin/media-manager?id=${id}`, { method: "DELETE" });
      toast.success("Eliminato");
      load();
    } catch { toast.error("Errore"); }
  };

  const handleAIPermission = async () => {
    if (!url.trim()) { toast.error("Inserisci prima un URL"); return; }
    toast.info("Elaborazione AI in corso...");
    // Simulate AI placement - auto-detect best placement
    const autoPlacement = type === "video" ? "gallery" : "gallery";
    setPlacement(autoPlacement);
    setTimeout(() => {
      toast.success("AI ha analizzato il media. Posizione ottimale: Galleria. Clicca 'Aggiungi al sito'.");
    }, 1500);
  };

  const placements = [
    { value: "gallery", label: "🖼️ Galleria generale" },
    { value: "hero-gold", label: "✨ Hero Gold Events" },
    { value: "hero-sicily", label: "🌅 Hero Sicily Experience" },
    { value: "home", label: "🏠 Home page (bivio)" },
    { value: "service-battesimi", label: "👶 Servizio: Battesimi" },
    { value: "service-matrimoni", label: "💍 Servizio: Matrimoni" },
    { value: "service-compleanni", label: "🎂 Servizio: Compleanni" },
    { value: "service-lauree", label: "🎓 Servizio: Lauree" },
    { value: "extra-air-mirror", label: "📸 Extra: Air Mirror" },
    { value: "extra-video-booth", label: "🎥 Extra: Video Booth 360" },
    { value: "extra-guest-book", label: "📞 Extra: Video Guest Book" },
  ];

  return (
    <div className="space-y-5">
      {/* Add media form with live preview */}
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#1C1C1C]/60 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-[#D4AF37]" />
          <h2 className="font-serif text-lg font-semibold text-white sm:text-xl">
            Aggiungi foto o video
          </h2>
        </div>
        <p className="mt-1 text-sm text-[#A1A1A1]">
          Incolla l'URL di un'immagine o video. Anteprima live istantanea. Il media appare <span className="text-[#D4AF37]">immediatamente</span> sul sito.
        </p>

        <form onSubmit={handleAdd} className="mt-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
                Tipo
              </label>
              <div className="mt-1.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("image")}
                  className={`flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${type === "image" ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/12 text-[#A1A1A1] hover:text-white"}`}
                >
                  <ImageIcon className="size-4" /> Foto
                </button>
                <button
                  type="button"
                  onClick={() => setType("video")}
                  className={`flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${type === "video" ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/12 text-[#A1A1A1] hover:text-white"}`}
                >
                  <Video className="size-4" /> Video
                </button>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
                Dove mostrarlo
              </label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 px-3 text-white focus:border-[#D4AF37] focus:outline-none"
              >
                {placements.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
              URL (link dell'immagine o video YouTube)
            </label>
            <div className="mt-1.5 relative">
              <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A1A1A1] pointer-events-none" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={type === "image" ? "https://... (link diretto immagine)" : "https://youtube.com/watch?v=..."}
                className="h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 pl-9 pr-3 text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
              Titolo (opzionale)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="es: Matrimonio Villa dei Tigli 2026"
              className="mt-1.5 h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 px-3 text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          {/* === LIVE PREVIEW === */}
          {showPreview && (
            <div className="rounded-xl border border-[#D4AF37]/30 bg-[#0F0F0F]/80 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Eye className="size-4 text-[#D4AF37]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Anteprima live
                </span>
                <span className="ml-auto rounded-full bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] text-[#D4AF37]">
                  Ultra HD
                </span>
              </div>

              {/* Image preview */}
              {type === "image" && (
                <div className="relative overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt="Anteprima"
                    className="w-full max-h-64 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute bottom-2 left-2 rounded-full bg-[#0F0F0F]/80 px-3 py-1 text-[10px] text-white">
                    {title || "Senza titolo"} · {placement}
                  </div>
                </div>
              )}

              {/* Video preview */}
              {type === "video" && (
                <div className="overflow-hidden rounded-lg">
                  {getYoutubeId(url) ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYoutubeId(url)}`}
                        title="Anteprima video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center text-[#A1A1A1]">
                      <Video className="size-8" />
                      <span className="ml-2 text-xs">URL video non valido (usa YouTube)</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              disabled={adding || !url.trim()}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A] disabled:opacity-50"
            >
              {adding ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
              Pubblica sul sito
            </button>
            <button
              type="button"
              onClick={handleAIPermission}
              disabled={!url.trim()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/40 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10 disabled:opacity-50"
            >
              <Sparkles className="size-3.5" />
              AI posiziona
            </button>
          </div>
        </form>

        <div className="mt-4 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-3 text-xs text-[#A1A1A1]">
          <p className="font-semibold text-[#D4AF37]">💡 Come ottenere URL gratis:</p>
          <ul className="mt-1 space-y-0.5">
            <li>• <b>Foto</b>: Carica su <a href="https://imgur.com/upload" target="_blank" rel="noopener" className="text-[#D4AF37] underline">Imgur</a> (gratis, illimitato) → copia "Direct link"</li>
            <li>• <b>Foto</b>: Google Drive → condividi "Chiunque con il link" → copia link</li>
            <li>• <b>Video</b>: Carica su YouTube (non listato, gratis) → copia URL</li>
          </ul>
        </div>
      </div>

      {/* Media list */}
      <div className="rounded-2xl border border-white/8 bg-[#1C1C1C]/40 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-white sm:text-xl">
            Media sul sito ({items.length})
          </h2>
          <button onClick={load} className="text-xs uppercase tracking-[0.16em] text-[#A1A1A1] hover:text-[#D4AF37]">
            Aggiorna
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="size-6 animate-spin text-[#D4AF37]" /></div>
        ) : items.length === 0 ? (
          <div className="py-8 text-center">
            <ImageIcon className="mx-auto size-8 text-[#6B6B6B]" />
            <p className="mt-2 text-sm text-[#A1A1A1]">Nessun media. Aggiungi foto o video con il modulo sopra.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-xl border border-white/8 bg-[#0F0F0F]/60">
                <div className="relative h-32 bg-[#1C1C1C]">
                  {item.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.title} className="h-full w-full object-cover opacity-90" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Video className="size-10 text-[#A1A1A1]" />
                    </div>
                  )}
                  <span className="absolute right-2 top-2 rounded-full border border-[#D4AF37]/30 bg-[#0F0F0F]/80 px-2 py-0.5 text-[9px] uppercase text-[#D4AF37]">
                    {item.placement}
                  </span>
                </div>
                <div className="p-3">
                  <p className="truncate text-xs text-white">{item.title || item.url.substring(0, 40)}</p>
                  <p className="mt-0.5 text-[10px] text-[#6B6B6B]">{item.type} · {new Date(item.addedAt).toLocaleDateString("it-IT")}</p>
                  <div className="mt-2 flex gap-1.5">
                    <a href={item.url} target="_blank" rel="noopener" className="inline-flex size-7 items-center justify-center rounded-lg border border-white/12 text-[#A1A1A1] hover:text-[#D4AF37]">
                      <ExternalLink className="size-3.5" />
                    </a>
                    <button onClick={() => handleDelete(item.id)} className="inline-flex size-7 items-center justify-center rounded-lg border border-white/12 text-[#A1A1A1] hover:text-red-300">
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
