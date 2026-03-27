"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/agency-data";
import ShimmerButton from "./ui/ShimmerButton";
import HeroOrb from "./HeroOrb";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(6,182,212,0.08),_transparent_60%)]" />

      {/* Particle dots (CSS-only, lightweight) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `glow-pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-5">
        {/* Left content (3 cols) */}
        <div className="lg:col-span-3">
          <motion.p
            {...fadeUp(0)}
            className="mb-4 font-[family-name:var(--font-mono)] text-sm font-medium uppercase tracking-[0.2em] text-[#6366F1]"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            className="font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-[#F1F5F9] sm:text-6xl lg:text-7xl"
          >
            {heroContent.headline}
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 max-w-lg text-lg leading-relaxed text-[#94A3B8]"
          >
            {heroContent.description}
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="mt-10">
            <ShimmerButton href="#diensten">
              {heroContent.cta}
            </ShimmerButton>
          </motion.div>

          <motion.div
            {...fadeUp(0.6)}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            {heroContent.badges.map((badge, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-sm text-[#94A3B8]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1]" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right animated orb (2 cols, desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] as const }}
          className="hidden h-[500px] lg:col-span-2 lg:block"
        >
          <HeroOrb />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[rgba(255,255,255,0.2)] p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-[#6366F1]"
          />
        </div>
      </motion.div>
    </section>
  );
}
