# SOP: Lead Site Aanmaken voor een Nieuw Bedrijf

## Overzicht

Dit document beschrijft stap voor stap hoe je een nieuwe lead-preview website aanmaakt voor een MKB-bedrijf. Het eindresultaat is een live pagina op `netjesonline.com/{slug}` die het bedrijf laat zien hoe hun nieuwe website eruit zou kunnen zien.

---

## Vereisten

- Toegang tot de `lead-sites` repo (`mjkunnen/lead-sites` op GitHub)
- Playwright MCP (voor scraping)
- Google Sheets data (Spreadsheet ID: `13eQvI_mJjrSsy_7zlazfOLgA3kWKh6rQvMODL7N4TB4`)

---

## Stap 1: Bedrijfsinformatie Verzamelen

### 1a. Scrape de website van het bedrijf

Gebruik Playwright MCP om de bedrijfswebsite te bezoeken:

1. **Navigeer** naar de website URL
2. **Maak een screenshot** — analyseer de visuele stijl (kleuren, sfeer, luxe vs. zakelijk)
3. **Neem een accessibility snapshot** — extraheer:
   - Bedrijfsnaam
   - Adres, telefoon, email
   - Diensten/services
   - Social media links
   - Booking/afspraak URL
   - Afbeeldingen (zoek naar WordPress media URLs, og:image, of gallery pagina's)

### 1b. Scrape Google Reviews

1. Zoek het bedrijf op Google Maps
2. Kopieer **echte** reviews (naam, tekst, sterren, datum)
3. **Verzin NOOIT reviews** — alleen echte data gebruiken
4. Minimaal 5-8 reviews verzamelen

### 1c. Bepaal de taal

- Check de taal van de bedrijfswebsite
- Nederlandse website → `"lang": "nl"`
- Engelse website → `"lang": "en"` (of weglaten, default is Engels)
- **Alle content (FAQ, services, hero tekst) schrijf je in dezelfde taal als het bedrijf**

---

## Stap 2: Content.json Samenstellen

Maak een nieuw bestand: `sites/{slug}/content.json`

### Slug-conventie
- Bedrijfsnaam + stad, lowercase, streepjes
- Voorbeeld: `haarwerk-amsterdam`, `vandenberg-loodgieters-amsterdam`

### Volledig content.json template:

```json
{
  "slug": "{slug}",
  "lang": "en",
  "business_name": "Bedrijfsnaam",
  "niche": "kapper|loodgieter|tandarts|restaurant|etc",
  "theme": "bold",
  "palette": "warm-luxury|cool-professional|earth-natural|etc",
  "tagline": "Korte tagline (optioneel, verschijnt in hero)",
  "about": "2-3 zinnen over het bedrijf. Gebaseerd op ECHTE info van hun website. Geen verzonnen claims.",
  "hero": {
    "headline": "Pakkende headline (3-5 woorden)",
    "subheadline": "Uitgebreidere beschrijving (1-2 zinnen)",
    "cta_primary": "Boek een afspraak / Call Now / Get a Quote",
    "cta_secondary": "Ontdek meer / Learn More",
    "image_url": "https://... (beste foto van het bedrijf)"
  },
  "services": [
    {
      "title": "Service naam",
      "text": "Korte beschrijving van de service. Authentiek, geen overdrijving.",
      "icon": "scissors|palette|sparkles|heart|default"
    }
  ],
  "gallery": [
    {
      "url": "https://... (echte foto's van hun website)",
      "alt": "Beschrijvende alt tekst"
    }
  ],
  "reviews": [
    {
      "name": "Voornaam",
      "text": "Echte review tekst van Google",
      "stars": 5,
      "date": "2 weken geleden"
    }
  ],
  "faq": [
    {
      "question": "Veelgestelde vraag?",
      "answer": "Antwoord gebaseerd op echte info van hun website."
    }
  ],
  "contact": {
    "phone": "(020) 123 4567",
    "email": "info@bedrijf.nl",
    "city": "Amsterdam",
    "address": "Straatnaam 123, Amsterdam",
    "maps_url": "https://www.google.com/maps/place/...",
    "booking_url": "https://... (als ze online booking hebben)"
  },
  "socials": {
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/...",
    "tiktok": "https://tiktok.com/@...",
    "pinterest": "https://pinterest.com/..."
  },
  "metadata": {
    "generated_at": "2026-03-27T12:00:00Z",
    "lead_id": "row-{nummer}",
    "version": 1
  }
}
```

### Beschikbare icons
- `scissors` — knippen, haar
- `palette` — kleuren, design, creatief
- `sparkles` — speciaal, premium, behandelingen
- `heart` — zorg, wellness, gezondheid
- `default` — sterretje (voor alles anders)

---

## Stap 3: Vibe & Palette Bepalen

### Analyseer de visuele identiteit van het bedrijf:

1. **Screenshot maken** van hun huidige website
2. **Kleurenpalet aflezen** uit foto's en website
3. **Sfeer bepalen:**
   - Warm/luxe (kapper, beauty) → `warm-luxury` (stone/amber/rose tinten)
   - Zakelijk/clean (loodgieter, installateur) → `cool-professional`
   - Natuurlijk/ambachtelijk (bakker, tuin) → `earth-natural`

### De template past zich automatisch aan:
- Alle componenten gebruiken stone/amber kleuren
- De vibe moet kloppen met het bedrijf — dit zit nu in de content (foto's, copy)
- Later: palette-systeem uitbreiden met CSS variabelen per palette

---

## Stap 4: Copywriting Regels

### DOEN:
- Schrijf in de taal van het bedrijf
- Baseer alles op echte informatie van hun website
- Gebruik hun eigen USP's en specialisaties
- Maak FAQ's gebaseerd op echte info (openingstijden, locatie, specialisaties)
- Hero headline: kort, krachtig, 3-5 woorden
- CTA's: actiegericht ("Boek een afspraak", "Get a Quote")

### NIET DOEN:
- **NOOIT** awards of prijzen verzinnen
- **NOOIT** reviews fabriceren
- **NOOIT** claims maken die niet op hun website staan
- **GEEN** "Beste X van Nederland" of "Award-winning" tenzij bewezen
- **GEEN** overdreven superlatieven

---

## Stap 5: Deployen

### Lokaal testen:
```bash
cd lead-sites
npm run build
# Check of de build slaagt — TypeScript errors fixen indien nodig
```

### Push naar productie:
```bash
git add sites/{slug}/content.json
git commit -m "Add lead site for {bedrijfsnaam}"
git push
```

Vercel deployed automatisch. De site is live op: `netjesonline.com/{slug}`

---

## Stap 6: Verificatie

1. Open `netjesonline.com/{slug}` op desktop
2. Open op mobiel (of DevTools mobile view)
3. Check:
   - [ ] Hero afbeelding laadt correct
   - [ ] Gallery afbeeldingen laden (externe URLs moeten bereikbaar zijn)
   - [ ] Alle secties tonen correct
   - [ ] Booking link werkt
   - [ ] Telefoon link werkt
   - [ ] WhatsApp link werkt
   - [ ] Google Maps link werkt
   - [ ] Social media links werken
   - [ ] Taal klopt (NL of EN)
   - [ ] Sticky mobile CTA verschijnt na scrollen
   - [ ] Geen hardcoded tekst die niet bij dit bedrijf hoort

---

## Technische Architectuur

### Hoe het werkt:
```
sites/{slug}/content.json
    ↓
lib/content.ts (leest alle content.json bestanden)
    ↓
app/[slug]/page.tsx (SSG met generateStaticParams)
    ↓
Lead componenten (components/lead/*)
    ↓
lib/i18n.ts (vertaalt UI strings op basis van lang)
    ↓
Vercel auto-deploy bij git push
```

### Componenten structuur:
```
components/lead/
├── LeadNavbar.tsx    — Floating navbar, hide on scroll down, mobile menu
├── LeadHero.tsx      — Fullscreen hero met parallax (uit op mobile)
├── LeadAbout.tsx     — Over ons + image stack met TiltImage
├── LeadServices.tsx  — Service cards met mouse-following gradient
├── LeadGallery.tsx   — 3-kolom masonry met parallax (2-kolom mobile)
├── LeadReviews.tsx   — Dubbele marquee review slider
├── LeadFAQ.tsx       — Accordion FAQ
├── LeadContact.tsx   — Contact cards (booking, tel, WhatsApp, email, adres)
├── LeadFooter.tsx    — Minimale footer
├── MobileCTA.tsx     — Sticky CTA bar (alleen mobile, na hero scroll)
├── LeadCursor.tsx    — Custom cursor (alleen desktop)
└── TiltImage.tsx     — 3D mouse-tracking (alleen desktop)
```

### Optionele secties:
- `about` — verschijnt alleen als `content.about` bestaat
- `gallery` — verschijnt alleen als `content.gallery` bestaat en > 0 items
- `booking_url` — booking card verschijnt alleen als URL aanwezig
- `email` — email card verschijnt alleen als email aanwezig
- `socials` — social icons verschijnen alleen als object aanwezig

### i18n:
- Default: Engels
- Stel `"lang": "nl"` in content.json voor Nederlands
- UI strings (nav, headings, labels) worden automatisch vertaald
- Content zelf (FAQ, services, hero) schrijf je handmatig in de juiste taal

### Mobile-first:
- 80%+ traffic is mobiel bij lokale bedrijven
- 3D effects (TiltImage, cursor) uitgeschakeld op touch devices
- Parallax uitgeschakeld op touch devices
- Sticky CTA bar met booking + WhatsApp op mobile
- Alle secties responsive (sm:/md:/lg: breakpoints)
- Min 44px tap targets

---

## Voorbeeld: Haarwerk Amsterdam

**Slug:** `haarwerk-amsterdam`
**Taal:** `nl`
**Niche:** kapper
**Live URL:** `netjesonline.com/haarwerk-amsterdam`

### Wat werd gescraped:
- Website: haarwerkamsterdam.nl (WordPress)
- 6 afbeeldingen uit WordPress media library
- 8 Google Reviews (allemaal 5 sterren)
- Contact info, booking URL (Salonized), social links
- Visuele analyse: warm terracotta muren, gouden accenten, historisch pand → warm-luxury palette

### Wat werd geschreven:
- Hero headline: "Waar vakmanschap luxe ontmoet"
- About tekst gebaseerd op hun Oribe ambassadeurschap
- 4 services (knippen, kleuren, extensions, behandelingen)
- 4 FAQ's gebaseerd op echte salon-info
- Tagline: "Luxury meets Hair Care"

---

## Tijdsinvestering per bedrijf

| Stap | Geschatte tijd |
|------|---------------|
| Scraping + data verzamelen | 10-15 min |
| Content.json schrijven | 15-20 min |
| Vibe/palette analyse | 5 min |
| Deploy + verificatie | 5 min |
| **Totaal** | **~35-45 min** |

---

## Veelgemaakte Fouten

1. **Externe afbeeldingen die niet laden** — Check of de URLs bereikbaar zijn en geen hotlink protection hebben
2. **Hardcoded Nederlandse tekst** — Alles gaat via i18n, maar content zelf moet in de juiste taal
3. **Verzonnen content** — Altijd checken of claims kloppen met de echte website
4. **Gallery met < 3 items** — Component rendert niet als er minder dan 3 afbeeldingen zijn
5. **Missende booking_url** — Zonder booking URL wordt de CTA een telefoon-link
