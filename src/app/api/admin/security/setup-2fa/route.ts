import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";
import { hashPassword, verifyPassword, generateTOTPSecret, generateRecoveryCode } from "@/lib/auth-crypto";
import bcrypt from "bcryptjs";

/**
 * POST /api/admin/security/setup-2fa
 * Body: { password: string }
 * Response: { secret, otpauthUrl, recoveryCodes: string[] }
 *
 * Generates a new TOTP secret + 10 recovery codes.
 * NOTE: 2FA is NOT yet enabled — user must call /verify-2fa with a valid TOTP to finalize.
 */

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { password } = body as { password?: string };

    if (!password) {
      return NextResponse.json(
        { error: "Password corrente richiesta per attivare 2FA" },
        { status: 400 },
      );
    }

    const cred = await db.adminCredential.findUnique({
      where: { id: "singleton" },
    });
    if (!cred?.passwordHash) {
      return NextResponse.json(
        { error: "Credenziali non inizializzate" },
        { status: 500 },
      );
    }

    const valid = await verifyPassword(password, cred.passwordHash);
    if (!valid) {
      await logAudit("2fa_setup_failed", undefined, { reason: "wrong_password" }, req);
      return NextResponse.json(
        { error: "Password corrente non valida" },
        { status: 401 },
      );
    }

    const { secret, otpauthUrl } = generateTOTPSecret("admin@goldevents.it");

    const recoveryCodes: string[] = [];
    const hashedRecoveryCodes: string[] = [];
    for (let i = 0; i < 10; i++) {
      const code = generateRecoveryCode();
      recoveryCodes.push(code);
      hashedRecoveryCodes.push(await bcrypt.hash(code, 10));
    }

    await db.adminCredential.update({
      where: { id: "singleton" },
      data: {
        totpSecret: secret,
        recoveryCodes: JSON.stringify(hashedRecoveryCodes),
      },
    });

    await logAudit("2fa_setup_initiated", undefined, undefined, req);

    return NextResponse.json({
      secret,
      otpauthUrl,
      recoveryCodes,
      message: "2FA setup avviato. Verifica con un codice TOTP per finalizzare.",
    });
  } catch (error: any) {
    console.error("Setup 2FA error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 },
    );
  }
}
