import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const partners = await db.partnerSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ partners });
}
