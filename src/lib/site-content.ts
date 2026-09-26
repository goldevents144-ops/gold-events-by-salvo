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
  /** Optional detailed options list (itemized inclusions) shown in the dialog */
  options?: { label: string; value: string }[];
  /** Optional image path under /images */
  image?: string;
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
    options: [
      { label: "Durata conduzione", value: "4 ore (dall'aperitivo al taglio della torta)" },
      { label: "Accoglienza parenti", value: "Inclusa — coordinamento ingresso e saluti" },
      { label: "Gestione brindisi", value: "Inclusa con microfonaggio curato" },
      { label: "Momento della torta", value: "Regia musicale + annuncio dedicato" },
      { label: "Giochi per bambini", value: "Inclusi — schede, quiz a premi, animazione leggera" },
      { label: "Musica di sottofondo", value: "DJ Set soft incluso (Lounge, Italian classic)" },
      { label: "Stampe foto Air Mirror", value: "Illimitate, doppia copia per parenti stretti" },
      { label: "Trasferta", value: "Gratuita entro 30 km da Adrano" },
    ],
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
    options: [
      { label: "18esimi", value: "Conduzione giovane + Video Booth 360 + Dj Set commerciale" },
      { label: "30/40/50 anni", value: "Conduzione energetica + Audio Guestbook + Air Mirror" },
      { label: "60/70 anni", value: "Conduzione misurata + Air Mirror classico + Dj Set evergreen" },
      { label: "Durata", value: "4-5 ore base, estendibile con ora extra (+70€/h)" },
      { label: "Video ricordi", value: "Proiezione su maxischermo inclusa (invia file in anticipo)" },
      { label: "Brindisi organizzato", value: "Incluso con calice dedicato al festeggiato" },
      { label: "Apertura regali", value: "Regia musicale e annuncio dedicato" },
      { label: "Playlist personalizzata", value: "Inclusa — definiamo i generi insieme prima dell'evento" },
    ],
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
    image: "/images/collage/matrimoni-couple-toast.jpg",
    options: [
      { label: "Durata", value: "7-9 ore (dall'aperitivo fino a notte)" },
      { label: "Coordinamento fornitori", value: "Incluso — catering, fotografo, fiorista, musicisti" },
      { label: "Interfaccia direttore di sala", value: "Continua, per zero tempi morti tra le portate" },
      { label: "Primo ballo", value: "Regia musicale + annuncio dedicato" },
      { label: "Lancio bouquet/giarrettiera", value: "Incluso con momento scenico" },
      { label: "Taglio torta", value: "Regia completa + luce + musica dedicata" },
      { label: "Air Mirror \"Doppia Copia\"", value: "Una stampa per gli sposi, una per gli ospiti — illimitate" },
      { label: "Guestbook Premium", value: "Libro delle firme elegante incluso" },
      { label: "Audio Guestbook", value: "Telefono vintage per auguri vocali (consegna file audio a fine serata)" },
      { label: "Trasferta", value: "Gratuita entro 30 km da Adrano; supplem. 40-60€ oltre" },
    ],
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
    options: [
      { label: "Durata", value: "4-5 ore base, estendibile" },
      { label: "Proclamazione neolaureato", value: "Inclusa — annuncio scenico e foto di gruppo" },
      { label: "Giochi a tema università", value: "Inclusi — quiz sul percorso di studi, sfide tra tavoli" },
      { label: "Brindisi organizzato", value: "Incluso con calice dedicato" },
      { label: "Dj Set commerciale", value: "Incluso — playlist su richiesta" },
      { label: "Video Booth 360", value: "Consigliato per video virali con i colleghi" },
      { label: "Proiezione ricordi", value: "Inclusa su maxischermo (invia file in anticipo)" },
      { label: "Trasferta", value: "Gratuita entro 30 km da Adrano" },
    ],
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
    options: [
      { label: "Anniversari", value: "25°, 50°, 60° — conduzione elegante + Air Mirror ricordi" },
      { label: "Addii al celibato/nubilato", value: "Conduzione vivace + Dj Set + Video Booth 360" },
      { label: "Ricorrenze di coppia", value: "Conduzione intima + Audio Guestbook auguri" },
      { label: "Location", value: "Ville, loft, locali privati — su indicazione del cliente" },
      { label: "Scaletta", value: "Personalizzata su target e desideri del festeggiato" },
      { label: "Durata", value: "4-6 ore, estendibile con ora extra (+70€/h)" },
      { label: "Trasferta", value: "Gratuita entro 30 km da Adrano" },
    ],
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
    options: [
      { label: "Anni '80 / '90", value: "Playlist tematica + grafiche Air Mirror vintage + contest abito" },
      { label: "Halloween", value: "Conduzione horror + Set Scenografico Premium neon + Air Mirror a tema" },
      { label: "Carnival Party", value: "Conduzione mascherata + contest maschera + Dj Set Carnevale" },
      { label: "White Party", value: "Dress code bianco + luci bianche/oro + Air Mirror elegante" },
      { label: "Glow Party", value: "Luci UV + Air Mirror neon + Video Booth 360 con filtri glow" },
      { label: "Contest a premio", value: "Incluso — organizzazione e premiazione scenica" },
      { label: "Abbigliamento conducente", value: "A tema se richiesto (incluso)" },
      { label: "Personalizzazione grafiche", value: "Air Mirror e Set Premium personalizzati al 100% sul tema" },
    ],
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
    options: [
      { label: "Premiazioni interne", value: "Regia scenica + presentazione manager + momento trofeo" },
      { label: "Meeting annuali", value: "Conduzione istituzionale + transizione al divertimento" },
      { label: "Team Building", value: "Giochi di gruppo + attività di coordinamento" },
      { label: "Incentive trip", value: "Conduzione + Dj Set + esperienze sul territorio (Sicily Experience)" },
      { label: "Product launch", value: "Regia presentazione prodotto + momento celebrativo" },
      { label: "Branding foto/video", value: "Logo aziendale su ogni stampa Air Mirror / Video Booth 360" },
      { label: "Bilingue", value: "Disponibile in IT/EN per team internazionali" },
      { label: "Durata", value: "Personalizzata in base al format aziendale" },
    ],
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
    options: [
      { label: "Aperitivo", value: "Jazz, Lounge, Deep House soft" },
      { label: "Cena", value: "Bossa Nova, Nu-Disco, Italian evergreen riarrangiato" },
      { label: "Ballo", value: "Commerciale, Reggaeton, Dance anni '90/2000, classici italiani, trend del momento" },
      { label: "Fine serata", value: "Lento / momento romantico su richiesta" },
      { label: "Impianto audio", value: "Professionale incluso (casse, mixer, subwoofer)" },
      { label: "Luci", value: "Palco + dance floor + effetti (inclusi se location sprovvista)" },
      { label: "Playlist personalizzata", value: "Inclusa — definiamo generi e brani insieme prima" },
      { label: "Richieste live", value: "Accettate durante la serata via WhatsApp del DJ" },
    ],
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
    options: [
      { label: "Cervelloni / Quiz multimediali", value: "Domande su maxischermo + punteggio + premio finale" },
      { label: "Karaoke", value: "Testi su maxischermo + microfoni + basi musicali curate" },
      { label: "Giochi di messaggeria", value: "Biglietti tra tavoli + sorteggio + lettura scenica" },
      { label: "Giochi di abilità", value: "Sfide fisiche/mentali tra tavoli + tabellone punteggi" },
      { label: "Premi", value: "Organizzazione logistica premi (a carico del cliente o su preventivo)" },
      { label: "Maxischermo", value: "Incluso per quiz, karaoke e tabelloni" },
      { label: "Conduzione", value: "Stile show televisivo con microfonaggio dedicato" },
      { label: "Ideale per", value: "Cene aziendali, feste private, team building, eventi collieghi" },
    ],
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
  /** Itemized inclusions list shown on the card */
  inclusions: string[];
  /** Image path under /images */
  image?: string;
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
    inclusions: [
      "Conduzione di Salvo per 4-5 ore",
      "Microfonaggio professionale",
      "Gestione tempi della serata",
      "Coordinamento brindisi e momenti clou",
      "Annuncio e presentazione del festeggiato",
      "Trasferta gratuita entro 30 km da Adrano",
    ],
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
    inclusions: [
      "Conduzione di Salvo per 4 ore",
      "Animazione per tutte le età (bambini + adulti)",
      "Accoglienza parenti e coordinamento sala",
      "Gestione brindisi e momento della torta",
      "Giochi interattivi a tema",
      "Musica di sottofondo (Lounge, Italian classic)",
      "Trasferta gratuita entro 30 km da Adrano",
    ],
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
    inclusions: [
      "Conduzione di Salvo per 7-9 ore",
      "Regia e coordinamento totale del ricevimento",
      "Interfaccia con direttore di sala, catering, fotografi",
      "Conduzione primo ballo + taglio torta + lancio bouquet",
      "Microfonaggio professionale + DJ Set incluso",
      "Impianto audio/luci professionale (se location sprovvista)",
      "Trasferta gratuita entro 30 km da Adrano",
    ],
  },
];

export interface Extra {
  id: string;
  icon: IconName;
  name: string;
  description: string;
  priceLabel: string;
  strikeThrough?: string;
  /** Itemized specs shown in a tooltip/details */
  specs?: { label: string; value: string }[];
  /** Image path under /images */
  image?: string;
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
    image: "/images/air-mirror-photobooth.png",
    specs: [
      { label: "Stampe fotografiche", value: "ILLIMITATE per tutta la durata dell'evento" },
      { label: "Doppia copia matrimoni", value: "Inclusa — una per gli sposi, una per gli ospiti" },
      { label: "Kit gadget", value: "Occhiali, parrucche, cartelli (anche in dialetto siciliano)" },
      { label: "Operatore", value: "Dedicato sul posto per tutta la serata" },
      { label: "Condivisione digitale", value: "Immediata tramite QR Code (WhatsApp/Instagram)" },
      { label: "Grafiche personalizzate", value: "Incluse con nome sposi / festeggiato / tema" },
      { label: "Allestimento", value: "Incluso (specchio + luci + sfondo)" },
    ],
  },
  {
    id: "video-booth-360",
    icon: "Video",
    name: "Video Booth 360",
    description:
      "Pedana rotante per video slow-motion ad altissimo impatto. Pronti da condividere su TikTok e Instagram.",
    priceLabel: "+300€",
    image: "/images/video-booth-360.png",
    specs: [
      { label: "Pedana", value: "Rotante professionale, capacità fino a 4-5 persone" },
      { label: "Ripresa", value: "Slow-motion HD, 120 fps" },
      { label: "Effetti", value: "Filtri, musiche trend TikTok/Instagram, personalizzazione" },
      { label: "Condivisione", value: "Immediata via QR Code o AirDrop" },
      { label: "Operatore", value: "Dedicato per tutta la serata" },
      { label: "Video illimitati", value: "Per tutti gli ospiti, per tutta la durata" },
      { label: "Branding", value: "Logo aziendale / nome sposi sovrapposto opzionale" },
    ],
  },
  {
    id: "audio-video-guestbook",
    icon: "Phone",
    name: "Audio/Video Guestbook",
    description:
      "Telefono vintage: gli ospiti sollevano la cornetta e registrano un messaggio vocale di auguri (file audio a fine serata).",
    priceLabel: "+80€",
    specs: [
      { label: "Tipologia", value: "Telefono vintage d'epoca restaurato" },
      { label: "Registrazione", value: "Vocale (fino a 3 min per messaggio)" },
      { label: "Consegna", value: "File audio unico a fine serata (MP3/WAV)" },
      { label: "Messaggi", value: "Illimitati per tutta la durata dell'evento" },
      { label: "Allestimento", value: "Tavolino dedicato + cartello istruzioni" },
      { label: "Ideale per", value: "Matrimoni, anniversari, compleanni importanti" },
    ],
  },
  {
    id: "set-scenografico",
    icon: "Sparkles",
    name: "Set Scenografico Premium",
    description:
      "Fondale a paillettes lucide con scritta personalizzata a luce Neon. Trasforma la postazione in un set hollywoodiano.",
    priceLabel: "+80€",
    specs: [
      { label: "Fondale", value: "Paillettes lucide oro/argento (altezza 2m)" },
      { label: "Scritta Neon", value: "Personalizzata con nome sposi / festeggiato / azienda" },
      { label: "Colore Neon", value: "Oro, bianco caldo, rosa, blu (a scelta)" },
      { label: "Illuminazione", value: "Fari dedicati sulla postazione" },
      { label: "Compatibilità", value: "Abbinato ad Air Mirror o Video Booth 360" },
      { label: "Montaggio", value: "Incluso — entro 1 ora prima dell'inizio evento" },
    ],
  },
  {
    id: "ora-extra",
    icon: "Clock",
    name: "Ora Extra",
    description:
      "Gestione dei prolungamenti della festa richiesti sul momento.",
    priceLabel: "+70€ / ora",
    specs: [
      { label: "Tariffazione", value: "A ora, calcolata su frazioni di 30 min" },
      { label: "Richiesta", value: "Sul momento, anche durante la serata" },
      { label: "Disponibilità", value: "Soggetta ad autorizzazione struttura" },
      { label: "Cosa include", value: "Conduzione + musica + tutte le attrezzature" },
    ],
  },
  {
    id: "fascia-trasferta",
    icon: "Car",
    name: "Fascia Trasferta",
    description:
      "Gratuito ad Adrano e comuni entro 30km. Fuori provincia (Taormina, Caltagirone): supplemento.",
    priceLabel: "+40-60€",
    specs: [
      { label: "Gratuito", value: "Adrano + comuni entro 30 km (Belpasso, Paternò, Biancavilla, Adrano, Centuripe, ecc.)" },
      { label: "Supplemento 40€", value: "Catania, Acireale, Giarre, Riposto (40-60 km)" },
      { label: "Supplemento 50€", value: "Taormina, Giardini Naxos, Letojanni (60-80 km)" },
      { label: "Supplemento 60€", value: "Caltagirone, Ragusa, Noto (>80 km)" },
      { label: "Trasferta inclusa", value: "Carico, scarico, viaggio A/R con tutta l'attrezzatura" },
    ],
  },
];

export interface SicilyExperience {
  icon: IconName;
  emoji: string;
  /** Image path under /images */
  image?: string;
  it: { title: string; description: string };
  en: { title: string; description: string };
}

export const sicilyExperiences: SicilyExperience[] = [
  {
    icon: "Wine",
    emoji: "🍷",
    image: "/images/etna-wine-tasting.png",
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
    image: "/images/etna-sunset-party.png",
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
    image: "/images/agriturismo-sicilian.png",
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
    image: "/images/beach-coast-luxury.png",
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
  // Persona
  personName: "Salvo Piemonte",
  brandRole: "Organizzatore di eventi",
  // Contact channels
  whatsapp: "+39 344 232 2176",
  whatsappHref: "https://wa.me/393442322176",
  email: "goldeventssicilyexperience@outlook.com",
  // Location
  location: "Adrano (Catania), Sicilia",
  // Social
  instagram: "https://www.instagram.com/goldeventsicily_experience",
  instagramHandle: "@goldeventsicily_experience",
  tiktok: "#",
  facebook: "#",
};

/**
 * Tipologie di esperienza curate dal circuito Gold Events Sicily Experience
 * (estratte dalla bio ufficiale Instagram di Salvo Piemonte).
 * Mostrate come chip nella sezione Sicily Experience per dare visione d'insieme.
 */
export const sicilyExperienceCategories = [
  "Esperienze sull'Etna",
  "Degustazioni in cantina",
  "Esperienze gastronomiche",
  "Escursioni naturalistiche",
  "Tour fotografici",
  "Esperienze romantiche",
  "Weekend tematici",
  "Proposte di matrimonio",
  "Esperienze per voi",
] as const;
