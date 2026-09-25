import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LangProvider } from "@/lib/i18n/lang-provider";
import { RegisterSW } from "@/components/site/register-sw";

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

export const metadata: Metadata = {
  title: "Gold Events by Salvo · Eventi di Lusso in Sicilia Orientale",
  description:
    "Showman, presentatore e servizi esclusivi per matrimoni, feste private ed eventi aziendali a Adrano, Catania, Taormina e sull'Etna. Conduzione, animazione e tecnologie esclusive: Air Mirror, Video Booth 360, Dj Set.",
  keywords: [
    "Gold Events by Salvo",
    "wedding planner Catania",
    "showman Sicilia",
    "matrimonio Catania",
    "animazione eventi",
    "Etna wine tasting",
    "destination wedding Sicilia",
    "Adrano eventi",
    "Air Mirror",
    "Video Booth 360",
  ],
  authors: [{ name: "Gold Events by Salvo" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192" }],
  },
  openGraph: {
    title: "Gold Events by Salvo",
    description:
      "Il Tuo Evento Unico, Dall'Animazione Alla Tecnologia. Conduzione, animazione e tecnologie esclusive per eventi indimenticabili in Sicilia Orientale.",
    siteName: "Gold Events by Salvo",
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Events by Salvo",
    description:
      "Eventi di lusso in Sicilia Orientale. Conduzione, animazione e tecnologie esclusive.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning className="dark">
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
