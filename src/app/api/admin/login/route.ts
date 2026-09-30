import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "salvo2026";

function hash(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body as { password?: string };

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password richiesta" },
        { status: 400 },
      );
    }

    // Simple password check (works without database on Vercel)
    const a = Buffer.from(password);
    const b = Buffer.from(ADMIN_PASSWORD);
    const passwordValid = a.length === b.length && crypto.timingSafeEqual(a, b);

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Password non valida" },
        { status: 401 },
      );
    }

    // Create session token (stateless, no DB needed)
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

    // Try to save session in DB (optional, won't fail if DB unavailable)
    try {
      const { db } = await import("@/lib/db");
      const tokenHash = hash(token);
      await db.adminSession.create({
        data: {
          tokenHash,
          expiresAt,
          userAgent: req.headers.get("user-agent") ?? null,
        },
      });
    } catch {
      // DB not available (Vercel serverless) — session is stateless
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("ge_admin", token, {
      httpOnly: true,
      secure: true,
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
