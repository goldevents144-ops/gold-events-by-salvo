import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/admin-auth";
import DOMPurify from "isomorphic-dompurify";

/**
 * POST /api/contact
 * Receives contact form submissions, sanitizes input, stores in DB.
 *
 * Security:
 * - Honeypot field 'website' (bots fill it, humans don't) — silently rejected
 * - DOMPurify sanitization on all string inputs
 * - Rate limited by middleware (3/min)
 * - Length limits per field
 */

const MAX_LENGTHS = {
  fullName: 200,
  eventType: 50,
  eventDate: 20,
  location: 200,
  guests: 9999,
  notes: 2000,
  services: 2000,
};

function clean(s: unknown, maxLen: number): string {
  if (typeof s !== "string") return "";
  const trimmed = s.trim().slice(0, maxLen);
  return DOMPurify.sanitize(trimmed, { ALLOWED_TAGS: [] });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot — if 'website' field is filled, it's a bot. Pretend success.
    if (body.website && typeof body.website === "string" && body.website.length > 0) {
      console.warn("[honeypot] Bot submission blocked on /api/contact");
      return NextResponse.json({ ok: true });
    }

    const fullName = clean(body.fullName, MAX_LENGTHS.fullName);
    const eventType = clean(body.eventType, MAX_LENGTHS.eventType);
    const eventDate = clean(body.eventDate, MAX_LENGTHS.eventDate);
    const location = clean(body.location, MAX_LENGTHS.location);
    const notes = clean(body.notes, MAX_LENGTHS.notes);

    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: "Nome non valido" }, { status: 400 });
    }
    if (!eventType) {
      return NextResponse.json({ error: "Tipo di evento obbligatorio" }, { status: 400 });
    }
    if (!eventDate) {
      return NextResponse.json({ error: "Data evento obbligatoria" }, { status: 400 });
    }
    if (!location) {
      return NextResponse.json({ error: "Location obbligatoria" }, { status: 400 });
    }

    const guests = Number(body.guests);
    if (!Number.isFinite(guests) || guests < 1 || guests > MAX_LENGTHS.guests) {
      return NextResponse.json({ error: "Numero ospiti non valido" }, { status: 400 });
    }

    let services = "[]";
    if (Array.isArray(body.services)) {
      const cleanServices = body.services
        .filter((s) => typeof s === "string")
        .map((s) => clean(s, 100))
        .filter((s) => s.length > 0)
        .slice(0, 20);
      services = JSON.stringify(cleanServices);
    }

    const submission = await db.contactSubmission.create({
      data: {
        fullName,
        eventType,
        eventDate,
        location,
        guests,
        services,
        notes: notes || null,
        status: "new",
      },
    });

    await logAudit("contact_submission_created", submission.id, undefined, req);

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (error: any) {
    console.error("Contact API error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno. Riprova o contattaci via WhatsApp." },
      { status: 500 },
    );
  }
}
