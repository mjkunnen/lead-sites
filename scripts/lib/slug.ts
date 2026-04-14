export function generateSlug(name: string, city: string): string {
  return `${name}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const NICHE_MAP: Record<string, string> = {
  // Bouw & renovatie
  carpenter: "timmerman",
  timmerman: "timmerman",
  timmerwerk: "timmerman",
  "bouwer van veranda's": "timmerman",
  "veranda builder": "timmerman",
  veranda: "timmerman",
  overkapping: "timmerman",
  aannemer: "aannemer",
  "general contractor": "aannemer",
  contractor: "aannemer",
  bouwbedrijf: "aannemer",

  // Installatie
  loodgieter: "loodgieter",
  plumber: "loodgieter",
  loodgieters: "loodgieter",
  installateur: "installateur",
  "hvac contractor": "installateur",

  // Keuken & badkamer
  keukenmontage: "keuken",
  "kitchen remodeler": "keuken",
  keukeninstallateur: "keuken",
  badkamer: "badkamer",
  "bathroom remodeler": "badkamer",

  // Vloeren & tegels
  tegelzetter: "tegelzetter",
  "tile contractor": "tegelzetter",
  vloerlegger: "vloerlegger",
  "flooring contractor": "vloerlegger",

  // Schilderwerk
  schilder: "schilder",
  painter: "schilder",
  schildersbedrijf: "schilder",

  // Dakwerk
  dakdekker: "dakdekker",
  "roofing contractor": "dakdekker",

  // Elektra
  elektricien: "elektricien",
  electrician: "elektricien",

  // Tuin
  hovenier: "hovenier",
  "landscape designer": "hovenier",
  tuinman: "hovenier",

  // Schoonmaak
  schoonmaak: "schoonmaak",
  "cleaning service": "schoonmaak",
  glazenwasser: "schoonmaak",

  // Haar & beauty
  kapper: "kapper",
  "hair salon": "kapper",
  barbershop: "kapper",

  // ── Franse niches ──
  plombier: "loodgieter",
  plomberie: "loodgieter",
  électricien: "elektricien",
  electricien: "elektricien",
  maçon: "metselaar",
  macon: "metselaar",
  maçonnerie: "metselaar",
  couvreur: "dakdekker",
  chauffagiste: "installateur",
  menuisier: "timmerman",
  menuiserie: "timmerman",
  charpentier: "timmerman",
  carreleur: "tegelzetter",
  carrelage: "tegelzetter",
  "peintre en bâtiment": "schilder",
  "peintre en batiment": "schilder",
  peintre: "schilder",
  paysagiste: "hovenier",
  jardinier: "hovenier",
  serrurier: "slotenmaker",
  plaquiste: "stukadoor",
  ramoneur: "schoorsteenveger",
  coiffeur: "kapper",
  "salon de coiffure": "kapper",
};

export function detectNiche(category: string): string {
  const lower = category.toLowerCase();

  // Directe match
  if (NICHE_MAP[lower]) return NICHE_MAP[lower];

  // Substring match
  for (const [key, value] of Object.entries(NICHE_MAP)) {
    if (lower.includes(key) || key.includes(lower)) return value;
  }

  // Fallback: gebruik de categorie zelf
  return lower.replace(/[^a-z0-9]+/g, "-");
}

const DAY_MAP: Record<string, string> = {
  monday: "Ma",
  tuesday: "Di",
  wednesday: "Wo",
  thursday: "Do",
  friday: "Vr",
  saturday: "Za",
  sunday: "Zo",
  maandag: "Ma",
  dinsdag: "Di",
  woensdag: "Wo",
  donderdag: "Do",
  vrijdag: "Vr",
  zaterdag: "Za",
  zondag: "Zo",
  // Short NL forms from Outscraper
  ma: "Ma",
  di: "Di",
  wo: "Wo",
  do: "Do",
  vr: "Vr",
  za: "Za",
  zo: "Zo",
  // French days
  lundi: "Lu",
  mardi: "Ma",
  mercredi: "Me",
  jeudi: "Je",
  vendredi: "Ve",
  samedi: "Sa",
  dimanche: "Di",
  lu: "Lu",
  me: "Me",
  je: "Je",
  ve: "Ve",
};

export function formatWorkingHours(hours: Record<string, any> | null, lang = "nl"): Record<string, string> | undefined {
  if (!hours || typeof hours !== "object") return undefined;

  const daysByLang: Record<string, string[]> = {
    nl: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
    fr: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
    en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  };
  const closedLabel = lang === "fr" ? "Fermé" : lang === "en" ? "Closed" : "Gesloten";
  const h24Label = lang === "fr" ? "24h/24" : "24 uur";

  const formatted: Record<string, string> = {};

  for (const [day, time] of Object.entries(hours)) {
    const shortDay = DAY_MAP[day.toLowerCase()] || day.substring(0, 2);
    const timeStr = Array.isArray(time) ? time.join(", ") : String(time);
    const cleanTime = timeStr
      .replace(/\s*[–-]\s*/g, " - ")
      .replace(/Closed|Gesloten|Fermé/i, closedLabel)
      .replace(/Open 24 hours|Ouvert 24h/i, h24Label);
    formatted[shortDay] = cleanTime;
  }

  const allDays = daysByLang[lang] || daysByLang.nl;
  for (const d of allDays) {
    if (!formatted[d]) formatted[d] = closedLabel;
  }

  return formatted;
}

export function selectPalette(_niche: string): string {
  // All niches use the vakman template — it's the premium default
  return "vakman";
}

export function estimateStats(
  business: { reviews: number },
  reviewsData: Array<{ review_datetime_utc: string }>,
): { years?: number; projects?: number; reviews_count: number } {
  const reviewCount = business.reviews || reviewsData.length;

  // Schat jaren op basis van oudste review
  let years: number | undefined;
  if (reviewsData.length > 0) {
    const dates = reviewsData
      .map((r) => new Date(r.review_datetime_utc).getTime())
      .filter((d) => !isNaN(d));
    if (dates.length > 0) {
      const oldest = Math.min(...dates);
      years = Math.max(1, Math.round((Date.now() - oldest) / (365.25 * 24 * 60 * 60 * 1000)));
    }
  }

  // Schat projecten: reviews × 8 (meeste klanten laten geen review achter)
  const projects = reviewCount > 0 ? Math.round(reviewCount * 8) : undefined;

  return { years, projects, reviews_count: reviewCount };
}
