import { searchMultiple } from "./lib/outscraper";
import * as fs from "fs";
import * as path from "path";

// 30 queries x 20 resultaten = 600 bedrijven gescand
const queries = [
  // Schilders
  "Schilder, Tilburg", "Schilder, Breda", "Schilder, Almere",
  "Schilder, Apeldoorn", "Schilder, Enschede", "Schilder, Groningen",
  // Stukadoors
  "Stukadoor, Amsterdam", "Stukadoor, Rotterdam", "Stukadoor, Den Haag",
  "Stukadoor, Utrecht", "Stukadoor, Breda", "Stukadoor, Arnhem",
  // Loodgieters
  "Loodgieter, Utrecht", "Loodgieter, Tilburg", "Loodgieter, Groningen",
  "Loodgieter, Almere", "Loodgieter, Arnhem",
  // Timmermannen
  "Timmerman, Rotterdam", "Timmerman, Eindhoven", "Timmerman, Tilburg",
  "Timmerman, Almere", "Timmerman, Groningen",
  // Tegelzetters
  "Tegelzetter, Den Haag", "Tegelzetter, Eindhoven", "Tegelzetter, Tilburg",
  "Tegelzetter, Amsterdam", "Tegelzetter, Breda",
  // Overig
  "Dakdekker, Rotterdam", "Klusjesman, Den Haag", "Vloerlegger, Utrecht",
];

const FAKE_SITES = [
  "facebook.com", "instagram.com", "tiktok.com", "linkedin.com",
  "youtube.com", "werkspot.nl", "trustpilot.com", "yelp.com",
  "google.com", "nextdoor", "marktplaats.nl",
];

const BIG_SIGNALS = ["b.v.", " bv", "holding", "groep", "group", "international", "franchise"];

function isRealWebsite(url: string | null | undefined): boolean {
  if (!url || url.length < 5) return false;
  return !FAKE_SITES.some((f) => url.toLowerCase().includes(f));
}

function isMKB(name: string, reviews: number): boolean {
  const lower = name.toLowerCase();
  if (BIG_SIGNALS.some((s) => lower.includes(s))) return false;
  if (reviews > 500) return false;
  return true;
}

async function main() {
  const hotLeads: any[] = [];
  const seen = new Set<string>();
  let totalScanned = 0;

  for (const q of queries) {
    try {
      const results = await searchMultiple(q, 20);
      console.log(`  → ${results.length} resultaten`);
      totalScanned += results.length;

      for (const biz of results) {
        if (!biz.place_id || seen.has(biz.place_id)) continue;
        seen.add(biz.place_id);

        const hasSite = isRealWebsite(biz.website);
        const mkb = isMKB(biz.name || "", biz.reviews || 0);

        if (!hasSite && mkb && biz.phone) {
          hotLeads.push({
            name: (biz.name || "").replace(/[🔨🛠⭐️✅🔧]/gu, "").trim(),
            city: biz.city || q.split(", ")[1],
            phone: biz.phone,
            rating: biz.rating || 0,
            reviews: biz.reviews || 0,
            category: biz.category || "",
            address: biz.address || "",
            place_id: biz.place_id,
            location_link: biz.location_link || "",
          });
          console.log(`  🔥 ${biz.name} | ${biz.city || "?"} | ${biz.phone} | ${biz.rating}/5 | ${biz.reviews} rev`);
        }
      }
    } catch (e: any) {
      console.log(`  ❌ ${q}: ${e.message}`);
    }
  }

  // Dedup by phone
  const phonesSeen = new Set<string>();
  const deduped = hotLeads.filter((l) => {
    const p = l.phone.replace(/\D/g, "");
    if (phonesSeen.has(p)) return false;
    phonesSeen.add(p);
    return true;
  });

  deduped.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));

  const outPath = path.resolve(__dirname, "../leads-deep.json");
  fs.writeFileSync(outPath, JSON.stringify(deduped, null, 2));

  console.log(`\n━━━ 🔥 LEADS ZONDER WEBSITE + MET TELEFOON (${deduped.length}) ━━━\n`);
  for (let i = 0; i < deduped.length; i++) {
    const r = deduped[i];
    console.log(`${i + 1}. ${r.name} (${r.city})`);
    console.log(`   📞 ${r.phone}`);
    console.log(`   ⭐ ${r.rating}/5 (${r.reviews} reviews)`);
    console.log(`   📍 ${r.address}`);
    console.log("");
  }

  console.log(`Totaal gescand: ${totalScanned} bedrijven (${seen.size} uniek)`);
  console.log(`Leads gevonden: ${deduped.length}`);
  console.log(`Opgeslagen in: leads-deep.json`);
}

main().catch((e) => {
  console.error(`FATAL: ${e.message}`);
  process.exit(1);
});
