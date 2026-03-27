"use client";

import { motion } from "framer-motion";
import { portfolioItems } from "@/lib/agency-data";

const gradients = [
  "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
  "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
  "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
  "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)",
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl">
            Recent werk
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Een selectie van websites die we recent hebben opgeleverd.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Browser mockup */}
              <div className="border-b border-gray-100">
                <div className="flex items-center gap-2 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                  </div>
                  <div className="flex-1 rounded bg-gray-50 px-3 py-1 text-xs text-gray-400">
                    {item.title.toLowerCase().replace(/\s+/g, "-")}.nl
                  </div>
                </div>
              </div>
              <div
                className="flex h-48 flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-[1.02] sm:h-56"
                style={{ background: gradients[i % 4] }}
              >
                <div className="h-2 w-16 rounded-full bg-white/40" />
                <div className="h-3 w-28 rounded-full bg-white/50" />
                <div className="h-2 w-20 rounded-full bg-white/30" />
                <div className="mt-2 h-6 w-16 rounded-full bg-white/40" />
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-blue-600">{item.niche}</p>
                <h3 className="mt-1 font-semibold text-gray-900">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
