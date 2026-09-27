import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * POST /api/admin/upload
 * Upload di file (immagini, PDF, documenti) dal pannello admin.
 * I file vengono salvati in /public/uploads/ e registrati nel DB.
 *
 * Body: multipart/form-data con:
 *   - file: il file da caricare
 *   - category: "image" | "document" | "logo"
 *   - description: descrizione opzionale
 *
 * Response: { ok: true, media: {...} }
 */

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
];

// We need a Media model. Let's store in SiteContent as JSON for simplicity,
// OR create a new table. For now, let's use a simple file-based approach
// with metadata stored in SiteContent.

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "image";
    const description = (formData.get("description") as string) || "";

    if (!file) {
      return NextResponse.json(
        { error: "Nessun file caricato" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File troppo grande. Massimo 10MB." },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo file non supportato: ${file.type}. Formati ammessi: JPEG, PNG, WebP, GIF, SVG, PDF, DOC, DOCX, XLS, XLSX, TXT.` },
        { status: 400 },
      );
    }

    // Generate unique filename
    const ext = path.extname(file.name) || `.${file.type.split("/")[1]}`;
    const safeName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(/\s+/g, "_")
      .substring(0, 50);
    const uniqueId = crypto.randomBytes(8).toString("hex");
    const filename = `${Date.now()}_${uniqueId}_${safeName}`;

    // Ensure upload dir exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    const sizeKB = Math.round(file.size / 1024);

    // Store metadata in SiteContent as JSON array
    const mediaKey = "media.library";
    const existing = await db.siteContent.findUnique({
      where: { id: mediaKey },
    });

    const mediaList = existing ? JSON.parse(existing.value) : [];
    const mediaItem = {
      id: uniqueId,
      filename,
      originalName: file.name,
      url: publicUrl,
      category,
      description,
      type: file.type,
      size: file.size,
      sizeKB,
      uploadedAt: new Date().toISOString(),
    };

    mediaList.unshift(mediaItem); // newest first

    await db.siteContent.upsert({
      where: { id: mediaKey },
      update: { value: JSON.stringify(mediaList) },
      create: { id: mediaKey, value: JSON.stringify(mediaList) },
    });

    await logAudit("media_uploaded", mediaItem.id, {
      filename: file.name,
      category,
      sizeKB,
    }, req);

    return NextResponse.json({
      ok: true,
      media: mediaItem,
      message: `File "${file.name}" caricato con successo (${sizeKB}KB).`,
    });
  } catch (error: any) {
    console.error("Upload error:", error?.message);
    return NextResponse.json(
      { error: "Errore durante il caricamento del file." },
      { status: 500 },
    );
  }
}

/**
 * GET /api/admin/media — list all uploaded media
 */
export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await db.siteContent.findUnique({
      where: { id: "media.library" },
    });

    const mediaList = existing ? JSON.parse(existing.value) : [];
    return NextResponse.json({ media: mediaList });
  } catch {
    return NextResponse.json(
      { media: [] },
      { status: 200 },
    );
  }
}
