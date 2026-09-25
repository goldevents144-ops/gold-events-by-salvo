import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const status = req.nextUrl.searchParams.get("status") ?? undefined;
    const submissions = await db.contactSubmission.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ submissions });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 },
    );
  }
}
