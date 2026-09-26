import { Header } from "@/components/site/header";
import { SicilyExperience } from "@/components/site/sicily-experience";
import { ContactForm } from "@/components/site/contact-form";
import { PartnerForm } from "@/components/site/partner-form";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { SicilyHero } from "@/components/site/sicily-hero";
import { BivioBack } from "@/components/site/bivio-back";

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
