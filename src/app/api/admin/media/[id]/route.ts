import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * DELETE /api/admin/media/[id]
 * Delete a media file by ID. Removes from DB metadata + physical file.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const existing = await db.siteContent.findUnique({
      where: { id: "media.library" },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Nessun media trovato" },
        { status: 404 },
      );
    }

    const mediaList = JSON.parse(existing.value);
    const item = mediaList.find((m: any) => m.id === id);

    if (!item) {
      return NextResponse.json(
        { error: "Media non trovato" },
        { status: 404 },
      );
    }

    // Delete physical file
    try {
      const filePath = path.join(process.cwd(), "public", item.url);
      await fs.unlink(filePath);
    } catch {
      // File might not exist, ignore
    }

    // Remove from list
    const newList = mediaList.filter((m: any) => m.id !== id);
    await db.siteContent.update({
      where: { id: "media.library" },
      data: { value: JSON.stringify(newList) },
    });

    await logAudit("media_deleted", id, {
      filename: item.originalName,
    }, req);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Delete media error:", error?.message);
    return NextResponse.json(
      { error: "Errore durante l'eliminazione" },
      { status: 500 },
    );
  }
}
