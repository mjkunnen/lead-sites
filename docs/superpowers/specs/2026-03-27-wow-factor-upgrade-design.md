# NetjesOnline Agency Site — Wow Factor Upgrade

**Datum:** 2026-03-27
**Scope:** Agency homepage (app/page.tsx) — lead-templates buiten scope voor nu
**Stijl:** 3D & Immersive + Scroll-Driven & Reactive, professionele uitstraling
**Performance:** Wow eerst, optimalisatie later. Desktop-first, mobiel krijgt fallbacks.

---

## Bestaand behouden

- **Floating Laptop** (FloatingMockup.tsx) — blijft de hero centerpiece. Wordt niet vervangen maar aangevuld met particle background erachter.
- **Custom Cursor** (CustomCursor.tsx) — wordt geüpgraded, niet vervangen.
- **Preloader** (Preloader.tsx) — blijft.
- **HeroOrb** — wordt vervangen door particle background (orb is dan overbodig).

---

## 1. Particle Background (hero)

**Wat:** Interactief connected-dots netwerk achter de floating laptop. Particles bewegen langzaam, verbindingslijnen verschijnen wanneer dots dicht bij elkaar zijn. Muis duwt particles weg (repel effect).

**Technisch:**
- Library: `@tsparticles/react` + `@tsparticles/slim` (lichter dan Three.js voor dit effect)
- Alleen in de hero sectie, niet full-page
- Config: ~80 particles, connect distance 120px, move speed 0.5, mouse repel radius 100px
- Kleuren: blue-600 (#2563EB) en indigo-400 (#818CF8) met lage opacity (0.3)

**Nieuw bestand:** `components/agency/ParticleField.tsx`

**Integratie:** Achter de FloatingMockup in Hero.tsx, absolute positioned met z-index 0.

---

## 2. Smooth Scroll (Lenis)

**Wat:** Butter-smooth scrolling met momentum over de hele pagina. Maakt alle scroll-animaties vloeiender.

**Technisch:**
- Library: `lenis` (v1.x)
- Wrapper component in layout of page level
- Integreert met Framer Motion's `useScroll` via Lenis RAF callback
- Duration: 1.2, easing: cubic-bezier(0.25, 0, 0.55, 1)
- Uitgeschakeld op mobiel (native scroll is beter op touch)

**Nieuw bestand:** `components/agency/SmoothScroll.tsx`

**Integratie:** Wraps `<main>` in app/page.tsx.

---

## 3. Scroll-Driven Text Reveals

**Wat:** Headlines die woord-voor-woord verschijnen bij scrollen. Niet letter-voor-letter (te langzaam), maar woord-voor-woord met een opacity + y-translate stagger.

**Technisch:**
- Custom hook: `useWordReveal` — splitst tekst in woorden, animate elk woord gebaseerd op scroll positie
- Framer Motion `useScroll` + `useTransform` per woord
- Elk woord: opacity 0.15 → 1, y: 8px → 0
- Stagger: 0.03s per woord

**Toepassen op:**
- Hero headline ("Websites die klanten opleveren")
- Section headings: "Hé, ik ben Max", "Herkenbaar?", "Wat ons anders maakt", etc.

**Nieuw bestand:** `components/agency/WordReveal.tsx`

**Integratie:** Vervangt statische `<h2>` tags in secties. Import en wrap de heading tekst.

---

## 4. Parallax Scroll Layers

**Wat:** Achtergrond-elementen (blobs, gradients) bewegen langzamer dan content bij scrollen. Geeft diepte.

**Technisch:**
- Framer Motion `useScroll` + `useTransform` met verschillende multipliers
- Achtergrond blobs: 0.3x scroll speed
- Content: 1x (normaal)
- Decoratieve elementen: 0.6x
- Alleen op de hero en portfolio secties (niet overal, dat wordt chaotisch)

**Geen nieuw bestand nodig** — wordt geïntegreerd in Hero.tsx en Portfolio.tsx via `useTransform`.

---

## 5. 3D Tilt Portfolio Cards + Shine

**Wat:** Portfolio cards krijgen een glare/lichtreflectie overlay die meebeweegt met de muis. Bouwt voort op bestaande TiltCard.tsx.

**Technisch:**
- Bestaande TiltCard: perspective(1000px) + rotateX/Y tot ±8deg — dit blijft
- Toevoeging: shine overlay `<div>` met `radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.25), transparent 60%)`
- Shine volgt muispositie relatief aan de card
- Border krijgt een subtiele gradient glow on hover

**Aanpassing:** `components/agency/ui/TiltCard.tsx` — shine overlay toevoegen.

**Integratie:** Portfolio.tsx gebruikt TiltCard al (of zou moeten). Cards wrappen in upgraded TiltCard.

---

## 6. Animated Stats Counter

**Wat:** De StatsBar nummers tellen op van 0 wanneer ze in viewport scrollen. Met een spring/bounce aan het einde.

**Technisch:**
- Framer Motion `useInView` trigger
- `useSpring` met stiffness: 50, damping: 20 voor bounce effect
- `useMotionValue` + `useTransform` om af te ronden naar integers
- Suffix ("+", " dagen", "%") wordt apart gerenderd, niet meegerekend

**Aanpassing:** `components/agency/StatsBar.tsx` — vervang statische getallen met animated counter component.

**Nieuw bestand:** `components/agency/AnimatedCounter.tsx`

---

## 7. Enhanced Custom Cursor

**Wat:** Upgrade bestaande cursor met gradient trail en verbeterde interactie-states.

**Technisch:**
- Trail: 5-8 volgende dots die de cursor volgen met afnemende opacity en grootte (lerp chain)
- Gradient: dots kleuren van blue-600 naar transparant
- Hover states verbeteren:
  - Buttons: cursor groeit + "click" tekst label
  - Links: cursor wordt pijl-vorm
  - Portfolio cards: cursor wordt "Bekijk" label
- Blend mode blijft `mix-blend-difference`

**Aanpassing:** `components/agency/CustomCursor.tsx` — trail + states toevoegen.

---

## 8. Animated Gradient Mesh Achtergrond

**Wat:** Langzaam bewegende kleurvlakken op achtergrond van witte secties (USP, Pricing, FAQ). Subtiel, niet afleidend.

**Technisch:**
- Puur CSS: 3-4 grote radial-gradients die langzaam van positie wisselen
- `@keyframes` met 20-30s duration, ease-in-out
- Kleuren: blue-50, indigo-50, cyan-50 (heel licht, nauwelijks zichtbaar)
- `filter: blur(80px)` voor zachte overgangen
- opacity: 0.4-0.6

**Nieuw bestand:** `components/agency/GradientMesh.tsx`

**Integratie:** Absolute positioned achtergrond in USPSection, Pricing, en FAQ secties.

---

## 9. Magnetic Navigation + Active Indicator

**Wat:** Nav-items trekken magnetisch naar cursor. Een animated pill/underline schuift naar het actieve nav-item gebaseerd op scroll positie.

**Technisch:**
- Magnetic: hergebruik logica van MagneticButton maar lichter (15% strength i.p.v. 30%)
- Active indicator: `<motion.div>` die `layoutId` animatie doet tussen nav items
- Scroll spy: `IntersectionObserver` op elke sectie, update active state
- Pill: achtergrond highlight met border-radius, animate via `layout` prop

**Aanpassing:** `components/agency/Navbar.tsx` — magnetic + scroll spy + animated pill.

---

## 10. Staggered Section Reveals

**Wat:** Secties komen theatraal binnen — badge eerst, heading, dan content cards één voor één. Met clip-path mask animatie.

**Technisch:**
- Wrapper component die children staggered animate
- Sequence per sectie:
  1. Badge: fade + scale (0ms)
  2. Heading: WordReveal (100ms)
  3. Subtitle: fade up (200ms)
  4. Content items: stagger 100ms each, fade + slide up
- Clip-path variant voor premium secties: `inset(100% 0 0 0)` → `inset(0)` met 0.6s ease
- GSAP ScrollTrigger voor precise scroll-linked timing

**Nieuw bestand:** `components/agency/StaggerReveal.tsx`

**Integratie:** Wrap elke sectie's content in StaggerReveal. Secties die dit krijgen: ProblemSection, USPSection, ProcessTimeline, Portfolio, Pricing.

---

## 11. Page Transitions

**Wat:** Smooth fade/slide transities bij navigatie tussen pagina's.

**Technisch:**
- Next.js App Router: gebruik `<AnimatePresence>` met `motion.div` wrapper
- Exit: fade out + slight scale down (0.3s)
- Enter: fade in + slide up (0.4s)
- Template.tsx in app/ folder voor page-level animation wrapper

**Nieuw bestand:** `app/template.tsx`

**Let op:** Next.js App Router page transitions zijn beperkt. `template.tsx` remounts bij navigatie — we animeren die remount. Geen `startViewTransition` nodig.

---

## 12. Lead Template Subtle Upgrades (later)

**Buiten scope voor nu.** Wanneer de agency site klaar is, evalueren we welke elementen (smooth scroll, staggered reveals, animated counters) zinvol zijn voor lead-sites. Die moeten snel en licht blijven.

---

## Nieuwe Dependencies

| Package | Doel | Grootte (gzip) |
|---------|------|----------------|
| `@tsparticles/react` + `@tsparticles/slim` | Particle background | ~25KB |
| `lenis` | Smooth scroll | ~5KB |
| `gsap` (al geïnstalleerd) | ScrollTrigger, advanced timelines | 0KB extra |

GSAP is al geïnstalleerd maar niet gebruikt. We activeren ScrollTrigger plugin. Moet eenmalig geregistreerd worden via `gsap.registerPlugin(ScrollTrigger)` in een client component (SmoothScroll.tsx is de logische plek).

**Totaal extra:** ~30KB gzipped.

**Mobiel fallbacks:** Particle field, custom cursor trail, en magnetic nav worden uitgeschakeld op touch devices. Smooth scroll disabled op mobiel (native scroll). Alle andere animaties werken op mobiel maar met reduced motion support.

---

## Bestandsoverzicht

### Nieuwe bestanden (7)
| Bestand | Rol |
|---------|-----|
| `components/agency/ParticleField.tsx` | Particle netwerk achtergrond |
| `components/agency/SmoothScroll.tsx` | Lenis smooth scroll wrapper |
| `components/agency/WordReveal.tsx` | Scroll-driven woord-voor-woord text reveal |
| `components/agency/GradientMesh.tsx` | Animated gradient mesh achtergrond |
| `components/agency/AnimatedCounter.tsx` | Optel-animatie voor stats |
| `components/agency/StaggerReveal.tsx` | Theatrale sectie-entrance wrapper |
| `app/template.tsx` | Page transition wrapper |

### Bestaande bestanden aanpassen (6)
| Bestand | Wijziging |
|---------|-----------|
| `components/agency/Hero.tsx` | ParticleField toevoegen, parallax op blobs |
| `components/agency/ui/TiltCard.tsx` | Shine overlay toevoegen |
| `components/agency/StatsBar.tsx` | AnimatedCounter integreren |
| `components/agency/CustomCursor.tsx` | Trail + betere hover states |
| `components/agency/Navbar.tsx` | Magnetic + scroll spy + active pill |
| `components/agency/Portfolio.tsx` | TiltCard + parallax integreren |

### Secties die StaggerReveal + WordReveal krijgen (5)
- ProblemSection.tsx
- USPSection.tsx
- ProcessTimeline.tsx
- Portfolio.tsx (ook parallax)
- Pricing.tsx

### Secties die GradientMesh krijgen (3)
- USPSection.tsx
- Pricing.tsx
- FAQ.tsx

---

## Volgorde van implementatie

1. **Lenis smooth scroll** — fundament, beïnvloedt alles
2. **Animated stats counter** — quick win, fix bestaande "0" bug
3. **WordReveal + StaggerReveal** — grootste visuele impact op alle secties
4. **ParticleField** — hero upgrade
5. **TiltCard shine** — portfolio upgrade
6. **Enhanced cursor** — subtiele premium touch
7. **Gradient mesh** — achtergrond sfeer
8. **Magnetic nav + active pill** — navigatie polish
9. **Parallax layers** — diepte in hero + portfolio
10. **Page transitions** — finishing touch
