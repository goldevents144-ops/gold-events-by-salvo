import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";
import { verifyTOTP } from "@/lib/auth-crypto";

/**
 * POST /api/admin/security/verify-2fa
 * Body: { token: string }
 *
 * Finalizes 2FA activation by verifying the first TOTP token from the user's authenticator app.
 * Sets totpEnrolledAt = now, marking 2FA as active.
 */

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { token } = body as { token?: string };

    if (!token) {
      return NextResponse.json(
        { error: "Token TOTP richiesto" },
        { status: 400 },
      );
    }

    const cred = await db.adminCredential.findUnique({
      where: { id: "singleton" },
    });
    if (!cred?.totpSecret) {
      return NextResponse.json(
        { error: "2FA non inizializzato. Esegui prima /setup-2fa" },
        { status: 400 },
      );
    }

    const valid = verifyTOTP(cred.totpSecret, token);
    if (!valid) {
      await logAudit("2fa_verify_failed", undefined, undefined, req);
      return NextResponse.json(
        { error: "Token TOTP non valido" },
        { status: 401 },
      );
    }

    await db.adminCredential.update({
      where: { id: "singleton" },
      data: { totpEnrolledAt: new Date() },
    });

    await logAudit("2fa_enabled", undefined, undefined, req);

    return NextResponse.json({
      ok: true,
      message: "2FA attivato con successo. Da ora ogni login richiederà il codice TOTP.",
    });
  } catch (error: any) {
    console.error("Verify 2FA error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 },
    );
  }
}
