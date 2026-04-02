"use client";

import { motion } from "framer-motion";
import { problemCards } from "@/lib/agency-data";
import WordReveal from "./WordReveal";
import StaggerReveal from "./StaggerReveal";

const icons: Record<string, React.ReactNode> = {
  globe: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  broken: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
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
    <section className="relative py-28 lg:py-36 bg-[#08080d]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060609] via-transparent to-[#060609]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
            Het probleem
          </span>
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Herkenbaar?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Dit zijn de problemen die we dagelijks oplossen.
          </p>
        </motion.div>

        <StaggerReveal className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((card, i) => (
            <div
              key={i}
              className="group cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/[0.03]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition-all duration-300 group-hover:bg-red-500/20 group-hover:scale-110">
                {icons[card.icon]}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-400">{card.text}</p>
              <div className="mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r from-red-500/40 to-transparent transition-all duration-300 group-hover:w-full group-hover:from-red-500/60" />
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
