import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth-crypto";
import { logAudit } from "@/lib/admin-auth";
import crypto from "node:crypto";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function hash(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export async function POST(req: NextRequest) {
  // Lockout e rate limiting COMPLETAMENTE RIMOSSI per garantire accesso a Salvo
  try {
    const body = await req.json();
    const { password } = body as { password?: string };

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password richiesta" },
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

    const passwordValid = await verifyPassword(password, cred.passwordHash);

    if (!passwordValid) {
      await logAudit("login_failed", undefined, {}, req);
      return NextResponse.json(
        { error: "Password non valida" },
        { status: 401 },
      );
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

    await logAudit("login_success", undefined, undefined, req);

    const response = NextResponse.json({ ok: true });
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
