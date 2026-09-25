import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const logs = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return NextResponse.json({ logs });
}
