// Vercel-safe database client
// On Vercel serverless, SQLite is not persistent, so we handle errors gracefully

import { PrismaClient } from "@prisma/client";

let dbClient: any = null;
let initFailed = false;

try {
  // Only init Prisma if not on Vercel, or if DATABASE_URL is set
  if (!process.env.VERCEL || process.env.DATABASE_URL) {
    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined;
    };
    dbClient = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = dbClient;
  }
} catch (e) {
  console.warn("DB init failed (expected on Vercel serverless):", e);
  initFailed = true;
}

// Proxy that silently catches all DB operations if DB is unavailable
export const db = new Proxy({} as any, {
  get(target, prop) {
    if (initFailed || !dbClient) {
      // Return a function that rejects (but caller has try/catch)
      return () => Promise.reject(new Error('DB not available'));
    }
    return dbClient[prop as keyof typeof dbClient];
  }
});
