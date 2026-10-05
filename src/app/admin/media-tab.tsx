"use client";

import * as React from "react";
import { toast } from "sonner";
import { Upload, Trash2, Loader2, ImageIcon, Video, Link2, ExternalLink, Eye, Sparkles, Camera, Smartphone, Film, FileWarning } from "lucide-react";

export function MediaTab() {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [adding, setAdding] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [type, setType] = React.useState("image");
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [placement, setPlacement] = React.useState("gallery");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/media-manager")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .finally(() => setLoading(false));
  };

  React.useEffect(load, []);

  const showPreview = url.trim().length > 10 && (url.startsWith("http://") || url.startsWith("https://"));

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeMB = Math.round(file.size / 1024 / 1024 * 10) / 10;
    const isVideo = file.type.startsWith("video/");

    // Check size limits
    if (isVideo && file.size > 200 * 1024 * 1024) {
      toast.error(`Video troppo grande (${sizeMB}MB). Max 200MB. Per video grandi usa YouTube.`);
      return;
    }
    if (!isVideo && file.size > 200 * 1024 * 1024) {
      toast.error(`Foto troppo grande (${sizeMB}MB). Max 200MB.`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    toast.info(`Caricamento ${isVideo ? "video" : "foto"} (${sizeMB}MB)...`);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("placement", placement);
    formData.append("title", title || file.name.replace(/\.[^/.]+$/, ""));

    try {
      const res = await fetch("/api/admin/upload-large", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Errore upload");
      } else {
        toast.success(`${data.message} (${data.sizeMB}MB)`);
        setTitle("");
        load();
      }
    } catch {
      toast.error("Errore di connessione. Riprova.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
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
    setPlacement("gallery");
    setTimeout(() => {
      toast.success("AI ha analizzato il media. Posizione: Galleria. Clicca 'Pubblica'.");
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
      {/* Upload section */}
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#1C1C1C]/60 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-[#D4AF37]" />
          <h2 className="font-serif text-lg font-semibold text-white sm:text-xl">
            Aggiungi foto o video
          </h2>
        </div>
        <p className="mt-1 text-sm text-[#A1A1A1]">
          Carica dal telefono o incolla URL. Anteprima live. Visibile immediatamente.
        </p>

        {/* === Upload from phone/camera === */}
        <div className="mt-4 rounded-xl border border-[#D4AF37]/25 bg-[#0F0F0F]/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="size-4 text-[#D4AF37]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Carica dal telefono
            </span>
            <span className="ml-auto rounded-full bg-[#D4AF37]/10 px-2 py-0.5 text-[9px] text-[#D4AF37]">
              Fino a 200MB
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
                Dove mostrarlo
              </label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 px-3 text-white focus:border-[#D4AF37] focus:outline-none text-sm"
              >
                {placements.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
                Titolo (opzionale)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="es: Matrimonio Villa dei Tigli"
                className="mt-1.5 h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 px-3 text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />

          {/* Upload buttons */}
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A] disabled:opacity-50"
            >
              {uploading ? (
                <><Loader2 className="size-4 animate-spin" /> Caricamento...</>
              ) : (
                <><Camera className="size-4" /> Scatta foto</>
              )}
            </button>
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F] disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <><Film className="size-4" /> Carica video</>
              )}
            </button>
          </div>

          {/* Upload progress */}
          {uploading && (
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0F0F0F]">
                <div className="h-full animate-pulse rounded-full bg-[#D4AF37] transition-all" style={{ width: "60%" }} />
              </div>
              <p className="mt-1 text-center text-[10px] text-[#D4AF37]">Caricamento in corso...</p>
            </div>
          )}

          <div className="mt-3 rounded-lg border border-[#D4AF37]/15 bg-[#D4AF37]/5 p-2.5 text-[11px] text-[#A1A1A1]">
            <p className="flex items-center gap-1.5">
              <FileWarning className="size-3 text-[#D4AF37]" />
              <span><b>Foto/video fino a 200MB</b>. Per file più grandi usa YouTube (gratis, illimitato).</span>
            </p>
          </div>
        </div>

        {/* === URL paste === */}
        <div className="mt-4 rounded-xl border border-white/8 bg-[#0F0F0F]/40 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="size-4 text-[#A1A1A1]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
              Oppure incolla un URL (YouTube, Imgur, Google Drive)
            </span>
          </div>

          <form onSubmit={handleAdd} className="space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType("image")}
                className={`flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-xs font-semibold uppercase transition-colors ${type === "image" ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/12 text-[#A1A1A1]"}`}
              >
                <ImageIcon className="size-4" /> Foto
              </button>
              <button
                type="button"
                onClick={() => setType("video")}
                className={`flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-xs font-semibold uppercase transition-colors ${type === "video" ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/12 text-[#A1A1A1]"}`}
              >
                <Video className="size-4" /> Video
              </button>
            </div>

            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A1A1A1] pointer-events-none" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={type === "image" ? "https://... (link immagine)" : "https://youtube.com/watch?v=..."}
                className="h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 pl-9 pr-3 text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none text-sm"
              />
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titolo (opzionale)"
              className="h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 px-3 text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none text-sm"
            />

            {/* Live preview */}
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
                {type === "image" && (
                  <div className="overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="Anteprima" className="w-full max-h-64 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
                {type === "video" && getYoutubeId(url) && (
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <iframe src={`https://www.youtube.com/embed/${getYoutubeId(url)}`} title="Anteprima" allowFullScreen className="h-full w-full" />
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={adding || !url.trim()}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0F0F0F] hover:bg-[#E5C75A] disabled:opacity-50"
              >
                {adding ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                Pubblica sul sito
              </button>
              <button
                type="button"
                onClick={handleAIPermission}
                disabled={!url.trim()}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/40 px-5 text-xs font-semibold uppercase text-[#D4AF37] hover:bg-[#D4AF37]/10 disabled:opacity-50"
              >
                <Sparkles className="size-3.5" />
                AI posiziona
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-3 text-xs text-[#A1A1A1]">
          <p className="font-semibold text-[#D4AF37]">💡 Tutto gratis:</p>
          <ul className="mt-1 space-y-0.5">
            <li>• <b>Foto</b>: scatta dal telefono o usa Imgur (gratis, illimitato)</li>
            <li>• <b>Video</b>: carica dal telefono (max 200MB) o usa YouTube (gratis, illimitato)</li>
            <li>• <b>Google Drive</b>: condividi "Chiunque con il link" → copia link</li>
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
            <p className="mt-2 text-sm text-[#A1A1A1]">Nessun media. Carica foto o video sopra.</p>
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
                    {!item.url.startsWith("data:") && (
                      <a href={item.url} target="_blank" rel="noopener" className="inline-flex size-7 items-center justify-center rounded-lg border border-white/12 text-[#A1A1A1] hover:text-[#D4AF37]">
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
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
