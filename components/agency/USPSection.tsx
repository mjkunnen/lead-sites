"use client";

import { motion } from "framer-motion";
import { uspItems } from "@/lib/agency-data";
import LampEffect from "./ui/LampEffect";

const icons = {
  zap: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  palette: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  shield: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

export default function USPSection() {
  return (
    <section id="diensten" className="relative py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.05),_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <LampEffect>
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
            Wat ons anders maakt
          </h2>
        </LampEffect>

        <div className="mt-20 grid gap-12 lg:grid-cols-3">
          {uspItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="text-center"
            >
              {/* Icon with glow */}
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#6366F1]/10 blur-xl" />
                <div className="relative text-[#6366F1]">
                  {icons[item.icon]}
                </div>
              </div>

              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-[#94A3B8]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
