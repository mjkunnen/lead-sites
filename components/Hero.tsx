"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/lib/types";

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src={content.hero.image_url}
        alt={content.business_name}
        fill
        className="object-cover"
        priority
        unoptimized
      />
      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/70" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium tracking-wide backdrop-blur-sm"
        >
          {content.niche.charAt(0).toUpperCase() + content.niche.slice(1)} in {content.contact.city}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {content.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl leading-relaxed"
        >
          {content.hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={`tel:${content.contact.phone}`}
            className="group relative rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {content.hero.cta_primary}
            </span>
          </a>
          <a
            href="#diensten"
            className="rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
          >
            {content.hero.cta_secondary}
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60"
        >
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Gratis offerte
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Snel ter plaatse
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            {content.reviews.length}+ beoordelingen
          </span>
        </motion.div>
      </div>
    </section>
  );
}
