"use client";

import { motion } from "framer-motion";
import { problemCards } from "@/lib/agency-data";
import GlassCard from "./ui/GlassCard";
import LampEffect from "./ui/LampEffect";

const icons = {
  globe: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      <line x1="4" y1="4" x2="20" y2="20" strokeWidth={2} className="text-red-400" stroke="currentColor" />
    </svg>
  ),
  broken: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      <path strokeLinecap="round" d="M8 8l3 4-2 1 3 4" strokeWidth={2} />
    </svg>
  ),
  clock: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function ProblemSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <LampEffect>
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
            Herkenbaar?
          </h2>
        </LampEffect>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((card, i) => (
            <GlassCard key={i} className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="mb-5 text-[#6366F1]">
                  {icons[card.icon]}
                </div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-[#94A3B8]">{card.text}</p>
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
