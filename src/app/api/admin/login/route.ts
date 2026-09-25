import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "node:crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "GoldEvents_Salvo_2026!";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h

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

    // Timing-safe comparison
    const a = Buffer.from(password);
    const b = Buffer.from(ADMIN_PASSWORD);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      // Log failed attempt
      await db.auditLog.create({
        data: {
          action: "login_failed",
          ipHash: hash(req.headers.get("x-forwarded-for") ?? "unknown"),
          userAgent: req.headers.get("user-agent") ?? null,
        },
      });
      return NextResponse.json(
        { error: "Password non valida" },
        { status: 401 },
      );
    }

    // Create session
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

    await db.auditLog.create({
      data: {
        action: "login_success",
        ipHash: hash(req.headers.get("x-forwarded-for") ?? "unknown"),
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

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
