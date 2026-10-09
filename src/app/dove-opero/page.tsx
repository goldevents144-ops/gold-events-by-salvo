import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { BivioBack } from "@/components/site/bivio-back";
import { Footer } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import { MapPin, Navigation, Phone, ArrowRight } from "lucide-react";

const BASE_URL = "https://goldeventsbysalvo.vercel.app";

export const metadata: Metadata = {
  title: "Dove Opero — Adrano, Catania, Taormina, Etna e tutta la Sicilia Orientale",
  description:
    "Gold Events by Salvo opera in tutta la Sicilia Orientale: Adrano, Catania, Paternò, Belpasso, Nicolosi, Pedara, Zafferana Etnea, Acireale, Giarre, Riposto, Mascali, Taormina, Giardini Naxos, Letojanni, Bronte, Randazzo, Castiglione di Sicilia, Linguaglossa, Maniace, Caltagirone, Piazza Armerina, Ragusa, Noto, Siracusa. Trasferta gratuita entro 30km da Adrano.",
  keywords: [
    "eventi Adrano",
    "eventi Catania",
    "eventi Taormina",
    "eventi Etna",
    "matrimonio Catania",
    "matrimonio Taormina",
    "matrimonio Adrano",
    "animazione Paternò",
    "animazione Belpasso",
    "animazione Nicolosi",
    "animazione Pedara",
    "animazione Zafferana Etnea",
    "animazione Acireale",
    "animazione Giarre",
    "animazione Riposto",
    "animazione Mascali",
    "animazione Giardini Naxos",
    "animazione Letojanni",
    "animazione Bronte",
    "animazione Randazzo",
    "animazione Castiglione di Sicilia",
    "animazione Linguaglossa",
    "animazione Maniace",
    "animazione Caltagirone",
    "animazione Piazza Armerina",
    "animazione Ragusa",
    "animazione Noto",
    "animazione Siracusa",
    "feste private Catania",
    "feste aziendali Sicilia",
    "showman Catania",
    "showman Sicilia",
    "wedding planner Catania",
    "wedding planner Taormina",
    "wedding planner Sicilia",
    "Salvo Piemonte",
    "Gold Events by Salvo",
  ],
  alternates: { canonical: BASE_URL + "/dove-opero" },
  openGraph: {
    title: "Dove Opero — Gold Events by Salvo · Sicilia Orientale",
    description:
      "Servizi di animazione, conduzione eventi e wedding planner in tutta la Sicilia Orientale. Sede ad Adrano, operiamo da Catania a Taormina, dall'Etna a Siracusa.",
    url: BASE_URL + "/dove-opero",
    images: ["/images/collage/sicily-aerial-etna-taormina.jpg"],
  },
};

interface Area {
  nome: string;
  provincia: string;
  distanzaKm: number;
  serviziRichiesti: string[];
  descrizione: string;
}

const AREE: Area[] = [
  {
    nome: "Adrano",
    provincia: "Catania",
    distanzaKm: 0,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Compleanni", "Feste private"],
    descrizione:
      "Sede operativa di Gold Events by Salvo. Adrano è il cuore della mia attività: qui organizzo eventi nella maggior parte delle ville e dei saloni della zona. Conosco le location migliori, i catering del territorio e i fornitori locali. Trasferta sempre gratuita.",
  },
  {
    nome: "Paternò",
    provincia: "Catania",
    distanzaKm: 12,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Compleanni", "Feste aziendali"],
    descrizione:
      "Città molto attiva per eventi privati. Le ville e i saloni paternesi sono una delle mie specializzazioni: conosco le location storiche del centro e le ville moderne della zona periferica. Trasferta gratuita, distanza minima da Adrano.",
  },
  {
    nome: "Biancavilla",
    provincia: "Catania",
    distanzaKm: 8,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Comunioni", "Compleanni"],
    descrizione:
      "Vicinissima alla mia sede. Biancavilla ha una tradizione forte di feste familiari e religiose. Lavoro spesso con le parrocchie del centro per battesimi, comunioni e cresime, oltre ai ricevimenti privati.",
  },
  {
    nome: "Santa Maria di Licodia",
    provincia: "Catania",
    distanzaKm: 10,
    serviziRichiesti: ["Battesimi", "Compleanni", "Matrimoni intimi"],
    descrizione:
      "Borgo collinare etneo, ideale per cerimonie intime e feste di paese. Trasferta sempre gratuita, location spesso tra le ville storiche del territorio.",
  },
  {
    nome: "Ragalna",
    provincia: "Catania",
    distanzaKm: 15,
    serviziRichiesti: ["Matrimoni", "Feste private", "Compleanni"],
    descrizione:
      "Borgo etneo noto per le ville e i agriturismi. Location presa in considerazione per matrimoni intimo e feste aziendali in mezzo alla natura.",
  },
  {
    nome: "Belpasso",
    provincia: "Catania",
    distanzaKm: 22,
    serviziRichiesti: ["Matrimoni", "Compleanni", "Feste aziendali"],
    descrizione:
      "Centro importante della provincia etnea. Eventi in ville storiche e saloni moderni. Trasferta gratuita entro 30km da Adrano.",
  },
  {
    nome: "Nicolosi",
    provincia: "Catania",
    distanzaKm: 28,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Compleanni", "Feste private"],
    descrizione:
      "Porta dell'Etna. Matrimoni e feste con vista sul vulcano, in ville e rifugi rinomati. Location richiestissima per matrimonio etneo e destination wedding.",
  },
  {
    nome: "Pedara",
    provincia: "Catania",
    distanzaKm: 25,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Comunioni", "Compleanni"],
    descrizione:
      "Centro collinare etneo. Eventi in ville storiche e parrocchie del centro. Trasferta gratuita, location di forte appeal per cerimonie intime.",
  },
  {
    nome: "Trecastagni",
    provincia: "Catania",
    distanzaKm: 26,
    serviziRichiesti: ["Matrimoni", "Compleanni", "Feste private"],
    descrizione:
      "Comune etneo con forte tradizione di eventi privati e matrimoni. Ville storiche e location panoramiche.",
  },
  {
    nome: "Zafferana Etnea",
    provincia: "Catania",
    distanzaKm: 30,
    serviziRichiesti: ["Matrimoni", "Feste aziendali", "Destination wedding"],
    descrizione:
      "Capitale del miele e dell'Etna. Location di pregio per matrimoni e feste aziendali, con ville immerse nei boschi etnei e vista sul golfo di Catania.",
  },
  {
    nome: "Aci Castello",
    provincia: "Catania",
    distanzaKm: 35,
    serviziRichiesti: ["Matrimoni", "Feste private", "Compleanni"],
    descrizione:
      "Location costiera di grande fascino, con il castello normanno sul mare. Matrimoni e feste in ville con vista sull'Etna e sul mare.",
  },
  {
    nome: "Acireale",
    provincia: "Catania",
    distanzaKm: 38,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Compleanni", "Feste aziendali"],
    descrizione:
      "Città barocca con ville storiche e chiese monumentali. Eventi di alto livello in location di pregio architettonico.",
  },
  {
    nome: "Catania",
    provincia: "Catania",
    distanzaKm: 36,
    serviziRichiesti: ["Matrimoni", "Compleanni", "Feste aziendali", "Dj Set"],
    descrizione:
      "Capoluogo. Eventi nei migliori hotel, ville, ristoranti e club della città. Conosco le location più richieste per matrimoni di lusso e feste private.",
  },
  {
    nome: "Aci Trezza",
    provincia: "Catania",
    distanzaKm: 38,
    serviziRichiesti: ["Matrimoni", "Feste private"],
    descrizione:
      "Borgo marinaro dei Ciclopi. Location suggestive per cerimonie intime e feste in riva al mare.",
  },
  {
    nome: "Giarre",
    provincia: "Catania",
    distanzaKm: 45,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Compleanni"],
    descrizione:
      "Centro importante della riviera dei Ciclopi. Eventi in ville e saloni del territorio.",
  },
  {
    nome: "Riposto",
    provincia: "Catania",
    distanzaKm: 47,
    serviziRichiesti: ["Matrimoni", "Feste private", "Compleanni"],
    descrizione:
      "Porto dell'Etna. Location marittima per feste e matrimoni con vista sul mare.",
  },
  {
    nome: "Mascali",
    provincia: "Catania",
    distanzaKm: 50,
    serviziRichiesti: ["Matrimoni", "Feste private"],
    descrizione:
      "Borgo costiero ai piedi dell'Etna. Location di fascino per cerimonie con vista vulcano e mare.",
  },
  {
    nome: "Fiumefreddo di Sicilia",
    provincia: "Catania",
    distanzaKm: 52,
    serviziRichiesti: ["Matrimoni", "Feste private"],
    descrizione:
      "Piccolo centro costiero, location di charme per matrimoni intimi.",
  },
  {
    nome: "Calatabiano",
    provincia: "Catania",
    distanzaKm: 55,
    serviziRichiesti: ["Matrimoni", "Feste aziendali"],
    descrizione:
      "Castello medievale e ville storiche. Location di pregio per matrimoni di lusso.",
  },
  {
    nome: "Taormina",
    provincia: "Messina",
    distanzaKm: 60,
    serviziRichiesti: ["Destination wedding", "Matrimoni di lusso", "Eventi aziendali"],
    descrizione:
      "Perla della Sicilia. Destination wedding di livello internazionale, eventi in ville storiche e hotel di lusso con vista sul mare e sull'Etna. Trasferta con supplemento.",
  },
  {
    nome: "Giardini Naxos",
    provincia: "Messina",
    distanzaKm: 58,
    serviziRichiesti: ["Matrimoni", "Feste private", "Eventi in spiaggia"],
    descrizione:
      "Primo insediamento greco in Sicilia. Location marittime per feste, matrimoni in spiaggia ed eventi estivi.",
  },
  {
    nome: "Letojanni",
    provincia: "Messina",
    distanzaKm: 62,
    serviziRichiesti: ["Matrimoni", "Feste private"],
    descrizione:
      "Località balneare vicino Taormina. Ville e hotel per matrimoni e feste private con vista mare.",
  },
  {
    nome: "Castelmola",
    provincia: "Messina",
    distanzaKm: 63,
    serviziRichiesti: ["Matrimoni intimi", "Cerimonie simboliche"],
    descrizione:
      "Borgo sopra Taormina, vista spettacolare. Location per cerimonie intime e destination wedding esclusivi.",
  },
  {
    nome: "Castiglione di Sicilia",
    provincia: "Catania",
    distanzaKm: 35,
    serviziRichiesti: ["Matrimoni", "Wine tour", "Destination wedding"],
    descrizione:
      "Borgo medievale etneo, capitale del vino Etna DOC. Location per matrimoni in cantine storiche e ville immersesi nei vigneti.",
  },
  {
    nome: "Linguaglossa",
    provincia: "Catania",
    distanzaKm: 32,
    serviziRichiesti: ["Matrimoni", "Feste private", "Eventi in cantina"],
    descrizione:
      "Porta nord dell'Etna. Ville, rifugi e cantine per matrimoni e feste private in mezzo alla natura del vulcano.",
  },
  {
    nome: "Randazzo",
    provincia: "Catania",
    distanzaKm: 38,
    serviziRichiesti: ["Matrimoni", "Feste private", "Eventi storici"],
    descrizione:
      "Città medievale etnea. Eventi in location storiche di pregio, ville e cantine.",
  },
  {
    nome: "Bronte",
    provincia: "Catania",
    distanzaKm: 25,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Compleanni", "Feste aziendali"],
    descrizione:
      "Capitale del pistacchio. Eventi in ville storiche, castello Nelson e location di pregio. Trasferta gratuita entro 30km.",
  },
  {
    nome: "Maniace",
    provincia: "Catania",
    distanzaKm: 28,
    serviziRichiesti: ["Matrimoni", "Feste private"],
    descrizione:
      "Borgo interno con il castello Nelson. Location esclusiva per matrimoni e cerimonie di alto livello.",
  },
  {
    nome: "Cesarò",
    provincia: "Messina",
    distanzaKm: 45,
    serviziRichiesti: ["Matrimoni", "Feste private"],
    descrizione:
      "Borgo dei Nebrodi. Location di pace e natura per cerimonie intime.",
  },
  {
    nome: "Caltagirone",
    provincia: "Catania",
    distanzaKm: 65,
    serviziRichiesti: ["Matrimoni", "Battesimi", "Compleanni"],
    descrizione:
      "Città della ceramica. Eventi in ville storiche barocche e location di grande fascino architettonico.",
  },
  {
    nome: "Piazza Armerina",
    provincia: "Enna",
    distanzaKm: 75,
    serviziRichiesti: ["Matrimoni", "Feste private"],
    descrizione:
      "Città barocca, vicino alla Villa Romana del Casale. Eventi in location storiche di pregio.",
  },
  {
    nome: "Enna",
    provincia: "Enna",
    distanzaKm: 95,
    serviziRichiesti: ["Matrimoni", "Eventi aziendali"],
    descrizione:
      "Capoluogo più alto d'Italia. Eventi in ville e location panoramiche uniche.",
  },
  {
    nome: "Noto",
    provincia: "Siracusa",
    distanzaKm: 110,
    serviziRichiesti: ["Destination wedding", "Matrimoni di lusso"],
    descrizione:
      "Capitale del barocco. Destination wedding internazionale in palazzi storici e location di pregio UNESCO.",
  },
  {
    nome: "Siracusa",
    provincia: "Siracusa",
    distanzaKm: 130,
    serviziRichiesti: ["Matrimoni", "Eventi aziendali", "Destination wedding"],
    descrizione:
      "Città greca. Eventi in location storiche, Ortigia, ville sul mare. Trasferta con preventivo personalizzato.",
  },
  {
    nome: "Ragusa",
    provincia: "Ragusa",
    distanzaKm: 120,
    serviziRichiesti: ["Matrimoni di lusso", "Destination wedding"],
    descrizione:
      "Città barocca UNESCO. Eventi in palazzi storici, ville di pregio e location di charme.",
  },
  {
    nome: "Modica",
    provincia: "Ragusa",
    distanzaKm: 130,
    serviziRichiesti: ["Matrimoni di lusso", "Destination wedding"],
    descrizione:
      "Città del cioccolato e del barocco. Eventi in palazzi storici di fascino internazionale.",
  },
  {
    nome: "Vittoria",
    provincia: "Ragusa",
    distanzaKm: 145,
    serviziRichiesti: ["Matrimoni", "Eventi aziendali"],
    descrizione:
      "Centro agricolo e vinicolo. Eventi in cantine e ville moderne.",
  },
];

const PROVINCE = ["Catania", "Messina", "Enna", "Siracusa", "Ragusa"];

export default function DoveOperoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1">
        <BivioBack
          currentLabel="Dove Opero"
          otherHref="/sicily-experience"
          otherLabel="Gold Events Sicily Experience"
        />

        <section className="relative overflow-hidden py-20 sm:py-28">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#0F0F0F] to-[#1C1C1C]"
          />
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="DOVE OPERO"
              title="Tutta la Sicilia Orientale, da Adrano a Taormina, dall'Etna a Siracusa"
              intro="La sede operativa è ad Adrano, in provincia di Catania. Da qui mi muovo in tutta la Sicilia Orientale per matrimoni, battesimi, compleanni, feste aziendali ed eventi di lusso. Trasferta gratuita entro 30km da Adrano."
            />
            <Reveal y={24} delay={0.1} className="mt-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Comuni serviti" value="38+" />
                <StatCard label="Province" value="5" />
                <StatCard label="Sede" value="Adrano (CT)" />
                <StatCard label="Trasferta gratis" value="30 km" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {PROVINCE.map((provincia) => {
              const comuni = AREE.filter((a) => a.provincia === provincia);
              if (comuni.length === 0) return null;
              return (
                <div key={provincia} className="mb-14">
                  <Reveal y={20}>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
                        <Navigation className="size-5" />
                      </span>
                      <div>
                        <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                          Provincia di {provincia}
                        </h2>
                        <p className="text-sm text-[#A1A1A1]">
                          {comuni.length} comuni serviti
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {comuni.map((area, idx) => (
                      <Reveal key={area.nome} y={16} delay={0.05 * (idx % 3)}>
                        <article className="group h-full rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-5 transition-all hover:border-[#D4AF37]/40 hover:bg-[#1C1C1C]/90">
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <h3 className="font-serif text-lg font-semibold text-white">
                              {area.nome}
                            </h3>
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                              <MapPin className="size-3" />
                              {area.distanzaKm === 0
                                ? "Sede"
                                : `${area.distanzaKm} km`}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-[#A1A1A1]">
                            {area.descrizione}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {area.serviziRichiesti.map((srv) => (
                              <span
                                key={srv}
                                className="rounded-full border border-white/12 bg-[#0F0F0F]/60 px-2 py-0.5 text-[10px] font-medium text-[#A1A1A1]"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t border-white/5 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Reveal y={20}>
              <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                Trasferta gratuita entro 30km da Adrano
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A1A1]">
                Per destinazioni oltre i 30km (Taormina, Catania città, Siracusa, Ragusa, Noto)
                il supplemento trasferta è di 40-60€ in base alla distanza. Per eventi fuori Sicilia
                o all'estero, il preventivo è personalizzato in base alla destinazione.
              </p>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A1A1]">
                Il mio territorio di specializzazione resta la <span className="font-semibold text-white">Sicilia Orientale</span>:
                Etna, Catania, Taormina, Adrano e provincia. È qui che conosco le location migliori,
                i fornitori più affidabili e i dettagli che fanno la differenza.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/gold-events#contatti"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
                >
                  Richiedi disponibilità
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="tel:+393442322176"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <Phone className="size-4" />
                  Chiama ora
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#1C1C1C]/60 p-4 text-center">
      <p className="font-serif text-2xl font-bold text-[#D4AF37] sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A1A1A1]">
        {label}
      </p>
    </div>
  );
}
