import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";
import { listPartnerSubmissions, kvAvailable } from "@/lib/kv-store";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!kvAvailable) {
    return NextResponse.json({ partners: [] });
  }
  try {
    const partners = await listPartnerSubmissions(100);
    return NextResponse.json({ partners });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
