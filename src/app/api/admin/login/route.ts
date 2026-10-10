import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { logAuditEntry, kvAvailable } from "@/lib/kv-store";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "salvo2026";

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

    // Create session token (stateless)
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

    // Log audit entry (only if KV available)
    if (kvAvailable) {
      try {
        await logAuditEntry("admin_login", null, { expiresAt: expiresAt.toISOString() }, { headers: req.headers });
      } catch {}
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
