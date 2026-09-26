/**
 * Bootstrap admin credentials — run once on deploy.
 * Creates the singleton AdminCredential row with bcrypt-hashed password.
 *
 * Run: bun /home/z/my-project/scripts/bootstrap-admin.ts
 */

import { db } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth-crypto";

async function main() {
  const password =
    process.env.ADMIN_PASSWORD || "GoldEvents_Salvo_2026!";

  console.log("Bootstrapping admin credentials…");
  const passwordHash = await hashPassword(password);

  await db.adminCredential.upsert({
    where: { id: "singleton" },
    update: { passwordHash },
    create: { id: "singleton", passwordHash },
  });

  console.log("✓ Admin password hashed with bcrypt (12 rounds)");
  console.log(`✓ Password set: ${password.replace(/./g, "*")}`);
  console.log("");
  console.log("Next steps:");
  console.log("1. Login at /admin/login with the password");
  console.log("2. Enroll 2FA at /admin/security");
}

main()
  .catch((e) => {
    console.error("Bootstrap failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
