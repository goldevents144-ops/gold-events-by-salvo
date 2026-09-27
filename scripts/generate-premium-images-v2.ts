/**
 * Generate premium images for the two upgraded services:
 * - Video Guest Book Phone Experience
 * - 360 Video Booth Experience
 *
 * Run: bun /home/z/my-project/scripts/generate-premium-images-v2.ts
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
    name: "video-guest-book",
    size: "1024x1024",
    prompt:
      "Luxury event scene: elegant vintage rotary telephone on a beautifully decorated table with candles, flowers, and a small sign saying 'Lift to record'. The phone has a small camera lens integrated, soft golden ambient lighting, dark background with gold accents, professional event photography, sophisticated atmosphere, no people, cinematic depth of field",
  },
  {
    name: "video-booth-360-premium",
    size: "1024x1024",
    prompt:
      "Modern 360 video booth platform at a luxury wedding reception: elegant circular rotating platform with gold LED ring light, sophisticated dark ballroom with gold ambient lighting, professional camera on arm, guests in evening wear blurred in background, professional event photography, premium and cinematic atmosphere, gold and black color palette",
  },
];

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log(`Generating ${jobs.length} premium images…\n`);
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
