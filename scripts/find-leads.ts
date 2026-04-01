import { searchBusiness } from "./lib/outscraper";
import * as fs from "fs";
import * as path from "path";

// Zoekquery's — gericht op MKB vakmensen in verschillende steden
const queries = [
  "Schilder, Amsterdam",
  "Tegelzetter, Rotterdam",
  "Loodgieter, Eindhoven",
  "Timmerman, Breda",
  "Stukadoor, Tilburg",
  "Klusjesman, Arnhem",
  "Dakdekker, Haarlem",
  "Vloerlegger, Amersfoort",
  "Glaszetter, Leiden",
  "Elektricien, Nijmegen",
  "Schilder, Utrecht",
  "Keukenmonteur, Almere",
  "Timmerman, Apeldoorn",
  "Schilder, Zwolle",
  "Loodgieter, Den Haag",
];

// Websites die NIET tellen als "heeft een website"
const FAKE_SITES = [
  "facebook.com",
  "instagram.com",
  "tiktok.com",
  "linkedin.com",
  "youtube.com",
  "werkspot.nl",
  "trustpilot.com",
  "yelp.com",
  "google.com",
];

// Tekenen dat het een groot bedrijf is (niet MKB)
const BIG_COMPANY_SIGNALS = [
  "b.v.", "bv", "holding", "groep", "group", "international",
  "franchise", "keten", "landelijk",
];

function isRealWebsite(url: string | undefined): boolean {
  if (!url || url.length < 5) return false;
  const lower = url.toLowerCase();
  return !FAKE_SITES.some((fake) => lower.includes(fake));
}

function isMKB(name: string, reviews: number): boolean {
  const lower = name.toLowerCase();
  // Filter grote bedrijven
  if (BIG_COMPANY_SIGNALS.some((sig) => lower.includes(sig))) return false;
  // Meer dan 500 reviews = waarschijnlijk groot bedrijf
  if (reviews > 500) return false;
  return true;
}

async function main() {
  const results: Array<{
    name: string;
    city: string;
    phone: string | null;
    rating: number;
    reviews: number;
    category: string;
    website: string | null;
    place_id: string;
    is_mkb: boolean;
  }> = [];

  for (const q of queries) {
    try {
      console.log(`🔍 ${q}...`);
      const biz = await searchBusiness(q);
      const hasSite = isRealWebsite(biz.site);
      const mkb = isMKB(biz.name, biz.reviews || 0);

      results.push({
        name: biz.name,
        city: biz.city || q.split(", ")[1],
        phone: biz.phone || null,
        rating: biz.rating || 0,
        reviews: biz.reviews || 0,
        category: biz.category || "",
        website: hasSite ? biz.site : null,
        place_id: biz.place_id,
        is_mkb: mkb,
      });

      const flags = [
        hasSite ? "🌐 HEEFT SITE" : "❌ GEEN SITE",
        mkb ? "✅ MKB" : "⚠️ GROOT",
      ].join(" | ");

      console.log(`  ${biz.name} | ${biz.rating}/5 | ${biz.reviews} reviews | ${flags}`);
    } catch (e: any) {
      console.log(`  ❌ Skip: ${e.message}`);
    }
  }

  // Filter: alleen MKB zonder website, met telefoonnummer
  const hotLeads = results.filter((r) => !r.website && r.is_mkb && r.phone);
  const warmLeads = results.filter((r) => !r.website && r.is_mkb && !r.phone);
  const withSite = results.filter((r) => r.website && r.is_mkb);
  const skipped = results.filter((r) => !r.is_mkb);

  // Sort hot leads by reviews desc
  hotLeads.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  warmLeads.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));

  const all = [...hotLeads, ...warmLeads, ...withSite];
  const outPath = path.resolve(__dirname, "../leads.json");
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));

  console.log("\n━━━ 🔥 HOT LEADS (geen site + telefoon + MKB) ━━━\n");
  for (let i = 0; i < hotLeads.length; i++) {
    const r = hotLeads[i];
    console.log(`${i + 1}. ${r.name} (${r.city})`);
    console.log(`   📞 ${r.phone}`);
    console.log(`   ⭐ ${r.rating}/5 (${r.reviews} reviews)`);
    console.log("");
  }

  if (warmLeads.length > 0) {
    console.log("━━━ 🟡 WARM LEADS (geen site, geen telefoon) ━━━\n");
    warmLeads.forEach((r) => console.log(`  ${r.name} (${r.city}) — ${r.reviews} reviews`));
    console.log("");
  }

  if (skipped.length > 0) {
    console.log("━━━ ⏭️ OVERGESLAGEN (te groot / niet MKB) ━━━\n");
    skipped.forEach((r) => console.log(`  ${r.name} (${r.reviews} reviews) — reden: niet MKB`));
    console.log("");
  }

  console.log(`Totaal gevonden: ${results.length}`);
  console.log(`Hot leads: ${hotLeads.length}`);
  console.log(`Warm leads: ${warmLeads.length}`);
  console.log(`Heeft website: ${withSite.length}`);
  console.log(`Overgeslagen: ${skipped.length}`);
  console.log(`\nOpgeslagen in: leads.json`);
}

main().catch((e) => {
  console.error(`FATAL: ${e.message}`);
  process.exit(1);
});
