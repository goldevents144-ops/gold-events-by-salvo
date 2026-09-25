/**
 * Centralized content for Gold Events by Salvo.
 * All long-form text lives here so sections can stay lean.
 */

export type IconName =
  | "Baby"
  | "Cake"
  | "Heart"
  | "GraduationCap"
  | "Lock"
  | "Drama"
  | "Building2"
  | "Disc3"
  | "Dices"
  | "Camera"
  | "Video"
  | "Phone"
  | "Sparkles"
  | "Clock"
  | "Car"
  | "Wine"
  | "Sun"
  | "Tractor"
  | "Waves"
  | "Star";

export interface ServiceDetail {
  id: string;
  icon: IconName;
  title: string;
  card: string;
  focus: string;
  offers: string;
  pairing?: string;
}

export const services: ServiceDetail[] = [
  {
    id: "battesimi",
    icon: "Baby",
    title: "Battesimi, Comunioni e Cresime",
    card: "Cerimonie familiari calde ed eleganti, pensate per unire tutte le generazioni.",
    focus:
      "Un'atmosfera calda, accogliente ed elegante, pensata per unire tutte le generazioni della famiglia (dai nonni ai bambini).",
    offers:
      "Conduzione misurata della giornata, accoglienza dei parenti, coordinamento dei tempi della sala, gestione dei brindisi e del momento della torta.",
    pairing:
      "L'Air Mirror con grafiche e animazioni colorate dedicate ai più piccoli, per stampare ricordi istantanei e illimitati per zii e nonni.",
  },
  {
    id: "compleanni",
    icon: "Cake",
    title: "Compleanni (18, 30, 40, 50+)",
    card: "Divertimento puro, energia e personalizzazione totale in base all'età del festeggiato.",
    focus:
      "Divertimento puro, energia e personalizzazione totale in base all'età del festeggiato.",
    offers:
      "Presentazione scenografica ed energica del festeggiato, conduzione dei momenti clou (proiezione video ricordi, apertura regali, brindisi), animazione al microfono per coinvolgere la sala e far scattare la festa.",
    pairing:
      "Video Booth 360 per i 18esimi (per video virali sui social) o Audio Guestbook per i compleanni degli adulti per raccogliere gli auguri vocali.",
  },
  {
    id: "matrimoni",
    icon: "Heart",
    title: "Matrimoni & Destination Wedding",
    card: "Regia totale del ricevimento, zero stress per gli sposi, eleganza di classe.",
    focus:
      "Eleganza, massima responsabilità, fluidità della giornata e zero stress per gli sposi.",
    offers:
      "Regia e coordinamento totale del ricevimento. Salvo si interfaccia con il direttore di sala, i camerieri e i fotografi per fare in modo che i tempi vengano rispettati ed eliminare i tempi morti tra le portate. Intrattenimento di classe al microfono, conduzione del primo ballo, del lancio del bouquet/giarrettiera e del taglio della torta.",
    pairing:
      "Air Mirror con la \"Regia della Doppia Copia\" + Guestbook Premium (libro delle firme) e il Telefono Vintage.",
  },
  {
    id: "lauree",
    icon: "GraduationCap",
    title: "Lauree",
    card: "Fresca, dinamica, giovanile e celebrativa per traguardi importanti.",
    focus:
      "Una festa fresca, dinamica, giovanile e celebrativa per traguardi importanti.",
    offers:
      "Conduzione frizzante, proclamazione goliardica del neolaureato, gestione dei brindisi, giochi a tema legati al percorso di studi ed energia al microfono.",
    pairing:
      "Dj Set commerciale e Video Booth 360 per scatenarsi con i colleghi di università.",
  },
  {
    id: "feste-private",
    icon: "Lock",
    title: "Feste Private",
    card: "Anniversari, addii al celibato/nubilato, ricorrenze. Eventi sartoriali su misura.",
    focus:
      "Esclusività, privacy e un evento sartoriale cucito sui desideri del cliente in ville, loft o locali privati.",
    offers:
      "Gestione totale dell'intrattenimento in base al target degli invitati, scaletta personalizzata e conduzione su misura.",
  },
  {
    id: "feste-tema",
    icon: "Drama",
    title: "Feste a Tema",
    card: "Anni '80/'90, Halloween, Carnival Party, White Party. Immersione totale nel tema.",
    focus:
      "Immersione totale nel tema scelto dal cliente, dove ogni dettaglio deve essere coordinato.",
    offers:
      "Conduzione a tema (anche con abbigliamento dedicato), animazione basata sul filone della festa, coordinamento di eventuali contest (es. premio per la maschera o l'abito più bello).",
    pairing:
      "Layout fotografico dell'Air Mirror e scenografie neon personalizzate al 100% con il tema della serata.",
  },
  {
    id: "feste-aziendali",
    icon: "Building2",
    title: "Feste Aziendali & Team Building",
    card: "Premiazioni, meeting, team building. Professionalità e prestigio.",
    focus:
      "Rafforzare lo spirito di squadra, celebrare i successi aziendali e trasmettere professionalità e prestigio.",
    offers:
      "Conduzione istituzionale ma coinvolgente, presentazione dei manager o delle premiazioni interne, conduzione di attività di gruppo e gestione della transizione dal momento formale a quello del divertimento.",
    pairing:
      "Video Booth 360 o Air Mirror con il logo dell'azienda impresso su ogni foto/video per fare branding.",
  },
  {
    id: "dj-set",
    icon: "Disc3",
    title: "Dj Set",
    card:
      "Colonna sonora perfetta per ogni fase dell'evento, con impianti audio/luci professionali forniti da noi.",
    focus:
      "La colonna sonora perfetta per ogni fase dell'evento, con impianti audio e luci professionali.",
    offers:
      "Selezione musicale curata e personalizzata. Dai ritmi soft di sottofondo per l'aperitivo e la cena (Jazz, Lounge, Deep House), fino al momento del ballo sfrenato (Commerciale, Reggaeton, Dance anni '90/2000, i grandi classici italiani e i trend del momento). Nota: forniamo noi tutta la strumentazione audio/luci professionale se la location ne è sprovvista.",
  },
  {
    id: "serate-giochi",
    icon: "Dices",
    title: "Organizzazione Serate Giochi",
    card:
      "Quiz multimediali, karaoke, giochi di messaggeria. Conduzione da show televisivo.",
    focus:
      "Coinvolgimento attivo, interazione e competitività divertente tra i tavoli.",
    offers:
      "Una vera e propria conduzione da \"Show Televisivo\". Salvo organizza e presenta quiz multimediali a premi, giochi di abilità, serate karaoke con testi su maxischermo o giochi di messaggeria tra i tavoli. È il servizio perfetto per spezzare il ritmo delle cene o per eventi aziendali e feste private dove si vuole far socializzare tutti gli invitati.",
  },
];

export interface Bundle {
  id: "party-style" | "family-joy" | "luxury-wedding";
  name: string;
  audience: string;
  duration?: string;
  description: string;
  priceLabel: string;
  price: number;
  badge?: string;
  highlighted?: boolean;
}

export const bundles: Bundle[] = [
  {
    id: "party-style",
    name: "Party & Style",
    audience: "Feste private, 18esimi, lauree, compleanni adulti",
    duration: "Durata 4-5 ore",
    description:
      "Conduzione dinamica, gestione dei tempi, intrattenimento giovanile e carismatico al microfono.",
    priceLabel: "a partire da",
    price: 350,
  },
  {
    id: "family-joy",
    name: "Family & Joy",
    audience: "Battesimi, comunioni, cresime, feste a tema",
    description:
      "Conduzione e animazione misurata, coordinamento brindisi e accoglienza parenti, giochi interattivi. Tarato per tutte le generazioni.",
    priceLabel: "a partire da",
    price: 350,
    badge: "Ideale per famiglie",
  },
  {
    id: "luxury-wedding",
    name: "Luxury Wedding",
    audience: "Matrimoni ed eventi aziendali di gala",
    duration: "Durata 7-9 ore",
    description:
      "Coordinamento totale del ricevimento. Interfacciamento continuo con staff del locale, catering e fotografi per eliminare i tempi morti. Intrattenimento elegante dall'aperitivo fino a notte.",
    priceLabel: "a partire da",
    price: 600,
    badge: "Più richiesto",
    highlighted: true,
  },
];

export interface Extra {
  id: string;
  icon: IconName;
  name: string;
  description: string;
  priceLabel: string;
  strikeThrough?: string;
}

export const extras: Extra[] = [
  {
    id: "air-mirror",
    icon: "Camera",
    name: "Air Mirror",
    description:
      "Specchio magico fluttuante. Stampe illimitate in tempo reale, kit gadget, operatore dedicato, condivisione QR Code. Regola della doppia copia per i matrimoni.",
    priceLabel: "+250€",
    strikeThrough: "450€ se singolo",
  },
  {
    id: "video-booth-360",
    icon: "Video",
    name: "Video Booth 360",
    description:
      "Pedana rotante per video slow-motion ad altissimo impatto. Pronti da condividere su TikTok e Instagram.",
    priceLabel: "+300€",
  },
  {
    id: "audio-video-guestbook",
    icon: "Phone",
    name: "Audio/Video Guestbook",
    description:
      "Telefono vintage: gli ospiti sollevano la cornetta e registrano un messaggio vocale di auguri (file audio a fine serata).",
    priceLabel: "+80€",
  },
  {
    id: "set-scenografico",
    icon: "Sparkles",
    name: "Set Scenografico Premium",
    description:
      "Fondale a paillettes lucide con scritta personalizzata a luce Neon. Trasforma la postazione in un set hollywoodiano.",
    priceLabel: "+80€",
  },
  {
    id: "ora-extra",
    icon: "Clock",
    name: "Ora Extra",
    description:
      "Gestione dei prolungamenti della festa richiesti sul momento.",
    priceLabel: "+70€ / ora",
  },
  {
    id: "fascia-trasferta",
    icon: "Car",
    name: "Fascia Trasferta",
    description:
      "Gratuito ad Adrano e comuni entro 30km. Fuori provincia (Taormina, Caltagirone): supplemento.",
    priceLabel: "+40-60€",
  },
];

export interface SicilyExperience {
  icon: IconName;
  emoji: string;
  it: { title: string; description: string };
  en: { title: string; description: string };
}

export const sicilyExperiences: SicilyExperience[] = [
  {
    icon: "Wine",
    emoji: "🍷",
    it: {
      title: "Etna Wine Tasting Premium",
      description:
        "Degustazioni guidate di vini Etna DOC nei palmenti e nelle cantine più esclusive della zona nord/est del vulcano (Milo, Castiglione di Sicilia, Randazzo, Linguaglossa), abbinate a taglieri di specialità e piatti tipici siciliani.",
    },
    en: {
      title: "Premium Etna Wine Tasting",
      description:
        "Guided tastings of Etna DOC wines in the most exclusive historic cellars on the north/east slopes of the volcano (Milo, Castiglione di Sicilia, Randazzo, Linguaglossa), paired with boards of Sicilian specialties and traditional dishes.",
    },
  },
  {
    icon: "Sun",
    emoji: "🌅",
    it: {
      title: "Etna Sunset Party",
      description:
        "Aperitivo esclusivo al tramonto sulle pendici del vulcano. Regia, musica e intrattenimento leggero firmati Salvo, completati dall'Air Mirror attivo per scattare foto pazzesche con il vulcano e il tramonto sullo sfondo.",
    },
    en: {
      title: "Etna Sunset Party",
      description:
        "Exclusive sunset aperitif on the slopes of the volcano. Direction, music and light entertainment by Salvo, with the Air Mirror active to capture stunning photos with the volcano and sunset in the background.",
    },
  },
  {
    icon: "Tractor",
    emoji: "🚜",
    it: {
      title: "Sicilian Food & Agriturismo Experience",
      description:
        "Pranzi o cene a base di piatti tradizionali in agriturismi selezionati (zona Adrano, Bronte, Nicolosi), ideali per grandi tavolate familiari, gruppi turistici o Team Building aziendali (Incentive).",
    },
    en: {
      title: "Sicilian Food & Agriturismo Experience",
      description:
        "Lunches or dinners featuring traditional dishes at selected agriturismos (Adrano, Bronte, Nicolosi area), ideal for large family tables, tourist groups or corporate Team Building (Incentive).",
    },
  },
  {
    icon: "Waves",
    emoji: "🌊",
    it: {
      title: "Luxury Beach & Coast Tours",
      description:
        "Welcome Party in spiaggia e terrazze panoramiche lungo il litorale di Taormina, Giardini Naxos e Letojanni, con intrattenimento bilingue e postazione Video Booth 360 per gli ospiti internazionali.",
    },
    en: {
      title: "Luxury Beach & Coast Tours",
      description:
        "Welcome Party on the beach and panoramic terraces along the coast of Taormina, Giardini Naxos and Letojanni, with bilingual entertainment and a Video Booth 360 station for international guests.",
    },
  },
];

export const sicilyExperienceCopy = {
  it: {
    eyebrow: "GOLD EVENTS SICILY EXPERIENCE",
    title:
      "Destination Sicily: Non Solo Feste, Ma Esperienze Indimenticabili.",
    subtitle:
      "Stai pianificando il tuo matrimonio o un evento aziendale in Sicilia? Gold Events by Salvo unisce la magia del territorio all'intrattenimento di lusso. Organizziamo il tuo evento privato nei luoghi più iconici della Sicilia Orientale, gestendo le migliori collaborazioni con i partner locali.",
    partnerNote: {
      label: "Come funziona",
      title: "Salvo non eroga direttamente questi servizi: fa da tramite.",
      body:
        "Le esperienze del circuito Sicily Experience — degustazioni nelle cantine, aperitivi sull'Etna, pranzi in agriturismo, welcome party sulle coste — sono gestite e realizzate dai nostri partner territoriali selezionati (cantine, agriturismi, ristoranti, beach club, guide vulcanologiche). Gold Events by Salvo cura la regia, la selezione dei partner più adatti al tuo evento, la comunicazione bilingue con i tuoi ospiti internazionali e l'intrattenimento firmato Salvo, facendo da tramite tra te e le strutture. Tu vivi l'esperienza: noi coordiniamo tutto il dietro-le-quinte.",
      cta: "Diventa Partner",
    },
    discover: "Scopri di più",
  },
  en: {
    eyebrow: "GOLD EVENTS SICILY EXPERIENCE",
    title: "Destination Sicily: Not Just Parties, But Unforgettable Experiences.",
    subtitle:
      "Planning your wedding or corporate event in Sicily? Gold Events by Salvo combines the magic of the territory with luxury entertainment. We organize your private event in the most iconic locations of Eastern Sicily, managing the best partnerships with local partners.",
    partnerNote: {
      label: "How it works",
      title: "Salvo does not deliver these services directly: he acts as a bridge.",
      body:
        "The experiences in the Sicily Experience circuit — winery tastings, Mt. Etna aperitifs, agriturismo lunches, coastal welcome parties — are managed and delivered by our selected local partners (wineries, agriturismos, restaurants, beach clubs, volcanic guides). Gold Events by Salvo curates the direction, selects the partners best suited to your event, handles bilingual communication with your international guests, and provides Salvo-branded entertainment, acting as the bridge between you and the venues. You live the experience: we coordinate everything behind the scenes.",
      cta: "Become a Partner",
    },
    discover: "Discover more",
  },
};

export const eventTypeOptions = [
  "Matrimonio",
  "18esimo",
  "Battesimo",
  "Comunione",
  "Cresima",
  "Compleanno",
  "Laurea",
  "Festa Privata",
  "Festa a Tema",
  "Festa Aziendale",
  "Destination Experience",
  "Altro",
] as const;

export type EventTypeOption = (typeof eventTypeOptions)[number];

export const serviceCheckboxes = [
  { id: "party-style", label: "Conduzione Base — Party & Style" },
  { id: "family-joy", label: "Conduzione Base — Family & Joy" },
  { id: "luxury-wedding", label: "Conduzione Base — Luxury Wedding" },
  { id: "air-mirror", label: "Air Mirror" },
  { id: "video-booth-360", label: "Video Booth 360" },
  { id: "audio-video-guestbook", label: "Audio/Video Guestbook" },
  { id: "set-scenografico", label: "Set Scenografico Premium" },
  { id: "dj-set", label: "Dj Set" },
  { id: "serate-giochi", label: "Serate Giochi" },
  { id: "etna-wine-tasting", label: "Etna Wine Tasting" },
  { id: "etna-sunset-party", label: "Etna Sunset Party" },
  { id: "agriturismo", label: "Agriturismo" },
  { id: "beach-tour", label: "Beach Tour" },
] as const;

export const partnerActivityOptions = [
  "Cantina Vinicola",
  "Agriturismo",
  "Ristorante",
  "Guide Vulcanologiche",
  "Beach Club",
  "Altro",
] as const;

export const navItems = [
  { href: "#chi-sono", label: "Chi sono" },
  { href: "#servizi", label: "Servizi" },
  { href: "#bundles", label: "Bundle" },
  { href: "#extra", label: "Extra" },
  { href: "#sicily-experience", label: "Sicily Experience" },
  { href: "#contatti", label: "Contatti" },
] as const;

export const contactInfo = {
  whatsapp: "+39 333 0000000",
  whatsappHref: "https://wa.me/393330000000",
  email: "info@goldeventsbysalvo.it",
  location: "Adrano (Catania), Sicilia",
};
