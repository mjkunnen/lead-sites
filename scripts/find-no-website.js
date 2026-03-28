const fs = require('fs');
const dir = process.env.TEMP + '/outscraper/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
let noSite = [];
let allBiz = [];

files.forEach(f => {
  const data = JSON.parse(fs.readFileSync(dir + f, 'utf8'));
  const query = f.replace('.json','').replace(/\+/g,' ');
  data.data[0].forEach(biz => {
    const entry = {
      query, name: biz.name, city: biz.city, phone: biz.phone || '',
      email: biz.email || '', rating: biz.rating, reviews: biz.reviews,
      category: biz.category, address: biz.address,
      website: biz.website || '',
      maps: biz.location_link || ''
    };
    allBiz.push(entry);
    if (!biz.website) {
      noSite.push(entry);
    }
  });
});

if (noSite.length === 0) {
  console.log('NO businesses without website found across all queries\n');
  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(dir + f, 'utf8'));
    const query = f.replace('.json','').replace(/\+/g,' ');
    console.log('--- ' + query + ' ---');
    data.data[0].forEach(biz => {
      const tag = biz.website ? 'SITE' : 'NO-SITE';
      console.log(tag + ' | ' + biz.name + ' | R:' + biz.rating + ' (' + biz.reviews + ')');
    });
    console.log('');
  });
} else {
  console.log('=== BUSINESSES WITHOUT WEBSITE ===\n');
  noSite.forEach(b => {
    console.log('Name: ' + b.name);
    console.log('Query: ' + b.query);
    console.log('City: ' + b.city);
    console.log('Category: ' + b.category);
    console.log('Rating: ' + b.rating + ' (' + b.reviews + ' reviews)');
    console.log('Phone: ' + b.phone);
    console.log('Email: ' + b.email);
    console.log('Address: ' + b.address);
    console.log('');
  });
}
