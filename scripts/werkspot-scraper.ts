/**
 * Werkspot Lead Scraper
 *
 * 1. Scrape Werkspot listings per niche + stad
 * 2. Per profiel: check of ze eigen website hebben
 * 3. Google search cross-check: zoek bedrijfsnaam + stad
 * 4. Alleen leads zonder website opslaan
 */

import * as fs from "fs";
import * as path from "path";

const FIRECRAWL_KEY = process.env.FIRECRAWL_API_KEY || "";
const FIRECRAWL_BASE = "https://api.firecrawl.dev/v1";

// --- Firecrawl helpers ---

async function firecrawlScrape(url: string, jsonPrompt: string, schema: any): Promise<any> {
  const res = await fetch(`${FIRECRAWL_BASE}/scrape`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${FIRECRAWL_KEY}` },
    body: JSON.stringify({
      url,
      formats: ["json"],
      jsonOptions: { prompt: jsonPrompt, schema },
      waitFor: 5000,
    }),
  });
  if (!res.ok) throw new Error(`Firecrawl scrape error ${res.status}`);
  const data = await res.json();
  return data.data?.json || data.json || {};
}

async function firecrawlSearch(query: string, limit = 3): Promise<Array<{ url: string; title: string }>> {
  const res = await fetch(`${FIRECRAWL_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${FIRECRAWL_KEY}` },
    body: JSON.stringify({ query, limit }),
  });
  if (!res.ok) throw new Error(`Firecrawl search error ${res.status}`);
  const data = await res.json();
  return data.data || [];
}

// --- Website check ---

const PLATFORM_DOMAINS = [
  "werkspot.nl", "facebook.com", "instagram.com", "linkedin.com",
  "youtube.com", "tiktok.com", "twitter.com", "trustpilot.com",
  "yelp.com", "google.com", "maps.google", "nextdoor", "marktplaats.nl",
  "kvk.nl", "oozo.nl", "detelefoongids.nl", "openingstijden.com",
];

function hasRealWebsite(searchResults: Array<{ url: string; title: string }>, companyName: string): string | null {
  for (const result of searchResults.slice(0, 3)) {
    const url = result.url.toLowerCase();
    const isPlatform = PLATFORM_DOMAINS.some((d) => url.includes(d));
    if (!isPlatform) {
      // Extra check: does the URL or title relate to the company?
      const nameParts = companyName.toLowerCase().split(/[\s\-]+/).filter((p) => p.length > 2);
      const matches = nameParts.some((part) => url.includes(part) || result.title.toLowerCase().includes(part));
      if (matches) return result.url;
    }
  }
  return null;
}

// --- Main pipeline ---

interface Lead {
  name: string;
  owner: string;
  city: string;
  rating: number;
  reviews: number;
  services: string[];
  kvk: string;
  phone: string;
  email: string;
  website: string | null;
  werkspot_url: string;
}

const SEARCHES = [
  { url: "https://www.werkspot.nl/schilderen/schilder-vakmannen/amsterdam", niche: "Schilder", city: "Amsterdam" },
  { url: "https://www.werkspot.nl/stucen/stukadoor-vakmannen/rotterdam", niche: "Stukadoor", city: "Rotterdam" },
  { url: "https://www.werkspot.nl/vloeren-tegels/tegelzetter-vakmannen/utrecht", niche: "Tegelzetter", city: "Utrecht" },
  { url: "https://www.werkspot.nl/loodgieterswerk/loodgieter-vakmannen/eindhoven", niche: "Loodgieter", city: "Eindhoven" },
  { url: "https://www.werkspot.nl/timmerwerken/timmerman-vakmannen/den-haag", niche: "Timmerman", city: "Den Haag" },
];

async function scrapeListings(url: string): Promise<Array<{ name: string; profile_url: string; reviews: number; rating: number }>> {
  console.log(`  📋 Listings scrapen...`);
  const data = await firecrawlScrape(url,
    "Extract ALL individual professionals/companies listed. For each get: company name, rating, number of reviews, profile URL on werkspot.",
    {
      type: "object",
      properties: {
        vakmannen: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              rating: { type: "number" },
              reviews: { type: "number" },
              profile_url: { type: "string" },
            },
          },
        },
      },
    },
  );
  return (data.vakmannen || []).filter((v: any) => v.name && v.profile_url);
}

async function scrapeProfile(profileUrl: string): Promise<Partial<Lead>> {
  const data = await firecrawlScrape(profileUrl,
    "Extract: company name, owner/contact name, phone, email, their own website URL (not werkspot), city, rating, review count, services list, KvK number",
    {
      type: "object",
      properties: {
        company_name: { type: "string" },
        owner_name: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        own_website: { type: "string" },
        city: { type: "string" },
        rating: { type: "number" },
        reviews: { type: "number" },
        services: { type: "array", items: { type: "string" } },
        kvk_number: { type: "string" },
      },
    },
  );
  return {
    name: data.company_name || "",
    owner: data.owner_name || "",
    phone: data.phone || "",
    email: data.email || "",
    website: data.own_website || null,
    services: data.services || [],
    kvk: data.kvk_number || "",
    rating: data.rating || 0,
    reviews: data.reviews || 0,
  };
}

async function main() {
  if (!FIRECRAWL_KEY) {
    console.error("❌ FIRECRAWL_API_KEY niet gezet in environment");
    process.exit(1);
  }

  const allLeads: Lead[] = [];
  const withSite: Lead[] = [];

  for (const search of SEARCHES) {
    console.log(`\n━━━ ${search.niche} in ${search.city} ━━━`);

    // Step 1: Get listings
    let listings: any[];
    try {
      listings = await scrapeListings(search.url);
      console.log(`  ✅ ${listings.length} vakmensen gevonden`);
    } catch (e: any) {
      console.log(`  ❌ Listings failed: ${e.message}`);
      continue;
    }

    // Step 2: Check top 10 per niche (budget-friendly)
    const toCheck = listings.slice(0, 10);

    for (const listing of toCheck) {
      const label = `${listing.name} (${listing.reviews} reviews)`;

      try {
        // Step 2a: Scrape profile
        console.log(`  🔍 ${label}...`);
        const profile = await scrapeProfile(listing.profile_url);

        // Step 2b: Google cross-check
        const searchResults = await firecrawlSearch(`${listing.name} ${search.city}`, 3);
        const foundSite = hasRealWebsite(searchResults, listing.name);

        const lead: Lead = {
          name: profile.name || listing.name,
          owner: profile.owner || "",
          city: profile.city || search.city,
          rating: profile.rating || listing.rating,
          reviews: profile.reviews || listing.reviews,
          services: profile.services || [],
          kvk: profile.kvk || "",
          phone: profile.phone || "",
          email: profile.email || "",
          website: foundSite || profile.website || null,
          werkspot_url: listing.profile_url,
        };

        if (lead.website) {
          console.log(`     ⏭️ Heeft site: ${lead.website}`);
          withSite.push(lead);
        } else {
          console.log(`     🔥 GEEN WEBSITE!`);
          allLeads.push(lead);
        }
      } catch (e: any) {
        console.log(`     ❌ Skip: ${e.message}`);
      }
    }
  }

  // Sort by reviews
  allLeads.sort((a, b) => b.reviews - a.reviews);

  // Save
  const outPath = path.resolve(__dirname, "../leads-werkspot.json");
  fs.writeFileSync(outPath, JSON.stringify({ noWebsite: allLeads, hasWebsite: withSite }, null, 2));

  console.log(`\n━━━ RESULTATEN ━━━`);
  console.log(`Gescand: ${allLeads.length + withSite.length} profielen`);
  console.log(`Zonder website: ${allLeads.length}`);
  console.log(`Met website: ${withSite.length}\n`);

  if (allLeads.length > 0) {
    console.log(`🔥 LEADS ZONDER WEBSITE:\n`);
    for (let i = 0; i < allLeads.length; i++) {
      const l = allLeads[i];
      console.log(`${i + 1}. ${l.name} (${l.city})`);
      console.log(`   👤 ${l.owner || "Onbekend"}`);
      console.log(`   ⭐ ${l.rating}/5 (${l.reviews} reviews)`);
      console.log(`   📞 ${l.phone || "Niet op profiel"}`);
      console.log(`   🔧 ${l.services.slice(0, 3).join(", ")}`);
      console.log(`   📎 ${l.werkspot_url}`);
      console.log("");
    }
  }

  console.log(`Opgeslagen in: leads-werkspot.json`);
}

main().catch((e) => {
  console.error(`FATAL: ${e.message}`);
  process.exit(1);
});
