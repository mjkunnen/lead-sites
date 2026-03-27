# Design Spec: Vakman Theme System

**Date:** 2026-03-27
**Status:** Draft
**Scope:** New "vakman" theme for timmerman/metselaar/tegelzetter niches + niche-aware content pipeline

---

## Problem

The current lead site template uses a single "warm-luxury" salon aesthetic (amber/stone/rose, Playfair Display serif font, parallax, custom cursor). This doesn't work for trade niches like timmerman, metselaar, and tegelzetter — it looks like a hair salon instead of a professional craftsman.

## Target Niches

Based on Outscraper research across Amsterdam, Rotterdam, and Eindhoven:

| Niche | Businesses without website | % | Shared theme |
|-------|---------------------------|---|--------------|
| Timmerman | 24/60 | 40% | vakman |
| Metselaar | 17/40 | 43% | vakman |
| Tegelzetter | 10/60 | 17% | vakman |

All three share the same visual identity: construction trades, craftsmanship, professional results.

## Competitive Analysis

Analyzed 5 top-performing websites in these niches (snelvakman.nl, mvdtotaalbouw.nl, mlbtimmerwerken.nl, tegelamsterdam.nl, tegelprijsvechter.nl). Key patterns:

- **Dark, strong color palettes** — charcoal, navy, teal accents
- **Sans-serif fonts** — Poppins, Lato, Inter. No serif fonts.
- **Large project photography** — visual proof over marketing copy
- **Direct CTAs** — "Offerte aanvragen", WhatsApp prominent
- **Trust signals** — years of experience, KvK number, named reviews, local focus
- **Simple animations** — no parallax or 3D effects, subtle hover states

---

## Architecture

### Palette System (CSS Custom Properties)

Each palette defines a set of CSS variables. The palette name from `content.json` maps to a CSS class on the page root.

```
content.json (palette: "vakman")
  → page.tsx adds class="palette-vakman" to wrapper
  → CSS variables activate
  → All components read from variables
```

### Palette: "vakman"

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0f172a` (slate-900) | Page background, hero |
| `--bg-secondary` | `#1e293b` (slate-800) | Alternating sections |
| `--bg-card` | `rgba(255,255,255,0.05)` | Card backgrounds |
| `--border-card` | `rgba(255,255,255,0.1)` | Card borders |
| `--accent` | `#0ea5e9` (sky-500) | CTA buttons, links, highlights |
| `--accent-hover` | `#0284c7` (sky-600) | Button hover |
| `--accent-subtle` | `rgba(14,165,233,0.1)` | Badge backgrounds, glows |
| `--text-primary` | `#f8fafc` (slate-50) | Headlines |
| `--text-secondary` | `#e2e8f0` (slate-200) | Subheadlines |
| `--text-muted` | `#94a3b8` (slate-400) | Body text, labels |
| `--success` | `#22c55e` (green-500) | WhatsApp, review stars |
| `--font-heading` | `'Inter', sans-serif` | All headings |
| `--font-body` | `'Inter', sans-serif` | Body text |

### Palette: "warm-luxury" (existing salon, refactored to CSS vars)

| Token | Value |
|-------|-------|
| `--bg-primary` | `#1c1917` (stone-900) |
| `--accent` | `#d97706` (amber-600) |
| `--font-heading` | `'Playfair Display', serif` |

---

## Component Design

### New Components (`components/vakman/`)

#### VakmanHero
- **Layout:** Split — left text (60%), right image (40%)
- **Headline:** Short, direct (e.g., "Uw timmerman in Eindhoven")
- **Subheadline:** One sentence about specialization
- **Two CTA buttons:** "Offerte aanvragen" (filled accent) + "Bekijk projecten" (outline)
- **Trust bar:** Below CTAs — 3 badges ("✓ X+ jaar ervaring · ✓ Gratis offerte · ✓ Regio {stad}")
- **No parallax, no overlay text on image**
- **Mobile:** Image stacks above text, full-width

#### VakmanStats
- **Three animated counters** in a row: years experience, projects completed, 5-star reviews
- **CountUp animation** triggers on scroll-into-view (useInView + requestAnimationFrame)
- **Short about text** below (2-3 sentences from content.json)
- **Single project photo** with subtle hover-zoom (no TiltImage 3D)

#### VakmanServices
- **Grid layout:** 2x2 on desktop, 1-col on mobile
- **Each card:** Niche-specific icon + title + description
- **Hover effect:** Card lifts (translateY -4px) + accent border-left appears
- **No mouse-following gradient** (too playful for trades)

#### VakmanProjects (the wow-factor)
- **Before/After slider** — 1-2 featured projects with interactive drag handle
- **Project grid** below — masonry, hover reveals overlay with project name + type
- **Large images** — bigger than salon gallery, fewer but more impactful
- **Only renders if content.gallery exists and has items**

#### BeforeAfter
- **Interactive slider component** — drag handle reveals before/after images
- **Touch-friendly** — works on mobile with touch drag
- **Labels:** "Voor" / "Na" badges on each side
- **Only renders if content.before_after array exists in content.json**

#### AnimatedCounter
- **Reusable component** — takes target number, label, optional suffix (+, %)
- **Counts from 0 to target** over 2 seconds on scroll-into-view
- **Triggers once** (intersection observer with once: true)

#### VakmanReviews
- **Testimonial card grid** — 2 columns desktop, 1 column mobile
- **Each card:** Large quote marks, review text, name, star rating
- **No marquee/slider** — static grid, more professional
- **Accent-colored left border** on each card

#### VakmanContact
- **"Offerte aanvragen"** as primary card (full-width, accent background) linking to maps/WhatsApp
- **Grid below:** WhatsApp + telefoon + locatie cards
- **Openingstijden** shown if working_hours data exists
- **Phone and WhatsApp cards only render if phone exists** (already implemented)

#### VakmanIcons
- **SVG icon set** for construction trades:
  - `hammer` — timmerman general
  - `saw` — houtwerk
  - `ruler` — maatwerk/precisie
  - `drill` — montage/installatie
  - `bricks` — metselwerk
  - `trowel` — stucwerk/voegen
  - `wall` — gevelwerk
  - `tiles` — tegelwerk
  - `level` — waterpas/precisie
  - `bathroom` — badkamerrenovatie
  - `floor` — vloeren
  - `kitchen` — keuken
  - `wrench` — installatie/reparatie
  - `default` — ster (fallback)

### Retained Components (refactored to CSS vars)

These 4 components are shared between salon and vakman. They must be refactored from hardcoded Tailwind colors to CSS custom properties:

- **LeadNavbar** → `bg-stone-950` → `bg-[var(--bg-primary)]`, `text-amber-*` → `text-[var(--accent)]`
- **LeadFAQ** → `bg-stone-900` → `bg-[var(--bg-secondary)]`, accent colors swapped
- **LeadFooter** → same color refactor
- **MobileCTA** → `bg-amber-100` → `bg-[var(--accent)]`, CTA text from content.json

Each component's hardcoded stone/amber references must be replaced with the corresponding CSS variable.

### Removed for Vakman
- **LeadCursor** — custom cursor too playful for trades
- **TiltImage** — 3D mouse-tracking doesn't fit the vibe

---

## Page Routing

`app/[slug]/page.tsx` selects component set based on palette:

```typescript
if (content.palette === "vakman") {
  // Render: VakmanHero, VakmanStats, VakmanServices,
  //         VakmanProjects, VakmanReviews, LeadFAQ,
  //         VakmanContact, LeadFooter, MobileCTA
} else {
  // Render: LeadHero, LeadAbout, LeadServices,
  //         LeadGallery, LeadReviews, LeadFAQ,
  //         LeadContact, LeadFooter, MobileCTA, LeadCursor
}
```

---

## Content Pipeline — OpenAI Integration

### When creating a new lead site:

1. **Scrape** business data via Outscraper (name, address, reviews, photos, category)
2. **Send to OpenAI** gpt-4o-mini with niche-specific system prompt
3. **Receive** structured JSON with all copy
4. **Merge** into content.json template
5. **Deploy** via git push

### OpenAI Prompt Structure

**System prompt** (per niche):
```
Je bent een Nederlandse copywriter voor websites van {niche} bedrijven.
Schrijf professionele, directe teksten. Geen poetische taal, geen overdrijving.
Toon: vakkundig, betrouwbaar, resultaatgericht.
Gebruik korte zinnen. Focus op wat het bedrijf DOET, niet op vage beloftes.
```

**User prompt:** Structured business data (name, city, services, reviews summary, photo descriptions)

**Output format:** JSON matching content.json structure with:
- headline, subheadline
- cta_primary, cta_secondary
- trust_badges (array of 3 short strings)
- about (2-3 sentences)
- services (array with title, text, icon)
- faq (array with question, answer)

### Rules (enforced in prompt):
- NEVER fabricate reviews, awards, or claims
- Only use information provided in the input
- All text in Dutch (unless business uses English)
- CTA language: "Offerte aanvragen", "Neem contact op" — never "Boek een afspraak"

---

## Type Changes

### SiteContent additions:

```typescript
export interface SiteContent {
  // existing fields...

  trust_badges?: string[];        // ["12+ jaar ervaring", "Gratis offerte", "Regio Eindhoven"]
  stats?: {
    years?: number;               // For animated counter
    projects?: number;
    reviews_count?: number;
  };
  before_after?: Array<{
    before_url: string;
    after_url: string;
    label: string;                // "Badkamerrenovatie" etc.
  }>;
  working_hours?: Record<string, string>;  // {"ma-vr": "08:30-17:00", "za": "09:00-15:00"}
}
```

### Icon type update:

```typescript
icon: "hammer" | "saw" | "ruler" | "drill" | "bricks" | "trowel" | "wall" |
      "tiles" | "level" | "bathroom" | "floor" | "kitchen" | "wrench" |
      "scissors" | "palette" | "sparkles" | "heart" | "default";
```

---

## i18n Updates

Add vakman-specific strings to `lib/i18n.ts`:

```typescript
// Dutch
vakman: {
  trustBadgeYears: "jaar ervaring",
  trustBadgeFreeQuote: "Gratis offerte",
  trustBadgeRegion: "Regio",
  statsYears: "Jaar ervaring",
  statsProjects: "Projecten",
  statsReviews: "5-sterren reviews",
  ctaQuote: "Offerte aanvragen",
  ctaProjects: "Bekijk projecten",
  beforeLabel: "Voor",
  afterLabel: "Na",
}
```

---

## File Map

| File | Action | Description |
|------|--------|-------------|
| `app/globals.css` | Modify | Add CSS custom properties for vakman + warm-luxury palettes |
| `app/[slug]/page.tsx` | Modify | Palette-based component routing |
| `lib/types.ts` | Modify | Add trust_badges, stats, before_after, working_hours, expand icon union |
| `lib/i18n.ts` | Modify | Add vakman UI strings |
| `lib/icons.ts` | New | Niche icon mapping + SVG components |
| `lib/niche-config.ts` | New | Niche → palette + icon set + default CTA mapping |
| `components/vakman/VakmanHero.tsx` | New | Split-layout hero with trust bar |
| `components/vakman/VakmanStats.tsx` | New | Animated counters + about |
| `components/vakman/VakmanServices.tsx` | New | Service card grid with trade icons |
| `components/vakman/VakmanProjects.tsx` | New | Before/after + project gallery |
| `components/vakman/VakmanReviews.tsx` | New | Testimonial card grid |
| `components/vakman/VakmanContact.tsx` | New | Quote-first contact section |
| `components/vakman/BeforeAfter.tsx` | New | Interactive before/after slider |
| `components/vakman/AnimatedCounter.tsx` | New | Scroll-triggered count-up |
| `components/vakman/VakmanIcons.tsx` | New | SVG icon library for trades |

---

## Out of Scope

- Automated OpenAI call in Make.com pipeline (Scenario 2) — that's a separate task
- Additional palettes beyond vakman + warm-luxury
- E-commerce or booking functionality
- CMS or admin panel for content editing
