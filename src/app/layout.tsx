import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LangProvider } from "@/lib/i18n/lang-provider";
import { RegisterSW } from "@/components/site/register-sw";
import { StructuredData } from "@/components/site/structured-data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = "https://goldeventsbysalvo.vercel.app";
const LANGS = ["it", "en", "fr", "de", "es", "pt", "nl", "ru", "ar", "zh", "ja", "ko", "pl", "tr", "hi"];

// SEO-optimized title with primary keywords + brand + location
const SEO_TITLE =
  "Gold Events by Salvo · Matrimoni, Feste & Eventi di Lusso in Sicilia | Adrano, Catania, Taormina, Etna";

// 155-char optimized meta description
const SEO_DESCRIPTION =
  "Showman, presentatore e servizi esclusivi per matrimoni, feste private ed eventi aziendali a Adrano, Catania, Taormina e sull'Etna. Air Mirror, Video Booth 360, Dj Set, destination wedding Sicilia. Conduzione di Salvo Piemonte.";

const SEO_KEYWORDS = [
  // Brand
  "Gold Events by Salvo",
  "Gold Events Sicily Experience",
  "Salvo Piemonte",
  // Wedding planner
  "wedding planner Catania",
  "wedding planner Sicilia",
  "destination wedding Sicilia",
  "matrimonio Catania",
  "matrimonio Taormina",
  "matrimonio Etna",
  "organizzatore eventi Sicilia",
  // Showman / animazione
  "showman Catania",
  "showman Sicilia",
  "animazione eventi Catania",
  "presentatore eventi",
  "DJ set Catania",
  "DJ matrimonio Sicilia",
  // Servizi specifici
  "Air Mirror Catania",
  "Video Booth 360 Sicilia",
  "photobooth matrimonio",
  "specchio magico fotobooth",
  "audio guestbook matrimonio",
  "set scenografico neon",
  // Eventi
  "organizzazione battesimi",
  "organizzazione compleanni Catania",
  "feste aziendali Sicilia",
  "team building Sicilia",
  "feste a tema Catania",
  "serate giochi eventi",
  // Turismo Sicily Experience
  "Etna wine tasting",
  "degustazione vini Etna DOC",
  "agriturismo Sicilia",
  "tour Taormina",
  "esperienze Sicilia Orientale",
  // Geo
  "eventi Adrano",
  "eventi Catania provincia",
  "Taormina matrimonio",
  "Giardini Naxos eventi",
  "Bronte agriturismo",
  "Nicolosi Etna",
];

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SEO_TITLE,
    template: "%s · Gold Events by Salvo",
  },
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Salvo Piemonte", url: BASE_URL }],
  creator: "Salvo Piemonte",
  publisher: "Gold Events by Salvo",
  manifest: "/manifest.json",
  applicationName: "Gold Events by Salvo",
  category: "Event Services",
  classification: "Event Planning & Entertainment",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192" }],
    shortcut: ["/icon.svg"],
  },
  alternates: {
    canonical: BASE_URL + "/",
    languages: Object.fromEntries(
      LANGS.map((l) => [l, BASE_URL + "/"]),
    ),
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    siteName: "Gold Events by Salvo",
    url: BASE_URL,
    type: "website",
    locale: "it_IT",
    alternateLocale: [
      "en_US",
      "fr_FR",
      "de_DE",
      "es_ES",
      "pt_PT",
      "nl_NL",
      "ru_RU",
      "ar_AR",
      "zh_CN",
      "ja_JP",
      "ko_KR",
      "pl_PL",
      "tr_TR",
      "hi_IN",
    ],
    images: [
      {
        url: "/images/hero-etna-dusk.png",
        width: 1344,
        height: 768,
        alt: "Gold Events by Salvo — ricevimento di lusso al tramonto sull'Etna",
        type: "image/png",
      },
      {
        url: "/images/etna-wine-tasting.png",
        width: 1024,
        height: 1024,
        alt: "Degustazione vini Etna DOC in cantina storica — Gold Events Sicily Experience",
        type: "image/png",
      },
      {
        url: "/images/beach-coast-luxury.png",
        width: 1024,
        height: 1024,
        alt: "Welcome party lusso sulla costa di Taormina",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@goldeventsicily_experience",
    creator: "@goldeventsicily_experience",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ["/images/hero-etna-dusk.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IT-CT",
    "geo.placename": "Adrano, Catania",
    "geo.position": "37.6637;14.8454",
    ICBM: "37.6637, 14.8454",
    "theme-color": "#0F0F0F",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Gold Events",
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=yes",
    "DC.title": "Gold Events by Salvo",
    "DC.creator": "Salvo Piemonte",
    "DC.subject": "Eventi di lusso in Sicilia",
    "DC.description": SEO_DESCRIPTION,
    "DC.language": "it",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning className="dark">
      <head>
        <StructuredData />
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="0xcRnn5VKF3NWe-AnkTPWfcmJk5QVoi3YFefWFMCcbk" />
        {/* Cache-buster: timestamp force-refresh */}
        <meta name="generated-at" content={`${Date.now()}`} />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <LangProvider>
          {children}
          <RegisterSW />
        </LangProvider>
        <SonnerToaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast:
                "!bg-[#1C1C1C] !text-white !border !border-[#D4AF37]/40",
              description: "!text-[#A1A1A1]",
              actionButton: "!bg-[#D4AF37] !text-[#0F0F0F]",
              cancelButton: "!bg-[#1C1C1C] !text-white",
            },
          }}
        />
      </body>
    </html>
  );
}
