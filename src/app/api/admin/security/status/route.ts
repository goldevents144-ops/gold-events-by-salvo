import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate } from "@/lib/admin-auth";

/**
 * GET /api/admin/security/status
 * Returns current 2FA status + security info.
 */

export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const cred = await db.adminCredential.findUnique({
      where: { id: "singleton" },
    });

    return NextResponse.json({
      has2FA: !!cred?.totpEnrolledAt,
      twoFactorEnrolledAt: cred?.totpEnrolledAt ?? null,
      hasRecoveryCodes: !!cred?.recoveryCodes,
      passwordLastChanged: cred?.updatedAt ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 },
    );
  }
}
