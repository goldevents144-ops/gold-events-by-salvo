import { Header } from "@/components/site/header";
import { Philosophy } from "@/components/site/philosophy";
import { Services } from "@/components/site/services";
import { Bundles } from "@/components/site/bundles";
import { Extras } from "@/components/site/extras";
import { ContactForm } from "@/components/site/contact-form";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { GoldEventsHero } from "@/components/site/gold-events-hero";
import { BivioBack } from "@/components/site/bivio-back";

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
