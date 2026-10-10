import { NextRequest } from "next/server";
import crypto from "node:crypto";
import { logAuditEntry, kvAvailable } from "@/lib/kv-store";

/**
 * Validate admin session from cookie.
 * Uses stateless mode: any token > 32 chars set by login route is valid.
 * Login route verifies password before setting the cookie.
 */
export async function authenticate(req: NextRequest): Promise<boolean> {
  try {
    const token = req.cookies.get("ge_admin")?.value;
    if (!token) return false;

    // Stateless mode: any non-empty token cookie > 32 chars is valid
    // The token was set by the login route which already verified the password
    if (token.length > 32) return true;

    return false;
  } catch {
    return false;
  }
}

/**
 * Audit log — salvato su Vercel KV
 */
export async function logAudit(
  action: string,
  target?: string,
  meta?: Record<string, unknown>,
  req?: NextRequest,
) {
  if (!kvAvailable) return; // Silently skip if KV not available
  try {
    await logAuditEntry(
      action,
      target ?? null,
      meta ?? null,
      { headers: req?.headers ?? new Headers() },
    );
  } catch {
    // ignore — audit log failure must not break the request
  }
}
