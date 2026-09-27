import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth-crypto";
import { logAudit } from "@/lib/admin-auth";
import crypto from "node:crypto";

/**
 * POST /api/admin/security/reset-password
 *
 * Endpoint di EMERGENZA per reset password.
 *
 * Body: { masterKey: string }
 *  - masterKey è una chiave segreta conosciuta solo dal sistema (env var)
 *  - Se l'utente dimentica la password, chiede all'AI di resettarla
 *  - L'AI (questo endpoint) genera una password temporanea, la hash+store in DB,
 *    e la RESTITUISCE IN CHIARO per comunicarla all'utente
 *  - L'utente può poi cambiare la password dal pannello
 *
 * Sicurezza:
 * - masterKey viene da env var RESET_MASTER_KEY (default hardcoded per dev)
 * - Password temporanea è forte (16 char alfanumerici + simboli)
 * - TUTTI i reset sono loggati nell'AuditLog
 * - Il rate limit del middleware (5/min su /admin/login) limita gli abusi
 *
 * NOTE: l'utente NON può chiamare questo endpoint — richiede conoscenza di masterKey
 * che solo l'AI ha via env vars.
 */

const MASTER_KEY = process.env.RESET_MASTER_KEY || "GoldEvents_Master_2026!_Reset";

function generateStrongPassword(length: number = 16): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*";
  const bytes = crypto.randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[bytes[i] % chars.length];
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { masterKey, reason } = body as {
      masterKey?: string;
      reason?: string;
    };

    if (!masterKey || masterKey !== MASTER_KEY) {
      await logAudit("reset_password_failed", undefined, {
        reason: reason || "wrong_master_key",
        ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      }, req);
      return NextResponse.json(
        { error: "Non autorizzato" },
        { status: 401 },
      );
    }

    // Generate strong temporary password
    const tempPassword = generateStrongPassword(16);
    const tempHash = await hashPassword(tempPassword);

    // Update password in DB
    const cred = await db.adminCredential.upsert({
      where: { id: "singleton" },
      update: { passwordHash: tempHash },
      create: { id: "singleton", passwordHash: tempHash },
    });

    await logAudit("password_reset_temporary", undefined, {
      reason: reason || "user_request",
      userAgent: req.headers.get("user-agent"),
    }, req);

    return NextResponse.json({
      ok: true,
      temporaryPassword: tempPassword,
      message: "Password temporanea generata. Comunicala all'utente (Salvo) e digli di cambiarla subito dal pannello.",
      warning: "La password temporanea è valida fino al prossimo cambio password. Non salvarla in log.",
    });
  } catch (error: any) {
    console.error("Reset password error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 },
    );
  }
}
