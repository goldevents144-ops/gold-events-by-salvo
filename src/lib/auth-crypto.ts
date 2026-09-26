/**
 * Auth security helpers — bcrypt password hashing + TOTP 2FA.
 *
 * WHY BCRYPT INSTEAD OF SHA-256:
 * - bcrypt is intentionally SLOW (~100ms per hash) — brute force becomes impractical
 * - SHA-256 is intentionally FAST (~0.001ms) — vulnerable to offline brute force
 * - bcrypt includes a salt automatically (no separate salt column needed)
 * - bcrypt work factor is tunable (12 rounds ≈ 250ms, 14 rounds ≈ 1s)
 *
 * WHY TOTP:
 * - Even if password is leaked, attacker needs the TOTP secret (from authenticator app)
 * - RFC 6238 standard, works with Google Authenticator, Authy, 1Password, etc.
 */

import bcrypt from "bcryptjs";
import * as OTPAuth from "otpauth";

const BCRYPT_ROUNDS = 12; // ~250ms per hash — slow enough to deter brute force

/** Hash a password using bcrypt with random salt. */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/** Compare a plaintext password against a bcrypt hash (timing-safe). */
export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

/**
 * Generate a new TOTP secret for 2FA.
 * Returns base32 secret + otpauth URL (for QR code).
 */
export function generateTOTPSecret(email: string): {
  secret: string;
  otpauthUrl: string;
} {
  const totp = new OTPAuth.TOTP({
    issuer: "Gold Events by Salvo",
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: new OTPAuth.Secret({ size: 20 }),
  });
  return {
    secret: totp.secret.base32,
    otpauthUrl: totp.toString(),
  };
}

/**
 * Verify a TOTP token against a secret.
 * Allows 1 step before/after to absorb clock drift (±30s).
 */
export function verifyTOTP(
  secret: string,
  token: string,
): boolean {
  try {
    const totp = new OTPAuth.TOTP({
      issuer: "Gold Events by Salvo",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secret),
    });
    const delta = totp.validate({
      token: token.replace(/\s/g, ""),
      window: 1,
    });
    return delta !== null;
  } catch {
    return false;
  }
}

/**
 * Generate a recovery code (for user to print when setting up 2FA).
 * Format: XXXX-XXXX-XXXX-XXXX
 */
export function generateRecoveryCode(): string {
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) out += "-";
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
