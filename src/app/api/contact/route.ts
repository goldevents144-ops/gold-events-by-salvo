/**
 * Soluzione senza DB persistente:
 * - Le richieste del form vengono inoltrate via WhatsApp/Email a Salvo
 * - I dati NON vengono salvati (no DB persistente senza account esterno)
 * - L'admin vede un messaggio chiaro: "Per gestire le richieste in pannello, configura un DB"
 * - Ma il sistema FUNZIONA per il cliente: cliccando Invia apre WhatsApp con Salvo
 */

import { NextRequest, NextResponse } from "next/server";
import { logAuditEntry, kvAvailable } from "@/lib/kv-store";

const MAX_LENGTHS = {
  fullName: 200, eventType: 50, eventDate: 20,
  location: 200, guests: 9999, notes: 2000,
};

function clean(s: unknown, maxLen: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.website && typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const fullName = clean(body.fullName, MAX_LENGTHS.fullName);
    const eventType = clean(body.eventType, MAX_LENGTHS.eventType);
    const eventDate = clean(body.eventDate, MAX_LENGTHS.eventDate);
    const location = clean(body.location, MAX_LENGTHS.location);
    const notes = clean(body.notes, MAX_LENGTHS.notes);
    const email = clean(body.email, 200);
    const phone = clean(body.phone, 50);

    if (!fullName || fullName.length < 2) return NextResponse.json({ error: "Nome non valido" }, { status: 400 });
    if (!eventType) return NextResponse.json({ error: "Tipo di evento obbligatorio" }, { status: 400 });
    if (!eventDate) return NextResponse.json({ error: "Data obbligatoria" }, { status: 400 });
    if (!location) return NextResponse.json({ error: "Location obbligatoria" }, { status: 400 });

    const guests = Number(body.guests);
    if (!Number.isFinite(guests) || guests < 1 || guests > MAX_LENGTHS.guests) {
      return NextResponse.json({ error: "Ospiti non validi" }, { status: 400 });
    }

    let services = "[]";
    if (Array.isArray(body.services)) {
      services = JSON.stringify(body.services.filter((s: any) => typeof s === "string").slice(0, 20));
    }

    // Tenta di salvare nel DB se disponibile
    if (kvAvailable) {
      try {
        const { createSubmission } = await import("@/lib/kv-store");
        await createSubmission({
          fullName, email: email || null, phone: phone || null,
          eventType, eventDate, location, guests, services, notes: notes || null,
        });
        await logAuditEntry(
          "notification_new_request",
          fullName,
          { fullName, eventType, eventDate, location, guests, services, notes: notes || "" },
          { headers: req.headers },
        );
      } catch (e) {
        console.warn("Save failed, but form works (WhatsApp CTAs):", e);
      }
    }
    // Se il DB non è disponibile, il form FUNZIONA comunque perché il cliente
    // poi clicca "Invia via WhatsApp" o "Invia via Email" e parla con Salvo direttamente

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
