"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/agency-data";

export default function ProcessTimeline() {
  return (
    <section id="werkwijze" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl">
            Van idee naar live in 4 stappen
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Zo eenvoudig werkt het.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < processSteps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-[2px] w-full translate-x-1/2 bg-blue-100 lg:block" />
              )}

              <div className="relative rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
