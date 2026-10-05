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

    const MAX_SIZE = 4 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ 
        error: "File troppo grande (max 4MB). Per file grandi usa YouTube o Imgur." 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${base64}`;
    const type = file.type.startsWith("video/") ? "video" : "image";

    const item = {
      id: `media_${Date.now()}`,
      type, url: dataUrl,
      title: title || file.name.replace(/\.[^/.]+$/, ""),
      placement,
      addedAt: new Date().toISOString(),
    };

    const globalStore = globalThis as unknown as { __mediaStore?: any[] };
    if (!globalStore.__mediaStore) globalStore.__mediaStore = [];
    globalStore.__mediaStore.unshift(item);

    return NextResponse.json({ ok: true, item, message: "Caricato! Visibile sul sito." });
  } catch (error: any) {
    return NextResponse.json({ error: "Errore upload" }, { status: 500 });
  }
}
