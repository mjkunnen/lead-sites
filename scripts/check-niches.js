const fs = require('fs');
const dir = process.env.TEMP + '/outscraper/';
const niches = ['stukadoor', 'tegelzetter', 'klusbedrijf', 'tuinman', 'glazenwasser', 'schoonmaakbedrijf', 'timmerman', 'metselaar'];
const cities = ['Amsterdam', 'Rotterdam', 'Eindhoven'];

const results = [];

niches.forEach(niche => {
  let total = 0, noSite = 0, ratings = [], reviews = [];
  cities.forEach(city => {
    const file = dir + 'research-' + niche + '-' + city + '.json';
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const bizList = data.data[0];
      total += bizList.length;
      bizList.forEach(b => {
        if (!b.website) {
          noSite++;
          if (b.rating) ratings.push(b.rating);
          if (b.reviews) reviews.push(b.reviews);
        }
      });
    } catch(e) {}
  });
  const pct = total > 0 ? Math.round(noSite / total * 100) : 0;
  const avgRating = ratings.length > 0 ? (ratings.reduce((a,b) => a+b, 0) / ratings.length).toFixed(1) : '-';
  const avgReviews = reviews.length > 0 ? Math.round(reviews.reduce((a,b) => a+b, 0) / reviews.length) : 0;
  results.push({ niche, total, noSite, pct, avgRating, avgReviews });
});

// Sort by noSite descending
results.sort((a, b) => b.noSite - a.noSite);

console.log('Niche'.padEnd(22) + '| Total | No site | %    | Rating | Reviews');
console.log('-'.repeat(75));
results.forEach(r => {
  console.log(
    r.niche.padEnd(22) + '| ' +
    String(r.total).padStart(5) + ' | ' +
    String(r.noSite).padStart(7) + ' | ' +
    String(r.pct).padStart(3) + '% | ' +
    String(r.avgRating).padStart(6) + ' | ' +
    String(r.avgReviews).padStart(7)
  );
});
