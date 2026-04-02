"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/agency-data";

function Orbit3D() {
  return (
    <div className="relative mx-auto h-[300px] w-[300px]" style={{ perspective: "800px" }}>
      {/* Center avatar */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a2e] text-xl font-bold text-white shadow-xl shadow-[#1a1a2e]/20">
        M
      </div>

      {/* Orbiting ring 1 */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-6 rounded-full border border-[#C1D6F9]/30"
        style={{ transform: "rotateX(65deg)" }}
      >
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-lg bg-white px-2 py-1 text-[10px] font-medium text-[#52527A] shadow-md">AI</div>
        </div>
      </motion.div>

      {/* Orbiting ring 2 */}
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-[#B9EACB]/30"
        style={{ transform: "rotateX(65deg) rotateY(20deg)" }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
          <div className="rounded-lg bg-white px-2 py-1 text-[10px] font-medium text-[#52527A] shadow-md">Web</div>
        </div>
      </motion.div>

      {/* Orbiting ring 3 */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-[#E8D5F5]/30"
        style={{ transform: "rotateX(65deg) rotateY(-15deg)" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="rounded-lg bg-white px-2 py-1 text-[10px] font-medium text-[#52527A] shadow-md">Code</div>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-[#C1D6F9]/15 blur-[40px]" />
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="over" className="relative overflow-hidden bg-transparent py-28 lg:py-36">
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#C1D6F9]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — 3D orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Orbit3D />
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#52527A]/10 bg-white px-4 py-1.5 text-sm font-medium text-[#52527A] shadow-sm">
              Wie zijn wij?
            </span>
            <h2 className="mt-6 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
              Eén aanspreekpunt.
              <br />
              <span className="text-[#52527A]">Alles uit handen.</span>
            </h2>

            <p className="mt-6 font-[family-name:var(--font-urbanist)] text-base leading-relaxed text-[#52527A]">
              Ik ben Max. Ik zag hoe ondernemers vastliepen in handmatig werk — offerte-aanvragen verwerken, klanten opvolgen, data invoeren — terwijl AI dat allemaal kan overnemen. Dat frustreerde me.
            </p>
            <p className="mt-4 font-[family-name:var(--font-urbanist)] text-base leading-relaxed text-[#52527A]">
              Bij NetjesOnline bouw ik <span className="font-semibold text-[#1a1a2e]">AI-automatiseringen en professionele websites</span> die écht resultaat opleveren. Geen wollig verhaal, geen eindeloze vergaderingen — gewoon een werkend systeem.
            </p>

            {/* What you get */}
            <div className="mt-8 space-y-3">
              {[
                "Persoonlijk — je belt en appt rechtstreeks met mij",
                "Transparant — vaste prijzen, geen verborgen kosten",
                "Snel — binnen 2 weken draait alles",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B9EACB]/20">
                    <svg className="h-3.5 w-3.5 text-[#2d7a4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#1a1a2e]">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-[#1a1a2e] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#1a1a2e]/10">
                Plan een gesprek
              </a>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#52527A]/15 bg-white px-6 py-3 text-sm font-semibold text-[#1a1a2e] shadow-sm transition-all hover:shadow-md">
                <svg className="h-4 w-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                App me direct
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
