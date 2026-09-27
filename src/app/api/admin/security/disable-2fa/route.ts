import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";
import { verifyTOTP } from "@/lib/auth-crypto";

/**
 * POST /api/admin/security/disable-2fa
 * Body: { token: string }
 *
 * Disables 2FA. Requires a valid TOTP token (or recovery code) to prevent accidental lockout.
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
        { error: "Token TOTP richiesto per disattivare 2FA" },
        { status: 400 },
      );
    }

    const cred = await db.adminCredential.findUnique({
      where: { id: "singleton" },
    });
    if (!cred?.totpSecret) {
      return NextResponse.json(
        { error: "2FA non è attivo" },
        { status: 400 },
      );
    }

    // Check TOTP or recovery codes
    const validTOTP = verifyTOTP(cred.totpSecret, token);

    let validRecovery = false;
    if (!validTOTP && cred.recoveryCodes) {
      const codes: string[] = JSON.parse(cred.recoveryCodes);
      for (let i = 0; i < codes.length; i++) {
        if (await import("bcryptjs").then(b => b.compare(token, codes[i]))) {
          // Consume the recovery code (remove from list)
          codes.splice(i, 1);
          await db.adminCredential.update({
            where: { id: "singleton" },
            data: { recoveryCodes: JSON.stringify(codes) },
          });
          validRecovery = true;
          break;
        }
      }
    }

    if (!validTOTP && !validRecovery) {
      return NextResponse.json(
        { error: "Token non valido. Impossibile disattivare 2FA." },
        { status: 401 },
      );
    }

    await db.adminCredential.update({
      where: { id: "singleton" },
      data: {
        totpSecret: null,
        totpEnrolledAt: null,
        recoveryCodes: null,
      },
    });

    await logAudit("2fa_disabled", undefined, undefined, req);

    return NextResponse.json({
      ok: true,
      message: "2FA disattivato. Login ora richiede solo la password.",
    });
  } catch (error: any) {
    console.error("Disable 2FA error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 },
    );
  }
}
