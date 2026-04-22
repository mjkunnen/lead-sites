import { searchMultiple } from "./lib/outscraper";
import * as fs from "fs";
import * as path from "path";

// 3 niches × 4 steden × 20 resultaten = 240 bedrijven gescand
const queries = [
  // Plombiers (loodgieters) — urgentiewerk, mensen zoeken online
  "Plombier, Lyon, France",
  "Plombier, Bordeaux, France",
  "Plombier, Toulouse, France",
  "Plombier, Nantes, France",
  // Couvreurs (dakdekkers) — visueel, seizoensgebonden
  "Couvreur, Lyon, France",
  "Couvreur, Bordeaux, France",
  "Couvreur, Toulouse, France",
  "Couvreur, Nantes, France",
  // Maçons (metselaars) — grootste groep
  "Maçon, Lyon, France",
  "Maçon, Bordeaux, France",
  "Maçon, Toulouse, France",
  "Maçon, Nantes, France",
];

const FAKE_SITES = [
  "facebook.com", "instagram.com", "tiktok.com", "linkedin.com",
  "youtube.com", "pagesjaunes.fr", "starofservice.com", "habitatpresto.com",
  "trustpilot.com", "yelp.com", "google.com", "houzz.fr", "houzz.com",
  "nextdoor", "leboncoin.fr", "123devis.com", "quilefait.com",
  "plusquepro.fr", "alentour.fr",
];

const BIG_SIGNALS = [
  "sarl", "sas", "holding", "groupe", "group", "international",
  "franchise", "national", "leroy merlin", "point p", "cedeo",
];

function isRealWebsite(url: string | null | undefined): boolean {
  if (!url || url.length < 5) return false;
  return !FAKE_SITES.some((f) => url.toLowerCase().includes(f));
}

function isSmallBusiness(name: string, reviews: number): boolean {
  const lower = name.toLowerCase();
  if (BIG_SIGNALS.some((s) => lower.includes(s))) return false;
  if (reviews > 500) return false;
  return true;
}

function detectNiche(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("plombier")) return "plombier";
  if (q.includes("couvreur")) return "couvreur";
  if (q.includes("maçon") || q.includes("macon")) return "maçon";
  if (q.includes("carreleur")) return "carreleur";
  if (q.includes("peintre")) return "peintre";
  if (q.includes("électricien") || q.includes("electricien")) return "électricien";
  return "artisan";
}

function detectCity(query: string): string {
  const parts = query.split(",").map((p) => p.trim());
  return parts[1] || "France";
}

// Regionale subsidie mapping
function getSubsidieRegio(city: string): string {
  const c = city.toLowerCase();
  if (["lyon", "grenoble", "saint-étienne", "annecy", "chambéry", "valence"].some((s) => c.includes(s)))
    return "Auvergne-Rhône-Alpes (tot €16.000)";
  if (["bordeaux", "limoges", "poitiers", "pau", "bayonne", "la rochelle"].some((s) => c.includes(s)))
    return "Nouvelle-Aquitaine (tot €5.000)";
  if (["toulouse", "montpellier", "nîmes", "perpignan", "béziers"].some((s) => c.includes(s)))
    return "Occitanie (tot €3.000)";
  if (["nantes", "angers", "le mans", "saint-nazaire"].some((s) => c.includes(s)))
    return "Pays de la Loire (tot €5.000)";
  if (["rennes", "brest", "saint-malo", "quimper", "lorient"].some((s) => c.includes(s)))
    return "Bretagne (tot €5.000)";
  return "France Num nationaal (€750)";
}

async function main() {
  const hotLeads: any[] = [];
  const seen = new Set<string>();
  let totalScanned = 0;

  for (const q of queries) {
    try {
      const results = await searchMultiple(q, 20, "fr");
      console.log(`  → ${results.length} resultaten voor "${q}"`);
      totalScanned += results.length;

      for (const biz of results) {
        if (!biz.place_id || seen.has(biz.place_id)) continue;
        seen.add(biz.place_id);

        const hasSite = isRealWebsite(biz.website);
        const small = isSmallBusiness(biz.name || "", biz.reviews || 0);
        const rating = biz.rating || 0;

        // Filter: geen website + telefoon + klein bedrijf + minimaal 3.5 rating
        if (!hasSite && small && biz.phone && rating >= 3.5) {
          const city = biz.city || detectCity(q);
          hotLeads.push({
            name: (biz.name || "").replace(/[🔨🛠⭐️✅🔧]/gu, "").trim(),
            city,
            phone: biz.phone,
            email: biz.email || null,
            rating,
            reviews: biz.reviews || 0,
            niche: detectNiche(q),
            category: biz.category || "",
            address: biz.address || "",
            place_id: biz.place_id,
            location_link: biz.location_link || "",
            subsidie_regio: getSubsidieRegio(city),
            website: biz.website || null, // log wat ze wel hebben (facebook etc)
          });
          console.log(`  🔥 ${biz.name} | ${city} | ${biz.phone} | ${rating}/5 | ${biz.reviews} reviews`);
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

  // Sorteer op reviews (meest bewezen bedrijven eerst)
  deduped.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));

  // Save JSON
  const outPath = path.resolve(__dirname, "../leads-france.json");
  fs.writeFileSync(outPath, JSON.stringify(deduped, null, 2));

  // Save CSV bellijst
  const csvHeader = "#,Bedrijfsnaam,Telefoon,Email,Stad,Niche,Rating,Reviews,Preview Link,Subsidie Regio,Status,Notities,Datum Gebeld,Follow-up Datum,WhatsApp Verstuurd";
  const csvRows = deduped.map((r, i) => {
    const previewSlug = `${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${r.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    return [
      i + 1,
      `"${r.name}"`,
      r.phone,
      r.email || "",
      r.city,
      r.niche,
      r.rating,
      r.reviews,
      `netjesonline.com/${previewSlug}`,
      `"${r.subsidie_regio}"`,
      "Nog niet gebeld",
      "",
      "",
      "",
      "Nee",
    ].join(",");
  });

  const csvPath = path.resolve(__dirname, "../bellijst-france.csv");
  fs.writeFileSync(csvPath, [csvHeader, ...csvRows].join("\n"), "utf-8");

  // Print resultaten
  console.log(`\n━━━ 🇫🇷 FRANSE LEADS ZONDER WEBSITE (${deduped.length}) ━━━\n`);
  for (let i = 0; i < deduped.length; i++) {
    const r = deduped[i];
    console.log(`${i + 1}. ${r.name} (${r.city}) — ${r.niche}`);
    console.log(`   📞 ${r.phone}`);
    console.log(`   ⭐ ${r.rating}/5 (${r.reviews} reviews)`);
    console.log(`   📍 ${r.address}`);
    console.log(`   💰 ${r.subsidie_regio}`);
    if (r.website) console.log(`   🔗 Heeft alleen: ${r.website}`);
    console.log("");
  }

  console.log(`━━━ SAMENVATTING ━━━`);
  console.log(`Totaal gescand: ${totalScanned} bedrijven (${seen.size} uniek)`);
  console.log(`Leads gevonden: ${deduped.length}`);
  console.log(`\nPer niche:`);
  const nicheCount: Record<string, number> = {};
  for (const l of deduped) {
    nicheCount[l.niche] = (nicheCount[l.niche] || 0) + 1;
  }
  for (const [niche, count] of Object.entries(nicheCount)) {
    console.log(`  ${niche}: ${count}`);
  }
  console.log(`\nPer stad:`);
  const cityCount: Record<string, number> = {};
  for (const l of deduped) {
    cityCount[l.city] = (cityCount[l.city] || 0) + 1;
  }
  for (const [city, count] of Object.entries(cityCount)) {
    console.log(`  ${city}: ${count}`);
  }
  console.log(`\nOpgeslagen:`);
  console.log(`  JSON: leads-france.json`);
  console.log(`  CSV:  bellijst-france.csv`);
}

main().catch((e) => {
  console.error(`FATAL: ${e.message}`);
  process.exit(1);
});
