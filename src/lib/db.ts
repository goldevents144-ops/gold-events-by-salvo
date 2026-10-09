// Vercel-safe database client
// On Vercel serverless, SQLite is read-only, so we handle errors gracefully
// In production without a real DB, chat/submissions return friendly errors

import { PrismaClient } from "@prisma/client";

let dbClient: any = null;
let initFailed = false;
let initReason = "";

try {
  // Only init Prisma if not on Vercel, or if DATABASE_URL is set (external DB)
  if (!process.env.VERCEL || process.env.DATABASE_URL) {
    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined;
    };
    dbClient = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = dbClient;
  } else {
    initFailed = true;
    initReason = "Vercel environment without DATABASE_URL — SQLite not supported on serverless";
  }
} catch (e: any) {
  console.warn("DB init failed:", e?.message);
  initFailed = true;
  initReason = e?.message || "Unknown error";
}

// Flag to check if DB is available
export const dbAvailable = !initFailed && !!dbClient;
export const dbUnavailableReason = initReason;

// Proxy that silently catches all DB operations if DB is unavailable
export const db = new Proxy({} as any, {
  get(_target, prop) {
    if (initFailed || !dbClient) {
      // Return a function that rejects (caller should have try/catch)
      return () => Promise.reject(new Error("DB not available"));
    }
    return dbClient[prop as keyof typeof dbClient];
  },
});
