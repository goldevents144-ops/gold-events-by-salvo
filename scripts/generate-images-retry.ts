/**
 * Retry image generation for the 3 failed images.
 * Uses valid sizes and adds delays to avoid rate limits.
 */

import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/z/my-project/public/images";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const retryJobs = [
  {
    name: "hero-etna-dusk",
    // 1440x720 rejected because 720 isn't a multiple of 32. Use 1344x768.
    size: "1344x768",
    prompt:
      "Cinematic luxury event scene at dusk: elegant outdoor wedding reception on a terrace in Sicily with Mount Etna silhouette in the background, warm gold and amber sunset light, black and gold color palette, fairy lights and gold geometric arches, sophisticated table setting, professional photography, dark moody atmosphere with gold accents, high-end editorial style, no people visible",
  },
  {
    name: "etna-sunset-party",
    size: "1024x1024",
    prompt:
      "Elegant sunset aperitif on the slopes of Mount Etna in Sicily: golden hour light, sophisticated cocktail bar setup, gold and black luxury decor, string lights, Etna volcanic landscape in background, warm amber tones, professional event photography, dark moody atmosphere with gold highlights, no people visible",
  },
  {
    name: "beach-coast-luxury",
    size: "1024x1024",
    prompt:
      "Luxury welcome party on a Sicilian beach terrace at sunset: Taormina coastline, elegant white and gold lounge furniture, champagne glasses, string lights overhead, Ionian sea in background, warm gold and pink sunset tones, professional event photography, sophisticated atmosphere, no people visible",
  },
];

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log(`Retrying ${retryJobs.length} failed images…`);
  const zai = await ZAI.create();

  for (const job of retryJobs) {
    const outputPath = path.join(OUT_DIR, `${job.name}.png`);
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
    // 8s delay between requests to avoid 429
    await sleep(8000);
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
