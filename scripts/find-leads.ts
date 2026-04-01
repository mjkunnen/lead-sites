import { searchBusiness } from "./lib/outscraper";
import * as fs from "fs";
import * as path from "path";

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
  }> = [];

  for (const q of queries) {
    try {
      console.log(`🔍 ${q}...`);
      const biz = await searchBusiness(q);
      const hasSite = !!(
        biz.site &&
        biz.site.length > 5 &&
        !biz.site.includes("facebook") &&
        !biz.site.includes("instagram")
      );
      results.push({
        name: biz.name,
        city: biz.city || q.split(", ")[1],
        phone: biz.phone || null,
        rating: biz.rating || 0,
        reviews: biz.reviews || 0,
        category: biz.category || "",
        website: hasSite ? biz.site : null,
        place_id: biz.place_id,
      });
      console.log(`  ✅ ${biz.name} | ${biz.rating}/5 | ${biz.reviews} reviews | ${hasSite ? "HEEFT SITE" : "GEEN SITE"}`);
    } catch (e: any) {
      console.log(`  ❌ Skip: ${e.message}`);
    }
  }

  // Sort: no website first, then by reviews desc
  results.sort((a, b) => {
    if (!a.website && b.website) return -1;
    if (a.website && !b.website) return 1;
    return (b.reviews || 0) - (a.reviews || 0);
  });

  const outPath = path.resolve(__dirname, "../leads.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

  console.log(`\n━━━ TOP 10 LEADS ━━━\n`);
  const top10 = results.slice(0, 10);
  for (let i = 0; i < top10.length; i++) {
    const r = top10[i];
    console.log(`${i + 1}. ${r.name} (${r.city})`);
    console.log(`   📞 ${r.phone || "GEEN NUMMER"}`);
    console.log(`   ⭐ ${r.rating}/5 (${r.reviews} reviews)`);
    console.log(`   🌐 ${r.website || "GEEN WEBSITE ✨"}`);
    console.log("");
  }

  console.log(`Totaal: ${results.length} bedrijven gevonden`);
  console.log(`Zonder website: ${results.filter((r) => !r.website).length}`);
  console.log(`Opgeslagen in: leads.json`);
}

main().catch((e) => {
  console.error(`FATAL: ${e.message}`);
  process.exit(1);
});
