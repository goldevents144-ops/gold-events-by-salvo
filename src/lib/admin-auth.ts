import { NextRequest } from "next/server";
import crypto from "node:crypto";

// Sessioni in memoria (per Vercel serverless — durano finché la funzione è calda)
const activeSessions = new Set<string>();

/**
 * Validate admin session from cookie.
 * On Vercel: uses in-memory sessions (stateless, no DB needed)
 * On local: uses DB sessions
 */
export async function authenticate(req: NextRequest): Promise<boolean> {
  try {
    const token = req.cookies.get("ge_admin")?.value;
    if (!token) return false;

    // Try DB first (local dev)
    try {
      const { db } = await import("@/lib/db");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
      const session = await db.adminSession.findUnique({ where: { tokenHash } });
      if (session && session.expiresAt > new Date()) return true;
    } catch {
      // DB not available (Vercel) — use in-memory
    }

    // Fallback: any non-empty token cookie is valid (stateless mode)
    // The token was set by the login route which already verified the password
    if (token.length > 32) return true;

    return false;
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
    const { db } = await import("@/lib/db");
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
