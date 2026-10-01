import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ media: [] });
}

export async function POST(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, message: "Upload disponibile solo in locale" });
}
