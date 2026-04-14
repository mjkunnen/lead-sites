const API_BASE = "https://api.app.outscraper.com";

function getApiKey(): string {
  const key = process.env.OUTSCRAPER_API_KEY;
  if (!key) throw new Error("OUTSCRAPER_API_KEY niet gevonden in environment");
  return key;
}

async function apiRequest(path: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(path, API_BASE);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url.toString(), {
    headers: { "X-API-KEY": getApiKey() },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Outscraper API fout (${res.status}): ${text}`);
  }

  return res.json();
}

async function pollResult(requestId: string, maxAttempts = 30, intervalMs = 3000): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const result = await apiRequest("/requests/" + requestId);
    if (result.status === "Success") return result;
    if (result.status === "Error") throw new Error(`Outscraper request mislukt: ${JSON.stringify(result)}`);
    console.log(`  ⏳ Polling... (${i + 1}/${maxAttempts})`);
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Outscraper timeout na ${maxAttempts * intervalMs / 1000}s — probeer later opnieuw`);
}

export interface OutscraperBusiness {
  name: string;
  place_id: string;
  address: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  category: string;
  type: string | null;
  description: string | null;
  about: any;
  rating: number | null;
  reviews: number;
  reviews_data?: OutscraperReview[];
  photo: string | null;
  street_view: string | null;
  photos_count: number;
  working_hours: Record<string, any> | null;
  location_link: string;
  [key: string]: any;
}

export interface OutscraperReview {
  author_title: string;
  review_text: string | null;
  review_rating: number;
  review_datetime_utc: string;
  review_img_urls?: string[];
}

function extractBusiness(result: any): OutscraperBusiness {
  const businesses = result.data?.[0];
  if (!businesses?.length) throw new Error("Geen resultaten gevonden");
  return businesses[0];
}

export async function searchBusiness(query: string, lang = "nl"): Promise<OutscraperBusiness> {
  console.log(`🔍 Zoeken: "${query}"`);

  const regionMap: Record<string, string> = { nl: "NL", fr: "FR", en: "US" };

  // For FR: fetch more results and filter by city (Outscraper defaults to Paris)
  const limit = lang === "fr" ? "20" : "1";

  const result = await apiRequest("/maps/search-v3", {
    query,
    limit,
    language: lang,
    region: regionMap[lang] || "NL",
  });

  let data: any;
  if (result.id) {
    data = await pollResult(result.id);
  } else {
    data = result;
  }

  const businesses = data.data?.[0];
  if (!businesses?.length) throw new Error("Geen resultaten gevonden");

  if (lang === "fr" && businesses.length > 1) {
    // Extract target city from query (last part before ", France")
    const parts = query.split(",").map((p: string) => p.trim().toLowerCase());
    const targetCity = parts.find((p: string) => p !== "france" && p.length > 2 && !/^(plombier|électricien|electricien|maçon|macon|couvreur|chauffagiste|menuisier|carreleur|peintre|paysagiste|serrurier|plaquiste|ramoneur|coiffeur)/.test(p));

    if (targetCity) {
      // Find first business in the target city
      const match = businesses.find((b: any) => {
        const addr = (b.full_address || b.address || "").toLowerCase();
        const city = (b.city || "").toLowerCase();
        return city.includes(targetCity) || addr.includes(targetCity);
      });
      if (match) {
        console.log(`  📍 Gefilterd op stad: ${targetCity} (${businesses.length} resultaten → 1 match)`);
        return match;
      }
      console.log(`  ⚠️  Geen resultaat in "${targetCity}", gebruik eerste resultaat`);
    }
  }

  return businesses[0];
}

/** Search and return multiple results (up to `limit`) for filtering */
export async function searchMultiple(query: string, limit = 20, lang = "nl"): Promise<OutscraperBusiness[]> {
  console.log(`🔍 Zoeken (${limit}x): "${query}"`);

  const regionMap: Record<string, string> = { nl: "NL", fr: "FR", en: "US" };
  const result = await apiRequest("/maps/search-v3", {
    query,
    limit: String(limit),
    language: lang,
    region: regionMap[lang] || "NL",
  });

  let data: any;
  if (result.id) {
    data = await pollResult(result.id);
  } else {
    data = result;
  }

  const businesses = data.data?.[0];
  if (!businesses?.length) return [];
  return businesses;
}

export async function fetchReviews(placeId: string, limit = 10, lang = "nl"): Promise<OutscraperReview[]> {
  console.log(`📝 Reviews ophalen (max ${limit})...`);

  try {
    const result = await apiRequest("/maps/reviews-v3", {
      query: placeId,
      reviewsLimit: String(limit),
      language: lang,
      sort: "newest",
    });

    if (result.id) {
      const polled = await pollResult(result.id);
      const firstResult = polled.data?.[0];
      if (Array.isArray(firstResult) && firstResult[0]?.reviews_data) {
        return firstResult[0].reviews_data;
      }
      if (firstResult?.reviews_data) {
        return firstResult.reviews_data;
      }
      return [];
    }

    const firstResult = result.data?.[0];
    if (Array.isArray(firstResult) && firstResult[0]?.reviews_data) {
      return firstResult[0].reviews_data;
    }
    if (firstResult?.reviews_data) {
      return firstResult.reviews_data;
    }
    return [];
  } catch (err) {
    console.warn(`⚠️  Reviews ophalen mislukt, doorgaan zonder reviews`);
    return [];
  }
}

export function getReviews(business: OutscraperBusiness): OutscraperReview[] {
  return business.reviews_data || [];
}

export function getAllPhotos(business: OutscraperBusiness): string[] {
  const photos: string[] = [];

  // 1. Main photo (altijd beschikbaar)
  if (business.photo) photos.push(business.photo);

  // 2. Street view (hoge kwaliteit, andere hoek)
  if (business.street_view) photos.push(business.street_view);

  // 3. Review photos (meest authentiek)
  for (const review of (business.reviews_data || [])) {
    if (review.review_img_urls?.length) {
      photos.push(...review.review_img_urls);
    }
  }

  return photos;
}
