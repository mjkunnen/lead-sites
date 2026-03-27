"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/lib/types";

export default function LeadHero({ content }: { content: SiteContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src={content.hero.image_url}
          alt={content.business_name}
          fill
          className="object-cover scale-110"
          priority
          unoptimized
        />
      </motion.div>

      {/* Warm overlay matching salon terracotta vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-900/40 to-stone-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-950/30 via-transparent to-transparent" />

      {/* Floating warm orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-amber-600/8 blur-[150px] gradient-mesh-blob" />
        <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] rounded-full bg-rose-500/8 blur-[120px] gradient-mesh-blob" />
      </div>

      <motion.div style={{ y: textY, opacity }} className="relative z-10 mx-auto max-w-6xl px-6 py-32 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-3 text-sm font-medium tracking-widest text-amber-200/70 uppercase"
          >
            <span className="h-px w-8 bg-amber-400/50" />
            Oribe Ambassadeur &middot; {content.contact.city}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.05] text-white sm:text-7xl lg:text-8xl"
          >
            {content.hero.headline.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-xl text-lg text-white/60 leading-relaxed sm:text-xl"
          >
            {content.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href={content.contact.booking_url || `tel:${content.contact.phone}`}
              target={content.contact.booking_url ? "_blank" : undefined}
              rel={content.contact.booking_url ? "noopener noreferrer" : undefined}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-amber-100 px-8 py-4 text-lg font-semibold text-stone-900 transition-all hover:bg-amber-50 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">{content.hero.cta_primary}</span>
              <svg className="relative h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#over"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-amber-200/40 hover:text-amber-100 hover:bg-white/5"
            >
              {content.hero.cta_secondary}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-amber-200/30"
        >
          <div className="h-10 w-[1px] bg-gradient-to-b from-transparent to-amber-200/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
