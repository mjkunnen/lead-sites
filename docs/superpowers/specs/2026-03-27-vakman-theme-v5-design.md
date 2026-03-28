# Vakman Theme v5 — Design Spec

## Overview

Complete redesign of the vakman (trades/construction) lead site template. Light theme, premium animations, research-backed typography. One template for all vakman niches, only content changes per business.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Theme | Light (white/grey) | Vertrouwder voor doelgroep (huiseigenaren 35-65), foto's komen beter uit |
| Animation level | Full premium (36 effects) | Match netjesonline.com quality level |
| Animation stack | Framer Motion only | Remove Lenis/GSAP to fix whileInView conflict |
| Template scope | One template, all vakman niches | Perfect one niche first, then scale |
| Test content | Real scraped data via Outscraper | No fake reviews/addresses |

## Typography System

Three-font system from the DM/Jakarta family:

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headings (H1, H2) | DM Serif Display | 400 | Section titles, hero headline |
| Subheadings, buttons, names | Plus Jakarta Sans | 600-700 | Service titles, CTA text, card headings |
| Body, labels, small text | DM Sans | 400-500 | Paragraphs, descriptions, meta text |

### Typography Rules
- No uppercase headings — mixed-case only (labels excepted)
- Heading weight 600-700, never 800-900
- Letter-spacing: -0.5px on serif headings, -0.3px on sans subheadings
- Line-height: 1.15 for headings, 1.7 for body text

## Color Palette

```css
.palette-vakman-v5 {
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-card: #fafafa;
  --bg-dark: #0f172a;
  --bg-dark-card: #1e293b;

  /* Accent */
  --accent: #2563eb;          /* blue-600 — trust color */
  --accent-hover: #1d4ed8;    /* blue-700 */
  --accent-subtle: #eff6ff;   /* blue-50 — icon backgrounds */
  --accent-glow: rgba(37, 99, 235, 0.08);

  /* Text */
  --text-primary: #0f172a;    /* slate-900 */
  --text-secondary: #64748b;  /* slate-500 */
  --text-muted: #94a3b8;      /* slate-400 */

  /* Borders */
  --border: #f1f5f9;          /* slate-100 */
  --border-dark: #334155;     /* slate-700 */

  /* Semantic */
  --success: #22c55e;         /* WhatsApp, availability */
  --stars: #f59e0b;           /* Google review stars only */
  --danger: #ef4444;          /* "Gesloten" only */

  /* Fonts */
  --font-heading: 'DM Serif Display', Georgia, serif;
  --font-subheading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}
```

## Page Sections (top to bottom)

### 1. Navbar
- Glassmorphism: `bg-white/90 backdrop-blur-16`
- Sticky on scroll
- Left: logo icon (dark square) + business name in DM Serif Display
- Center (desktop): nav links (Diensten, Werk, Reviews)
- Right: phone number (visible!) + blue "Offerte" button with shimmer
- Scroll progress bar below navbar (blue gradient, grows with scroll)

### 2. Hero
- Availability badge: green pulse dot + "Beschikbaar voor nieuwe projecten"
- Headline: DM Serif Display 38px, accent color on key phrase, animated underline
- Subtext: DM Sans 15px, slate-500
- CTA cluster: dark primary button (shimmer + magnetic hover) + outlined secondary
- Trust badges: pill-shaped chips with blue icons (rating, years, offerte)
- Background: subtle gradient mesh blobs that drift

### 3. Hero Image
- Full-width project photo with 3D TiltImage effect
- Clip-path reveal animation on scroll
- Bottom overlay: project name + "Bekijk ↗" glassmorphism button
- Rounded corners: 14px

### 4. Floating Trust Strip
- Overlaps hero image by -16px (negative margin)
- White card with shadow: `shadow-[0_8px_32px_rgba(0,0,0,0.08)]`
- Three stats: years | projects | review score
- Spring bounce-up animation on scroll

### 5. About
- Rounded card with gradient background (slate-50 to indigo-50)
- Section label + body text in DM Sans
- Key phrases bold with subtle blue underline
- Floating icon badges (checkmark, shield, clock) that bob up/down

### 6. Services
- Section heading: DM Serif Display
- Featured service: dark card (#0f172a) with blue icon, gradient blob, "Populair" badge
- Secondary services: 2-column grid, light cards (#fafafa), blue icon squares
- Additional services: horizontal card with chevron
- All cards: mouse-following blue radial gradient, hover lift + shadow

### 7. Projects
- Before/After slider: draggable divider, "VOOR"/"NA" labels
- Masonry photo grid: 2 columns with parallax offset (left +40px, right -40px)
- Each photo: 3D TiltImage, gradient overlay at bottom with project name
- Scroll-triggered reveal: scale 0.95→1 + opacity fade, staggered

### 8. Reviews
- Split header: heading left, big score (4.9) + stars right
- Dual marquee rows: row 1 left→right, row 2 right→left
- Cards: white, subtle border/shadow, star SVGs, review text, avatar initial + name
- Fade edges on both sides
- Pause on hover

### 9. FAQ
- Accordion with smooth height animation (Framer Motion AnimatePresence)
- Open item: dark background (#0f172a), white text, blue × button (rotated +)
- Closed items: light grey background, dark text, grey + button
- Plus icon rotates 45° to × on open

### 10. Contact (dark section)
- Background: #0f172a with subtle gradient blobs
- Heading: DM Serif Display in white, accent on "contact"
- Primary CTA: blue gradient card with shimmer + arrow, glow shadow
- Grid: phone, WhatsApp (green + pulse ring), email, location
- Working hours card
- All cards: dark cards (#1e293b) with subtle borders

### 11. Sticky Mobile CTA Bar
- Fixed bottom bar (mobile only)
- Two buttons: "Bellen" (dark) + "WhatsApp" (green)
- Slides up on scroll, hides when at top
- Min 44px tap targets

### 12. Footer
- Dark background matching contact section
- Business name in DM Serif Display
- Copyright line in DM Sans

## Animation Inventory (28 effects)

### Page-level
1. Scroll progress bar — blue gradient grows with scroll position
2. Custom cursor — small circle follows mouse, grows on clickable elements
3. Gradient mesh — subtle blue blobs drift slowly through sections
4. Section reveals — every section fade-up via Framer Motion `whileInView`

### Hero
5. Availability badge — green pulse-ring animation (CSS)
6. Headline stagger — words appear one by one, 0.08s delay, spring physics
7. Accent underline — draws in left→right after headline completes
8. CTA shimmer — white gradient sweep on primary button
9. CTA magnetic hover — button attracts cursor slightly
10. Trust badges — stagger fade-up, 0.05s per badge

### Hero Image
11. Clip-path reveal — image reveals via expanding clip-path on scroll
12. 3D tilt — image reacts to mouse position (perspective transform)
13. Project label — slides in from below with backdrop-blur

### Trust Strip
14. Spring bounce — bounces up with spring physics, overlapping image

### Stats
15. Count-up — numbers animate from 0 with easeOut cubic
16. Accent pop-in — "+" and "★" scale bounce after counter finishes

### About
17. Floating icons — bob up/down at different speeds (parallax feel)
18. Text highlight — underline draws in on scroll

### Services
19. Mouse-following glow — subtle blue radial gradient follows cursor
20. Card hover — lift (-4px) + shadow grows + border brightens
21. Featured card blob — blue gradient pulses subtly
22. SVG icon draw-in — icons draw their strokes on first view

### Projects
23. Before/After slider — draggable with smooth pointer tracking
24. 3D TiltImage — each photo reacts to mouse
25. Parallax columns — left column offset +40px, right -40px
26. Image reveal — scale 0.95→1 + opacity fade, staggered per photo

### Reviews
27. Dual marquee — two rows, opposite directions, pause on hover
28. Score count-up — 0.0 → 4.9 animation

### FAQ
29. Accordion height — smooth Framer Motion AnimatePresence
30. Icon rotation — + rotates 45° to × on open/close

### Contact
31. CTA glow — box-shadow pulses (blue glow breathes)
32. CTA shimmer — white gradient sweep
33. WhatsApp pulse — green ring pulses around icon
34. Cards stagger — fade-up with 0.1s delay per card

### Mobile
35. Sticky CTA bar — slides up on scroll, hides at top
36. Touch optimized — all tilt/cursor effects disabled on touch devices

## Technical Architecture

### Remove
- `components/agency/SmoothScroll.tsx` — remove Lenis/GSAP entirely
- `lenis` and `gsap` packages from package.json
- All Lenis CSS from globals.css

### Keep/Modify
- `app/[slug]/page.tsx` — update vakman branch to use new components
- `app/globals.css` — replace `.palette-vakman` with v5 palette
- `lib/types.ts` — no changes needed, current types support all fields
- `lib/i18n.ts` — update vakman translations if needed

### New/Rewrite Components (all in `components/vakman/`)
- `VakmanHero.tsx` — complete rewrite (light theme, new typography)
- `VakmanStats.tsx` — rewrite as floating trust strip
- `VakmanAbout.tsx` — new component (was inline in Stats)
- `VakmanServices.tsx` — rewrite (light cards, featured dark card)
- `VakmanProjects.tsx` — rewrite (add before/after, light masonry)
- `VakmanReviews.tsx` — rewrite (light cards, keep marquee)
- `VakmanContact.tsx` — rewrite (dark section, new grid layout)
- `VakmanFAQ.tsx` — new (replace shared LeadFAQ for vakman)
- `VakmanMobileCTA.tsx` — new sticky bottom bar
- `ScrollProgress.tsx` — new scroll progress bar component
- `AnimatedCounter.tsx` — fix IntersectionObserver (already exists, needs fixes)
- `BeforeAfter.tsx` — already exists, keep
- `VakmanIcons.tsx` — already exists, keep
- `TiltImage.tsx` — already exists in `components/lead/`, keep

### Shared Components
- `LeadNavbar.tsx` — rewrite vakman branch (phone in header, serif logo)
- `LeadFooter.tsx` — rewrite vakman branch
- `MobileCTA.tsx` — replace with VakmanMobileCTA for vakman palette

### Data
- Scrape real timmerman data via Outscraper API for test content
- Update `sites/degraaf-timmerman-eindhoven/content.json` with real data
- Or create new test site with real scraped business

## Content.json Structure

No structural changes needed. Current schema supports all required fields:
- `hero.image_url` — project photo (from Google Maps)
- `trust_badges` — array of badge strings
- `stats` — { years, projects, reviews_count }
- `services` — array with title, text, icon
- `gallery` — array with url, alt
- `before_after` — array with before_url, after_url, label (optional)
- `reviews` — array with name, text, stars, date
- `faq` — array with question, answer
- `contact` — phone, email, city, address, maps_url
- `working_hours` — key-value object

## Success Criteria

1. All sections render correctly (no empty dark blocks)
2. All 36 animations work on desktop
3. Touch devices: tilt/cursor effects disabled, everything else works
4. Mobile CTA bar appears and functions
5. Real scraped data displays correctly
6. Lighthouse performance > 90
7. No Lenis/GSAP dependencies remain
