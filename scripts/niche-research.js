/**
 * Niche Research Parser
 * Parses Outscraper Google Maps results to find niches with the most businesses WITHOUT websites.
 * Usage: node niche-research.js <directory-with-json-files>
 */

const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || path.join(process.env.TEMP, 'outscraper');

const niches = [
  { key: 'schoonmaakbedrijf', label: 'Schoonmaakbedrijf (cleaning)' },
  { key: 'stukadoor', label: 'Stukadoor (plasterer)' },
  { key: 'schilder', label: 'Schilder (painter)' },
  { key: 'tuinman', label: 'Tuinman (gardener)' },
  { key: 'dakdekker', label: 'Dakdekker (roofer)' },
  { key: 'glazenwasser', label: 'Glazenwasser (window cleaner)' },
  { key: 'metselaar', label: 'Metselaar (mason)' },
  { key: 'timmerman', label: 'Timmerman (carpenter)' },
  { key: 'klusbedrijf', label: 'Klusbedrijf (handyman)' },
  { key: 'tegelzetter', label: 'Tegelzetter (tiler)' },
];

const cities = ['Amsterdam', 'Rotterdam', 'Eindhoven'];

const results = [];

for (const niche of niches) {
  let totalBusinesses = 0;
  let noWebsiteCount = 0;
  let noWebsiteRatings = [];
  let noWebsiteReviews = [];
  let cityBreakdown = {};

  for (const city of cities) {
    const filePath = path.join(dir, `research-${niche.key}-${city}.json`);
    let businesses = [];

    try {
      const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (raw.status === 'Success' && raw.data && raw.data[0]) {
        businesses = raw.data[0];
      } else if (raw.status === 'Pending') {
        console.warn(`WARNING: ${niche.key} ${city} is still pending (async). Skipping.`);
        continue;
      }
    } catch (e) {
      console.warn(`WARNING: Could not read ${filePath}: ${e.message}`);
      continue;
    }

    const noSite = businesses.filter(b => !b.website || b.website.trim() === '');

    cityBreakdown[city] = {
      total: businesses.length,
      noWebsite: noSite.length,
    };

    totalBusinesses += businesses.length;
    noWebsiteCount += noSite.length;

    for (const b of noSite) {
      if (b.rating) noWebsiteRatings.push(b.rating);
      if (b.reviews) noWebsiteReviews.push(b.reviews);
    }
  }

  const avgRating = noWebsiteRatings.length > 0
    ? (noWebsiteRatings.reduce((a, b) => a + b, 0) / noWebsiteRatings.length).toFixed(1)
    : 'N/A';

  const avgReviews = noWebsiteReviews.length > 0
    ? Math.round(noWebsiteReviews.reduce((a, b) => a + b, 0) / noWebsiteReviews.length)
    : 'N/A';

  const pct = totalBusinesses > 0 ? ((noWebsiteCount / totalBusinesses) * 100).toFixed(1) : '0.0';

  results.push({
    niche: niche.label,
    key: niche.key,
    totalBusinesses,
    noWebsite: noWebsiteCount,
    pct: parseFloat(pct),
    avgRating,
    avgReviews,
    cityBreakdown,
  });
}

// Sort by number without website (descending), then by percentage
results.sort((a, b) => b.noWebsite - a.noWebsite || b.pct - a.pct);

// Print summary table
console.log('\n' + '='.repeat(110));
console.log('  NICHE RESEARCH RESULTS — Dutch Trade/Service Businesses Without Websites');
console.log('  Data source: Google Maps via Outscraper | Cities: Amsterdam, Rotterdam, Eindhoven | 20 results per query');
console.log('='.repeat(110));

const header = [
  'Rank',
  'Niche'.padEnd(32),
  'Total'.padStart(6),
  'No Site'.padStart(8),
  '% No Site'.padStart(10),
  'Avg Rating'.padStart(11),
  'Avg Reviews'.padStart(12),
];
console.log(header.join(' | '));
console.log('-'.repeat(110));

results.forEach((r, i) => {
  const row = [
    String(i + 1).padStart(4),
    r.niche.padEnd(32),
    String(r.totalBusinesses).padStart(6),
    String(r.noWebsite).padStart(8),
    (r.pct + '%').padStart(10),
    String(r.avgRating).padStart(11),
    String(r.avgReviews).padStart(12),
  ];
  console.log(row.join(' | '));
});

console.log('-'.repeat(110));

// City breakdown for top niches
console.log('\n--- City Breakdown (Top 5 niches by no-website count) ---\n');
for (let i = 0; i < Math.min(5, results.length); i++) {
  const r = results[i];
  console.log(`  ${r.niche}:`);
  for (const city of cities) {
    const cb = r.cityBreakdown[city];
    if (cb) {
      const cityPct = cb.total > 0 ? ((cb.noWebsite / cb.total) * 100).toFixed(0) : 0;
      console.log(`    ${city.padEnd(12)}: ${cb.noWebsite}/${cb.total} without website (${cityPct}%)`);
    }
  }
  console.log('');
}

// Recommendation
console.log('='.repeat(110));
console.log('  RECOMMENDATION');
console.log('='.repeat(110));
const top2 = results.slice(0, 2);
console.log(`  Focus on these 2 niches with the highest no-website counts:`);
top2.forEach((r, i) => {
  console.log(`    ${i + 1}. ${r.niche} — ${r.noWebsite} businesses without website (${r.pct}%), avg rating ${r.avgRating}, avg reviews ${r.avgReviews}`);
});
console.log('');
