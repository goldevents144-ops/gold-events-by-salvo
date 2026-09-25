import { Header } from "@/components/site/header";
import { HeroSplit } from "@/components/site/hero-split";
import { Philosophy } from "@/components/site/philosophy";
import { Services } from "@/components/site/services";
import { Bundles } from "@/components/site/bundles";
import { Extras } from "@/components/site/extras";
import { SicilyExperience } from "@/components/site/sicily-experience";
import { ContactForm } from "@/components/site/contact-form";
import { PartnerForm } from "@/components/site/partner-form";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <HeroSplit />
        <Philosophy />
        <Services />
        <Bundles />
        <Extras />
        <SicilyExperience />
        <ContactForm />
        <PartnerForm />
      </main>
      <Footer />
    </div>
  );
}
