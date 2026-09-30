import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Philosophy } from "@/components/site/philosophy";
import { GoldEventsHero } from "@/components/site/gold-events-hero";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { Services } from "@/components/site/services";
import { Bundles } from "@/components/site/bundles";
import { Extras } from "@/components/site/extras";
import { ContactForm } from "@/components/site/contact-form";
import { ChatbotWidget } from "@/components/site/chatbot-widget";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "Eventi, Matrimoni e Feste di Lusso in Sicilia",
  description:
    "Servizi esclusivi per matrimoni, battesimi, compleanni, feste aziendali a Catania, Adrano, Taormina. Showman Salvo Piemonte, Air Mirror, Video Booth 360, Dj Set. Prezzi su richiesta.",
  alternates: {
    canonical: BASE_URL + "/gold-events",
  },
  openGraph: {
    title: "Gold Events by Salvo · Eventi di Lusso in Sicilia",
    description:
      "Matrimoni, feste private, eventi aziendali in Sicilia Orientale. Conduzione, animazione e tecnologie esclusive: Air Mirror, Video Booth 360.",
    url: BASE_URL + "/gold-events",
    images: ["/images/collage/matrimoni-couple-toast.jpg"],
  },
};

export default function GoldEventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Gold Events by Salvo"
          otherHref="/sicily-experience"
          otherLabel="Gold Events Sicily Experience"
        />
        <GoldEventsHero />
        <Philosophy />
        <Services />
        <Bundles />
        <Extras />
        <ContactForm />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
