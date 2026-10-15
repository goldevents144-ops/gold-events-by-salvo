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
// Targeting: "Gold Eventi", "Salvo Piemonte", "Gold Events by Salvo"
const SEO_TITLE =
  "Salvo Piemonte · Gold Eventi & Matrimoni di Lusso in Sicilia | Adrano, Catania, Taormina";

// 155-char optimized meta description
// Includes: "Salvo Piemonte", "Gold Eventi", "Gold Events", services, location
const SEO_DESCRIPTION =
  "Salvo Piemonte — showman e organizzatore di Gold Eventi in Sicilia. Matrimoni, feste private, eventi aziendali a Adrano, Catania, Taormina, Etna. Air Mirror, Video Booth 360, Dj Set, destination wedding Sicilia. Gold Events by Salvo: conduzione, animazione e tecnologie esclusive.";

const SEO_KEYWORDS = [
  // Brand primari — devono comparire per nome
  "Salvo Piemonte",
  "Gold Eventi",
  "Gold Events",
  "Gold Events by Salvo",
  "Gold Events Sicily Experience",
  "Salvo Piemonte eventi",
  "Salvo Piemonte animatore",
  "Salvo Piemonte showman",
  "Salvo Piemonte Catania",
  "Salvo Piemonte Adrano",
  "Gold Eventi Sicilia",
  "Gold Eventi Catania",
  "Gold Eventi Adrano",
  "Gold Eventi Salvo",
  // Eventi (parola generica per intercettare ricerca "eventi")
  "eventi Sicilia",
  "eventi Catania",
  "eventi Adrano",
  "eventi Taormina",
  "eventi Etna",
  "eventi Sicilia Orientale",
  "organizzazione eventi Sicilia",
  "organizzazione eventi Catania",
  "organizzazione eventi Adrano",
  "organizzatore eventi Sicilia",
  "organizzatore eventi Catania",
  "animazione eventi",
  "animazione eventi Catania",
  "eventi lusso Sicilia",
  "eventi di lusso Catania",
  // LONG-TAIL: domande specifiche che la gente cerca realmente
  "quanto costa animatore matrimonio Catania",
  "quanto costa matrimonio Catania",
  "prezzo animazione eventi Sicilia",
  "preventivo animatore Adrano",
  "miglior animatore Catania",
  "miglior wedding planner Sicilia",
  "wedding planner Catania prezzi",
  "matrimonio lusso Catania prezzo",
  "animazione battesimo Catania",
  "animazione comunione Catania",
  "animazione cresima Catania",
  "festa compleanno Catania animatore",
  "festa 18 compleanno Catania",
  "festa laurea Catania animazione",
  "destination wedding Taormina costo",
  "Air Mirror nozze Catania",
  "Air Mirror prezzo Sicilia",
  "specchio magico fotobooth matrimonio",
  "Video Booth 360 prezzo",
  "video slow motion matrimonio Sicilia",
  "audio guest book telefono vintage",
  "set neon matrimonio Catania",
  "animatore eventi professionista Catania",
  "showman professionista Sicilia",
  "DJ matrimonio professionista Catania",
  "wedding planner matrimonio lusso",
  "organizzazione eventi aziendali Sicilia",
  "team building Catania azienda",
  "festa aziendale Catania organizzazione",
  "destination wedding Sicilia 2026",
  "matrimonio villa Catania 2026",
  "matrimonio villa Taormina 2026",
  "ricevimento matrimonio Etna",
  "matrimonio etna villa",
  "festa privata villa Catania",
  // Wedding planner
  "wedding planner Catania",
  "wedding planner Sicilia",
  "wedding planner Adrano",
  "destination wedding Sicilia",
  "matrimonio Catania",
  "matrimonio Taormina",
  "matrimonio Etna",
  "matrimonio Adrano",
  "organizzatore eventi Sicilia",
  "organizzatore matrimonio Sicilia",
  // Showman / animazione
  "showman Catania",
  "showman Sicilia",
  "showman Adrano",
  "animazione eventi Catania",
  "animazione eventi Adrano",
  "animazione matrimonio Sicilia",
  "presentatore eventi",
  "DJ set Catania",
  "DJ matrimonio Sicilia",
  // Servizi specifici
  "Air Mirror Catania",
  "Air Mirror Sicilia",
  "Video Booth 360 Sicilia",
  "photobooth matrimonio",
  "specchio magico fotobooth",
  "audio guestbook matrimonio",
  "set scenografico neon",
  // Eventi
  "organizzazione battesimi",
  "organizzazione battesimi Catania",
  "organizzazione comunioni",
  "organizzazione cresime",
  "organizzazione compleanni Catania",
  "compleanni Adrano",
  "feste aziendali Sicilia",
  "feste aziendali Catania",
  "team building Sicilia",
  "feste a tema Catania",
  "serate giochi eventi",
  "laurea festa Catania",
  // Turismo Sicily Experience
  "Etna wine tasting",
  "degustazione vini Etna DOC",
  "agriturismo Sicilia",
  "tour Taormina",
  "esperienze Sicilia Orientale",
  "destination wedding Taormina",
  // Geo - tutti i comuni serviti
  "eventi Adrano",
  "eventi Catania provincia",
  "eventi Catania",
  "eventi Taormina",
  "eventi Bronte",
  "eventi Nicolosi",
  "eventi Acireale",
  "eventi Paternò",
  "eventi Belpasso",
  "eventi Pedara",
  "eventi Zafferana Etnea",
  "eventi Giarre",
  "eventi Riposto",
  "eventi Mascali",
  "eventi Giardini Naxos",
  "eventi Letojanni",
  "eventi Linguaglossa",
  "eventi Randazzo",
  "eventi Castiglione di Sicilia",
  "eventi Maniace",
  "eventi Caltagirone",
  "eventi Piazza Armerina",
  "eventi Ragusa",
  "eventi Noto",
  "eventi Siracusa",
  "Taormina matrimonio",
  "Giardini Naxos eventi",
  "Bronte agriturismo",
  "Nicolosi Etna",
  "Paternò eventi",
  "Belpasso eventi",
  "Acireale eventi",
  // Lingue
  "Salvo Piemonte wedding planner",
  "Salvo Piemonte matrimoni",
  "Salvo Piemonte eventi",
  "Salvo Piemonte animazione",
  "Salvo Piemonte Air Mirror",
  "Gold Events Salvo Piemonte",
  "Gold Eventi Salvo",
  // English keywords (per ricerca internazionale)
  "Salvo Piemonte wedding planner Sicily",
  "Gold Events Sicily",
  "Sicily wedding planner",
  "Catania events organizer",
  "Etna destination wedding",
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
        {/* Preconnect + DNS prefetch for ultra-fast font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Preconnect to wa.me for WhatsApp CTA instant open */}
        <link rel="dns-prefetch" href="https://wa.me" />
        {/* Build version for cache busting */}
        <meta name="build-version" content="2026-10-15-v1" />
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
