"use client";

import { motion } from "framer-motion";
import { trustBadges } from "@/lib/agency-data";

const iconMap: Record<string, React.ReactNode> = {
  lock: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  shield: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  check: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  server: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
    </svg>
  ),
};

export default function TrustSection() {
  return (
    <section className="relative bg-transparent py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-[#1a1a2e] sm:text-3xl">
            Jouw data is bij ons{" "}
            <span className="relative">
              veilig
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 7 Q25 0 50 4 Q75 8 100 1" fill="none" stroke="#B9EACB" strokeWidth="3" />
              </svg>
            </span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {trustBadges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md hover:shadow-[#52527A]/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B9EACB]/20 text-[#2d7a4f]">
                {iconMap[badge.icon]}
              </div>
              <span className="text-sm font-medium text-[#1a1a2e]">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
