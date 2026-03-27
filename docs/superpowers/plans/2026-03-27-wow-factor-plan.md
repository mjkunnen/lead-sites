# Wow Factor Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 3D/immersive and scroll-driven reactive elements to the NetjesOnline agency homepage for maximum wow-factor.

**Architecture:** Layer new animation components on top of existing section components. Global effects (smooth scroll, cursor, gradient mesh) wrap the page. Section-level effects (reveals, parallax, word animations) integrate into existing components. No structural rewrites — additive changes only.

**Tech Stack:** React 19, Next.js 16, Framer Motion 12, GSAP 3.14 (already installed), Lenis (new), @tsparticles (new), Tailwind CSS 4.

---

## File Map

### New files (7)
| File | Purpose |
|------|---------|
| `components/agency/SmoothScroll.tsx` | Lenis wrapper + GSAP ScrollTrigger registration |
| `components/agency/ParticleField.tsx` | Connected-dots particle background for hero |
| `components/agency/WordReveal.tsx` | Scroll-driven word-by-word text reveal |
| `components/agency/StaggerReveal.tsx` | Staggered section entrance wrapper |
| `components/agency/GradientMesh.tsx` | Animated gradient mesh background |
| `components/agency/ScrollIndicator.tsx` | Active nav pill driven by scroll spy |
| `app/template.tsx` | Page transition animation wrapper |

### Modified files (8)
| File | Changes |
|------|---------|
| `app/page.tsx` | Wrap main in SmoothScroll |
| `app/globals.css` | Add Lenis styles, cursor-active hide, gradient mesh keyframes |
| `components/agency/Hero.tsx` | Add ParticleField behind FloatingMockup, parallax on blobs |
| `components/agency/Navbar.tsx` | Magnetic hover + ScrollIndicator active pill |
| `components/agency/ui/TiltCard.tsx` | Add shine/glare overlay |
| `components/agency/CustomCursor.tsx` | Add gradient trail dots |
| `components/agency/Portfolio.tsx` | Parallax on background blobs |
| `components/agency/ProblemSection.tsx` | WordReveal + StaggerReveal |
| `components/agency/USPSection.tsx` | WordReveal + StaggerReveal + GradientMesh |
| `components/agency/ProcessTimeline.tsx` | StaggerReveal |
| `components/agency/Pricing.tsx` | StaggerReveal + GradientMesh |
| `components/agency/FAQ.tsx` | GradientMesh |

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install lenis and tsparticles**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm install lenis @tsparticles/react @tsparticles/slim
```

- [ ] **Step 2: Verify install**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
node -e "require('lenis'); require('@tsparticles/react'); console.log('OK')"
```
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add lenis and tsparticles dependencies"
```

---

### Task 2: Smooth Scroll (Lenis)

**Files:**
- Create: `components/agency/SmoothScroll.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add Lenis CSS to globals.css**

Append to end of `app/globals.css` (before the reduced-motion block):

```css
/* === Lenis Smooth Scroll === */
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

- [ ] **Step 2: Create SmoothScroll.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable on mobile/touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 0,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Wrap main in SmoothScroll in app/page.tsx**

Add import at top:
```tsx
import SmoothScroll from "@/components/agency/SmoothScroll";
```

Wrap the `<main>` element:
```tsx
export default function Home() {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <main>
          <Hero />
          <AboutSection />
          {/* ... rest of sections ... */}
        </main>
        <AgencyFooter />
      </SmoothScroll>
    </>
  );
}
```

- [ ] **Step 4: Test locally**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add components/agency/SmoothScroll.tsx app/page.tsx app/globals.css
git commit -m "feat: add Lenis smooth scroll with GSAP ScrollTrigger"
```

---

### Task 3: Animated Stats Counter fix

The StatsBar already has an AnimatedCounter but it shows "0" because useInView triggers before the element is visible. Fix: add a proper threshold.

**Files:**
- Modify: `components/agency/StatsBar.tsx`

- [ ] **Step 1: Fix AnimatedCounter in StatsBar.tsx**

Replace the entire `AnimatedCounter` function (lines 6-35) with:

```tsx
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Elastic ease out for bounce
      const eased = progress === 1
        ? 1
        : 1 - Math.pow(2, -10 * progress) * Math.cos((progress * 10 - 0.75) * ((2 * Math.PI) / 3));
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
```

Key changes: `amount: 0.5` ensures 50% visibility before triggering. Elastic ease gives a bounce effect at the end.

- [ ] **Step 2: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/agency/StatsBar.tsx
git commit -m "fix: stats counter animation with elastic bounce and proper trigger"
```

---

### Task 4: WordReveal component

**Files:**
- Create: `components/agency/WordReveal.tsx`

- [ ] **Step 1: Create WordReveal.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function WordReveal({ text, className = "", as: Tag = "h2" }: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.4"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
        })}
      </Tag>
    </div>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}
```

- [ ] **Step 2: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/agency/WordReveal.tsx
git commit -m "feat: add WordReveal scroll-driven text animation component"
```

---

### Task 5: StaggerReveal component

**Files:**
- Create: `components/agency/StaggerReveal.tsx`

- [ ] **Step 1: Create StaggerReveal.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode, Children } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  clipPath?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const clipItemVariants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  visible: { opacity: 1, clipPath: "inset(0% 0 0 0)" },
};

export default function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  clipPath = false,
}: StaggerRevealProps) {
  const variants = clipPath ? clipItemVariants : itemVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={variants}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 2: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/agency/StaggerReveal.tsx
git commit -m "feat: add StaggerReveal component with clip-path option"
```

---

### Task 6: Integrate WordReveal + StaggerReveal into sections

**Files:**
- Modify: `components/agency/ProblemSection.tsx`
- Modify: `components/agency/USPSection.tsx`
- Modify: `components/agency/ProcessTimeline.tsx`
- Modify: `components/agency/Pricing.tsx`

- [ ] **Step 1: Update ProblemSection.tsx**

Add imports at top:
```tsx
import WordReveal from "./WordReveal";
import StaggerReveal from "./StaggerReveal";
```

Replace the heading `<h2>` (line 41-43):
```tsx
{/* Old: */}
<h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl">
  Herkenbaar?
</h2>

{/* New: */}
<WordReveal
  text="Herkenbaar?"
  className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl"
/>
```

Replace the cards grid `<div className="mt-16 grid ...">` (line 49) — wrap the `.map()` output in StaggerReveal:
```tsx
<StaggerReveal className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {problemCards.map((card, i) => (
    <div
      key={i}
      className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-red-100/50"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-red-100 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-200">
        {icons[card.icon]}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-gray-900">{card.title}</h3>
      <p className="mt-2 leading-relaxed text-gray-600">{card.text}</p>
      <div className="mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r from-red-300 to-transparent transition-all duration-300 group-hover:w-full group-hover:from-red-400" />
    </div>
  ))}
</StaggerReveal>
```

Remove the per-item `motion.div` wrappers and `whileHover` — StaggerReveal handles entrance animation. Keep the hover CSS classes.

- [ ] **Step 2: Update USPSection.tsx**

Add imports:
```tsx
import WordReveal from "./WordReveal";
import StaggerReveal from "./StaggerReveal";
```

Replace heading with WordReveal:
```tsx
<WordReveal
  text="Wat ons anders maakt"
  className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl"
/>
```

Replace cards grid with StaggerReveal:
```tsx
<StaggerReveal className="mt-16 grid gap-8 lg:grid-cols-3">
  {uspItems.map((item, i) => (
    <TiltCard key={i} className="group h-full rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradientBgs[i]} text-white shadow-lg`}>
        {icons[item.icon]}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900">{item.title}</h3>
      <p className="mt-3 leading-relaxed text-gray-600">{item.text}</p>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Meer info
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </TiltCard>
  ))}
</StaggerReveal>
```

- [ ] **Step 3: Update ProcessTimeline.tsx**

Add imports:
```tsx
import WordReveal from "./WordReveal";
import StaggerReveal from "./StaggerReveal";
```

Replace heading and cards similarly. Keep the connector line animation above the StaggerReveal.

- [ ] **Step 4: Update Pricing.tsx**

Add imports and replace heading with WordReveal, cards grid with StaggerReveal. Same pattern.

- [ ] **Step 5: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add components/agency/ProblemSection.tsx components/agency/USPSection.tsx components/agency/ProcessTimeline.tsx components/agency/Pricing.tsx
git commit -m "feat: integrate WordReveal and StaggerReveal into all sections"
```

---

### Task 7: Particle Field (hero background)

**Files:**
- Create: `components/agency/ParticleField.tsx`
- Modify: `components/agency/Hero.tsx`

- [ ] **Step 1: Create ParticleField.tsx**

```tsx
"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticleField() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="hero-particles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true } },
          color: { value: ["#2563EB", "#818CF8"] },
          opacity: { value: { min: 0.1, max: 0.3 } },
          size: { value: { min: 1, max: 3 } },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: "bounce",
          },
          links: {
            enable: true,
            distance: 120,
            color: "#2563EB",
            opacity: 0.15,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            repulse: { distance: 100, speed: 0.5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
```

- [ ] **Step 2: Add ParticleField to Hero.tsx**

Add import:
```tsx
import ParticleField from "./ParticleField";
```

Add inside the `<section>`, after the gradient blobs (line 21), before `<div className="relative mx-auto">`:
```tsx
<ParticleField />
```

Also add parallax to the gradient blobs. Add imports:
```tsx
import { motion, useScroll, useTransform } from "framer-motion";
```

Wrap each blob div in a motion.div with parallax:
```tsx
{/* Replace static blobs with parallax blobs */}
<motion.div
  style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -100]) }}
  className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl"
/>
<motion.div
  style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -60]) }}
  className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-indigo-200/20 blur-3xl"
/>
```

Note: Hero.tsx already uses `useScroll` won't be available at top level easily since hero doesn't have a scroll container. Better approach — use a ref:

```tsx
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="relative ...">
```

Then use `style={{ y: blobY1 }}` and `style={{ y: blobY2 }}` on the blob divs (wrap them in `motion.div`).

- [ ] **Step 3: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/agency/ParticleField.tsx components/agency/Hero.tsx
git commit -m "feat: add particle field to hero with parallax blobs"
```

---

### Task 8: TiltCard shine overlay

**Files:**
- Modify: `components/agency/ui/TiltCard.tsx`

- [ ] **Step 1: Add shine overlay to TiltCard**

Replace entire `TiltCard.tsx` with:

```tsx
"use client";

import { useRef, useState, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.3s ease-out",
  });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setStyle({
      transform: `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
    setShinePos({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 });
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-out",
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={style}
      className={`relative ${className}`}
    >
      {children}
      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/agency/ui/TiltCard.tsx
git commit -m "feat: add shine/glare overlay to TiltCard on hover"
```

---

### Task 9: Enhanced Custom Cursor with trail

**Files:**
- Modify: `components/agency/CustomCursor.tsx`

- [ ] **Step 1: Replace CustomCursor.tsx with trail version**

```tsx
"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 6;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const trailPositions = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("cursor-active");
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-hover]"
      );
      cursor.style.width = isHoverable ? "60px" : "20px";
      cursor.style.height = isHoverable ? "60px" : "20px";
    };

    let raf: number;
    const animate = () => {
      // Main cursor
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;
      cursor.style.transform = `translate(${posRef.current.x - cursor.offsetWidth / 2}px, ${posRef.current.y - cursor.offsetHeight / 2}px)`;

      // Trail dots follow with increasing delay
      let prevX = posRef.current.x;
      let prevY = posRef.current.y;
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const trail = trailPositions.current[i];
        const speed = 0.1 - i * 0.012;
        trail.x += (prevX - trail.x) * speed;
        trail.y += (prevY - trail.y) * speed;
        const el = trailRefs.current[i];
        if (el) {
          const size = 12 - i * 1.5;
          el.style.transform = `translate(${trail.x - size / 2}px, ${trail.y - size / 2}px)`;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.opacity = `${0.3 - i * 0.04}`;
        }
        prevX = trail.x;
        prevY = trail.y;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full bg-blue-400 mix-blend-difference md:block"
          aria-hidden="true"
        />
      ))}
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-5 w-5 rounded-full bg-white mix-blend-difference transition-[width,height] duration-300 ease-out md:block"
        aria-hidden="true"
      />
    </>
  );
}
```

- [ ] **Step 2: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/agency/CustomCursor.tsx
git commit -m "feat: add gradient trail to custom cursor"
```

---

### Task 10: Gradient Mesh background

**Files:**
- Create: `components/agency/GradientMesh.tsx`
- Modify: `app/globals.css`
- Modify: `components/agency/USPSection.tsx`
- Modify: `components/agency/Pricing.tsx`
- Modify: `components/agency/FAQ.tsx`

- [ ] **Step 1: Add keyframes to globals.css**

Append before reduced-motion block:

```css
/* === Gradient Mesh === */
@keyframes mesh-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.05); }
  50% { transform: translate(-20px, 30px) scale(0.95); }
  75% { transform: translate(20px, 20px) scale(1.02); }
}

.gradient-mesh-blob {
  animation: mesh-drift 25s ease-in-out infinite;
  filter: blur(80px);
}

.gradient-mesh-blob:nth-child(2) {
  animation-delay: -8s;
  animation-duration: 30s;
}

.gradient-mesh-blob:nth-child(3) {
  animation-delay: -16s;
  animation-duration: 22s;
}
```

- [ ] **Step 2: Create GradientMesh.tsx**

```tsx
export default function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="gradient-mesh-blob absolute -left-20 top-1/4 h-96 w-96 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, #DBEAFE, transparent 70%)" }}
      />
      <div
        className="gradient-mesh-blob absolute -right-20 top-1/2 h-80 w-80 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #E0E7FF, transparent 70%)" }}
      />
      <div
        className="gradient-mesh-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-35"
        style={{ background: "radial-gradient(circle, #CFFAFE, transparent 70%)" }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Add GradientMesh to USPSection, Pricing, FAQ**

In each file, add:
```tsx
import GradientMesh from "./GradientMesh";
```

Then add `<GradientMesh />` as the first child inside the `<section>` tag, replacing the existing static blob divs.

For USPSection.tsx, replace lines 35-36 (the two static blob divs) with:
```tsx
<GradientMesh />
```

For Pricing.tsx, replace lines 11-12 (the two static blob divs) with:
```tsx
<GradientMesh />
```

For FAQ.tsx, add inside the section as first child:
```tsx
<section className="relative py-20 lg:py-28">
  <GradientMesh />
  {/* ...rest... */}
```

And add `relative` and `overflow-hidden` to the FAQ section className if not already there.

- [ ] **Step 4: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/agency/GradientMesh.tsx app/globals.css components/agency/USPSection.tsx components/agency/Pricing.tsx components/agency/FAQ.tsx
git commit -m "feat: add animated gradient mesh to USP, Pricing, FAQ sections"
```

---

### Task 11: Magnetic Navigation + Active Scroll Indicator

**Files:**
- Create: `components/agency/ScrollIndicator.tsx`
- Modify: `components/agency/Navbar.tsx`

- [ ] **Step 1: Create ScrollIndicator.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "over", label: "Over mij" },
  { id: "diensten", label: "Diensten" },
  { id: "werkwijze", label: "Werkwijze" },
  { id: "portfolio", label: "Portfolio" },
  { id: "prijzen", label: "Prijzen" },
  { id: "contact", label: "Contact" },
];

export default function ScrollIndicator() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to top
          const closest = visible.reduce((a, b) =>
            Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
          );
          setActiveId(closest.target.id);
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden items-center gap-8 md:flex">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="relative text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          {section.label}
          {activeId === section.id && (
            <motion.div
              layoutId="nav-pill"
              className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-blue-600"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Update Navbar.tsx to use ScrollIndicator**

Replace the desktop nav links section (lines 30-45) with:

```tsx
import ScrollIndicator from "./ScrollIndicator";
```

Replace the desktop nav div:
```tsx
<div className="hidden items-center gap-3 md:flex">
  <ScrollIndicator />
  <a
    href="#contact"
    className="ml-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
  >
    Gratis adviesgesprek
  </a>
</div>
```

- [ ] **Step 3: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/agency/ScrollIndicator.tsx components/agency/Navbar.tsx
git commit -m "feat: add scroll-spy active indicator to navigation"
```

---

### Task 12: Portfolio parallax

**Files:**
- Modify: `components/agency/Portfolio.tsx`

- [ ] **Step 1: Add parallax to Portfolio background blobs**

Add imports:
```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
```

Add ref and parallax hooks at top of component:
```tsx
export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
```

Add `ref={sectionRef}` to the section element.

Replace the static blob divs with motion.div:
```tsx
<motion.div style={{ y: blobY1 }} className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />
<motion.div style={{ y: blobY2 }} className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-100/20 blur-3xl" />
```

- [ ] **Step 2: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/agency/Portfolio.tsx
git commit -m "feat: add parallax scroll to portfolio background blobs"
```

---

### Task 13: Page Transitions

**Files:**
- Create: `app/template.tsx`

- [ ] **Step 1: Create template.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Build test**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/template.tsx
git commit -m "feat: add page enter transition via template.tsx"
```

---

### Task 14: Final build, deploy, verify

**Files:** None new — verification only.

- [ ] **Step 1: Full build**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
npm run build
```
Expected: Build succeeds with zero errors.

- [ ] **Step 2: Push to deploy**

```bash
cd "C:/Users/maxku/OneDrive/Bureaublad/Website creation automation/lead-sites"
git push origin main
```

- [ ] **Step 3: Verify on Vercel**

Wait 1-2 minutes for deploy. Check https://lead-sites.vercel.app and verify:
- Smooth scroll works on desktop
- Particles visible behind floating laptop in hero
- Stats counter animates with bounce when scrolled into view
- Section headings reveal word-by-word
- Cards stagger in when sections enter viewport
- TiltCards have shine overlay on hover
- Cursor has trailing dots
- Gradient mesh animates subtly in USP/Pricing/FAQ backgrounds
- Nav underline follows active section
- Portfolio blobs have parallax movement
