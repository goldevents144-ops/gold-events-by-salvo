import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  dbInitialized: boolean | undefined
}

function getDbPath(): string {
  // On Vercel, use /tmp (writable). On local, use the project directory.
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }
  if (process.env.VERCEL) {
    return 'file:/tmp/custom.db'
  }
  return 'file:./db/custom.db'
}

function initDatabase() {
  if (globalForPrisma.dbInitialized) return

  const dbUrl = getDbPath()
  const dbPath = dbUrl.replace('file:', '')

  // On Vercel: create DB if it doesn't exist
  if (process.env.VERCEL && !fs.existsSync(dbPath)) {
    try {
      // Ensure directory exists
      const dir = path.dirname(dbPath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      // Push schema to create tables
      execSync('npx prisma db push --accept-data-loss', {
        stdio: 'pipe',
        env: { ...process.env, DATABASE_URL: dbUrl },
      })
      // Seed admin credentials
      seedDatabase()
      globalForPrisma.dbInitialized = true
    } catch (e) {
      console.error('DB init failed:', e)
    }
  }
}

async function seedDatabase() {
  try {
    const { hashPassword } = await import('./auth-crypto')
    // Create admin credential if not exists
    const existing = await globalForPrisma.prisma?.adminCredential.findUnique({
      where: { id: 'singleton' }
    })
    if (!existing) {
      const hash = await hashPassword('salvo2026')
      await globalForPrisma.prisma?.adminCredential.create({
        data: { id: 'singleton', passwordHash: hash }
      })
    }
    // Create Salvo partner if not exists
    const partner = await globalForPrisma.prisma?.partnerSubmission.findFirst({
      where: { referentName: 'Salvo Piemonte' }
    })
    if (!partner) {
      await globalForPrisma.prisma?.partnerSubmission.create({
        data: {
          businessName: 'Gold Events by Salvo',
          activityType: 'Organizzazione eventi',
          location: 'Adrano (Catania), Sicilia',
          referentName: 'Salvo Piemonte',
          referentPhone: '+39 344 232 2176',
          referentEmail: 'goldeventssicilyexperience@outlook.com',
          capacity: 'Flessibile — eventi ovunque',
          hasPower: 'si',
          b2bRates: 'Prezzi su richiesta',
          status: 'approved',
        },
      })
    }
  } catch (e) {
    console.error('Seed failed:', e)
  }
}

function createPrismaClient() {
  const client = new PrismaClient()
  // Initialize database on Vercel
  if (process.env.VERCEL) {
    initDatabase()
  }
  return client
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
