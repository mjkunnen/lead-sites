import * as fs from "fs";
import * as path from "path";
import { searchBusiness, fetchReviews, getAllPhotos } from "./lib/outscraper";
import { buildPhotoResult } from "./lib/photos";
import { generateContent } from "./lib/openai-content";
import { generateSlug, detectNiche, formatWorkingHours, selectPalette, estimateStats } from "./lib/slug";
import type { SiteContent } from "../lib/types";

// ── CLI argument parsing ──────────────────────────────────────────────

const args = process.argv.slice(2);

function hasFlag(flag: string): boolean {
  return args.includes(flag);
}

function getFlagValue(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx + 1 >= args.length) return undefined;
  return args[idx + 1];
}

const dryRun = hasFlag("--dry-run");
const force = hasFlag("--force");
const placeId = getFlagValue("--place-id");

const flagsWithValues = new Set(["--place-id"]);
const positional: string[] = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) {
    if (flagsWithValues.has(args[i])) i++;
    continue;
  }
  positional.push(args[i]);
}

if (!placeId && positional.length < 2) {
  console.log(`
Gebruik:
  npx tsx scripts/generate-site.ts "Bedrijfsnaam" "Stad"
  npx tsx scripts/generate-site.ts --place-id "ChIJ..."

Opties:
  --dry-run     Toon output zonder te schrijven
  --force       Overschrijf bestaande site
  --place-id    Zoek op Google Place ID (skip search)
`);
  process.exit(1);
}

const businessName = positional[0];
const city = positional[1];

// ── Main pipeline ─────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();

  // Stap 1: Outscraper search → bedrijfsdata + main photo + street view
  console.log("\n━━━ Stap 1/4: Bedrijfsdata ophalen ━━━");
  const query = placeId || `${businessName}, ${city}`;
  const business = await searchBusiness(query);

  console.log(`  ✅ Gevonden: ${business.name}`);
  console.log(`  📍 ${business.address || "adres onbekend"}`);
  console.log(`  ⭐ ${business.rating || "?"}/5 (${business.reviews} reviews)`);
  console.log(`  🏷️  ${business.category}`);

  const resolvedName = business.name;
  const resolvedCity = business.city || city;
  const niche = detectNiche(business.category || "");
  const slug = generateSlug(resolvedName, resolvedCity);

  const sitesDir = path.resolve(__dirname, "../sites");
  const siteDir = path.join(sitesDir, slug);

  if (fs.existsSync(siteDir) && !force && !dryRun) {
    console.error(`\n❌ Site "${slug}" bestaat al. Gebruik --force om te overschrijven.`);
    process.exit(1);
  }

  // Stap 2: Reviews ophalen (aparte call — geeft echte review tekst + foto's)
  console.log("\n━━━ Stap 2/4: Reviews + foto's ophalen ━━━");
  const reviews = await fetchReviews(business.place_id, 10);
  console.log(`  ✅ ${reviews.length} reviews opgehaald`);

  // Foto's: main photo + street view + review photos
  const photoResult = buildPhotoResult(
    business.photo,
    business.street_view ? [business.street_view] : [],
    reviews,
    resolvedName,
    process.env.GOOGLE_MAPS_API_KEY,
    business.place_id,
  );
  console.log(`  📸 ${photoResult.gallery.length} foto's (bronnen: ${photoResult.sources.join(", ")})`);

  // Stap 3: OpenAI content generatie
  console.log("\n━━━ Stap 3/4: Content genereren ━━━");
  const reviewTexts = reviews.map((r) => r.review_text).filter(Boolean) as string[];
  const description = business.description || (business.about && typeof business.about === "object" ? JSON.stringify(business.about) : null);
  const generated = await generateContent({
    businessName: resolvedName,
    niche,
    city: resolvedCity,
    rating: business.rating,
    reviewTexts,
    description,
    category: business.category,
  });
  console.log(`  ✅ Tagline: "${generated.tagline}"`);
  console.log(`  🔧 ${generated.services.length} services, ${generated.faq.length} FAQ's`);

  // Stap 4: Assembleer + schrijf content.json
  console.log("\n━━━ Stap 4/4: content.json samenstellen ━━━");
  const stats = estimateStats(business, reviews);
  const workingHours = formatWorkingHours(business.working_hours);

  const siteReviews = reviews.slice(0, 6).map((r) => {
    const date = r.review_datetime_utc ? formatReviewDate(r.review_datetime_utc) : undefined;
    return {
      name: r.author_title || "Anoniem",
      text: r.review_text || "",
      stars: Math.min(5, Math.max(1, r.review_rating || 5)),
      ...(date ? { date } : {}),
    };
  }).filter((r) => r.text.length > 10);

  const content: SiteContent & { metadata: SiteContent["metadata"] & { source?: string; place_id?: string } } = {
    slug,
    lang: "nl",
    business_name: resolvedName,
    niche,
    theme: "bold",
    palette: selectPalette(niche),
    tagline: generated.tagline,
    about: generated.about,
    trust_badges: generated.trust_badges,
    stats,
    hero: {
      ...generated.hero,
      image_url: photoResult.hero,
    },
    services: generated.services,
    gallery: photoResult.gallery.length > 0 ? photoResult.gallery : undefined,
    reviews: siteReviews,
    faq: generated.faq,
    contact: {
      phone: business.phone || undefined,
      email: business.email || undefined,
      city: resolvedCity,
      address: business.address || undefined,
      maps_url: `https://www.google.com/maps/place/?q=place_id:${business.place_id}`,
    },
    working_hours: workingHours,
    metadata: {
      generated_at: new Date().toISOString(),
      lead_id: `${slug}-001`,
      source: "outscraper",
      place_id: business.place_id,
      version: 1,
    },
  };

  if (dryRun) {
    console.log("\n🔍 DRY RUN — output:\n");
    console.log(JSON.stringify(content, null, 2));
    console.log(`\n📁 Zou schrijven naar: sites/${slug}/content.json`);
  } else {
    fs.mkdirSync(siteDir, { recursive: true });
    const outputPath = path.join(siteDir, "content.json");
    fs.writeFileSync(outputPath, JSON.stringify(content, null, 2), "utf-8");
    console.log(`  ✅ Geschreven naar: sites/${slug}/content.json`);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✨ Klaar in ${elapsed}s`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Niche: ${niche}`);
  console.log(`   Palette: ${selectPalette(niche)}`);
  console.log(`   Reviews: ${siteReviews.length}`);
  console.log(`   Foto's: ${photoResult.gallery.length}`);
}

function formatReviewDate(utcDate: string): string {
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  const d = new Date(utcDate);
  if (isNaN(d.getTime())) return "";
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

main().catch((err) => {
  console.error(`\n❌ Fout: ${err.message}`);
  process.exit(1);
});
