import { searchMultiple } from "./lib/outscraper";
import * as fs from "fs";
import * as path from "path";

// Zoek 20 resultaten per query, filter op geen website
const queries = [
  "Schilder, Amsterdam",
  "Schilder, Rotterdam",
  "Loodgieter, Den Haag",
  "Timmerman, Utrecht",
  "Stukadoor, Eindhoven",
  "Klusjesman, Tilburg",
  "Dakdekker, Breda",
  "Tegelzetter, Arnhem",
  "Schilder, Groningen",
  "Loodgieter, Nijmegen",
];

const FAKE_SITES = [
  "facebook.com", "instagram.com", "tiktok.com", "linkedin.com",
  "youtube.com", "werkspot.nl", "trustpilot.com", "yelp.com", "google.com",
];

const BIG_SIGNALS = ["b.v.", "bv", "holding", "groep", "group", "international", "franchise"];

function isRealWebsite(url: string | undefined): boolean {
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

  for (const q of queries) {
    try {
      const results = await searchMultiple(q, 20);
      console.log(`  → ${results.length} resultaten`);

      for (const biz of results) {
        if (seen.has(biz.place_id)) continue;
        seen.add(biz.place_id);

        const hasSite = isRealWebsite(biz.website ?? undefined);
        const mkb = isMKB(biz.name, biz.reviews || 0);

        if (!hasSite && mkb && biz.phone) {
          hotLeads.push({
            name: biz.name?.replace(/[🔨🛠⭐️✅]/g, "").trim(),
            city: biz.city || q.split(", ")[1],
            phone: biz.phone,
            rating: biz.rating || 0,
            reviews: biz.reviews || 0,
            category: biz.category || "",
            website: null,
            place_id: biz.place_id,
            address: biz.address,
          });
          console.log(`  🔥 ${biz.name} | ${biz.city} | ${biz.phone} | ${biz.rating}/5 | ${biz.reviews} reviews`);
        }
      }
    } catch (e: any) {
      console.log(`  ❌ ${q}: ${e.message}`);
    }
  }

  hotLeads.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));

  const outPath = path.resolve(__dirname, "../leads-real.json");
  fs.writeFileSync(outPath, JSON.stringify(hotLeads, null, 2));

  console.log(`\n━━━ 🔥 ECHTE LEADS ZONDER WEBSITE (${hotLeads.length}) ━━━\n`);
  for (let i = 0; i < Math.min(hotLeads.length, 20); i++) {
    const r = hotLeads[i];
    console.log(`${i + 1}. ${r.name} (${r.city})`);
    console.log(`   📞 ${r.phone}`);
    console.log(`   ⭐ ${r.rating}/5 (${r.reviews} reviews)`);
    console.log(`   📍 ${r.address || "?"}`);
    console.log("");
  }

  console.log(`Totaal bedrijven gescand: ${seen.size}`);
  console.log(`Zonder website + telefoon + MKB: ${hotLeads.length}`);
  console.log(`Opgeslagen in: leads-real.json`);
}

main().catch((e) => {
  console.error(`FATAL: ${e.message}`);
  process.exit(1);
});
