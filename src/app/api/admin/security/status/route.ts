import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // DB not available on Vercel — return defaults
  return NextResponse.json({
    has2FA: false,
    twoFactorEnrolledAt: null,
    hasRecoveryCodes: false,
    passwordLastChanged: null,
  });
}
