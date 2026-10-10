import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";
import { listAuditLogs, kvAvailable } from "@/lib/kv-store";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!kvAvailable) {
    return NextResponse.json({ logs: [] });
  }
  try {
    const logs = await listAuditLogs(200);
    return NextResponse.json({ logs });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
