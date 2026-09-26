/**
 * JSON-LD structured data for Google rich results.
 * Generates LocalBusiness + Service list + FAQPage + BreadcrumbList + Organization schemas.
 */

export const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.goldeventsbysalvo.it/#business",
  name: "Gold Events by Salvo",
  alternateName: "Gold Events Sicily Experience",
  description:
    "Showman, presentatore e servizi esclusivi per matrimoni, feste private ed eventi aziendali a Adrano, Catania, Taormina e sull'Etna. Conduzione, animazione e tecnologie esclusive: Air Mirror, Video Booth 360, Dj Set.",
  url: "https://www.goldeventsbysalvo.it/",
  telephone: "+39 344 232 2176",
  email: "goldeventssicilyexperience@outlook.com",
  image: "https://www.goldeventsbysalvo.it/images/hero-etna-dusk.png",
  logo: "https://www.goldeventsbysalvo.it/icon.svg",
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
    { "@type": "Service", position: 1, name: "Battesimi, Comunioni e Cresime", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale", offers: { "@type": "Offer", price: "350", priceCurrency: "EUR", availability: "https://schema.org/InStock" } },
    { "@type": "Service", position: 2, name: "Compleanni (18, 30, 40, 50+)", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale", offers: { "@type": "Offer", price: "350", priceCurrency: "EUR" } },
    { "@type": "Service", position: 3, name: "Matrimoni & Destination Wedding", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale", offers: { "@type": "Offer", price: "600", priceCurrency: "EUR" } },
    { "@type": "Service", position: 4, name: "Lauree", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale", offers: { "@type": "Offer", price: "350", priceCurrency: "EUR" } },
    { "@type": "Service", position: 5, name: "Feste Private", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale" },
    { "@type": "Service", position: 6, name: "Feste a Tema", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale" },
    { "@type": "Service", position: 7, name: "Feste Aziendali & Team Building", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale" },
    { "@type": "Service", position: 8, name: "Dj Set", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale" },
    { "@type": "Service", position: 9, name: "Organizzazione Serate Giochi", provider: { "@id": "https://www.goldeventsbysalvo.it/#business" }, areaServed: "Sicilia Orientale" },
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
        text: "Gold Events by Salvo offre 9 servizi: Battesimi/Comunioni/Cresime, Compleanni, Matrimoni, Lauree, Feste Private, Feste a Tema, Feste Aziendali, Dj Set e Organizzazione Serate Giochi. Affianca a queste conduzioni 6 servizi extra tecnologici: Air Mirror, Video Booth 360, Audio Guestbook, Set Scenografico Premium, Ora Extra e Fascia Trasferta.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto costa un matrimonio con Gold Events by Salvo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il bundle Luxury Wedding parte da 600€ per 7-9 ore di conduzione totale del ricevimento. A questo si possono aggiungere extra come Air Mirror (+250€), Video Booth 360 (+300€), Audio Guestbook (+80€) e Set Scenografico Premium (+80€). Trasferta gratuita entro 30 km da Adrano.",
      },
    },
    {
      "@type": "Question",
      name: "Dove opera Gold Events by Salvo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sede operativa ad Adrano (Catania). Operatività su tutta la Sicilia Orientale: Catania, Taormina, Etna, Giardini Naxos, Letojanni, Bronte, Nicolosi. Trasferta gratuita entro 30 km da Adrano; supplemento 40-60€ per destinazioni oltre.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è Gold Events Sicily Experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gold Events Sicily Experience è il circuito turistico internazionale di Salvo Piemonte. Non eroga direttamente i servizi (degustazioni, agriturismo, beach tour), ma fa da tramite curando la regia, la selezione dei partner territoriali (cantine, agriturismi, beach club, guide vulcanologiche) e la comunicazione bilingue con gli ospiti internazionali.",
      },
    },
    {
      "@type": "Question",
      name: "Come posso richiedere un preventivo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compila il modulo nella sezione Contatti del sito. Riceverai in automatico un messaggio pre-compilato da inviare via WhatsApp al +39 344 232 2176 o via email a goldeventssicilyexperience@outlook.com. Risposta garantita entro 24 ore.",
      },
    },
    {
      "@type": "Question",
      name: "L'Air Mirror ha stampe illimitate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, le stampe fotografiche dell'Air Mirror sono totalmente illimitate per tutta la durata dell'evento. Per i matrimoni è inclusa la regola della doppia copia: una stampa per gli sposi, una per gli ospiti. Il costo in abbinamento a una conduzione base è di +250€ (invece di 450€ se preso singolarmente).",
      },
    },
    {
      "@type": "Question",
      name: "Posso diventare partner del circuito Sicily Experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Cantine vinicole, agriturismi, ristoranti, guide vulcanologiche e beach club possono candidarsi tramite il modulo 'Diventa Partner' nella sezione apposita del sito. Saranno ricontattati da Salvo per valutare la collaborazione B2B.",
      },
    },
  ],
};

export const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.goldeventsbysalvo.it/" },
    { "@type": "ListItem", position: 2, name: "Servizi", item: "https://www.goldeventsbysalvo.it/#servizi" },
    { "@type": "ListItem", position: 3, name: "Bundle", item: "https://www.goldeventsbysalvo.it/#bundles" },
    { "@type": "ListItem", position: 4, name: "Sicily Experience", item: "https://www.goldeventsbysalvo.it/#sicily-experience" },
    { "@type": "ListItem", position: 5, name: "Contatti", item: "https://www.goldeventsbysalvo.it/#contatti" },
  ],
};

export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.goldeventsbysalvo.it/#organization",
  name: "Gold Events by Salvo",
  alternateName: "Gold Events Sicily Experience",
  url: "https://www.goldeventsbysalvo.it/",
  logo: "https://www.goldeventsbysalvo.it/icon.svg",
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
