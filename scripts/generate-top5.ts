import { searchBusiness, fetchReviews } from "./lib/outscraper";
import { buildPhotoResult } from "./lib/photos";
import { generateSlug, detectNiche, formatWorkingHours, estimateStats } from "./lib/slug";
import * as fs from "fs";
import * as path from "path";

const targets = [
  { query: "Rioolfix Loodgieter, Den Haag", city: "Den Haag" },
  { query: "De Elektromonteur, Nijmegen", city: "Nijmegen" },
  { query: "Tolmeijer Dakdekkers, Haarlem", city: "Haarlem" },
  { query: "Keukenvoorbereiding Almere", city: "Almere" },
  { query: "Mokum Schilderwerken, Amsterdam", city: "Amsterdam" },
];

function formatReviewDate(utcDate: string): string {
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  const d = new Date(utcDate);
  if (isNaN(d.getTime())) return "";
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

async function processBiz(query: string, fallbackCity: string) {
  console.log(`\n━━━ Zoeken: ${query} ━━━`);
  const biz = await searchBusiness(query);
  console.log(`  ✅ ${biz.name} | ${biz.rating}/5 | ${biz.reviews} reviews`);

  console.log("  📝 Reviews ophalen...");
  const reviews = await fetchReviews(biz.place_id, 10);
  console.log(`  ✅ ${reviews.length} reviews`);

  const photoResult = buildPhotoResult(
    biz.photo,
    biz.street_view ? [biz.street_view] : [],
    reviews,
    biz.name,
    process.env.GOOGLE_MAPS_API_KEY,
    biz.place_id,
  );

  const niche = detectNiche(biz.category || "");
  const city = biz.city || fallbackCity;
  const slug = generateSlug(biz.name, city);
  const stats = estimateStats(biz as any, reviews as any);
  const workingHours = formatWorkingHours(biz.working_hours as any);

  const siteReviews = reviews
    .slice(0, 8)
    .map((r: any) => ({
      name: r.author_title || "Anoniem",
      text: r.review_text || "",
      stars: Math.min(5, Math.max(1, r.review_rating || 5)),
      ...(r.review_datetime_utc ? { date: formatReviewDate(r.review_datetime_utc) } : {}),
    }))
    .filter((r: any) => r.text.length > 10);

  const nicheLabel = niche.charAt(0).toUpperCase() + niche.slice(1);
  const cleanName = biz.name.replace(/[🔨🛠⭐️✅]/g, "").trim();

  const content = {
    slug,
    lang: "nl",
    business_name: cleanName,
    niche,
    theme: "bold",
    palette: "vakman",
    tagline: `${nicheLabel} in ${city}`,
    about: biz.description ||
      `${cleanName} is een professioneel ${niche}sbedrijf in ${city} en omgeving. Met ${stats.years || "jarenlange"} jaar ervaring leveren wij vakkundig werk met oog voor detail.`,
    trust_badges: [
      `${stats.reviews_count || biz.reviews}x Google reviews`,
      stats.years ? `${stats.years}+ jaar ervaring` : "Jarenlange ervaring",
      "Gratis offerte",
      "Binnen 24u reactie",
    ],
    stats,
    hero: {
      headline: `Uw ${niche} in ${city}`,
      subheadline: `Professioneel ${niche}swerk in ${city} en omgeving. Vakkundig, betrouwbaar en altijd netjes opgeleverd.`,
      cta_primary: "Bel direct",
      cta_secondary: "Offerte aanvragen",
      image_url: photoResult.hero,
    },
    services: [
      { title: nicheLabel, text: "Professioneel vakwerk.", icon: "default" },
      { title: "Advies", text: "Eerlijk advies op maat.", icon: "default" },
      { title: "Reparatie", text: "Snel en vakkundig.", icon: "wrench" },
      { title: "Onderhoud", text: "Periodiek onderhoud.", icon: "default" },
    ],
    gallery: photoResult.gallery.length > 0 ? photoResult.gallery : undefined,
    reviews: siteReviews,
    faq: [
      { question: "Hoe snel kunnen jullie er zijn?", answer: "Neem contact op voor de actuele beschikbaarheid. Wij proberen altijd snel te schakelen." },
      { question: `In welk gebied zijn jullie actief?`, answer: `Wij werken in ${city} en directe omgeving.` },
      { question: "Hoe kan ik een offerte aanvragen?", answer: "Bel of WhatsApp ons. Wij komen vrijblijvend langs voor een offerte op maat." },
    ],
    contact: {
      phone: biz.phone || undefined,
      email: biz.email || undefined,
      city,
      address: biz.address || undefined,
      maps_url: `https://www.google.com/maps/place/?q=place_id:${biz.place_id}`,
    },
    working_hours: workingHours,
    metadata: {
      generated_at: new Date().toISOString(),
      lead_id: `${slug}-001`,
      version: 1,
    },
  };

  const sitesDir = path.resolve(__dirname, "../sites", slug);
  fs.mkdirSync(sitesDir, { recursive: true });
  fs.writeFileSync(path.join(sitesDir, "content.json"), JSON.stringify(content, null, 2));
  console.log(`  📁 Geschreven: sites/${slug}/content.json`);
  return slug;
}

async function main() {
  const slugs: string[] = [];
  for (const t of targets) {
    try {
      const s = await processBiz(t.query, t.city);
      slugs.push(s);
    } catch (e: any) {
      console.log(`  ❌ Skip: ${e.message}`);
    }
  }
  console.log("\n━━━ KLAAR ━━━");
  console.log("Sites gegenereerd:");
  slugs.forEach((s) => console.log(`  → netjesonline.com/${s}`));
}

main().catch((e) => {
  console.error(`FATAL: ${e.message}`);
  process.exit(1);
});
