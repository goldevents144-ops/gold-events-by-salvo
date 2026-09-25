import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "node:crypto";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("ge_admin")?.value;
    if (token) {
      const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      await db.adminSession.deleteMany({ where: { tokenHash } }).catch(() => {});
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.delete("ge_admin");
    return response;
  } catch {
    return NextResponse.json({ ok: true });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("ge_admin")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const session = await db.adminSession.findUnique({
      where: { tokenHash },
    });
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
