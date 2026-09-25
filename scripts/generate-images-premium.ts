/**
 * Phase 2 — additional luxury context images for richer visual storytelling.
 * Generates 6 more images covering service categories and Sicilian landscapes.
 */

import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/z/my-project/public/images";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const jobs = [
  {
    name: "wedding-reception-luxury",
    size: "1344x768",
    prompt:
      "Luxury wedding reception setup at night: elegant round tables with gold and white linens, gold candelabras with candles, crystal glasses, floral arrangements in white and gold, fairy lights overhead, dark atmosphere with warm golden ambient lighting, professional editorial wedding photography, sophisticated and premium, no people visible",
  },
  {
    name: "etna-volcano-landscape",
    size: "1344x768",
    prompt:
      "Dramatic Mount Etna volcano landscape at golden hour in Sicily: dark volcanic rock with golden grass, smoking crater in the distance, dramatic clouds, warm sunset light, professional landscape photography, cinematic, moody, high-end travel editorial",
  },
  {
    name: "sicilian-feast-table",
    size: "1024x1024",
    prompt:
      "Luxurious Sicilian feast table scene: traditional ceramic plates with arancini, cannoli, fresh seafood, pasta alla norma, colorful Sicilian caponata, candles, ceramic pitchers, warm golden lighting, dark background, professional food photography, editorial quality",
  },
  {
    name: "dj-setup-luxury-event",
    size: "1024x1024",
    prompt:
      "Professional DJ setup at a luxury event: elegant gold and black DJ booth with professional Pioneer equipment, gold and white LED lighting, dark ballroom background with gold ambient glow, premium event photography, sophisticated atmosphere, no people visible",
  },
  {
    name: "sunset-coast-taormina",
    size: "1344x768",
    prompt:
      "Stunning sunset over Taormina coastline in Sicily: dramatic orange and pink sky, Mediterranean sea, ancient Greek theatre silhouette, sophisticated travel photography, warm golden hour light, cinematic, editorial quality",
  },
  {
    name: "neon-set-premium",
    size: "1024x1024",
    prompt:
      "Hollywood-style photo set with neon 'Gold Events' sign in elegant gold light, sequin backdrop in gold and silver, professional studio lighting, dark luxury atmosphere, premium event photography, no people visible",
  },
];

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log(`Generating ${jobs.length} additional premium images…\n`);
  const zai = await ZAI.create();

  for (const job of jobs) {
    const outputPath = path.join(OUT_DIR, `${job.name}.png`);
    if (fs.existsSync(outputPath)) {
      console.log(`→ ${job.name} already exists, skipping`);
      continue;
    }
    try {
      console.log(`→ Generating ${job.name} (${job.size})…`);
      const response = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const buffer = Buffer.from(response.data[0].base64, "base64");
      fs.writeFileSync(outputPath, buffer);
      const sizeKB = Math.round(buffer.length / 1024);
      console.log(`✓ ${job.name} saved (${sizeKB} KB)`);
    } catch (error: any) {
      console.error(`✗ ${job.name}: ${error.message}`);
    }
    await sleep(8000);
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
