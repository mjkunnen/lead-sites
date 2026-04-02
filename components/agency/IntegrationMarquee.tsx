"use client";

import { motion } from "framer-motion";
import { integrations } from "@/lib/agency-data";

export default function IntegrationMarquee() {
  const doubled = [...integrations, ...integrations];

  return (
    <section className="relative overflow-hidden bg-white/60 backdrop-blur-sm py-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h3 className="text-2xl font-bold text-[#1a1a2e] sm:text-3xl">
          De integraties zijn{" "}
          <span className="text-[#52527A]">eindeloos</span>
        </h3>
        <p className="mt-2 font-[family-name:var(--font-urbanist)] text-[#52527A]">
          Wij verbinden met <span className="font-semibold">600+</span> tools en platformen
        </p>
      </motion.div>

      <div className="flex animate-marquee gap-4">
        {doubled.map((name, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 rounded-full border border-[#52527A]/8 bg-[#FAFAFA] px-5 py-2.5 text-sm font-medium text-[#52527A] transition-all hover:border-[#52527A]/20 hover:bg-white hover:shadow-sm"
          >
            <div className="h-2 w-2 rounded-full bg-[#B9EACB]" />
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
