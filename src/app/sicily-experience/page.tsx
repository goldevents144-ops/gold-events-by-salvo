import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/site/header";
import { SicilyHero } from "@/components/site/sicily-hero";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { SicilyExperience } from "@/components/site/sicily-experience";

const ContactForm = dynamic(() => import("@/components/site/contact-form").then((m) => m.ContactForm), {
  loading: () => <div className="h-96 animate-pulse bg-[#1C1C1C]/40" />,
});
const PartnerForm = dynamic(() => import("@/components/site/partner-form").then((m) => m.PartnerForm), {
  loading: () => <div className="h-32 animate-pulse bg-[#1C1C1C]/40" />,
});
const ChatbotWidget = dynamic(() => import("@/components/site/chatbot-widget").then((m) => m.ChatbotWidget));

const BASE_URL = "https://www.goldeventsbysalvo.it";

export const metadata: Metadata = {
  title: "Gold Events Sicily Experience · Destination Sicily · IT / EN",
  description:
    "Destination weddings, tour sull'Etna, degustazioni in cantina, agriturismo e beach party a Taormina. Salvo Piemonte curatore di esperienze di lusso in Sicilia Orientale. Italiano · English.",
  alternates: {
    canonical: BASE_URL + "/sicily-experience",
  },
  openGraph: {
    title: "Gold Events Sicily Experience · Destination Sicily",
    description:
      "Esperienze indimenticabili in Sicilia Orientale: Etna, Taormina, degustazioni vini, agriturismo, beach party. Curate da Salvo Piemonte.",
    url: BASE_URL + "/sicily-experience",
    images: ["/images/collage/sicily-aerial-etna-taormina.jpg"],
  },
};

export default function SicilyExperiencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Gold Events Sicily Experience"
          otherHref="/gold-events"
          otherLabel="Gold Events by Salvo"
        />
        <SicilyHero />
        <SicilyExperience />
        <ContactForm />
        <PartnerForm />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
