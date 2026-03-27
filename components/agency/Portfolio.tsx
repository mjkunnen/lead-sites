"use client";

import { motion } from "framer-motion";
import { portfolioItems } from "@/lib/agency-data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import LampEffect from "./ui/LampEffect";

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

        <div className="mt-20">
          <BentoGrid>
            {portfolioItems.map((item, i) => (
              <BentoGridItem key={i} span={item.span}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] sm:h-80"
                >
                  {/* Gradient placeholder (replace with real images) */}
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ["#1e1b4b", "#0c4a6e", "#134e4a", "#4c1d95"][i % 4]
                      }, ${
                        ["#312e81", "#155e75", "#115e59", "#6d28d9"][i % 4]
                      })`,
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[#06B6D4]">
                      {item.niche}
                    </span>
                    <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm text-[#6366F1]">
                      Bekijk
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>

                  {/* Always-visible title (mobile) */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050816] to-transparent p-6 sm:hidden">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <span className="text-sm text-[#94A3B8]">{item.niche}</span>
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
