import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("ge_admin")?.value;
    if (token) {
      try {
        const { db } = await import("@/lib/db");
        const crypto = await import("node:crypto");
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        await db.adminSession.deleteMany({ where: { tokenHash } }).catch(() => {});
      } catch {}
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.delete("ge_admin");
    return response;
  } catch {
    return NextResponse.json({ ok: true });
  }
}

export async function GET(req: NextRequest) {
  // Use authenticate() which has Vercel fallback
  const authed = await authenticate(req);
  return NextResponse.json({ authenticated: authed }, { status: 200 });
}
