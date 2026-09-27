/**
 * Pulisce tutte le sessioni di test dal DB e inserisce i dati REALI di Salvo
 * come Partner ufficiale di Gold Events Sicily Experience.
 *
 * Esegui: bun /home/z/my-project/scripts/seed-salvo-partner.ts
 */

import { db } from "../src/lib/db";

async function main() {
  console.log("🧹 Pulizia sessioni di test dal DB…");

  // Pulisci tutte le tabelle con dati di test
  const deleted = {
    contacts: await db.contactSubmission.deleteMany({}),
    partners: await db.partnerSubmission.deleteMany({}),
    chats: await db.chatSession.deleteMany({}),
    audits: await db.auditLog.deleteMany({}),
  };

  console.log(`  - ${deleted.contacts.count} richieste contatti eliminate`);
  console.log(`  - ${deleted.partners.count} candidature partner eliminate`);
  console.log(`  - ${deleted.chats.count} sessioni chat eliminate`);
  console.log(`  - ${deleted.audits.count} log audit eliminati`);

  console.log("\n👑 Inserimento dati reali di Salvo Piemonte come Partner…");

  // Inserisci Salvo come Partner "approvato" — è il fondatore del brand
  const salvo = await db.partnerSubmission.create({
    data: {
      businessName: "Gold Events by Salvo",
      activityType: "Organizzazione eventi",
      location: "Adrano (Catania), Sicilia",
      referentName: "Salvo Piemonte",
      referentPhone: "+39 344 232 2176",
      referentEmail: "goldeventssicilyexperience@outlook.com",
      capacity: "Flessibile — eventi da 20 a 500+ ospiti in tutta la Sicilia Orientale",
      hasPower: "si",
      b2bRates: "Bundle conduzione da 350€ a 600€ + extra tecnologici (Air Mirror, Video Booth 360, ecc.). Tariffe personalizzate per partner e destination wedding.",
      status: "approved",
      adminNotes: "FONDATORE DEL BRAND — Profilo principale di Gold Events by Salvo e Gold Events Sicily Experience. Attivo come showman, presentatore e curatore di esperienze in Sicilia Orientale.",
    },
  });

  console.log(`  ✓ Partner creato: ${salvo.businessName}`);
  console.log(`    Referente: ${salvo.referentName}`);
  console.log(`    Tel: ${salvo.referentPhone}`);
  console.log(`    Email: ${salvo.referentEmail}`);
  console.log(`    Status: ${salvo.status}`);

  // Crea audit log per tracciare l'azione
  await db.auditLog.create({
    data: {
      action: "seed_salvo_partner",
      target: salvo.id,
      meta: JSON.stringify({ reason: "Initial setup with real Salvo data" }),
    },
  });

  console.log("\n✅ Operazione completata. DB pulito + Salvo inserito come partner approvato.");

  // Verifica finale
  const counts = {
    contacts: await db.contactSubmission.count(),
    partners: await db.partnerSubmission.count(),
    chats: await db.chatSession.count(),
    audits: await db.auditLog.count(),
  };
  console.log("\n📊 Stato finale DB:");
  console.log(`  - Contatti: ${counts.contacts}`);
  console.log(`  - Partner: ${counts.partners}`);
  console.log(`  - Chat: ${counts.chats}`);
  console.log(`  - Audit log: ${counts.audits}`);
}

main()
  .catch((e) => {
    console.error("Errore:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
