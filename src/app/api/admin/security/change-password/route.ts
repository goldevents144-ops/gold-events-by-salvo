import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";
import { hashPassword, verifyPassword } from "@/lib/auth-crypto";

/**
 * POST /api/admin/security/change-password
 * Body: { currentPassword: string, newPassword: string }
 *
 * Allows the admin to change their own password from the panel.
 * The current password is verified first.
 * The new password is hashed with bcrypt (12 rounds) and stored.
 */

const MIN_PASSWORD_LENGTH = 8;

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body as {
      currentPassword?: string;
      newPassword?: string;
    };

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Password corrente e nuova password sono obbligatorie" },
        { status: 400 },
      );
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `La nuova password deve avere almeno ${MIN_PASSWORD_LENGTH} caratteri` },
        { status: 400 },
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "La nuova password deve essere diversa da quella attuale" },
        { status: 400 },
      );
    }

    // Verify current password
    const cred = await db.adminCredential.findUnique({
      where: { id: "singleton" },
    });
    if (!cred?.passwordHash) {
      return NextResponse.json(
        { error: "Credenziali non inizializzate" },
        { status: 500 },
      );
    }

    const valid = await verifyPassword(currentPassword, cred.passwordHash);
    if (!valid) {
      await logAudit("password_change_failed", undefined, { reason: "wrong_current" }, req);
      return NextResponse.json(
        { error: "Password corrente non valida" },
        { status: 401 },
      );
    }

    // Hash new password with bcrypt (12 rounds)
    const newHash = await hashPassword(newPassword);

    await db.adminCredential.update({
      where: { id: "singleton" },
      data: { passwordHash: newHash },
    });

    await logAudit("password_changed", undefined, undefined, req);

    return NextResponse.json({
      ok: true,
      message: "Password cambiata con successo. Usa la nuova password al prossimo login.",
    });
  } catch (error: any) {
    console.error("Change password error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 },
    );
  }
}
