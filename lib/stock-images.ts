// High-quality Unsplash stock images per niche — used as fallback when no good hero photo exists
const STOCK_HEROES: Record<string, string> = {
  loodgieter: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80",
  elektricien: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80",
  schilder: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1600&q=80",
  timmerman: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=80",
  aannemer: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
  dakdekker: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1600&q=80",
  tegelzetter: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80",
  vloerlegger: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80",
  keuken: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
  keukenmontage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
  badkamer: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80",
  hovenier: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80",
  stukadoor: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80",
  schoonmaak: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80",
  glaszetter: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  kapper: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80",
  installateur: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80",
  installatiebedrijf: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
  klusjesman: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80",
};

const DEFAULT_HERO = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80";

/**
 * Returns a reliable hero image URL.
 * If the original URL looks like a truncated Google photo or is empty, returns a stock image for the niche.
 */
export function getHeroImage(originalUrl: string | undefined, niche: string): string {
  if (!originalUrl || originalUrl.length < 20) {
    return STOCK_HEROES[niche.toLowerCase()] || DEFAULT_HERO;
  }

  // Google photos that are truncated or low quality (gps-cs-s = street view / place photos)
  if (
    originalUrl.includes("gps-cs-s/") ||
    originalUrl.includes("street_view") ||
    originalUrl.includes("=s0") ||
    originalUrl.endsWith("=") ||
    (!originalUrl.includes("=w") && originalUrl.includes("googleusercontent.com") && originalUrl.length < 150)
  ) {
    return STOCK_HEROES[niche.toLowerCase()] || DEFAULT_HERO;
  }

  return originalUrl;
}

export function getStockHero(niche: string): string {
  return STOCK_HEROES[niche.toLowerCase()] || DEFAULT_HERO;
}
