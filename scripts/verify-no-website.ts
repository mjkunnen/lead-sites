import * as fs from "fs";
import * as path from "path";

/**
 * Verifieer of leads ECHT geen website hebben door Google Search te checken.
 * Gebruikt Outscraper Google Search API voor elke lead.
 */

const API_BASE = "https://api.app.outscraper.com";

function getApiKey(): string {
  const key = process.env.OUTSCRAPER_API_KEY;
  if (!key) throw new Error("OUTSCRAPER_API_KEY niet gevonden");
  return key;
}

async function apiRequest(path: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(path, API_BASE);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), {
    headers: { "X-API-KEY": getApiKey() },
  });
  if (!res.ok) throw new Error(`API fout (${res.status}): ${await res.text()}`);
  return res.json();
}

async function pollResult(requestId: string, maxAttempts = 30, intervalMs = 3000): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const result = await apiRequest("/requests/" + requestId);
    if (result.status === "Success") return result;
    if (result.status === "Error") throw new Error(`Request mislukt: ${JSON.stringify(result)}`);
    console.log(`  ⏳ Polling... (${i + 1}/${maxAttempts})`);
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error("Timeout");
}

// Domeinen die GEEN echte eigen website zijn (directories, registers, socials, etc.)
const NOT_REAL_WEBSITE = [
  // Social media
  "facebook.com", "instagram.com", "tiktok.com", "linkedin.com",
  "youtube.com", "twitter.com", "x.com",
  // Gratis site-builders (geen professioneel eigen domein)
  "sites.google.com", "wixsite.com", "jimdofree.com",
  "blogspot.com", "wordpress.com",
  // Google zelf
  "google.com", "google.fr", "goo.gl",
  // Franse directories en annuaires
  "pagesjaunes.fr", "starofservice.com", "habitatpresto.com",
  "houzz.fr", "houzz.com", "leboncoin.fr",
  "123devis.com", "quilefait.com", "plusquepro.fr", "alentour.fr",
  "mappy.com", "cylex.fr", "kompass.com",
  "annuaire.com", "horairesdouverture24.fr", "infobel.com",
  "europages.fr", "telephone.city", "fr.mappy.com",
  "nextdoor", "trustpilot.com", "yelp.com",
  // Bedrijfsregisters (overheid + privaat)
  "pappers.fr", "societe.com", "annuaire-entreprises.data.gouv.fr",
  "infogreffe.fr", "verif.com", "manageo.fr", "score3.fr",
  // Artisan directories en review sites
  "meilleur-artisan.com", "bottin.fr", "villepratique.fr",
  "ou-plombier.fr", "plomberie-sanitaire.net", "avis-couvreurs.fr",
  "trustup.fr", "allovoisins.com", "artivisor.com",
  "travaux.com", "homify.fr", "bfrenovation.fr",
  // Overig
  "wikipedia.org", "/search?", // Google search result links
];

function isRealOwnWebsite(url: string): boolean {
  const lower = url.toLowerCase();
  return !NOT_REAL_WEBSITE.some((d) => lower.includes(d));
}

interface Lead {
  name: string;
  city: string;
  phone: string;
  rating: number;
  reviews: number;
  niche: string;
  place_id: string;
  [key: string]: any;
}

interface VerifiedLead extends Lead {
  verified_no_website: boolean;
  found_urls: string[];
  verification_note: string;
}

async function googleSearch(query: string): Promise<any[]> {
  console.log(`  🔍 Google: "${query}"`);
  const result = await apiRequest("/google-search-v3", {
    query,
    pages_per_query: "1",
    language: "fr",
    region: "FR",
  });

  let data: any;
  if (result.id) {
    data = await pollResult(result.id);
  } else {
    data = result;
  }

  // Outscraper returns nested arrays
  const results = data.data?.[0]?.organic_results || data.data?.[0] || [];
  return Array.isArray(results) ? results : [];
}

async function verifyLead(lead: Lead): Promise<VerifiedLead> {
  const foundUrls: string[] = [];
  let hasRealSite = false;
  let note = "";

  try {
    // Zoek 1: "[bedrijfsnaam] [stad]"
    const results1 = await googleSearch(`${lead.name} ${lead.city}`);

    // Zoek 2: "[bedrijfsnaam] site internet" (voor als ze een site hebben maar niet goed gelinkt)
    const results2 = await googleSearch(`"${lead.name}" site internet`);

    const allResults = [...results1, ...results2];

    for (const r of allResults) {
      const url = r.link || r.url || "";
      const domain = r.domain || "";

      if (url && isRealOwnWebsite(url)) {
        // Check of dit OVER het bedrijf gaat (niet een random site)
        const title = (r.title || "").toLowerCase();
        const snippet = (r.description || r.snippet || "").toLowerCase();
        const nameParts = lead.name.toLowerCase().split(/\s+/).filter((p: string) => p.length > 3);

        const isAboutBusiness = nameParts.some((part: string) =>
          title.includes(part) || snippet.includes(part) || domain.includes(part)
        );

        if (isAboutBusiness) {
          foundUrls.push(url);
          hasRealSite = true;
        }
      }
    }

    if (hasRealSite) {
      note = `⚠️ HEEFT WEL WEBSITE: ${foundUrls[0]}`;
    } else {
      note = "✅ Geverifieerd: geen eigen website gevonden";
    }
  } catch (e: any) {
    note = `❓ Verificatie mislukt: ${e.message}`;
  }

  return {
    ...lead,
    verified_no_website: !hasRealSite,
    found_urls: foundUrls,
    verification_note: note,
  };
}

async function main() {
  const leadsPath = path.resolve(__dirname, "../leads-france.json");
  const leads: Lead[] = JSON.parse(fs.readFileSync(leadsPath, "utf-8"));

  console.log(`\n━━━ Verificatie: ${leads.length} leads checken via Google Search ━━━\n`);

  const verified: VerifiedLead[] = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`\n[${i + 1}/${leads.length}] ${lead.name} (${lead.city})`);
    const result = await verifyLead(lead);
    verified.push(result);
    console.log(`  → ${result.verification_note}`);

    // Rate limiting — even wachten tussen calls
    if (i < leads.length - 1) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Resultaten
  const confirmed = verified.filter((v) => v.verified_no_website);
  const hasWebsite = verified.filter((v) => !v.verified_no_website);
  const failed = verified.filter((v) => v.verification_note.startsWith("❓"));

  console.log(`\n━━━ RESULTATEN ━━━`);
  console.log(`✅ Geverifieerd GEEN website: ${confirmed.length}`);
  console.log(`⚠️  HEEFT WEL website (verwijderen): ${hasWebsite.length}`);
  console.log(`❓ Niet te verifiëren: ${failed.length}`);

  if (hasWebsite.length > 0) {
    console.log(`\n⚠️  Te verwijderen leads:`);
    for (const l of hasWebsite) {
      console.log(`  - ${l.name} (${l.city}) → ${l.found_urls[0]}`);
    }
  }

  // Save verified leads
  const outPath = path.resolve(__dirname, "../leads-france-verified.json");
  fs.writeFileSync(outPath, JSON.stringify(confirmed, null, 2));

  // Update CSV met alleen geverifieerde leads
  const csvHeader = "#,Bedrijfsnaam,Telefoon,Email,Stad,Niche,Rating,Reviews,Preview Link,Subsidie Regio,Status,Notities,Datum Gebeld,Follow-up Datum,WhatsApp Verstuurd,Verificatie";
  const csvRows = confirmed.map((r, i) => {
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
      "Google Search geverifieerd",
    ].join(",");
  });

  const csvPath = path.resolve(__dirname, "../bellijst-france-verified.csv");
  fs.writeFileSync(csvPath, [csvHeader, ...csvRows].join("\n"), "utf-8");

  console.log(`\nOpgeslagen:`);
  console.log(`  Geverifieerde leads: leads-france-verified.json (${confirmed.length})`);
  console.log(`  Bellijst: bellijst-france-verified.csv (${confirmed.length})`);
}

main().catch((e) => {
  console.error(`FATAL: ${e.message}`);
  process.exit(1);
});
