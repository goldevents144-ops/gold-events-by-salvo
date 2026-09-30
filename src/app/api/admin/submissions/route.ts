import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { db } = await import("@/lib/db");
    const status = req.nextUrl.searchParams.get("status") ?? undefined;
    const submissions = await db.contactSubmission.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ submissions });
  } catch {
    // DB not available on Vercel — return empty
    return NextResponse.json({ submissions: [] });
  }
}
