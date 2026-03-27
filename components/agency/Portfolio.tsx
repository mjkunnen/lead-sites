"use client";

import { motion } from "framer-motion";
import { portfolioItems } from "@/lib/agency-data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import LampEffect from "./ui/LampEffect";

const gradients = [
  "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
  "linear-gradient(135deg, #0c4a6e 0%, #155e75 50%, #0891b2 100%)",
  "linear-gradient(135deg, #134e4a 0%, #115e59 50%, #0d9488 100%)",
  "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)",
];

function BrowserMockup({ index, title, niche }: { index: number; title: string; niche: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#0A0E27]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] px-3 py-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="mx-2 flex-1 rounded-md bg-[rgba(255,255,255,0.05)] px-3 py-0.5 text-[10px] text-[#94A3B8]/60">
          {title.toLowerCase().replace(/\s+/g, "-")}.nl
        </div>
      </div>
      {/* Mock website content */}
      <div className="relative flex-1" style={{ background: gradients[index % 4] }}>
        {/* Mock hero area */}
        <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
          <div className="h-2 w-20 rounded-full bg-white/20" />
          <div className="h-3 w-32 rounded-full bg-white/30" />
          <div className="h-2 w-24 rounded-full bg-white/15" />
          <div className="mt-2 h-6 w-20 rounded-full bg-white/20" />
          {/* Mock content blocks */}
          <div className="mt-4 grid w-full max-w-[180px] grid-cols-3 gap-2">
            <div className="h-10 rounded bg-white/10" />
            <div className="h-10 rounded bg-white/10" />
            <div className="h-10 rounded bg-white/10" />
          </div>
        </div>
        {/* Niche label */}
        <div className="absolute bottom-3 right-3">
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white/70 backdrop-blur-sm">
            {niche}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(6,182,212,0.05),_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <LampEffect>
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
            Recent werk
          </h2>
        </LampEffect>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-lg text-center text-[#94A3B8]"
        >
          Een selectie van websites die we recent hebben opgeleverd voor onze klanten.
        </motion.p>

        <div className="mt-20">
          <BentoGrid>
            {portfolioItems.map((item, i) => (
              <BentoGridItem key={i} span={item.span}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] sm:h-80"
                >
                  <div className="h-full transition-transform duration-500 group-hover:scale-[1.02]">
                    <BrowserMockup index={i} title={item.title} niche={item.niche} />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050816]/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="mt-1 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[#06B6D4]">
                      {item.niche}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-[rgba(99,102,241,0.4)] px-4 py-2 text-sm text-[#6366F1] transition-colors hover:bg-[rgba(99,102,241,0.1)]">
                      Bekijk project
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              </BentoGridItem>
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
