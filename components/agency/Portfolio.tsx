"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioItems } from "@/lib/agency-data";
import TiltCard from "./ui/TiltCard";

const gradients = [
  "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)",
  "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.15) 100%)",
  "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.15) 100%)",
  "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.15) 100%)",
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="portfolio" className="relative overflow-hidden bg-[#0d0d14] py-24 lg:py-32">
      <motion.div style={{ y: blobY1 }} className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-400">
            Cases
          </span>
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Recent werk
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Een selectie van projecten die we recent hebben opgeleverd.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <TiltCard className="group cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-white/10">
                {/* Preview area */}
                <div
                  className="relative flex h-48 flex-col items-center justify-center gap-3 overflow-hidden sm:h-56"
                  style={{ background: gradients[i % 4] }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="h-1.5 w-12 rounded-full bg-white/20" />
                    <div className="h-3 w-32 rounded-full bg-white/30" />
                    <div className="h-1.5 w-20 rounded-full bg-white/15" />
                    <div className="mt-2 h-7 w-20 rounded-lg bg-white/20" />
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center bg-blue-600/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 shadow-lg">
                      Bekijk project
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">{item.niche}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
