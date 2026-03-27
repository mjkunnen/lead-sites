"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/agency-data";

export default function ProcessTimeline() {
  return (
    <section id="werkwijze" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
            Ons proces
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl">
            Van idee naar live in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              4 stappen
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Zo eenvoudig werkt het.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-[2px] lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-full origin-left bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="group relative"
              >
                <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50">
                  {/* Step number */}
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-transform duration-300 group-hover:scale-110">
                      {step.number}
                    </div>
                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 h-12 w-12 rounded-xl bg-blue-400 opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-20" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
