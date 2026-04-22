# Plan Frankrijk — Website Outreach Pipeline

## Waarom Frankrijk en niet verder met NL?

| Factor | Nederland | Frankrijk |
|--------|-----------|-----------|
| Artisans zonder website | ~25% (~12.500) | **47% (~194.000)** |
| Marktgrootte BTP | ~50.000 bedrijven | **414.000 bedrijven** |
| Nieuwe bedrijven/jaar | ~30.000 | **278.700** (+11% groei) |
| Overheidssubsidie voor website | Nee | **Ja — €750 tot €16.000** |
| Concurrentie cold outreach | Hoog + verzadigd | Hoog, maar markt 8x groter |

**Conclusie:** Frankrijk heeft 15x meer prospects zonder website dan NL, plus overheidssubsidies die wij als hook kunnen gebruiken.

---

## Concurrentie: wie doet dit al?

| Concurrent | Klanten | Aanpak | Zwakte |
|------------|---------|--------|--------|
| **Solocal** (PagesJaunes) | 195.000 | Agressief bellen, maandcontracten €50-200/m | Slechte reputatie, klachten over démarchage |
| **Local.fr** (Xavier Niel) | 50.000+ | 800 generieke sites/maand, industrieel | Lage kwaliteit, cookie-cutter |
| **Linkeo** | 20.000 | 600 medewerkers, lange contracten 24-48 mnd | Lock-in klachten, duur |
| **Simplébo** | 10.000 | Managed SaaS, €60-240/maand | Goede reputatie maar duur op termijn |

### Onze voordelen t.o.v. concurrentie

1. **Preview-site strategie** — Wij laten EERST een site zien voordat we bellen. Niemand anders doet dit. Solocal/Linkeo bellen koud zonder iets te tonen.
2. **Geen langlopend contract** — Eenmalig bedrag, geen 24-48 maanden lock-in.
3. **Subsidie als hook** — Wij wijzen artisans op France Num subsidie (€750) en regionale chèques numériques. Concurrenten doen dit NIET want zij willen maandelijkse recurring revenue.
4. **Hogere kwaliteit** — Onze vakman-template is visueel veel sterker dan de generieke Local.fr output.

---

## Strategie: 3 hoeken tegelijk

### Hoek 1: Nieuwe bedrijven (laagste concurrentie)
- **278.700 nieuwe artisans/jaar** = ~760 per dag
- Scrape nieuwe inschrijvingen via societe.com (NAF-codes BTP)
- Benader binnen 30 dagen na oprichting — vóór Solocal ze vindt
- Pitch: "Je bent net gestart, klanten zoeken je online maar vinden niets"

### Hoek 2: Bestaande artisans met reviews maar geen site (bewezen vraag)
- Google Maps scrape: rating 4.0+, 5+ reviews, geen website
- Dit zijn bedrijven die KLANTEN HEBBEN maar online onzichtbaar zijn
- Pitch: "Je hebt [X] Google reviews en [X]/5 sterren, maar geen site — klanten die zoeken op '[niche] [stad]' vinden je niet"

### Hoek 3: Subsidie-push (unieke hook)
- France Num: 50% subsidie, max €750
- Regionale chèques numériques: €500 tot €16.000
  - Auvergne-Rhône-Alpes: tot €16.000
  - Grand Est, Normandie, Bretagne: diverse bedragen
- Pitch: "De overheid betaalt de helft van uw website — wist u dat?"

---

## Target niches (gerankt op potentie)

| # | Niche | Frans | Waarom |
|---|-------|-------|--------|
| 1 | **Loodgieter** | Plombier / Plombier chauffagiste | Spoedwerk = mensen zoeken online, hoge urgentie |
| 2 | **Dakdekker** | Couvreur / Couvreur zingueur | Visueel werk (foto's), seizoensgebonden = SEO belangrijk |
| 3 | **Metselaar** | Maçon | Grootste groep artisans in BTP |
| 4 | **Schilder** | Peintre en bâtiment | Veel kleine eenmanszaken zonder site |
| 5 | **Elektricien** | Électricien | Urgentiewerk net als loodgieter |
| 6 | **Tegelzetter** | Carreleur | Visueel portfolio-geschikt |

**Start met:** plombier + couvreur + maçon (top 3 volume + urgentie)

---

## Target steden (gerankt)

**Niet Parijs** — te veel agencies, te duur om te concurreren.

### Tier 1 (start hier)
| Stad | Inwoners | Waarom |
|------|----------|--------|
| **Lyon** | 530.000 | 2e stad, veel BTP, minder agency-concurrentie dan Parijs |
| **Bordeaux** | 260.000 | Booming vastgoedmarkt, veel renovatie |
| **Toulouse** | 490.000 | Snelgroeiend, veel nieuwbouw |
| **Nantes** | 320.000 | Betaalbare huizen = veel renovatie |

### Tier 2 (uitbreiden na bewezen resultaat)
| Stad | Inwoners | Waarom |
|------|----------|--------|
| **Rennes** | 220.000 | Bretagne — oud steenwerk, veel maçons/couvreurs |
| **Montpellier** | 295.000 | Groeiende stad, jong publiek zoekt online |
| **Nice** | 340.000 | Welvarend, hogere budgetten |
| **Strasbourg** | 285.000 | Grensregio, solide bouwsector |
| **Lille** | 235.000 | Dichtbevolkt, veel oud vastgoed |
| **Grenoble** | 160.000 | Bergen = veel dakwerk/isolatie |

---

## Pipeline stappen (technisch)

### Stap 1: Leads scrapen
Script: `find-leads-fr.ts` (aanpassing van bestaande `find-leads-deep.ts`)

Queries (3 niches × 4 steden = 12 queries, 20 results elk = 240 gescand):
```
"Plombier, Lyon, France"
"Plombier, Bordeaux, France"
"Plombier, Toulouse, France"
"Plombier, Nantes, France"
"Couvreur, Lyon, France"
"Couvreur, Bordeaux, France"
"Couvreur, Toulouse, France"
"Couvreur, Nantes, France"
"Maçon, Lyon, France"
"Maçon, Bordeaux, France"
"Maçon, Toulouse, France"
"Maçon, Nantes, France"
```

Filter:
- Geen echte website (zelfde FAKE_SITES + pagesjaunes.fr, facebook.com, starofservice.com)
- Heeft telefoonnummer
- < 500 reviews (geen grote bedrijven)
- Rating ≥ 3.5

Output: `leads-france.json`

### Stap 2: Top leads selecteren
- Sorteer op reviews (aflopend) — meer reviews = bewezen bedrijf
- Top 20-30 per batch
- Handmatige check: heeft het bedrijf ECHT geen site? (Google "[bedrijfsnaam] [stad]")

### Stap 3: Preview sites genereren
Bestaand script werkt al:
```bash
npx tsx scripts/generate-site.ts --lang fr "Les Couvreurs de Bordeaux" "Bordeaux"
```
- Outscraper haalt data op met region=FR
- OpenAI genereert Franse content
- Deploy naar Vercel → live preview link

### Stap 4: Bellijst maken
Output: `bellijst-france.csv` met kolommen:

```csv
#,Bedrijfsnaam,Telefoon,Stad,Niche,Rating,Reviews,Preview Link,Subsidie Regio,Status,Notities,Datum Gebeld,Follow-up Datum
```

**Nieuwe kolom: "Subsidie Regio"** — welke regionale subsidie beschikbaar is voor dat bedrijf.

### Stap 5: Bellen (door Franse medewerker)
→ Zie "Call Script" hieronder

### Stap 6: Follow-up
- Dag 0: Bellen + WhatsApp/SMS met preview link
- Dag 3: Follow-up SMS als niet bereikt
- Dag 7: Tweede belpoging
- Dag 14: Laatste poging, daarna archiveren

---

## Call Script (Nederlands — vertaal naar Frans voor medewerker)

### Opening (15 seconden)
> "Bonjour [naam/meneer/mevrouw], ik bel namens [bedrijfsnaam]. Ik bel omdat ik zag dat u [niche] bent in [stad] met uitstekende Google reviews, maar nog geen eigen website heeft. Ik heb alvast een gratis voorbeeld voor u gemaakt — mag ik u die even sturen?"

### Waarom dit werkt:
- Direct to the point (Franse artisans haten lange intro's)
- Compliment (goede reviews)
- Gratis preview = geen risico voor hen
- Vraag om toestemming = respectvol

### Als ze interesse hebben:
> "Ik stuur u nu via WhatsApp/SMS een link naar uw voorbeeldsite. Die kunt u bekijken en dan bel ik u morgen terug om te bespreken of u het wilt houden. De site is volledig van u — uw foto's, uw reviews, uw contactgegevens. En wist u dat de overheid via France Num tot €750 subsidie geeft voor een website? Ik kan u daarbij helpen."

### Bezwaren afhandelen:

**"Ik heb genoeg werk via mond-tot-mond"**
> "Dat snap ik, en dat bewijst dat u goed werk levert. Maar 80% van de mensen zoekt tegenwoordig eerst online voordat ze bellen. Met [X] reviews en geen site laat u klanten liggen die nu naar een concurrent met een website gaan."

**"Ik ben al gebeld door Solocal/Linkeo"**
> "Dat geloof ik — die bieden maandelijkse contracten van €100+ per maand die je niet kunt opzeggen. Wij werken anders: een eenmalig bedrag, geen contract, de site is van u. En ik heb hem al voor u gemaakt — kijk maar."

**"Dat is te duur"**
> "De overheid vergoedt tot €750 via France Num subsidie. Daarmee kost uw site bijna niets. Ik help u met de aanvraag."

**"Stuur maar een mail"**
> "Doe ik! Ik stuur nu de link naar uw voorbeeld-website mee. Mag ik uw mailadres?" (Lead niet loslaten — mail = dood)

---

## Sheet structuur voor Franse medewerker

Google Sheet: **"FR Outreach Pipeline"**

### Tab 1: "Bellijst"
| Kolom | Inhoud |
|-------|--------|
| A | # |
| B | Bedrijfsnaam |
| C | Telefoon |
| D | Stad |
| E | Regio |
| F | Niche |
| G | Rating |
| H | Reviews |
| I | Preview Link |
| J | Subsidie beschikbaar |
| K | Status (Nog niet gebeld / Gebeld - geen gehoor / Gebeld - interesse / Gebeld - geen interesse / Follow-up / Deal / Afgewezen) |
| L | Notities |
| M | Datum eerste contact |
| N | Follow-up datum |
| O | WhatsApp/SMS verstuurd? (Ja/Nee) |

### Tab 2: "Statistieken"
- Totaal gebeld deze week
- Bereikt (%)
- Interesse (%)
- Deals gesloten
- Conversie: gebeld → deal

### Tab 3: "Subsidie Info"
Per regio welke subsidie beschikbaar is + link naar aanvraagpagina.

| Regio | Subsidie | Bedrag | Link |
|-------|----------|--------|------|
| Nationaal | France Num | 50%, max €750 | francenum.gouv.fr |
| Auvergne-Rhône-Alpes | Chèque numérique | Tot €16.000 | ... |
| Nouvelle-Aquitaine | Chèque transformation | Tot €5.000 | ... |
| Occitanie | Aide numérique | Tot €3.000 | ... |
| Bretagne | Chèque numérique | Tot €5.000 | ... |

---

## Juridische regels (BELANGRIJK)

### Cold calling in Frankrijk
- **Alleen ma-vr, 10:00-13:00 en 14:00-20:00**
- **Max 4 belpogingen per prospect**
- B2B is toegestaan, maar check Bloctel-lijst
- Boetes tot €375.000 bij overtreding

### Cold email (B2B)
- Toegestaan onder RGPD als:
  - Relevant voor hun professionele activiteit ✅
  - Uitschrijflink aanwezig ✅
  - Afzender duidelijk geïdentificeerd ✅

### Wat wij moeten doen
- [ ] Beltijden strikt naleven (10-13, 14-20 CET)
- [ ] Max 4 pogingen per lead loggen in sheet
- [ ] Bij elke call bedrijfsnaam noemen
- [ ] SMS/WhatsApp alleen na telefonisch contact of opt-in

---

## Pricing strategie

### Wat de concurrentie vraagt
| Concurrent | Model | Prijs |
|------------|-------|-------|
| Simplébo | Maandelijks | €60-240/maand |
| Linkeo | Maandelijks (24-48 mnd) | €80-150/maand |
| Solocal | Maandelijks | €50-200/maand |
| Lokale freelancer | Eenmalig | €800-2.500 |

### Ons voorstel (te bepalen)
Opties om te testen:

**Optie A: Eenmalig**
- €497 eenmalig (positionering: goedkoper dan freelancer, geen lock-in)
- Minus subsidie = €0-€247 uit eigen zak
- USP: "Geen maandelijkse kosten, de site is van u"

**Optie B: Laag maandelijks**
- €29/maand (hosting + onderhoud)
- Geen setup-kosten
- USP: "Goedkoper dan Simplébo, mooiere site"

**Optie C: Hybride**
- €197 eenmalig + €19/maand hosting
- Lage instap, recurring voor ons

→ **Aanbeveling: Start met Optie A (€497 eenmalig).** De subsidie-hook maakt dit een no-brainer. Test conversie op eerste 50 calls, dan bijsturen.

---

## Week 1-4 Actieplan

### Week 1: Setup
- [ ] `find-leads-fr.ts` script maken (3 niches × 4 steden)
- [ ] Eerste batch draaien → 30-50 leads
- [ ] Top 15 preview sites genereren
- [ ] Google Sheet "FR Outreach Pipeline" opzetten
- [ ] Bellijst vullen met preview links
- [ ] Call script vertalen naar Frans voor medewerker

### Week 2: Eerste calls
- [ ] Medewerker belt top 15 (beste leads eerst)
- [ ] Preview link sturen via WhatsApp/SMS na elk gesprek
- [ ] Resultaten loggen in sheet
- [ ] Bijsturen op basis van eerste reacties

### Week 3: Opschalen of bijsturen
- [ ] Als conversie > 5%: volgende batch van 30 leads scrapen + sites genereren
- [ ] Als conversie < 2%: pitch/prijs/niches aanpassen
- [ ] Uitbreiden naar tier 2 steden als tier 1 werkt
- [ ] Subsidie-info verfijnen per regio

### Week 4: Systematiseren
- [ ] Proces documenteren: hoeveel leads/week haalbaar?
- [ ] Medewerker zelfstandig laten draaien met sheet
- [ ] Tweede niche toevoegen als eerste niche werkt
- [ ] Make.com flow overwegen voor automatische site-generatie

---

## KPI's / Succes meten

| Metric | Target Week 2 | Target Maand 1 |
|--------|---------------|-----------------|
| Leads gescraped | 50 | 200 |
| Preview sites gemaakt | 15 | 50 |
| Gebeld | 15 | 50 |
| Bereikt | 60% (9) | 60% (30) |
| Interesse | 20% (3) | 20% (10) |
| Deals | 1-2 | 5-8 |
| Omzet | €497-994 | €2.485-3.976 |

---

## Risico's en mitigatie

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| Artisans hangen op (Solocal-trauma) | Hoog | Preview-site laten zien VOOR de pitch — onderscheidt ons direct |
| Juridische klacht (démarchage) | Hoog | Beltijden strikt naleven, max 4 pogingen, log alles |
| Subsidie wordt stopgezet | Medium | Niet 100% op subsidie-hook leunen, ook waarde-pitch |
| Medewerker levert niet | Medium | Wekelijks sheet checken, KPI's bijhouden |
| Preview sites kosten te veel (Outscraper/OpenAI) | Laag | ~€0.10-0.30 per site, schaalbaar |

---

## Samenvatting

**Waarom dit gaat werken in Frankrijk waar NL verzadigd is:**

1. **15x meer prospects** zonder website
2. **Niemand doet preview-sites** — wij tonen het resultaat VOORDAT we pitchen
3. **Subsidie-hook** die geen concurrent gebruikt
4. **Franse medewerker** lost het vertrouwensprobleem op
5. **Nieuwe bedrijven** (278K/jaar) = vers, nog niet benaderd
6. **Eenmalig model** vs. lock-in contracten van concurrenten = betere propositie

De eerste echte test: **15 calls in week 2.** Als 2-3 artisans interesse tonen, schalen we op.
