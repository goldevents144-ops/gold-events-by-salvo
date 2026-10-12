import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";
import { listSubmissions } from "@/lib/kv-store";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const status = req.nextUrl.searchParams.get("status") || undefined;
    const submissions = await listSubmissions(status ? { status } : undefined, 100);
    return NextResponse.json({ submissions });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
