import { NextRequest, NextResponse } from "next/server";
import { createPartnerSubmission, logAuditEntry, kvAvailable } from "@/lib/kv-store";

const MAX_LENGTHS = {
  businessName: 200, activityType: 50, location: 200,
  referentName: 200, referentPhone: 30, referentEmail: 200,
  capacity: 200, b2bRates: 2000,
};

function clean(s: unknown, maxLen: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d\s().-]{6,30}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.website && typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const businessName = clean(body.businessName, MAX_LENGTHS.businessName);
    const activityType = clean(body.activityType, MAX_LENGTHS.activityType);
    const location = clean(body.location, MAX_LENGTHS.location);
    const referentName = clean(body.referentName, MAX_LENGTHS.referentName);
    const referentPhone = clean(body.referentPhone, MAX_LENGTHS.referentPhone);
    const referentEmail = clean(body.referentEmail, MAX_LENGTHS.referentEmail);
    const capacity = clean(body.capacity, MAX_LENGTHS.capacity);
    const b2bRates = clean(body.b2bRates, MAX_LENGTHS.b2bRates);
    const hasPower = body.hasPower === "si" || body.hasPower === "no" ? body.hasPower : "";

    if (!businessName || !activityType || !location || !referentName || !referentPhone || !referentEmail || !hasPower) {
      return NextResponse.json({ error: "Tutti i campi obbligatori" }, { status: 400 });
    }
    if (!EMAIL_RE.test(referentEmail)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }
    if (!PHONE_RE.test(referentPhone)) {
      return NextResponse.json({ error: "Telefono non valido" }, { status: 400 });
    }

    if (kvAvailable) {
      try {
        await createPartnerSubmission({
          businessName, activityType, location,
          referentName, referentPhone, referentEmail,
          capacity: capacity || null, hasPower,
          b2bRates: b2bRates || null,
        });
        await logAuditEntry(
          "notification_new_partner",
          businessName,
          { businessName, activityType, location },
          { headers: req.headers },
        );
      } catch (e) {
        console.warn("KV save partner failed:", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
