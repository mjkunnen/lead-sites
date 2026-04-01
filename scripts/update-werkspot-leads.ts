import * as fs from "fs";
import * as path from "path";

const updates: Record<string, any> = {
  "littleyaman-rotterdam": {
    business_name: "Littleyaman",
    niche: "timmerman",
    city: "Rotterdam",
    tagline: "Specialist in houtrot en kozijnen",
    about: "Littleyaman, gerund door Hamza, is gespecialiseerd in houtrot reparatie en kozijnwerk in Rotterdam. Met 559 positieve reviews op Werkspot en een 4.9 rating staan vakmanschap en klanttevredenheid voorop. Het team werkt snel, netjes en levert strak resultaat af.",
    services: [
      { title: "Houtrot reparatie", text: "Vakkundige reparatie van houtrot in kozijnen en deuren.", icon: "hammer" },
      { title: "Kozijnen vervangen", text: "Plaatsing en vervanging van raamkozijnen.", icon: "wall" },
      { title: "Schilderwerk", text: "Binnen- en buitenschilderwerk na reparatie.", icon: "palette" },
      { title: "Kleine klussen", text: "Diverse reparaties aan deuren en ramen.", icon: "wrench" },
    ],
    reviews: [
      { name: "Klant R.", text: "Hamza en zijn team hebben uitstekend werk geleverd bij het repareren van houtrot. De kozijnen staan er als nieuw bij. Ik raad Hamza van harte aan!", stars: 5, date: "juli 2025" },
      { name: "Klant M.", text: "Hele huis opnieuw geverfd en waar nodig houtrot gerepareerd. Het team is vriendelijk, netjes, op tijd en levert goed werk af.", stars: 5, date: "februari 2026" },
      { name: "Klant S.", text: "Houtrot in kozijn gerepareerd. Echte vakman: werkt zorgvuldig en vlot. Zou Littleyaman iedereen aanraden.", stars: 5, date: "juli 2025" },
      { name: "Klant J.", text: "Zeer snelle reactie en goede communicatie. Snel gekomen en in 3 dagen afgerond. Zeer tevreden!", stars: 5, date: "september 2025" },
      { name: "Klant P.", text: "Heel fijn contact gehad en super werk geleverd! Aanrader!", stars: 5, date: "maart 2026" },
    ],
    stats: { years: 5, projects: 839, reviews_count: 559 },
    trust_badges: ["559x Werkspot reviews", "4.9 gemiddelde rating", "Gratis offerte", "Snelle reactie"],
  },
  "bodo-timmerwerken-amsterdam": {
    business_name: "Bodo Timmerwerken",
    niche: "timmerman",
    city: "Amsterdam",
    tagline: "Maatwerk timmerwerk in Amsterdam",
    about: "Bodo Timmerwerken, gerund door Andrei, levert vakkundig timmerwerk in Amsterdam. Van binnendeuren en kozijnen tot vlonders en maatwerk meubels. Klanten waarderen de duidelijke communicatie, het strakke werk en de eerlijke prijzen.",
    services: [
      { title: "Binnendeuren", text: "Plaatsen en vervangen van deuren en kozijnen.", icon: "default" },
      { title: "Binnenwanden", text: "Scheidingswanden inclusief isolatie.", icon: "wall" },
      { title: "Maatwerk meubels", text: "Op maat gemaakte bureaus en kasten.", icon: "ruler" },
      { title: "Vlonders", text: "Houten vlonders voor tuin en balkon.", icon: "floor" },
    ],
    reviews: [
      { name: "Klant A.", text: "Perfect verzorgd werk door Andrei. Eerlijke offertes. Reageert snel en vriendelijk. Onze woning heeft een fraaie upgrade gekregen!", stars: 5, date: "september 2025" },
      { name: "Klant B.", text: "Andrei is kundig, vriendelijk en heeft plezier in zijn werk. Twee wanden tot aan de nok geplaatst in een huis uit 1903. Erg strak geworden.", stars: 5, date: "juli 2025" },
      { name: "Klant C.", text: "Andre heeft de prijs gewonnen voor kwaliteit en betrouwbaarheid. Werkt keihard en stelt kwaliteit voorop. Aanrader oprecht.", stars: 5, date: "juli 2025" },
      { name: "Klant D.", text: "5 stompe binnendeuren geplaatst. Goede communicatie. Snel en netjes gewerkt. Heel blij met het resultaat!", stars: 5, date: "juli 2025" },
      { name: "Klant E.", text: "3 deuren en kozijnen vervangen. Dacht mee over de mooiste uitkomst. Alleen maar aanraden!", stars: 5, date: "juli 2025" },
    ],
    stats: { years: 2, projects: 50, reviews_count: 11 },
    trust_badges: ["5.0 perfecte score", "11 Werkspot reviews", "Maatwerk specialist", "Amsterdam"],
  },
  "renato-services-vlaardingen": {
    business_name: "Renato Services",
    niche: "installateur",
    city: "Vlaardingen",
    tagline: "Allround installateur in Vlaardingen",
    about: "Renato Services is een veelzijdig installatiebedrijf in Vlaardingen. Van elektra en verlichting tot deuren en afzuigkappen. Met 545 reviews en een 4.9 rating op Werkspot staat Renato bekend om zijn snelle communicatie, nette werk en eerlijke prijzen.",
    services: [
      { title: "Elektra", text: "Verlichting, schakelaars en stopcontacten.", icon: "default" },
      { title: "Deuren", text: "Binnendeuren plaatsen en vervangen.", icon: "default" },
      { title: "Installaties", text: "Afzuigkappen, intercoms en deurbellen.", icon: "wrench" },
      { title: "Kleine klussen", text: "Reparaties en montagewerk.", icon: "hammer" },
    ],
    reviews: [
      { name: "Klant V.", text: "Renato werkt ontzettend netjes en nauwkeurig! Oude deur er super netjes ingezet. Heel vriendelijk, denkt mee en houdt zich aan de prijs!", stars: 5, date: "mei 2023" },
      { name: "Klant K.", text: "Gisteren contact gehad en vandaag al geinstalleerd! Prettig om mee te communiceren en komt afspraken na.", stars: 5, date: "november 2020" },
      { name: "Klant L.", text: "Duidelijke communicatie. Renato denkt goed met je mee zodat het probleem snel opgelost kan worden. Super tevreden!", stars: 5, date: "oktober 2020" },
      { name: "Klant W.", text: "Wat een prettig werkende man. Bekijkt de situatie rustig en zorgt dat alles perfect op zijn plek zit.", stars: 5, date: "oktober 2020" },
      { name: "Klant H.", text: "Snelle communicatie, duidelijk en goede prijs. Klus snel en heel netjes uitgevoerd. Absoluut een aanrader!", stars: 5, date: "oktober 2020" },
    ],
    stats: { years: 6, projects: 818, reviews_count: 545 },
    trust_badges: ["545x Werkspot reviews", "4.9 rating", "Snelle service", "Eerlijke prijzen"],
  },
  "lex-beheer-onderhoud-rotterdam": {
    business_name: "Lex Beheer en Onderhoud",
    niche: "klusjesman",
    city: "Rotterdam",
    tagline: "Uw klusjesman in Rotterdam",
    about: "Lex Beheer en Onderhoud is een allround klussenbedrijf in Rotterdam, gerund door Lex van der Sluis. Van gordijnrails en plinten tot badkamerwerk en montage. Klanten waarderen zijn vriendelijkheid, meedenken en kwaliteit van werk.",
    services: [
      { title: "Montage", text: "Gordijnrails, plinten, planken ophangen.", icon: "hammer" },
      { title: "Kleine klussen", text: "Reparaties, installaties en aanpassingen.", icon: "wrench" },
      { title: "Badkamerwerk", text: "Douche sets, kranen en afwerking.", icon: "bathroom" },
      { title: "Schilderwerk", text: "Binnen schilderwerk en afwerking.", icon: "palette" },
    ],
    reviews: [
      { name: "Klant T.", text: "Fijne communicatie over zowel het plannen als over de klussen! Heel erg tevreden. Denkt in oplossingen en levert kwaliteit.", stars: 5, date: "maart 2025" },
      { name: "Klant G.", text: "Trapleuning geplaatst. Ziet er goed en degelijk uit. Uiterst prettig contact. Zal niet het laatste contact met Lex zijn.", stars: 5, date: "maart 2025" },
      { name: "Klant R.", text: "Gordijnen opgehangen in woonkamer van 4,50m hoog. Lex is heel vriendelijk, werkt gestructureerd. Resultaat erg mooi.", stars: 5, date: "februari 2025" },
      { name: "Klant M.", text: "Badkamer douche set opgehangen en geverfd. Koof gerepareerd. Super resultaat. Een vakman.", stars: 5, date: "februari 2025" },
      { name: "Klant N.", text: "Lex is een vriendelijke man. Komt op tijd, denkt mee en probeert altijd een oplossing te vinden. Keurig uitgevoerd!", stars: 5, date: "januari 2025" },
    ],
    stats: { years: 4, projects: 100, reviews_count: 21 },
    trust_badges: ["5.0 perfecte score", "21 Werkspot reviews", "Allround klusjesman", "Rotterdam"],
  },
};

for (const [slug, data] of Object.entries(updates)) {
  const fp = path.join("sites", slug, "content.json");
  const content = JSON.parse(fs.readFileSync(fp, "utf-8"));

  content.business_name = data.business_name;
  content.niche = data.niche;
  content.tagline = data.tagline;
  content.about = data.about;
  content.services = data.services;
  content.reviews = data.reviews;
  content.stats = data.stats;
  content.trust_badges = data.trust_badges;
  content.contact.city = data.city;
  content.hero.headline = `Uw ${data.niche} in ${data.city}`;
  content.hero.subheadline = data.about.split(".").slice(0, 2).join(".") + ".";

  fs.writeFileSync(fp, JSON.stringify(content, null, 2));
  console.log(`UPDATED: ${slug} | ${data.reviews.length} reviews | ${data.services.length} services`);
}
console.log("\nDone — 4 sites updated with rich Werkspot data");
