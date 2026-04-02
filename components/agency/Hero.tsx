"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = ["Automatiseren", "Versnellen", "Groeien"];

function AnimatedWords() {
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ height: "1.15em" }}>
      <motion.span
        animate={{ y: ["0%", "0%", "-33.33%", "-33.33%", "-66.66%", "-66.66%", "0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.33, 0.58, 0.66, 0.91, 1] }}
        className="flex flex-col"
      >
        {words.map((word, i) => (
          <span key={i} className="block h-[1.15em] bg-gradient-to-r from-[#52527A] via-[#7B7BA8] to-[#52527A] bg-clip-text text-transparent">
            {word}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-transparent pt-28 pb-20 lg:pt-40 lg:pb-32">
      {/* Soft gradient blobs */}
      <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#C1D6F9]/30 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -20, 10, 0], y: [0, 15, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-[#B9EACB]/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Center-aligned hero */}
        <motion.div style={{ y: textY }} className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#52527A]/10 bg-white px-5 py-2 text-sm font-medium text-[#52527A] shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B9EACB] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#52527A]" />
            </span>
            Beschikbaar voor nieuwe projecten
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-urbanist)] text-5xl font-bold leading-[1.08] tracking-tight text-[#1a1a2e] sm:text-6xl lg:text-[4.5rem]"
          >
            Moderne<sup className="text-[0.4em] text-[#52527A]/60">AI</sup> oplossingen
            <br />
            die werken voor{" "}
            <AnimatedWords />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl font-[family-name:var(--font-urbanist)] text-lg leading-relaxed text-[#52527A] sm:text-xl"
          >
            Stop met handmatig werk. Wij bouwen AI-automatiseringen en professionele websites die jouw bedrijf laten groeien. Binnen weken operationeel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full bg-[#1a1a2e] px-8 py-4 text-center font-semibold text-white shadow-xl shadow-[#1a1a2e]/10 transition-all hover:shadow-2xl hover:shadow-[#1a1a2e]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Gratis adviesgesprek
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#diensten"
              className="group flex items-center gap-2 rounded-full border border-[#52527A]/15 bg-white px-8 py-4 font-semibold text-[#1a1a2e] shadow-sm transition-all hover:border-[#52527A]/25 hover:shadow-md"
            >
              Bekijk mogelijkheden
              <svg className="h-4 w-4 text-[#52527A] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl shadow-[#52527A]/10">
            {/* Browser bar */}
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#FF6057]" />
                <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <div className="h-3 w-3 rounded-full bg-[#27C840]" />
              </div>
              <div className="mx-4 flex-1 rounded-lg bg-gray-100 px-4 py-1.5 text-sm text-gray-400">
                app.netjesonline.com/dashboard
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative bg-gradient-to-br from-[#f8f9fc] to-[#f0f2f8] p-6 sm:p-8">
              <div className="grid grid-cols-3 gap-4">
                {/* Stats cards */}
                {[
                  { label: "Bespaard per maand", value: "€4.200", change: "door automatisering", color: "#B9EACB" },
                  { label: "Nieuwe klanten", value: "+18", change: "via website & AI", color: "#C1D6F9" },
                  { label: "Uren vrijgemaakt", value: "86", change: "minder handwerk", color: "#E8D5F5" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.15 }}
                    className="rounded-xl bg-white p-4 shadow-sm"
                  >
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">{stat.label}</div>
                    <div className="mt-1 text-2xl font-bold text-[#1a1a2e]">{stat.value}</div>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: stat.color }} />
                      <span className="text-xs text-gray-400">{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Workflow visualization */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-4 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
              >
                {["Klant zoekt", "Vindt jouw site", "AI reageert", "Offerte uit", "Deal binnen"].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#52527A]/5 text-xs font-bold text-[#52527A]">
                      {i + 1}
                    </div>
                    <span className="hidden text-xs text-gray-500 sm:inline">{step}</span>
                    {i < 4 && (
                      <motion.svg
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="h-4 w-4 text-[#B9EACB]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </motion.svg>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-1/2 rounded-xl bg-white px-4 py-3 shadow-xl shadow-[#52527A]/10"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B9EACB]/30">
                <svg className="h-4 w-4 text-[#2d7a4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1a1a2e]">Kosten omlaag</div>
                <div className="text-[10px] text-gray-400">-60% handmatig werk</div>
              </div>
            </div>
          </motion.div>

          {/* Floating badge right */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 top-1/3 rounded-xl bg-white px-4 py-3 shadow-xl shadow-[#52527A]/10"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C1D6F9]/30">
                <svg className="h-4 w-4 text-[#52527A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1a1a2e]">Omzet omhoog</div>
                <div className="text-[10px] text-gray-400">+40% meer klanten</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
