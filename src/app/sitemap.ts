import { MetadataRoute } from "next";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";
const LANGS = [
  "it",
  "en",
  "fr",
  "de",
  "es",
  "pt",
  "nl",
  "ru",
  "ar",
  "zh",
  "ja",
  "ko",
  "pl",
  "tr",
  "hi",
];

const SECTIONS = [
  { path: "/", priority: 1.0, changeFreq: "weekly" as const },
  { path: "/gold-events", priority: 0.95, changeFreq: "weekly" as const },
  { path: "/sicily-experience", priority: 0.95, changeFreq: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return SECTIONS.map((s) => ({
    url: `${BASE_URL}${s.path}`,
    lastModified: now,
    changeFrequency: s.changeFreq,
    priority: s.priority,
    alternates: {
      languages: Object.fromEntries(
        LANGS.map((l) => [l, `${BASE_URL}${s.path}`]),
      ),
    },
  }));
}
