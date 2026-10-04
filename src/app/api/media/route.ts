import { NextResponse } from "next/server";

interface MediaItem {
  id: string; type: string; url: string; title: string; placement: string; addedAt: string;
}

const globalStore = globalThis as unknown as { __mediaStore?: MediaItem[] };

export async function GET() {
  let items = globalStore.__mediaStore || [];
  
  // If in-memory empty, try env var
  if (items.length === 0 && process.env.MEDIA_DATA) {
    try { items = JSON.parse(process.env.MEDIA_DATA); } catch {}
  }
  
  return NextResponse.json({ items });
}
