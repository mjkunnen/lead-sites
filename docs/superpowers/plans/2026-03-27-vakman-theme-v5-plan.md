# Vakman Theme v5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete redesign of the vakman lead site template — light theme, premium animations, research-backed typography, Framer Motion only (no Lenis/GSAP).

**Architecture:** Remove Lenis/GSAP scroll hijacking that breaks Framer Motion's `whileInView`. Rewrite all vakman components for light theme with DM Serif Display / Plus Jakarta Sans / DM Sans typography. Add 36 premium animations using only Framer Motion. One template for all vakman niches.

**Tech Stack:** Next.js 16.2, React 19, Tailwind CSS 4, Framer Motion 12, TypeScript 5

**Spec:** `docs/superpowers/specs/2026-03-27-vakman-theme-v5-design.md`

---

## File Structure

### Files to Remove/Clean
- `components/agency/SmoothScroll.tsx` — remove Lenis/GSAP wrapper entirely
- `lenis` + `gsap` packages from `package.json`
- Lenis CSS from `app/globals.css` (lines 82-97)

### Files to Modify
- `app/[slug]/page.tsx` — remove SmoothScroll wrapper, add new components
- `app/globals.css` — replace `.palette-vakman` dark vars with v5 light vars
- `app/layout.tsx` — add Google Fonts (DM Serif Display, Plus Jakarta Sans, DM Sans)
- `components/lead/LeadNavbar.tsx` — rewrite vakman branch (phone visible, serif logo, scroll progress)
- `components/lead/LeadFooter.tsx` — rewrite vakman branch (dark, serif name)
- `components/vakman/AnimatedCounter.tsx` — minor fixes (works once Lenis removed)
- `lib/i18n.ts` — add new vakman translation keys

### Files to Create
- `components/vakman/VakmanHero.tsx` — complete rewrite
- `components/vakman/VakmanHeroImage.tsx` — full-width project photo with clip-path reveal
- `components/vakman/VakmanTrustStrip.tsx` — floating stats strip (replaces VakmanStats)
- `components/vakman/VakmanAbout.tsx` — new about section with floating icons
- `components/vakman/VakmanServices.tsx` — complete rewrite (light + featured dark card)
- `components/vakman/VakmanProjects.tsx` — complete rewrite (parallax masonry + before/after)
- `components/vakman/VakmanReviews.tsx` — complete rewrite (light cards, dual marquee)
- `components/vakman/VakmanFAQ.tsx` — new accordion (dark active state)
- `components/vakman/VakmanContact.tsx` — complete rewrite (dark section, grid)
- `components/vakman/VakmanMobileCTA.tsx` — new sticky bottom bar
- `components/vakman/ScrollProgress.tsx` — scroll progress bar below navbar

### Files to Keep As-Is
- `components/vakman/BeforeAfter.tsx` — existing drag slider works
- `components/vakman/VakmanIcons.tsx` — 14 SVG trade icons work
- `components/lead/TiltImage.tsx` — 3D tilt effect works
- `lib/types.ts` — SiteContent interface supports all fields

---

## Task 1: Remove Lenis/GSAP & Fix Build Foundation

**Files:**
- Modify: `app/[slug]/page.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`
- Delete: `components/agency/SmoothScroll.tsx`

- [ ] **Step 1: Remove Lenis + GSAP packages**

```bash
cd "C:\Users\maxku\OneDrive\Bureaublad\Website creation automation\lead-sites"
npm uninstall lenis gsap
```

- [ ] **Step 2: Remove SmoothScroll import and wrapper from page.tsx**

In `app/[slug]/page.tsx`, remove the SmoothScroll import:
```typescript
// REMOVE this line:
import SmoothScroll from "@/components/agency/SmoothScroll";
```

Remove the `<SmoothScroll>` wrapper around the vakman content. The vakman branch should render components directly inside `<main>` without any scroll wrapper. Keep the `<main>` tag.

Before (approximate):
```tsx
<SmoothScroll>
  <main>
    <VakmanHero ... />
    ...
  </main>
  <LeadFooter ... />
</SmoothScroll>
```

After:
```tsx
<main>
  <VakmanHero ... />
  ...
</main>
<LeadFooter ... />
```

- [ ] **Step 3: Remove Lenis CSS from globals.css**

Remove these lines from `app/globals.css`:
```css
html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
```

- [ ] **Step 4: Delete SmoothScroll component**

Delete file: `components/agency/SmoothScroll.tsx`

Note: If other palettes (non-vakman) still use SmoothScroll, keep the file but only remove the vakman usage from page.tsx. Check if the "lead" palette branch also uses it — if so, leave SmoothScroll.tsx but remove only the vakman `<SmoothScroll>` wrapper.

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds. If SmoothScroll is still imported elsewhere, the build will still pass since we only removed the vakman usage.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove Lenis/GSAP from vakman theme — fixes whileInView conflict"
```

---

## Task 2: Update CSS Palette & Google Fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace .palette-vakman in globals.css**

Find the existing `.palette-vakman` block (lines ~36-51) and replace entirely with:

```css
.palette-vakman {
  /* Backgrounds */
  --p-bg-primary: #ffffff;
  --p-bg-secondary: #f8fafc;
  --p-bg-card: #fafafa;
  --p-bg-dark: #0f172a;
  --p-bg-dark-card: #1e293b;

  /* Accent */
  --p-accent: #2563eb;
  --p-accent-hover: #1d4ed8;
  --p-accent-subtle: #eff6ff;
  --p-accent-glow: rgba(37, 99, 235, 0.08);

  /* Text */
  --p-text-primary: #0f172a;
  --p-text-secondary: #64748b;
  --p-text-muted: #94a3b8;

  /* Borders */
  --p-border: #f1f5f9;
  --p-border-dark: #334155;

  /* Semantic */
  --p-success: #22c55e;
  --p-stars: #f59e0b;
  --p-danger: #ef4444;

  /* Fonts */
  --p-font-heading: 'DM Serif Display', Georgia, serif;
  --p-font-subheading: 'Plus Jakarta Sans', sans-serif;
  --p-font-body: 'DM Sans', sans-serif;
}
```

- [ ] **Step 2: Add Google Fonts to layout.tsx**

In `app/layout.tsx`, import the three Google Fonts using `next/font/google`:

```typescript
import { DM_Serif_Display, Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});
```

Add the font variables to the `<body>` className:
```tsx
<body className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${dmSans.variable}`}>
```

- [ ] **Step 3: Add utility classes in globals.css**

Add after the palette block:

```css
/* Vakman v5 typography utilities */
.font-heading {
  font-family: var(--font-dm-serif, 'DM Serif Display', Georgia, serif);
  letter-spacing: -0.5px;
  line-height: 1.15;
}
.font-subheading {
  font-family: var(--font-jakarta, 'Plus Jakarta Sans', sans-serif);
  letter-spacing: -0.3px;
}
.font-body {
  font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
  line-height: 1.7;
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add vakman v5 light palette and DM Serif/Jakarta/DM Sans fonts"
```

---

## Task 3: ScrollProgress Component

**Files:**
- Create: `components/vakman/ScrollProgress.tsx`

- [ ] **Step 1: Create ScrollProgress.tsx**

```tsx
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-[64px] left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)',
      }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/vakman/ScrollProgress.tsx
git commit -m "feat: add scroll progress bar component"
```

---

## Task 4: VakmanMobileCTA Component

**Files:**
- Create: `components/vakman/VakmanMobileCTA.tsx`

- [ ] **Step 1: Create VakmanMobileCTA.tsx**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '@/lib/types';

export default function VakmanMobileCTA({ content }: { content: SiteContent }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 300);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const phone = content.contact.phone?.replace(/\s/g, '') || '';
  const waPhone = phone.replace('+', '');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex gap-3 md:hidden"
        >
          <a
            href={`tel:${phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-[family-name:var(--font-jakarta)] font-semibold text-sm min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Bellen
          </a>
          <a
            href={`https://wa.me/${waPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#22c55e] text-white font-[family-name:var(--font-jakarta)] font-semibold text-sm min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.68-1.318A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.798-6.382-2.144l-.447-.334-2.786.784.852-2.669-.373-.476A9.958 9.958 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/vakman/VakmanMobileCTA.tsx
git commit -m "feat: add vakman sticky mobile CTA bar"
```

---

## Task 5: Rewrite LeadNavbar Vakman Branch

**Files:**
- Modify: `components/lead/LeadNavbar.tsx`

- [ ] **Step 1: Rewrite the vakman palette branch in LeadNavbar**

The navbar for vakman v5 needs:
- `bg-white/90 backdrop-blur-2xl` glassmorphism
- Left: business name in DM Serif Display (dark)
- Center (desktop): nav links — Diensten, Werk, Reviews
- Right: phone number visible + blue "Offerte" button with shimmer animation
- Sticky with hide-on-scroll-down, show-on-scroll-up behavior (keep existing logic)

In the vakman branch of the navbar, update the styling:

```tsx
// Inside the vakman palette conditional rendering:
// Container
<nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-slate-100/50">
  <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
    {/* Logo */}
    <span className="font-heading text-xl text-slate-900">
      {content.business_name}
    </span>

    {/* Desktop nav links */}
    <div className="hidden md:flex items-center gap-8">
      <a href="#diensten" className="font-body text-sm text-slate-600 hover:text-slate-900 transition-colors">Diensten</a>
      <a href="#projecten" className="font-body text-sm text-slate-600 hover:text-slate-900 transition-colors">Werk</a>
      <a href="#reviews" className="font-body text-sm text-slate-600 hover:text-slate-900 transition-colors">Reviews</a>
    </div>

    {/* Right: phone + CTA */}
    <div className="flex items-center gap-4">
      <a href={`tel:${content.contact.phone}`} className="hidden sm:block font-subheading text-sm font-semibold text-slate-700">
        {content.contact.phone}
      </a>
      <a
        href="#contact"
        className="relative overflow-hidden px-5 py-2.5 rounded-lg bg-[#2563eb] text-white font-subheading font-semibold text-sm hover:bg-[#1d4ed8] transition-colors"
      >
        Offerte
        {/* Shimmer overlay */}
        <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </a>
    </div>
  </div>
</nav>
```

Add shimmer keyframe to globals.css:
```css
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/lead/LeadNavbar.tsx app/globals.css
git commit -m "feat: rewrite vakman navbar — glassmorphism, serif logo, phone visible"
```

---

## Task 6: VakmanHero — Complete Rewrite

**Files:**
- Create: `components/vakman/VakmanHero.tsx` (overwrite existing)

- [ ] **Step 1: Write new VakmanHero**

The hero needs:
- White/light background
- Availability badge with green pulse dot
- DM Serif Display headline (38px) with accent color on key phrase + animated underline
- Word-by-word stagger animation (0.08s delay, spring physics)
- DM Sans subtext (15px, slate-500)
- CTA cluster: dark primary button (shimmer + magnetic hover) + outlined secondary
- Trust badges: pill-shaped chips with blue icons
- Background: subtle gradient mesh blobs that drift

```tsx
'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { SiteContent } from '@/lib/types';

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.a>
  );
}

export default function VakmanHero({ content }: { content: SiteContent }) {
  const words = content.hero.headline.split(' ');
  const accentWordCount = Math.min(2, Math.ceil(words.length / 3));
  const phone = content.contact.phone?.replace(/\s/g, '') || '';

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white pt-20">
      {/* Gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #eff6ff 0%, transparent 70%)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #dbeafe 0%, transparent 70%)' }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-body text-sm text-emerald-700">Beschikbaar voor nieuwe projecten</span>
        </motion.div>

        {/* Headline — word stagger */}
        <h1 className="font-heading text-[32px] md:text-[42px] lg:text-[48px] text-slate-900 max-w-2xl mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + i * 0.08,
                type: 'spring',
                stiffness: 100,
                damping: 12,
              }}
              className={`inline-block mr-[0.3em] ${i >= words.length - accentWordCount ? 'text-[#2563eb]' : ''}`}
            >
              {word}
              {i >= words.length - accentWordCount && i === words.length - 1 && (
                <motion.span
                  className="block h-[3px] bg-[#2563eb] rounded-full mt-1"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4 + words.length * 0.08 + 0.3, duration: 0.6, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-body text-[15px] text-slate-500 max-w-lg mb-10"
        >
          {content.hero.subheadline}
        </motion.p>

        {/* CTA cluster */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <MagneticButton
            href={`https://wa.me/${phone.replace('+', '')}`}
            className="relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-subheading font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            {content.hero.cta_primary}
            <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </MagneticButton>
          <a
            href="#projecten"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-subheading font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            {content.hero.cta_secondary}
          </a>
        </motion.div>

        {/* Trust badges */}
        {content.trust_badges && (
          <div className="flex flex-wrap gap-3">
            {content.trust_badges.map((badge, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-sm text-slate-600 font-body"
              >
                <svg className="w-4 h-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {badge}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/vakman/VakmanHero.tsx
git commit -m "feat: rewrite VakmanHero — light theme, word stagger, magnetic CTA, trust badges"
```

---

## Task 7: VakmanHeroImage — Clip-Path Reveal + 3D Tilt

**Files:**
- Create: `components/vakman/VakmanHeroImage.tsx`

- [ ] **Step 1: Create VakmanHeroImage.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import TiltImage from '@/components/lead/TiltImage';
import type { SiteContent } from '@/lib/types';

export default function VakmanHeroImage({ content }: { content: SiteContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Clip-path reveal: grows from center as user scrolls into view
  const clipProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const clipPath = useTransform(clipProgress, (v) => {
    const size = 10 + v * 90; // 10% -> 100%
    return `inset(${50 - size / 2}% ${50 - size / 2}% ${50 - size / 2}% ${50 - size / 2}% round 14px)`;
  });

  if (!content.hero.image_url) return null;

  return (
    <section ref={ref} className="relative px-4 -mt-8 mb-0">
      <div className="max-w-5xl mx-auto">
        <motion.div
          style={{ clipPath }}
          className="relative rounded-[14px] overflow-hidden"
        >
          <TiltImage
            src={content.hero.image_url}
            alt={`${content.business_name} project`}
            width={1200}
            height={675}
            className="w-full aspect-[16/9] object-cover"
            intensity={8}
          />
          {/* Bottom overlay with project label */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center justify-between">
              <span className="text-white font-subheading font-semibold text-sm">
                {content.business_name}
              </span>
              <a
                href="#projecten"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-subheading font-medium hover:bg-white/30 transition-colors"
              >
                Bekijk <span className="text-sm">↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/vakman/VakmanHeroImage.tsx
git commit -m "feat: add VakmanHeroImage with clip-path reveal and 3D tilt"
```

---

## Task 8: VakmanTrustStrip — Floating Stats

**Files:**
- Create: `components/vakman/VakmanTrustStrip.tsx`

- [ ] **Step 1: Create VakmanTrustStrip.tsx**

This replaces VakmanStats. Overlaps the hero image by -16px. Shows years, projects, review score with count-up animation.

```tsx
'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import type { SiteContent } from '@/lib/types';

export default function VakmanTrustStrip({ content }: { content: SiteContent }) {
  const stats = content.stats;
  if (!stats) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="relative z-10 -mt-10 mb-16 px-4"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 p-6 md:p-8">
        <div className="grid grid-cols-3 divide-x divide-slate-100">
          {stats.years && (
            <div className="text-center px-4">
              <div className="flex items-baseline justify-center gap-1">
                <AnimatedCounter end={stats.years} duration={2000} className="font-heading text-2xl md:text-3xl text-slate-900" />
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.1, type: 'spring' }}
                  className="text-[#2563eb] font-subheading font-bold text-lg"
                >+</motion.span>
              </div>
              <p className="font-body text-xs md:text-sm text-slate-500 mt-1">Jaar ervaring</p>
            </div>
          )}
          {stats.projects && (
            <div className="text-center px-4">
              <div className="flex items-baseline justify-center gap-1">
                <AnimatedCounter end={stats.projects} duration={2000} className="font-heading text-2xl md:text-3xl text-slate-900" />
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.1, type: 'spring' }}
                  className="text-[#2563eb] font-subheading font-bold text-lg"
                >+</motion.span>
              </div>
              <p className="font-body text-xs md:text-sm text-slate-500 mt-1">Projecten</p>
            </div>
          )}
          {stats.reviews_count && (
            <div className="text-center px-4">
              <div className="flex items-baseline justify-center gap-1">
                <AnimatedCounter end={49} duration={2000} decimal className="font-heading text-2xl md:text-3xl text-slate-900" />
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.1, type: 'spring' }}
                  className="text-[#f59e0b] text-lg"
                >★</motion.span>
              </div>
              <p className="font-body text-xs md:text-sm text-slate-500 mt-1">{stats.reviews_count} reviews</p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Update AnimatedCounter to support decimal prop**

In `components/vakman/AnimatedCounter.tsx`, add a `decimal` prop. When true, display value as `X.Y` format (divide end by 10). For example, end=49 with decimal=true shows "4.9".

Add to the props interface:
```typescript
decimal?: boolean;
```

In the display logic, when `decimal` is true:
```typescript
const displayValue = decimal ? (currentValue / 10).toFixed(1) : Math.round(currentValue).toString();
```

- [ ] **Step 3: Commit**

```bash
git add components/vakman/VakmanTrustStrip.tsx components/vakman/AnimatedCounter.tsx
git commit -m "feat: add floating trust strip with spring bounce and count-up stats"
```

---

## Task 9: VakmanAbout — Gradient Card with Floating Icons

**Files:**
- Create: `components/vakman/VakmanAbout.tsx`

- [ ] **Step 1: Create VakmanAbout.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '@/lib/types';

function FloatingIcon({ children, delay, duration }: { children: React.ReactNode; delay: number; duration: number }) {
  return (
    <motion.div
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      className="absolute w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-[#2563eb]"
    >
      {children}
    </motion.div>
  );
}

export default function VakmanAbout({ content }: { content: SiteContent }) {
  if (!content.about) return null;

  // Split about text into sentences, bold first sentence
  const sentences = content.about.split('. ');

  return (
    <motion.section
      id="over"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4"
    >
      <div className="max-w-4xl mx-auto relative">
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50/50 p-8 md:p-12 relative overflow-hidden">
          {/* Floating icons */}
          <FloatingIcon delay={0} duration={4}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </FloatingIcon>
          <div className="absolute top-6 right-8">
            <FloatingIcon delay={1.5} duration={5}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </FloatingIcon>
          </div>
          <div className="absolute bottom-8 right-16">
            <FloatingIcon delay={0.8} duration={4.5}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </FloatingIcon>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-xl">
            <span className="font-subheading text-xs font-semibold text-[#2563eb] uppercase tracking-wider mb-4 block">
              Over ons
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-slate-900 mb-6">
              {content.business_name}
            </h2>
            <div className="font-body text-[15px] text-slate-600 leading-relaxed space-y-4">
              {sentences.map((sentence, i) => (
                <p key={i} className={i === 0 ? 'font-medium text-slate-700' : ''}>
                  {sentence}{i < sentences.length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/vakman/VakmanAbout.tsx
git commit -m "feat: add VakmanAbout section with gradient card and floating icons"
```

---

## Task 10: VakmanServices — Light Cards + Featured Dark Card

**Files:**
- Create: `components/vakman/VakmanServices.tsx` (overwrite existing)

- [ ] **Step 1: Rewrite VakmanServices.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { VakmanIcon } from './VakmanIcons';
import type { SiteContent } from '@/lib/types';
import type { IconName } from '@/lib/types';

function ServiceCard({ service, index, featured }: {
  service: { title: string; text: string; icon: IconName };
  index: number;
  featured: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        className="relative col-span-full rounded-2xl bg-[#0f172a] p-8 md:p-10 overflow-hidden group cursor-default"
      >
        {/* Mouse-following glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37,99,235,0.12), transparent 60%)',
          }}
        />
        {/* Gradient blob */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2563eb]/20 flex items-center justify-center text-[#60a5fa]">
              <VakmanIcon name={service.icon} className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-[#2563eb] text-white text-xs font-subheading font-semibold">
              Populair
            </span>
          </div>
          <h3 className="font-subheading font-bold text-xl text-white mb-3">{service.title}</h3>
          <p className="font-body text-sm text-slate-400 leading-relaxed max-w-md">{service.text}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl bg-[#fafafa] border border-slate-100 p-6 md:p-8 overflow-hidden group cursor-default hover:shadow-lg hover:border-slate-200 transition-all duration-300"
    >
      {/* Mouse-following glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37,99,235,0.06), transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mb-4 group-hover:bg-[#2563eb] group-hover:text-white transition-colors duration-300">
          <VakmanIcon name={service.icon} className="w-5 h-5" />
        </div>
        <h3 className="font-subheading font-bold text-lg text-slate-900 mb-2">{service.title}</h3>
        <p className="font-body text-sm text-slate-500 leading-relaxed">{service.text}</p>
      </div>
    </motion.div>
  );
}

export default function VakmanServices({ content }: { content: SiteContent }) {
  const services = content.services;
  if (!services?.length) return null;

  return (
    <section id="diensten" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-subheading text-xs font-semibold text-[#2563eb] uppercase tracking-wider mb-3 block">
            Diensten
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-slate-900">
            Wat wij voor u doen
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              service={service as { title: string; text: string; icon: IconName }}
              index={i}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/vakman/VakmanServices.tsx
git commit -m "feat: rewrite VakmanServices — light cards, featured dark card, mouse glow"
```

---

## Task 11: VakmanProjects — Parallax Masonry + Before/After

**Files:**
- Create: `components/vakman/VakmanProjects.tsx` (overwrite existing)

- [ ] **Step 1: Rewrite VakmanProjects.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltImage from '@/components/lead/TiltImage';
import BeforeAfter from './BeforeAfter';
import type { SiteContent } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';

function ParallaxColumn({ images, offset, side }: {
  images: { url: string; alt: string }[];
  offset: number;
  side: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className="space-y-4">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="rounded-2xl overflow-hidden"
        >
          <TiltImage
            src={img.url}
            alt={img.alt}
            width={600}
            height={side === 'left' ? 800 : 600}
            className={`w-full object-cover ${side === 'left' ? 'aspect-[3/4]' : 'aspect-square'}`}
            intensity={8}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function VakmanProjects({ content }: { content: SiteContent }) {
  const t = useTranslation(content.lang);
  const gallery = content.gallery || [];
  const beforeAfter = content.before_after || [];

  const leftCol = gallery.filter((_, i) => i % 2 === 0);
  const rightCol = gallery.filter((_, i) => i % 2 === 1);

  return (
    <section id="projecten" className="py-20 px-4 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-subheading text-xs font-semibold text-[#2563eb] uppercase tracking-wider mb-3 block">
            {t.vakman.projectsLabel}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-slate-900">
            {t.vakman.projectsHeading}
          </h2>
        </motion.div>

        {/* Before/After sliders */}
        {beforeAfter.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {beforeAfter.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-2xl overflow-hidden"
              >
                <BeforeAfter
                  beforeSrc={item.before_url}
                  afterSrc={item.after_url}
                  beforeLabel={t.vakman.beforeLabel}
                  afterLabel={t.vakman.afterLabel}
                />
                {item.label && (
                  <p className="mt-2 font-subheading text-sm font-medium text-slate-700">{item.label}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Masonry gallery with parallax */}
        {gallery.length >= 2 && (
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <ParallaxColumn images={leftCol} offset={40} side="left" />
            <ParallaxColumn images={rightCol} offset={-40} side="right" />
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/vakman/VakmanProjects.tsx
git commit -m "feat: rewrite VakmanProjects — parallax masonry columns, before/after slider"
```

---

## Task 12: VakmanReviews — Light Cards + Dual Marquee

**Files:**
- Create: `components/vakman/VakmanReviews.tsx` (overwrite existing)

- [ ] **Step 1: Rewrite VakmanReviews.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import type { SiteContent } from '@/lib/types';

function ReviewCard({ review }: { review: { name: string; text: string; stars: number; date?: string } }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[380px] p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < review.stars ? 'text-[#f59e0b]' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {/* Text */}
      <p className="font-body text-sm text-slate-600 leading-relaxed mb-4 line-clamp-4">{review.text}</p>
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] font-subheading font-bold text-sm">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-subheading font-semibold text-sm text-slate-800">{review.name}</p>
          {review.date && <p className="font-body text-xs text-slate-400">{review.date}</p>}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ reviews, reverse }: { reviews: { name: string; text: string; stars: number; date?: string }[]; reverse?: boolean }) {
  const doubled = [...reviews, ...reviews];

  return (
    <div className="relative overflow-hidden group">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#f8fafc] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#f8fafc] to-transparent pointer-events-none" />

      <div
        className={`flex gap-4 ${reverse ? 'animate-[marquee-reverse_40s_linear_infinite]' : 'animate-[marquee_40s_linear_infinite]'} group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function VakmanReviews({ content }: { content: SiteContent }) {
  const reviews = content.reviews;
  if (!reviews?.length) return null;

  const avgScore = (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1);
  const half = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, half);
  const row2 = reviews.slice(half);

  return (
    <section id="reviews" className="py-20 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="font-subheading text-xs font-semibold text-[#2563eb] uppercase tracking-wider mb-3 block">
              Reviews
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-slate-900">
              Wat klanten zeggen
            </h2>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-5xl text-slate-900">{avgScore}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-body text-sm text-slate-500">({reviews.length} reviews)</span>
          </div>
        </motion.div>
      </div>

      <div className="space-y-4">
        <MarqueeRow reviews={row1} />
        {row2.length > 0 && <MarqueeRow reviews={row2} reverse />}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add marquee keyframes to globals.css**

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
```

- [ ] **Step 3: Commit**

```bash
git add components/vakman/VakmanReviews.tsx app/globals.css
git commit -m "feat: rewrite VakmanReviews — light cards, dual marquee, score display"
```

---

## Task 13: VakmanFAQ — Dark Active Accordion

**Files:**
- Create: `components/vakman/VakmanFAQ.tsx`

- [ ] **Step 1: Create VakmanFAQ.tsx**

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '@/lib/types';

function FAQItem({ item, isOpen, onToggle }: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-colors duration-300 ${
        isOpen ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <span className={`font-subheading font-semibold text-[15px] pr-4 transition-colors duration-300 ${
          isOpen ? 'text-white' : 'text-slate-800'
        }`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            isOpen ? 'bg-[#2563eb] text-white' : 'bg-slate-200 text-slate-500'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-5 md:px-6 pb-5 md:pb-6 font-body text-sm text-slate-400 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VakmanFAQ({ content }: { content: SiteContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faq = content.faq;
  if (!faq?.length) return null;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="font-subheading text-xs font-semibold text-[#2563eb] uppercase tracking-wider mb-3 block">
            FAQ
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-slate-900">
            Veelgestelde vragen
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/vakman/VakmanFAQ.tsx
git commit -m "feat: add VakmanFAQ — dark active state accordion with icon rotation"
```

---

## Task 14: VakmanContact — Dark Section with Grid

**Files:**
- Create: `components/vakman/VakmanContact.tsx` (overwrite existing)

- [ ] **Step 1: Rewrite VakmanContact.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '@/lib/types';

function ContactCard({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`rounded-2xl bg-[#1e293b] border border-slate-700/50 p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function VakmanContact({ content }: { content: SiteContent }) {
  const { phone, email, city, address, maps_url } = content.contact;
  const waPhone = phone?.replace(/[\s+]/g, '') || '';
  const workingHours = content.working_hours;

  return (
    <section id="contact" className="relative py-24 px-4 bg-[#0f172a] overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-subheading text-xs font-semibold text-[#60a5fa] uppercase tracking-wider mb-3 block">
            Contact
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-white">
            Neem <span className="text-[#2563eb]">contact</span> op
          </h2>
        </motion.div>

        {/* Primary CTA */}
        <motion.a
          href={maps_url || `https://wa.me/${waPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative block rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#3b82f6] p-6 md:p-8 mb-6 overflow-hidden group"
        >
          <div className="absolute inset-0 animate-[cta-glow_3s_ease-in-out_infinite] rounded-2xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="font-subheading font-bold text-white text-lg mb-1">Vraag een gratis offerte aan</p>
              <p className="font-body text-blue-100 text-sm">Vrijblijvend en binnen 24 uur reactie</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
          {/* Shimmer */}
          <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.a>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phone && (
            <ContactCard delay={0.1}>
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <p className="font-body text-xs text-slate-400 mb-1">Telefoon</p>
              <a href={`tel:${phone}`} className="font-subheading font-semibold text-white text-sm hover:text-[#60a5fa] transition-colors">
                {phone}
              </a>
            </ContactCard>
          )}

          <ContactCard delay={0.2}>
            <div className="relative w-10 h-10 rounded-xl bg-emerald-900/30 flex items-center justify-center text-emerald-400 mb-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-xl animate-ping bg-emerald-400/20" style={{ animationDuration: '2s' }} />
            </div>
            <p className="font-body text-xs text-slate-400 mb-1">WhatsApp</p>
            <a href={`https://wa.me/${waPhone}`} target="_blank" rel="noopener noreferrer" className="font-subheading font-semibold text-white text-sm hover:text-emerald-400 transition-colors">
              Stuur bericht
            </a>
          </ContactCard>

          {email && (
            <ContactCard delay={0.3}>
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="font-body text-xs text-slate-400 mb-1">E-mail</p>
              <a href={`mailto:${email}`} className="font-subheading font-semibold text-white text-sm hover:text-[#60a5fa] transition-colors">
                {email}
              </a>
            </ContactCard>
          )}

          {address && (
            <ContactCard delay={0.4}>
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <p className="font-body text-xs text-slate-400 mb-1">Locatie</p>
              <a href={maps_url || '#'} target="_blank" rel="noopener noreferrer" className="font-subheading font-semibold text-white text-sm hover:text-[#60a5fa] transition-colors">
                {address}, {city}
              </a>
            </ContactCard>
          )}
        </div>

        {/* Working hours */}
        {workingHours && Object.keys(workingHours).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 rounded-2xl bg-[#1e293b] border border-slate-700/50 p-6"
          >
            <h3 className="font-subheading font-semibold text-white text-sm mb-4">Openingstijden</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(workingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="font-body text-sm text-slate-400">{day}</span>
                  <span className={`font-body text-sm ${hours.toLowerCase().includes('gesloten') ? 'text-red-400' : 'text-white'}`}>{hours}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add CTA glow keyframe to globals.css**

```css
@keyframes cta-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
  50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.5); }
}
```

- [ ] **Step 3: Commit**

```bash
git add components/vakman/VakmanContact.tsx app/globals.css
git commit -m "feat: rewrite VakmanContact — dark section, grid cards, WhatsApp pulse, CTA glow"
```

---

## Task 15: Rewrite LeadFooter Vakman Branch

**Files:**
- Modify: `components/lead/LeadFooter.tsx`

- [ ] **Step 1: Update the vakman branch in LeadFooter**

For vakman palette, the footer should be dark (#0f172a) matching the contact section:

```tsx
// Inside the vakman palette conditional:
<footer className="bg-[#0f172a] border-t border-slate-800 py-8 px-4">
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <span className="font-heading text-lg text-white">{content.business_name}</span>
    <p className="font-body text-sm text-slate-500">
      © {new Date().getFullYear()} {content.business_name}. Alle rechten voorbehouden.
    </p>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add components/lead/LeadFooter.tsx
git commit -m "feat: rewrite vakman footer — dark theme, serif business name"
```

---

## Task 16: Wire Everything in page.tsx

**Files:**
- Modify: `app/[slug]/page.tsx`

- [ ] **Step 1: Update imports and component stack**

Add new imports to `app/[slug]/page.tsx`:

```typescript
import VakmanHeroImage from '@/components/vakman/VakmanHeroImage';
import VakmanTrustStrip from '@/components/vakman/VakmanTrustStrip';
import VakmanAbout from '@/components/vakman/VakmanAbout';
import VakmanFAQ from '@/components/vakman/VakmanFAQ';
import VakmanMobileCTA from '@/components/vakman/VakmanMobileCTA';
import ScrollProgress from '@/components/vakman/ScrollProgress';
```

- [ ] **Step 2: Update the vakman rendering branch**

Replace the vakman component stack with the new order:

```tsx
// Vakman branch
<div className={`palette-${content.palette}`}>
  <LeadNavbar content={content} />
  <ScrollProgress />
  <VakmanMobileCTA content={content} />
  <main>
    <VakmanHero content={content} />
    <VakmanHeroImage content={content} />
    <VakmanTrustStrip content={content} />
    <VakmanAbout content={content} />
    <VakmanServices content={content} />
    <VakmanProjects content={content} />
    <VakmanReviews content={content} />
    <VakmanFAQ content={content} />
    <VakmanContact content={content} />
  </main>
  <LeadFooter content={content} />
</div>
```

Remove: `<SmoothScroll>` wrapper, old `<VakmanStats>`, old `<LeadFAQ>`, old `<MobileCTA>`, `<LeadCursor>` (for vakman only — or keep if desired).

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Run dev server and test**

```bash
npm run dev
```

Navigate to the vakman test site URL (e.g., `/degraaf-timmerman-eindhoven`) and verify:
- All 12 sections render
- No empty/dark blocks
- Animations trigger on scroll
- Mobile CTA appears on mobile viewport
- Scroll progress bar works

- [ ] **Step 5: Commit**

```bash
git add app/[slug]/page.tsx
git commit -m "feat: wire vakman v5 component stack — all 12 sections connected"
```

---

## Task 17: Update i18n Translations

**Files:**
- Modify: `lib/i18n.ts`

- [ ] **Step 1: Add new translation keys**

Add to the vakman section of both `en` and `nl` translations:

```typescript
// English additions:
vakman: {
  // ... existing keys ...
  availableBadge: 'Available for new projects',
  aboutLabel: 'About us',
  servicesLabel: 'Services',
  servicesHeading: 'What we do for you',
  reviewsHeading: 'What clients say',
  faqLabel: 'FAQ',
  faqHeading: 'Frequently asked questions',
  contactLabel: 'Contact',
  contactHeading: 'Get in touch',
  ctaOfferte: 'Request a quote',
  ctaOfferteDesc: 'Free and response within 24 hours',
  callButton: 'Call',
  whatsappButton: 'WhatsApp',
  openingHours: 'Opening hours',
}

// Dutch additions:
vakman: {
  // ... existing keys ...
  availableBadge: 'Beschikbaar voor nieuwe projecten',
  aboutLabel: 'Over ons',
  servicesLabel: 'Diensten',
  servicesHeading: 'Wat wij voor u doen',
  reviewsHeading: 'Wat klanten zeggen',
  faqLabel: 'FAQ',
  faqHeading: 'Veelgestelde vragen',
  contactLabel: 'Contact',
  contactHeading: 'Neem contact op',
  ctaOfferte: 'Vraag een gratis offerte aan',
  ctaOfferteDesc: 'Vrijblijvend en binnen 24 uur reactie',
  callButton: 'Bellen',
  whatsappButton: 'WhatsApp',
  openingHours: 'Openingstijden',
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/i18n.ts
git commit -m "feat: add vakman v5 translation keys for all new sections"
```

---

## Task 18: Scrape Real Test Data

**Files:**
- Modify: `sites/degraaf-timmerman-eindhoven/content.json`

- [ ] **Step 1: Scrape real timmerman business data**

Use Outscraper API (or Google Maps scraper) to get real data for a timmerman/carpenter in Eindhoven:
- Business name, address, phone, email
- Real Google reviews (name, text, stars, date)
- Real photos (Google Maps photo URLs)
- Working hours
- Services offered

- [ ] **Step 2: Update content.json with real data**

Replace fake data in `sites/degraaf-timmerman-eindhoven/content.json` with the scraped data. Ensure all fields match the `SiteContent` interface in `lib/types.ts`.

Key fields to update:
- `business_name` — real business name
- `hero.image_url` — real photo URL
- `reviews` — real Google reviews
- `gallery` — real project photos
- `contact` — real phone, email, address
- `working_hours` — real hours from Google
- `stats` — real numbers (years active, review count)

- [ ] **Step 3: Verify the site renders with real data**

```bash
npm run dev
```

Check that all sections display real content correctly.

- [ ] **Step 4: Commit**

```bash
git add sites/degraaf-timmerman-eindhoven/content.json
git commit -m "feat: replace fake test data with real scraped timmerman data"
```

---

## Task 19: Final Polish & Verification

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Fix any TypeScript errors or build warnings.

- [ ] **Step 2: Test all 36 animations on desktop**

Open the site in Chrome desktop and verify each animation category:
- Page-level: scroll progress bar, section reveals
- Hero: availability pulse, word stagger, accent underline, CTA shimmer, magnetic hover, trust badge stagger
- Hero Image: clip-path reveal, 3D tilt, project label slide
- Trust Strip: spring bounce, count-up, accent pop-in
- About: floating icons bob, text highlight
- Services: mouse-following glow, card hover lift, featured blob, icon backgrounds
- Projects: before/after slider, 3D tilt, parallax columns, image reveal stagger
- Reviews: dual marquee, pause on hover
- FAQ: accordion height, icon rotation
- Contact: CTA glow, CTA shimmer, WhatsApp pulse, card stagger
- Mobile: sticky CTA bar (test in responsive mode)

- [ ] **Step 3: Test mobile (Chrome DevTools responsive)**

Verify:
- All tilt/cursor effects disabled on touch
- Sticky CTA bar appears after scroll
- 44px minimum tap targets on CTAs
- No horizontal overflow

- [ ] **Step 4: Run Lighthouse audit**

Target: Performance > 90

If below target, check:
- Image optimization (next/image with proper sizes)
- Font loading (display: swap)
- Unused JS (removed Lenis/GSAP should help)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: vakman theme v5 complete — light theme, 36 animations, premium typography"
```

---

## Summary

| Task | Component | Animations |
|------|-----------|------------|
| 1 | Remove Lenis/GSAP | Unblocks all whileInView |
| 2 | CSS palette + fonts | Typography system |
| 3 | ScrollProgress | #1 scroll bar |
| 4 | VakmanMobileCTA | #35 sticky bar |
| 5 | LeadNavbar rewrite | Shimmer CTA |
| 6 | VakmanHero | #5-10 hero animations |
| 7 | VakmanHeroImage | #11-13 clip/tilt/label |
| 8 | VakmanTrustStrip | #14-16 spring/count/pop |
| 9 | VakmanAbout | #17-18 float/highlight |
| 10 | VakmanServices | #19-22 glow/hover/blob/draw |
| 11 | VakmanProjects | #23-26 slider/tilt/parallax/reveal |
| 12 | VakmanReviews | #27-28 marquee/score |
| 13 | VakmanFAQ | #29-30 accordion/rotate |
| 14 | VakmanContact | #31-34 glow/shimmer/pulse/stagger |
| 15 | LeadFooter | Dark theme |
| 16 | Wire page.tsx | All sections connected |
| 17 | i18n translations | NL + EN keys |
| 18 | Real test data | Outscraper scrape |
| 19 | Final verification | All 36 animations + Lighthouse |
