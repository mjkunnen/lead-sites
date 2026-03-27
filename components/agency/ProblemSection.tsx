"use client";

import { motion } from "framer-motion";
import { problemCards } from "@/lib/agency-data";

const icons = {
  globe: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  broken: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  ),
  clock: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function ProblemSection() {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/30 to-white" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600">
            Het probleem
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl">
            Herkenbaar?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Dit zijn de problemen die we dagelijks oplossen voor MKB-bedrijven.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-red-100/50"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-red-100 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-200">
                {icons[card.icon]}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-600">{card.text}</p>
              {/* Decorative bottom gradient line */}
              <div className="mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r from-red-300 to-transparent transition-all duration-300 group-hover:w-full group-hover:from-red-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
