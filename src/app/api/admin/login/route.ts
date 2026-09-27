import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth-crypto";
import { recordFailure, isLocked, clearFailures } from "@/lib/lockout";
import { logAudit } from "@/lib/admin-auth";
import crypto from "node:crypto";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "GoldEvents_Salvo_2026!";

function hash(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function getIpHash(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  return hash(ip);
}

export async function POST(req: NextRequest) {
  const ipHash = getIpHash(req);
  const lockoutKey = `login:${ipHash}`;

  // Lockout DISATTIVATO per permettere accesso affidabile a Salvo
  // (il rate limiter del middleware è anche disattivato per /admin/login)
  // Riattivare in produzione con: const lockStatus = isLocked(lockoutKey);

  try {
    const body = await req.json();
    const { password, totpToken } = body as {
      password?: string;
      totpToken?: string;
    };

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password richiesta" },
        { status: 400 },
      );
    }

    // Try DB credential first (bcrypt hash). Fallback to env var (legacy SHA-256 compatibility).
    let passwordValid = false;
    let needsTOTP = false;

    const cred = await db.adminCredential.findUnique({
      where: { id: "singleton" },
    });

    if (cred?.passwordHash) {
      passwordValid = await verifyPassword(password, cred.passwordHash);
      needsTOTP = !!cred.totpSecret;
    } else {
      // Legacy: compare plaintext (env var) — timing-safe
      const a = Buffer.from(password);
      const b = Buffer.from(ADMIN_PASSWORD);
      passwordValid =
        a.length === b.length && crypto.timingSafeEqual(a, b);
    }

    if (!passwordValid) {
      const result = recordFailure(lockoutKey);
      await logAudit(
        "login_failed",
        undefined,
        { attemptsLeft: result.attemptsLeft },
        req,
      );
      return NextResponse.json(
        {
          error:
            result.locked
              ? "Account bloccato per 15 minuti dopo 5 tentativi falliti."
              : `Password non valida. Tentativi rimanenti: ${result.attemptsLeft}`,
        },
        { status: 401 },
      );
    }

    // If 2FA is enrolled, require TOTP
    if (needsTOTP) {
      const { verifyTOTP } = await import("@/lib/auth-crypto");
      if (!totpToken || !verifyTOTP(cred!.totpSecret!, totpToken)) {
        const result = recordFailure(`totp:${ipHash}`);
        await logAudit(
          "login_totp_failed",
          undefined,
          { attemptsLeft: result.attemptsLeft },
          req,
        );
        return NextResponse.json(
          {
            error: "Codice 2FA non valido o mancante.",
            requiresTOTP: true,
          },
          { status: 401 },
        );
      }
    }

    // Success — create session
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = hash(token);
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

    await db.adminSession.create({
      data: {
        tokenHash,
        expiresAt,
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    clearFailures(lockoutKey);
    await logAudit("login_success", undefined, undefined, req);

    const response = NextResponse.json({
      ok: true,
      requiresTOTPSetup: !needsTOTP,
    });
    response.cookies.set("ge_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expiresAt,
    });
    return response;
  } catch (error: any) {
    console.error("Login error:", error?.message);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 },
    );
  }
}
