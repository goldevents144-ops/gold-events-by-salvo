/**
 * Batch image generation for Gold Events by Salvo.
 * Generates luxury context-appropriate images for hero and key sections.
 *
 * Run with: bun /home/z/my-project/scripts/generate-images.ts
 */

import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/z/my-project/public/images";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

interface ImageJob {
  name: string;
  prompt: string;
  size: string;
}

const jobs: ImageJob[] = [
  {
    name: "hero-etna-dusk",
    size: "1440x720",
    prompt:
      "Cinematic luxury event scene at dusk: elegant outdoor wedding reception on a terrace in Sicily with Mount Etna silhouette in the background, warm gold and amber sunset light, black and gold color palette, fairy lights and gold geometric arches, sophisticated table setting, professional photography, dark moody atmosphere with gold accents, high-end editorial style, no people visible",
  },
  {
    name: "etna-wine-tasting",
    size: "1024x1024",
    prompt:
      "Luxury Etna wine tasting in a historic Sicilian cellar: stone walls, oak barrels, candlelight, two elegant glasses of red wine on a rustic wooden table with Sicilian cheese and cured meats, warm gold tones, dark background, professional food and wine photography, moody atmospheric lighting, high-end editorial style",
  },
  {
    name: "etna-sunset-party",
    size: "1024x1024",
    prompt:
      "Elegant sunset aperitif on the slopes of Mount Etna in Sicily: golden hour light, sophisticated cocktail bar setup, gold and black luxury decor, string lights, Etna volcanic landscape in background, warm amber tones, professional event photography, dark moody atmosphere with gold highlights, no people visible",
  },
  {
    name: "agriturismo-sicilian",
    size: "1024x1024",
    prompt:
      "Rustic-luxury Sicilian agriturismo dining experience: long wooden table with traditional Sicilian dishes, ceramic plates, candles, exposed wooden beams, warm golden lighting, mountains visible through window, professional food photography, dark warm tones with gold accents, editorial style",
  },
  {
    name: "beach-coast-luxury",
    size: "1024x1024",
    prompt:
      "Luxury welcome party on a Sicilian beach terrace at sunset: Taormina coastline, elegant white and gold lounge furniture, champagne glasses, string lights overhead, Ionian sea in background, warm gold and pink sunset tones, professional event photography, sophisticated atmosphere, no people visible",
  },
  {
    name: "air-mirror-photobooth",
    size: "1024x1024",
    prompt:
      "Elegant modern magic mirror photobooth at a luxury event: sleek black and gold mirror with ornate gold frame, surrounded by soft golden light, in a dark luxurious ballroom with gold accents, professional event photography, sophisticated and premium atmosphere, no people visible",
  },
  {
    name: "video-booth-360",
    size: "1024x1024",
    prompt:
      "Modern 360 video booth platform at a luxury event: circular white rotating platform with gold LED ring light, in an elegant dark ballroom with gold ambient lighting, professional event photography, premium and sophisticated atmosphere, cinematic lighting, no people visible",
  },
  {
    name: "salvo-portrait",
    size: "864x1152",
    prompt:
      "Professional portrait of an elegant Italian male event presenter and showman in his 30s, wearing a dark tailored suit, confident warm smile, holding a microphone, dark background with subtle gold rim lighting, professional editorial photography, sophisticated luxury atmosphere, looking at camera",
  },
];

async function generateOne(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  job: ImageJob,
): Promise<{ name: string; success: boolean; path?: string; error?: string }> {
  const outputPath = path.join(OUT_DIR, `${job.name}.png`);
  try {
    console.log(`→ Generating ${job.name} (${job.size})…`);
    const response = await zai.images.generations.create({
      prompt: job.prompt,
      size: job.size as any,
    });
    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, "base64");
    fs.writeFileSync(outputPath, buffer);
    const sizeKB = Math.round(buffer.length / 1024);
    console.log(`✓ ${job.name} saved (${sizeKB} KB)`);
    return { name: job.name, success: true, path: outputPath };
  } catch (error: any) {
    console.error(`✗ ${job.name}: ${error.message}`);
    return { name: job.name, success: false, error: error.message };
  }
}

async function main() {
  console.log(`Generating ${jobs.length} images for Gold Events by Salvo…\n`);
  const zai = await ZAI.create();

  // Run in parallel batches of 3 to avoid rate limits
  const batchSize = 3;
  const results: Array<{ name: string; success: boolean; path?: string; error?: string }> = [];

  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize);
    console.log(`\n--- Batch ${Math.floor(i / batchSize) + 1} ---`);
    const batchResults = await Promise.all(batch.map((job) => generateOne(zai, job)));
    results.push(...batchResults);
  }

  console.log("\n========== SUMMARY ==========");
  const ok = results.filter((r) => r.success);
  const fail = results.filter((r) => !r.success);
  console.log(`✓ Success: ${ok.length}/${jobs.length}`);
  if (fail.length) {
    console.log(`✗ Failed: ${fail.length}`);
    fail.forEach((r) => console.log(`  - ${r.name}: ${r.error}`));
  }
  console.log(`\nOutput dir: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
