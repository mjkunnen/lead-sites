"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/agency-data";

export default function ProcessTimeline() {
  return (
    <section id="werkwijze" className="relative bg-white/40 backdrop-blur-sm py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#52527A]/10 bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#52527A]">
            Ons proces
          </span>
          <h2 className="mt-6 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Van discovery naar <span className="text-[#52527A]">live</span> in 4 stappen
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[40px] hidden h-[2px] lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full origin-left bg-gradient-to-r from-[#B9EACB] via-[#C1D6F9] to-[#E8D5F5]"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group relative"
              >
                <div className="rounded-2xl bg-[#FAFAFA] p-6 transition-all hover:bg-white hover:shadow-lg hover:shadow-[#52527A]/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a2e] text-sm font-bold text-white shadow-lg shadow-[#1a1a2e]/10 transition-transform group-hover:scale-110">
                    {step.number}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#1a1a2e]">{step.title}</h3>
                  <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm leading-relaxed text-[#52527A]">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
