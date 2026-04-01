import type { OutscraperReview } from "./outscraper";

export interface PhotoResult {
  hero: string;
  gallery: Array<{ url: string; alt: string }>;
  sources: string[];
}

function stripSizeParams(url: string): string {
  return url.replace(/=[whs]\d+[^&\s]*/g, "");
}

function resizeGooglePhoto(url: string, width: number, height: number): string {
  const base = stripSizeParams(url);
  return `${base}=w${width}-h${height}-k-no`;
}

function isGooglePhoto(url: string): boolean {
  return url.includes("googleusercontent.com") || url.includes("ggpht.com");
}

function dedupPhotos(urls: string[]): string[] {
  const seen = new Set<string>();
  return urls.filter((url) => {
    const base = stripSizeParams(url);
    if (seen.has(base)) return false;
    seen.add(base);
    return true;
  });
}

export function buildPhotoResult(
  mainPhoto: string | null,
  outscrpaerPhotos: string[],
  reviews: OutscraperReview[],
  businessName: string,
  googleMapsApiKey?: string,
  placeId?: string,
): PhotoResult {
  const sources: string[] = [];
  const allPhotos: string[] = [];

  // 1. Main photo from Outscraper search
  if (mainPhoto) {
    allPhotos.push(mainPhoto);
    sources.push("outscraper-main");
  }

  // 2. Outscraper photos endpoint
  if (outscrpaerPhotos.length > 0) {
    allPhotos.push(...outscrpaerPhotos);
    sources.push("outscraper-photos");
  }

  // 3. Review photos (Outscraper uses review_img_urls)
  const reviewPhotos: string[] = [];
  for (const review of reviews) {
    const photos = review.review_img_urls || [];
    if (photos.length) {
      reviewPhotos.push(...photos);
    }
  }
  if (reviewPhotos.length > 0) {
    allPhotos.push(...reviewPhotos);
    sources.push("review-photos");
  }

  // 4. Street View fallback (only if < 2 unique photos)
  const uniquePhotos = dedupPhotos(allPhotos);
  if (uniquePhotos.length < 2 && googleMapsApiKey && placeId) {
    const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=1600x1000&location=place_id:${placeId}&key=${googleMapsApiKey}`;
    uniquePhotos.push(streetViewUrl);
    sources.push("street-view");
  }

  if (uniquePhotos.length === 0) {
    console.warn("⚠️  Geen foto's gevonden — gallery wordt leeg");
    return { hero: "", gallery: [], sources };
  }

  // Hero: first photo, resized for hero
  const heroBase = uniquePhotos[0];
  const hero = isGooglePhoto(heroBase) ? resizeGooglePhoto(heroBase, 1600, 1000) : heroBase;

  // Gallery: all unique photos resized for gallery
  const gallery = uniquePhotos.slice(0, 6).map((url, i) => ({
    url: isGooglePhoto(url) ? resizeGooglePhoto(url, 800, 600) : url,
    alt: `${businessName} project ${i + 1}`,
  }));

  return { hero, gallery, sources };
}
