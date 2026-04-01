// Mobile-first (portrait crop) Unsplash stock images per niche
// Using fit=crop&w=800&h=1200 for mobile-optimized aspect ratio
const STOCK_HEROES: Record<string, string> = {
  loodgieter: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=1200&fit=crop&q=80",
  elektricien: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=1200&fit=crop&q=80",
  schilder: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=1200&fit=crop&q=80",
  timmerman: "https://images.unsplash.com/photo-1601058272524-0611e132d3c0?w=800&h=1200&fit=crop&q=80",
  aannemer: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1200&fit=crop&q=80",
  dakdekker: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&h=1200&fit=crop&q=80",
  tegelzetter: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=1200&fit=crop&q=80",
  vloerlegger: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1200&fit=crop&q=80",
  keuken: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1200&fit=crop&q=80",
  keukenmontage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1200&fit=crop&q=80",
  badkamer: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=1200&fit=crop&q=80",
  hovenier: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=1200&fit=crop&q=80",
  stukadoor: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1200&fit=crop&q=80",
  schoonmaak: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1200&fit=crop&q=80",
  glaszetter: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1200&fit=crop&q=80",
  kapper: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1200&fit=crop&q=80",
  installateur: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=1200&fit=crop&q=80",
  installatiebedrijf: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1200&fit=crop&q=80",
  klusjesman: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1200&fit=crop&q=80",
};

const DEFAULT_HERO = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1200&fit=crop&q=80";

/**
 * Returns a reliable hero image URL.
 * ONLY falls back to stock when the URL is truly broken (empty, truncated, or returns errors).
 * Prefers the original photo whenever possible.
 */
export function getHeroImage(originalUrl: string | undefined, niche: string): string {
  // No URL at all
  if (!originalUrl || originalUrl.trim().length < 10) {
    return STOCK_HEROES[niche.toLowerCase()] || DEFAULT_HERO;
  }

  // Truncated Google URLs (end abruptly without size params)
  const isGoogle = originalUrl.includes("googleusercontent.com");
  if (isGoogle) {
    // Good Google URLs have size params like =w800-h500 or =s1600
    const hasSizeParam = /=[wsh]\d/.test(originalUrl) || originalUrl.includes("-k-no");
    if (!hasSizeParam && originalUrl.length < 120) {
      return STOCK_HEROES[niche.toLowerCase()] || DEFAULT_HERO;
    }
  }

  return originalUrl;
}

export function getStockHero(niche: string): string {
  return STOCK_HEROES[niche.toLowerCase()] || DEFAULT_HERO;
}
