"use client";

import { motion } from "framer-motion";
import { portfolioItems } from "@/lib/agency-data";
import TiltCard from "./ui/TiltCard";

const gradients = [
  "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)",
  "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)",
  "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 50%, #5eead4 100%)",
  "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 50%, #a78bfa 100%)",
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden bg-gray-50 py-20 lg:py-28">
      {/* Background blobs */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-100/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
            Portfolio
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl">
            Recent werk
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Een selectie van websites die we recent hebben opgeleverd.
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
              <TiltCard className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
                {/* Browser mockup */}
                <div className="border-b border-gray-100 bg-gray-50/80">
                  <div className="flex items-center gap-2 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-300" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-300" />
                    </div>
                    <div className="flex-1 rounded-md bg-white px-3 py-1 text-xs text-gray-400 shadow-inner">
                      {item.title.toLowerCase().replace(/\s+/g, "-")}.nl
                    </div>
                  </div>
                </div>

                {/* Website preview area */}
                <div
                  className="relative flex h-48 flex-col items-center justify-center gap-3 overflow-hidden sm:h-56"
                  style={{ background: gradients[i % 4] }}
                >
                  {/* Animated mock content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="h-1.5 w-12 rounded-full bg-white/30" />
                    <div className="h-3 w-32 rounded-full bg-white/50" />
                    <div className="h-1.5 w-20 rounded-full bg-white/25" />
                    <div className="mt-2 h-7 w-20 rounded-lg bg-white/40 shadow-sm" />
                  </motion.div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-600/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 shadow-lg">
                      Bekijk project
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{item.niche}</p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">{item.title}</h3>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
