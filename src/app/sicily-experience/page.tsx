import dynamic from "next/dynamic";
import { Header } from "@/components/site/header";
import { SicilyHero } from "@/components/site/sicily-hero";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";

// Lazy-load below-the-fold components
const SicilyExperience = dynamic(() => import("@/components/site/sicily-experience").then((m) => m.SicilyExperience));
const ContactForm = dynamic(() => import("@/components/site/contact-form").then((m) => m.ContactForm));
const PartnerForm = dynamic(() => import("@/components/site/partner-form").then((m) => m.PartnerForm));
const ChatbotWidget = dynamic(() => import("@/components/site/chatbot-widget").then((m) => m.ChatbotWidget));

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
