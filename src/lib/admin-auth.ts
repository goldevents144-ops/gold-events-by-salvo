import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import crypto from "node:crypto";

/**
 * Validate admin session from cookie.
 * Returns true if the request has a valid, non-expired admin session.
 */
export async function authenticate(req: NextRequest): Promise<boolean> {
  try {
    const token = req.cookies.get("ge_admin")?.value;
    if (!token) return false;
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const session = await db.adminSession.findUnique({ where: { tokenHash } });
    if (!session || session.expiresAt < new Date()) return false;
    return true;
  } catch {
    return false;
  }
}

export async function logAudit(
  action: string,
  target?: string,
  meta?: Record<string, unknown>,
  req?: NextRequest,
) {
  try {
    await db.auditLog.create({
      data: {
        action,
        target,
        meta: meta ? JSON.stringify(meta) : null,
        userAgent: req?.headers.get("user-agent") ?? null,
      },
    });
  } catch {
    // ignore — audit log failure must not break the request
  }
}
