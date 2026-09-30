import { db } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth-crypto";

async function main() {
  // Verifica se esiste già il partner di Salvo
  const existing = await db.partnerSubmission.findFirst({
    where: { referentName: "Salvo Piemonte" }
  });
  
  if (!existing) {
    await db.partnerSubmission.create({
      data: {
        businessName: "Gold Events by Salvo",
        activityType: "Organizzazione eventi",
        location: "Adrano (Catania), Sicilia",
        referentName: "Salvo Piemonte",
        referentPhone: "+39 344 232 2176",
        referentEmail: "goldeventssicilyexperience@outlook.com",
        capacity: "Flessibile — eventi da 20 a 500+ ospiti",
        hasPower: "si",
        b2bRates: "Prezzi su richiesta",
        status: "approved",
      },
    });
    console.log("✓ Partner Salvo creato");
  }

  // Verifica se esiste già la credenziale admin
  const cred = await db.adminCredential.findUnique({ where: { id: "singleton" } });
  if (!cred) {
    const hash = await hashPassword("salvo2026");
    await db.adminCredential.create({
      data: { id: "singleton", passwordHash: hash },
    });
    console.log("✓ Password admin creata: salvo2026");
  }
}

main().catch(console.error).finally(() => process.exit(0));
