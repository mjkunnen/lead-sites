export const siteConfig = {
  name: "NetjesOnline",
  tagline: "Webdesign Bureau",
  owner: "Max Kunnen",
  phone: "+31 6 21803896",
  email: "max@netjesonline.com",
  whatsapp: "https://wa.me/31621803896",
  city: "Nederland",
};

export const heroContent = {
  subtitle: "Webdesign Bureau",
  headline: "Websites die klanten opleveren",
  description:
    "Ik ben Max Kunnen, en ik help MKB-ondernemers aan een professionele website die écht klanten oplevert. Geen maandenlang wachten — binnen 5 werkdagen staat jouw site live.",
  cta: "Bekijk wat wij voor u kunnen doen",
  badges: [
    "50+ tevreden klanten",
    "4.9 gemiddeld",
    "5 dagen oplevering",
  ],
};

export const aboutContent = {
  tagline: "Over Max Kunnen",
  title: "De mens achter NetjesOnline",
  story: [
    "Ik zag het keer op keer: hardwerkende ondernemers — loodgieters, schilders, aannemers — die fantastisch werk leveren, maar online compleet onzichtbaar zijn. Hun concurrent met een mooie website pikt de klanten weg, terwijl zij het beste werk leveren.",
    "Dat frustreerde me. Niet iedereen heeft duizenden euro's of maanden de tijd voor een website. Daarom ben ik NetjesOnline gestart: professionele websites, snel opgeleverd, voor een eerlijke prijs. Geen wollig verhaal, geen eindeloze vergaderingen — gewoon resultaat.",
    "Ik doe alles persoonlijk. Jij hebt één aanspreekpunt: mij, Max Kunnen. Van het eerste gesprek tot de dag dat je website live gaat. En daarna ben ik er nog steeds als je iets nodig hebt.",
  ],
  values: [
    { title: "Persoonlijk", text: "Geen callcenter of ticket-systeem. Je belt of appt met mij, Max Kunnen." },
    { title: "Eerlijk", text: "Vaste prijzen, geen verborgen kosten. Wat ik zeg, dat doe ik." },
    { title: "Resultaatgericht", text: "Een mooie website is leuk, maar het gaat om klanten binnenhalen." },
  ],
};

export const problemCards = [
  {
    title: "Onzichtbaar online",
    text: "Potentiële klanten zoeken op Google, maar vinden uw concurrent.",
    icon: "globe" as const,
  },
  {
    title: "Verouderde website",
    text: "Uw huidige site schrikt klanten af in plaats van ze aan te trekken.",
    icon: "broken" as const,
  },
  {
    title: "Geen tijd",
    text: "U runt een bedrijf. Wie heeft er tijd om ook nog een website te bouwen?",
    icon: "clock" as const,
  },
];

export const uspItems = [
  {
    title: "Razendsnel",
    text: "Van eerste gesprek tot live website in 5 werkdagen. Geen maanden wachten.",
    icon: "zap" as const,
  },
  {
    title: "Professioneel design",
    text: "Uniek ontwerp dat past bij uw bedrijf. Geen standaard templates.",
    icon: "palette" as const,
  },
  {
    title: "Alles geregeld",
    text: "Hosting, onderhoud, updates — wij nemen het volledig uit handen.",
    icon: "shield" as const,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Kennismaking",
    text: "Even bellen of appen. Ik luister naar wat je nodig hebt en geef direct eerlijk advies.",
  },
  {
    number: "02",
    title: "Ontwerp",
    text: "Ik maak een design op maat. Jij geeft feedback, ik pas het aan tot het perfect is.",
  },
  {
    number: "03",
    title: "Bouw & Review",
    text: "Ik bouw je website en laat het je zien vóór livegang. Pas als jij tevreden bent, gaan we door.",
  },
  {
    number: "04",
    title: "Live",
    text: "Je website gaat live. Ik regel hosting, domein en blijf beschikbaar voor vragen.",
  },
];

export const portfolioItems = [
  {
    title: "Van den Berg Loodgieters",
    niche: "Loodgieter",
    image: "/portfolio/loodgieter.jpg",
    span: "col-span-2" as const,
  },
  {
    title: "Klusservice Jansen",
    niche: "Aannemer",
    image: "/portfolio/aannemer.jpg",
    span: "col-span-1" as const,
  },
  {
    title: "Schildersbedrijf De Wit",
    niche: "Schilder",
    image: "/portfolio/schilder.jpg",
    span: "col-span-1" as const,
  },
  {
    title: "Bakkerij Het Broodhuys",
    niche: "Horeca",
    image: "/portfolio/bakkerij.jpg",
    span: "col-span-2" as const,
  },
];

export const reviews = [
  {
    name: "Jan de Vries",
    company: "De Vries Installatietechniek",
    city: "Amsterdam",
    text: "Binnen een week hadden we een professionele website. Sindsdien krijgen we wekelijks nieuwe aanvragen via Google.",
    stars: 5,
  },
  {
    name: "Sandra Bakker",
    company: "Bakker Schilderwerken",
    city: "Rotterdam",
    text: "Eindelijk een website die past bij de kwaliteit van ons werk. De reacties van klanten zijn geweldig.",
    stars: 5,
  },
  {
    name: "Mohammed El Amrani",
    company: "El Amrani Bouw",
    city: "Utrecht",
    text: "Alles werd voor ons geregeld. Geen gedoe, gewoon een prachtige website die resultaat oplevert.",
    stars: 5,
  },
  {
    name: "Lisa van Dijk",
    company: "Schoonmaakbedrijf Van Dijk",
    city: "Den Haag",
    text: "We hadden geen website en wisten niet waar te beginnen. NetjesOnline maakte het makkelijk.",
    stars: 5,
  },
  {
    name: "Peter Hendriks",
    company: "Hendriks Dakdekkers",
    city: "Eindhoven",
    text: "Goede communicatie, snel opgeleverd, en het design ziet er veel duurder uit dan wat we betaald hebben.",
    stars: 4,
  },
  {
    name: "Fatima Yilmaz",
    company: "Yilmaz Klussenbedrijf",
    city: "Tilburg",
    text: "Onze omzet is met 30% gestegen sinds we de nieuwe website hebben. Beste investering dit jaar.",
    stars: 5,
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "€499",
    description: "Perfect voor startende ondernemers",
    features: [
      "Professionele one-pager",
      "Mobielvriendelijk design",
      "Basis SEO",
      "1 revisieronde",
      "Oplevering in 5 werkdagen",
    ],
    cta: "Start vandaag",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "€999",
    description: "Meest gekozen door MKB",
    features: [
      "Multi-page website (max 5)",
      "Premium design op maat",
      "SEO optimalisatie",
      "3 revisierondes",
      "Contact formulier",
      "Google Maps integratie",
    ],
    cta: "Start vandaag",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "€1.999",
    description: "Voor maximale impact",
    features: [
      "Alles van Professional",
      "E-commerce of booking",
      "Custom animaties",
      "Priority support",
      "Onbeperkte revisies",
      "Analytics dashboard",
    ],
    cta: "Start vandaag",
    highlighted: false,
  },
];

export const faqItems = [
  {
    question: "Hoe lang duurt het om een website te maken?",
    answer:
      "Gemiddeld 5 werkdagen vanaf het moment dat ik alle content heb. Bij complexere projecten kan het iets langer duren, maar ik geef altijd vooraf een duidelijke deadline.",
  },
  {
    question: "Wat heb ik nodig om te starten?",
    answer:
      "Alleen een logo en wat tekst over je bedrijf. Heb je dat nog niet? Geen probleem — ik help je met content en kan ook een logo laten ontwerpen.",
  },
  {
    question: "Kan ik de website zelf aanpassen?",
    answer:
      "Ja, ik lever een eenvoudig beheersysteem mee waarmee je zelf teksten en afbeeldingen kunt wijzigen. Voor grotere aanpassingen kun je altijd bij mij terecht.",
  },
  {
    question: "Wat als ik niet tevreden ben?",
    answer:
      "Ik werk net zo lang door tot je 100% tevreden bent. Bij het Professional en Premium pakket heb je meerdere revisierondes inbegrepen.",
  },
  {
    question: "Is hosting inbegrepen?",
    answer:
      "Bij al mijn pakketten kun je hosting afnemen voor €29 per maand. Dit is inclusief SSL-certificaat, dagelijkse backups en technisch onderhoud.",
  },
];

export const navLinks = [
  { label: "Home", href: "#" },
  { label: "Over mij", href: "#over" },
  { label: "Diensten", href: "#diensten" },
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Prijzen", href: "#prijzen" },
  { label: "Contact", href: "#contact" },
];
