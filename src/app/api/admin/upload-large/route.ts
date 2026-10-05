import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const placement = (formData.get("placement") as string) || "gallery";
    const title = (formData.get("title") as string) || "";

    if (!file) return NextResponse.json({ error: "Nessun file" }, { status: 400 });

    const MAX_SIZE = 200 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File troppo grande (max 200MB). Per video grandi usa YouTube." }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try multiple upload services
    let uploadedUrl: string | null = null;

    // Try 1: 0x0.st
    try {
      const form = new FormData();
      form.append("file", new Blob([buffer], { type: file.type }), file.name);
      
      const res = await fetch("https://0x0.st", {
        method: "POST",
        body: form,
      });
      
      if (res.ok) {
        const text = await res.text();
        if (text.startsWith("https://")) {
          uploadedUrl = text.trim();
        }
      }
    } catch {}

    // Try 2: Catbox
    if (!uploadedUrl) {
      try {
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", new Blob([buffer], { type: file.type }), file.name);
        
        const res = await fetch("https://catbox.moe/user/api.php", {
          method: "POST",
          body: form,
        });
        
        if (res.ok) {
          const text = await res.text();
          if (text.startsWith("https://")) {
            uploadedUrl = text.trim();
          }
        }
      } catch {}
    }

    // Try 3: tmpfiles.org
    if (!uploadedUrl) {
      try {
        const form = new FormData();
        form.append("file", new Blob([buffer], { type: file.type }), file.name);
        
        const res = await fetch("https://tmpfiles.org/api/v1/upload", {
          method: "POST",
          body: form,
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.data?.url) {
            // Convert tmpfiles URL to direct link
            uploadedUrl = data.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
          }
        }
      } catch {}
    }

    // Fallback: base64 (for small files < 4MB)
    if (!uploadedUrl && file.size < 4 * 1024 * 1024) {
      const base64 = buffer.toString("base64");
      const mimeType = file.type || "image/jpeg";
      uploadedUrl = `data:${mimeType};base64,${base64}`;
    }

    if (!uploadedUrl) {
      return NextResponse.json({ 
        error: "Upload fallito. Prova con URL esterno (YouTube per video, Imgur per foto)." 
      }, { status: 500 });
    }

    const type = file.type.startsWith("video/") ? "video" : "image";
    const item = {
      id: `media_${Date.now()}`,
      type, url: uploadedUrl,
      title: title || file.name.replace(/\.[^/.]+$/, ""),
      placement,
      addedAt: new Date().toISOString(),
    };

    const globalStore = globalThis as unknown as { __mediaStore?: any[] };
    if (!globalStore.__mediaStore) globalStore.__mediaStore = [];
    globalStore.__mediaStore.unshift(item);

    return NextResponse.json({
      ok: true, item,
      message: "File caricato! Visibile sul sito.",
      sizeMB: Math.round(file.size / 1024 / 1024 * 10) / 10,
    });
  } catch (error: any) {
    console.error("Upload error:", error?.message);
    return NextResponse.json({ error: "Errore upload" }, { status: 500 });
  }
}
