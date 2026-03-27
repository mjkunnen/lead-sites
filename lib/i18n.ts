const translations = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      gallery: "Gallery",
      reviews: "Reviews",
      contact: "Contact",
      book: "Book now",
      bookMobile: "Book an appointment",
    },
    hero: {
      scrollDown: "Scroll down",
    },
    about: {
      label: "About us",
      heading1: "A salon with",
      heading2: "character",
      reviews: "Reviews",
      average: "Average",
    },
    services: {
      label: "Services",
      heading1: "What we can",
      heading2: "do for you",
      more: "More info",
    },
    gallery: {
      label: "Gallery",
      heading1: "Step into",
      heading2: "our world",
    },
    reviews: {
      label: "Reviews",
      heading1: "What our clients",
      heading2: "experience",
      count: "reviews",
    },
    faq: {
      label: "FAQ",
      heading: "Frequently asked questions",
    },
    contact: {
      label: "Contact",
      heading1: "We look",
      heading2: "forward to it",
      subtext: "Curious what we can do for you? Get in touch and we'll be happy to help.",
      bookOnline: "Book online",
      bookSub: "The fastest way to make an appointment",
      phone: "Phone",
      whatsapp: "WhatsApp",
      whatsappCta: "Send a message",
      email: "Email",
      location: "Location",
    },
    mobileCta: {
      book: "Book an appointment",
      call: "Call now",
    },
    footer: {
      about: "About",
      services: "Services",
      gallery: "Gallery",
      reviews: "Reviews",
      contact: "Contact",
    },
  },
  nl: {
    nav: {
      about: "Over ons",
      services: "Diensten",
      gallery: "Gallerij",
      reviews: "Reviews",
      contact: "Contact",
      book: "Boek nu",
      bookMobile: "Boek een afspraak",
    },
    hero: {
      scrollDown: "Scroll naar beneden",
    },
    about: {
      label: "Over ons",
      heading1: "Een salon met",
      heading2: "karakter",
      reviews: "Reviews",
      average: "Gemiddeld",
    },
    services: {
      label: "Diensten",
      heading1: "Wat wij voor u",
      heading2: "kunnen doen",
      more: "Meer info",
    },
    gallery: {
      label: "Gallerij",
      heading1: "Stap binnen in",
      heading2: "onze wereld",
    },
    reviews: {
      label: "Reviews",
      heading1: "Wat onze klanten",
      heading2: "ervaren",
      count: "beoordelingen",
    },
    faq: {
      label: "FAQ",
      heading: "Veelgestelde vragen",
    },
    contact: {
      label: "Contact",
      heading1: "We kijken",
      heading2: "ernaar uit",
      subtext: "Benieuwd wat wij voor u kunnen doen? Neem contact op en we helpen u graag.",
      bookOnline: "Direct online boeken",
      bookSub: "De snelste manier om een afspraak te maken",
      phone: "Telefoon",
      whatsapp: "WhatsApp",
      whatsappCta: "Stuur een bericht",
      email: "E-mail",
      location: "Locatie",
    },
    mobileCta: {
      book: "Boek een afspraak",
      call: "Bel nu",
    },
    footer: {
      about: "Over ons",
      services: "Diensten",
      gallery: "Gallerij",
      reviews: "Reviews",
      contact: "Contact",
    },
  },
};

export type Lang = "en" | "nl";
export type Translations = typeof translations.en;

export function t(lang?: Lang): Translations {
  return translations[lang || "en"];
}
