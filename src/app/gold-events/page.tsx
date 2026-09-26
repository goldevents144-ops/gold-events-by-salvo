import dynamic from "next/dynamic";
import { Header } from "@/components/site/header";
import { Philosophy } from "@/components/site/philosophy";
import { GoldEventsHero } from "@/components/site/gold-events-hero";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";

// Lazy-load below-the-fold components to reduce initial JS bundle
// (these are only loaded when user scrolls toward them)
const Services = dynamic(() => import("@/components/site/services").then((m) => m.Services));
const Bundles = dynamic(() => import("@/components/site/bundles").then((m) => m.Bundles));
const Extras = dynamic(() => import("@/components/site/extras").then((m) => m.Extras));
const ContactForm = dynamic(() => import("@/components/site/contact-form").then((m) => m.ContactForm));
const ChatbotWidget = dynamic(() => import("@/components/site/chatbot-widget").then((m) => m.ChatbotWidget));

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
