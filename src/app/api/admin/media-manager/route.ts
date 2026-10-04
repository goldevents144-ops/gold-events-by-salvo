import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";

/**
 * Media Manager — in-memory store (works immediately on Vercel)
 * + Vercel env var backup (persistent across deploys)
 */

// Global in-memory store (persists for warm function lifetime)
interface MediaItem {
  id: string;
  type: string;
  url: string;
  title: string;
  placement: string;
  addedAt: string;
}

const globalStore = globalThis as unknown as { __mediaStore?: MediaItem[] };
if (!globalStore.__mediaStore) globalStore.__mediaStore = [];

function getItems(): MediaItem[] {
  return globalStore.__mediaStore || [];
}

function setItems(items: MediaItem[]) {
  globalStore.__mediaStore = items;
}

// Also try to persist to Vercel env var
const TOKEN = "vcp_7AN6dSCcuyoyCXrzdxtmCQAF4gBMa9pHsCXb3hpAtPsu7KgvOz3g6k62";
const PROJECT_ID = "prj_RucIk8AkqaOwDjyb2qFqlh2zsEEp";

async function persistToVercel(items: MediaItem[]) {
  try {
    // Delete existing MEDIA_DATA env var if exists
    const listRes = await fetch(`https://api.vercel.com/v9/projects/${PROJECT_ID}/env`, {
      headers: { "Authorization": `Bearer ${TOKEN}` },
    });
    const listData = await listRes.json();
    const existing = listData.envs?.find((e: any) => e.key === "MEDIA_DATA");
    if (existing) {
      await fetch(`https://api.vercel.com/v9/projects/${PROJECT_ID}/env/${existing.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${TOKEN}` },
      });
    }
    // Create new
    await fetch(`https://api.vercel.com/v9/projects/${PROJECT_ID}/env`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "MEDIA_DATA",
        value: JSON.stringify(items),
        type: "encrypted",
        target: ["production", "preview"],
      }),
    });
  } catch (e) {
    // Silently fail — in-memory store still works
  }
}

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  let items = getItems();
  
  // If in-memory is empty, try env var (from previous deployment)
  if (items.length === 0 && process.env.MEDIA_DATA) {
    try { items = JSON.parse(process.env.MEDIA_DATA); setItems(items); } catch {}
  }
  
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { type, url, title, placement } = body;
    if (!url || !type) return NextResponse.json({ error: "URL e tipo richiesti" }, { status: 400 });

    const item: MediaItem = {
      id: `media_${Date.now()}`,
      type, url,
      title: title || "",
      placement: placement || "gallery",
      addedAt: new Date().toISOString(),
    };

    const items = getItems();
    items.unshift(item);
    setItems(items);
    
    // Persist to Vercel env var (async, don't block response)
    persistToVercel(items).catch(() => {});

    return NextResponse.json({ ok: true, item });
  } catch (error: any) {
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID richiesto" }, { status: 400 });

    const items = getItems().filter((m) => m.id !== id);
    setItems(items);
    persistToVercel(items).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Errore" }, { status: 500 });
  }
}
