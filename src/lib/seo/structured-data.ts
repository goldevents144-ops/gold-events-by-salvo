/**
 * JSON-LD structured data for Google rich results.
 * Generates LocalBusiness + Service list + FAQPage + BreadcrumbList + Organization schemas.
 */

export const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://goldeventsbysalvo.vercel.app/#business",
  name: "Gold Events by Salvo",
  alternateName: "Gold Events Sicily Experience",
  description:
    "Showman, presentatore e servizi esclusivi per matrimoni, feste private ed eventi aziendali a Adrano, Catania, Taormina e sull'Etna. Conduzione, animazione e tecnologie esclusive: Air Mirror, Video Booth 360, Dj Set.",
  url: "https://goldeventsbysalvo.vercel.app/",
  telephone: "+39 344 232 2176",
  email: "goldeventssicilyexperience@outlook.com",
  image: "https://goldeventsbysalvo.vercel.app/images/hero-etna-dusk.png",
  logo: "https://goldeventsbysalvo.vercel.app/icon.svg",
  priceRange: "€€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Bonifico, Contanti",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adrano",
    addressRegion: "Catania",
    addressCountry: "IT",
    postalCode: "95031",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.6637,
    longitude: 14.8454,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/goldeventsicily_experience",
  ],
  areaServed: [
    { "@type": "Place", name: "Adrano" },
    { "@type": "Place", name: "Catania" },
    { "@type": "Place", name: "Taormina" },
    { "@type": "Place", name: "Etna" },
    { "@type": "Place", name: "Giardini Naxos" },
    { "@type": "Place", name: "Letojanni" },
    { "@type": "Place", name: "Bronte" },
    { "@type": "Place", name: "Nicolosi" },
    { "@type": "Place", name: "Sicilia" },
  ],
  founder: {
    "@type": "Person",
    name: "Salvo Piemonte",
    jobTitle: "Organizzatore di eventi",
  },
};

export const SERVICES_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servizi Gold Events by Salvo",
  itemListElement: [
    { "@type": "Service", position: 1, name: "Battesimi, Comunioni e Cresime", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale", offers: { "@type": "Offer", price: "350", priceCurrency: "EUR", availability: "https://schema.org/InStock" } },
    { "@type": "Service", position: 2, name: "Compleanni (18, 30, 40, 50+)", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale", offers: { "@type": "Offer", price: "350", priceCurrency: "EUR" } },
    { "@type": "Service", position: 3, name: "Matrimoni & Destination Wedding", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale", offers: { "@type": "Offer", price: "600", priceCurrency: "EUR" } },
    { "@type": "Service", position: 4, name: "Lauree", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale", offers: { "@type": "Offer", price: "350", priceCurrency: "EUR" } },
    { "@type": "Service", position: 5, name: "Feste Private", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale" },
    { "@type": "Service", position: 6, name: "Feste a Tema", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale" },
    { "@type": "Service", position: 7, name: "Feste Aziendali & Team Building", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale" },
    { "@type": "Service", position: 8, name: "Dj Set", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale" },
    { "@type": "Service", position: 9, name: "Organizzazione Serate Giochi", provider: { "@id": "https://goldeventsbysalvo.vercel.app/#business" }, areaServed: "Sicilia Orientale" },
  ],
};

export const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Che servizi offre Gold Events by Salvo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gold Events by Salvo di Salvo Piemonte offre 9 servizi: Battesimi, Comunioni, Cresime, Compleanni, Matrimoni, Lauree, Feste Private, Feste a Tema, Feste Aziendali, Dj Set e Organizzazione Serate Giochi. Affianca a queste conduzioni 6 servizi extra tecnologici: Air Mirror (specchio magico fotobooth con stampe illimitate), 360 Video Booth Experience (pedana rotante per video slow-motion), Video Guest Book Phone Experience (telefono vintage per registrazioni video), Set Scenografico Premium (fondale neon personalizzato), Ora Extra (+70€/h) e Fascia Trasferta (gratuita entro 30km da Adrano).",
      },
    },
    {
      "@type": "Question",
      name: "Quanto costa un matrimonio con Gold Events by Salvo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il bundle Luxury Wedding parte da 600€ per 7-9 ore di conduzione totale del ricevimento. Include regia e coordinamento totale, interfaccia con direttore di sala, catering e fotografi, conduzione primo ballo, taglio torta e lancio bouquet. I prezzi degli extra tecnologici (Air Mirror, Video Booth 360, Video Guest Book Phone) sono su richiesta e personalizzati in base ai servizi scelti. L'Ora Extra costa +70€/h. La trasferta è gratuita entro 30 km da Adrano (Catania), con supplemento 40-60€ per destinazioni oltre. Per un preventivo personalizzato, contatta Salvo Piemonte al +39 344 232 2176.",
      },
    },
    {
      "@type": "Question",
      name: "Dove opera Gold Events by Salvo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La sede operativa è ad Adrano (Catania), in Sicilia. Salvo Piemonte opera ovunque venga richiesto, non solo a Catania e provincia. Copre tutta la Sicilia Orientale (Catania, Taormina, Etna, Giardini Naxos, Letojanni, Bronte, Nicolosi) ed è disponibile per eventi in tutta Italia e all'estero. La trasferta è gratuita entro 30 km da Adrano; supplemento 40-60€ per destinazioni oltre.",
      },
    },
    {
      "@type": "Question",
      name: "Chi è Salvo Piemonte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Salvo Piemonte è il fondatore e organizzatore di eventi di Gold Events by Salvo, con sede ad Adrano (Catania), Sicilia. È showman, presentatore e conducente di eventi di lusso. Gestisce matrimoni, battesimi, compleanni, feste aziendali e serate giochi in tutta la Sicilia e ovunque venga richiesto. Offre anche tecnologie esclusive come Air Mirror, 360 Video Booth Experience e Video Guest Book Phone Experience.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è l'Air Mirror di Gold Events?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'Air Mirror è lo specchio magico fotobooth di ultima generazione di Gold Events by Salvo. Include stampe fotografiche totalmente illimitate in tempo reale, kit gadget (occhiali, parrucche, cartelli), operatore dedicato, condivisione digitale tramite QR Code e grafiche personalizzate. Per i matrimoni è inclusa la regola della doppia copia: una stampa per gli sposi e una per gli ospiti. Il prezzo è su richiesta in abbinamento a una conduzione base.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è il 360 Video Booth Experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il 360 Video Booth Experience è una pedana rotante professionale che permette agli ospiti di registrare video dinamici in slow motion con effetti cinematografici, musica personalizzata e grafiche dell'evento. I video vengono elaborati in pochi secondi e condivisi direttamente tramite smartphone su TikTok e Instagram. Capace fino a 4-5 persone per video, include operatore dedicato per tutta la serata. Prezzo su richiesta.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è il Video Guest Book Phone Experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il Video Guest Book Phone Experience è una postazione scenografica con telefono vintage dotato di sistema di registrazione video e audio professionale. Gli ospiti sollevano la cornetta e registrano dediche, auguri e momenti spontanei. Al termine dell'evento, tutti i video vengono raccolti e consegnati in formato digitale. Ideale per matrimoni, compleanni, lauree, anniversari ed eventi aziendali. Prezzo su richiesta.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è Gold Events Sicily Experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gold Events Sicily Experience è il circuito turistico internazionale di Salvo Piemonte. Non eroga direttamente i servizi (degustazioni, agriturismo, beach tour), ma fa da tramite curando la regia, la selezione dei partner territoriali (cantine, agriturismi, beach club, guide vulcanologiche) e la comunicazione bilingue italiano/inglese con gli ospiti internazionali. Offre 4 esperienze: Etna Wine Tasting Premium, Etna Sunset Party, Sicilian Food & Agriturismo Experience, Luxury Beach & Coast Tours a Taormina e Giardini Naxos.",
      },
    },
    {
      "@type": "Question",
      name: "Come posso richiedere un preventivo per il mio evento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compila il modulo nella sezione Contatti del sito goldeventsbysalvo.vercel.app. Dopo l'invio, riceverai un messaggio pre-compilato da inviare via WhatsApp al +39 344 232 2176 o via email a goldeventssicilyexperience@outlook.com. Il messaggio include automaticamente nome, tipo di evento, data, location, numero ospiti e servizi desiderati. Risposta garantita entro 24 ore con proposta personalizzata da Salvo Piemonte.",
      },
    },
    {
      "@type": "Question",
      name: "L'Air Mirror ha stampe fotografiche illimitate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, le stampe fotografiche dell'Air Mirror di Gold Events by Salvo sono totalmente illimitate per tutta la durata dell'evento. Per i matrimoni è inclusa la regola della doppia copia: una stampa per gli sposi e una per gli ospiti. Include anche kit gadget (occhiali, parrucche, cartelli), operatore dedicato, condivisione QR Code e grafiche personalizzate con nome sposi o festeggiato.",
      },
    },
    {
      "@type": "Question",
      name: "Posso diventare partner del circuito Sicily Experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Cantine vinicole, agriturismi, ristoranti, guide vulcanologiche e beach club possono candidarsi tramite il modulo 'Diventa Partner' nel sito di Gold Events by Salvo. Saranno ricontattati da Salvo Piemonte per valutare la collaborazione B2B. I partner vengono inseriti nel circuito Gold Events Sicily Experience per offrire esperienze turistiche di lusso in Sicilia Orientale.",
      },
    },
    {
      "@type": "Question",
      name: "Quali sono i prezzi dei bundle di Gold Events by Salvo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gold Events by Salvo offre 3 bundle di conduzione: Party & Style (a partire da 350€ per feste private, 18esimi, lauree, compleanni adulti — durata flessibile), Family & Joy (a partire da 350€ per battesimi, comunioni, cresime — ideale per famiglie), Luxury Wedding (a partire da 600€ per matrimoni ed eventi aziendali di gala — il più richiesto). I prezzi degli extra tecnologici (Air Mirror, Video Booth 360, Video Guest Book Phone) sono personalizzati e su richiesta. Ora Extra: +70€/h. Trasferta gratuita entro 30km da Adrano.",
      },
    },
    {
      "@type": "Question",
      name: "Gold Events by Salvo fa eventi fuori dalla Sicilia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, Salvo Piemonte opera ovunque venga richiesto. La sede operativa è ad Adrano (Catania), ma è disponibile per eventi in tutta Italia e all'estero. La trasferta è gratuita entro 30 km da Adrano; per destinazioni oltre (Taormina, Caltagirone, Ragusa, Noto) il supplemento è di 40-60€. Per eventi fuori Sicilia, il preventivo è personalizzato in base alla destinazione.",
      },
    },
  ],
};

export const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://goldeventsbysalvo.vercel.app/" },
    { "@type": "ListItem", position: 2, name: "Servizi", item: "https://goldeventsbysalvo.vercel.app/#servizi" },
    { "@type": "ListItem", position: 3, name: "Bundle", item: "https://goldeventsbysalvo.vercel.app/#bundles" },
    { "@type": "ListItem", position: 4, name: "Sicily Experience", item: "https://goldeventsbysalvo.vercel.app/#sicily-experience" },
    { "@type": "ListItem", position: 5, name: "Contatti", item: "https://goldeventsbysalvo.vercel.app/#contatti" },
  ],
};

export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://goldeventsbysalvo.vercel.app/#organization",
  name: "Gold Events by Salvo",
  alternateName: "Gold Events Sicily Experience",
  url: "https://goldeventsbysalvo.vercel.app/",
  logo: "https://goldeventsbysalvo.vercel.app/icon.svg",
  founder: {
    "@type": "Person",
    name: "Salvo Piemonte",
    jobTitle: "Organizzatore di eventi",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+39 344 232 2176",
    email: "goldeventssicilyexperience@outlook.com",
    contactType: "customer service",
    availableLanguage: ["it", "en"],
  },
};

export const ALL_LD = [
  LOCAL_BUSINESS_LD,
  SERVICES_LD,
  FAQ_LD,
  BREADCRUMB_LD,
  ORGANIZATION_LD,
];
