"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/* ── Animated visuals per service (no images) ── */

function WorkflowVisual() {
  const steps = [
    { label: "Lead komt binnen", icon: "inbox" },
    { label: "AI kwalificeert", icon: "brain" },
    { label: "Offerte verstuurd", icon: "send" },
    { label: "Follow-up auto", icon: "repeat" },
    { label: "Deal gesloten", icon: "check" },
  ];
  return (
    <div className="mt-6 space-y-2">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.12 }}
          className="flex items-center gap-3"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#52527A]/8"
          >
            <div className="h-2 w-2 rounded-full bg-[#52527A]" />
          </motion.div>
          <div className="flex-1 rounded-lg bg-[#52527A]/[0.04] px-3 py-2 text-xs font-medium text-[#52527A]">
            {step.label}
          </div>
          {i < steps.length - 1 && (
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              className="h-4 w-px bg-[#B9EACB]"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function CodeVisual() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-[#52527A]/8 bg-[#1a1a2e] p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-[#FF6057]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#27C840]" />
      </div>
      <div className="font-mono text-xs leading-relaxed">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <span className="text-[#C1D6F9]">const</span> <span className="text-white">ai</span> <span className="text-[#52527A]">=</span> <span className="text-[#B9EACB]">connect</span><span className="text-white">(</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          {"  "}<span className="text-[#FFBD2E]">&quot;jouw-crm&quot;</span><span className="text-[#52527A]">,</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
          {"  "}<span className="text-[#FFBD2E]">&quot;email&quot;</span><span className="text-[#52527A]">,</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }}>
          {"  "}<span className="text-[#FFBD2E]">&quot;whatsapp&quot;</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }}>
          <span className="text-white">)</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }}>
          <br /><span className="text-[#C1D6F9]">await</span> <span className="text-white">ai</span><span className="text-[#52527A]">.</span><span className="text-[#B9EACB]">automate</span><span className="text-white">()</span>
        </motion.div>
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="mt-1 inline-block h-4 w-2 bg-white/60"
        />
      </div>
    </div>
  );
}

function WebsiteVisual() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-[#52527A]/8 bg-white shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50/80 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-[#FF6057]" />
        <div className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
        <div className="h-2 w-2 rounded-full bg-[#27C840]" />
        <div className="ml-2 flex-1 rounded bg-gray-100 px-2 py-0.5 text-[9px] text-gray-400">jouwbedrijf.nl</div>
      </div>
      <div className="p-4">
        <motion.div className="space-y-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <div className="h-2 w-20 rounded-full bg-[#52527A]/10" />
          <div className="h-3 w-40 rounded-full bg-[#1a1a2e]/20" />
          <div className="h-2 w-32 rounded-full bg-[#52527A]/8" />
          <div className="mt-3 h-6 w-24 rounded-full bg-[#1a1a2e]" />
        </motion.div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.15 }}
              className="rounded-lg bg-[#FAFAFA] p-2"
            >
              <div className="h-8 rounded bg-gradient-to-br from-[#C1D6F9]/30 to-[#B9EACB]/30" />
              <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-[#52527A]/10" />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-3 rounded-lg bg-[#B9EACB]/10 px-3 py-2 text-center text-xs font-medium text-[#2d7a4f]"
        >
          Klant vindt jou → neemt contact op → deal
        </motion.div>
      </div>
    </div>
  );
}

/* ── Main section ── */

const services = [
  {
    title: "AI Automatiseringen",
    text: "Jouw hele klantproces op autopilot. Van het moment dat een lead binnenkomt tot de deal gesloten is — AI handelt alles af. Jij hoeft niks te doen.",
    results: ["20+ uur per week bespaard", "Klanten sneller geholpen", "Niks meer vergeten"],
    size: "lg:col-span-2",
    visual: <WorkflowVisual />,
  },
  {
    title: "Custom Development",
    text: "Je tools praten niet met elkaar? Wij bouwen de brug. API-koppelingen, dashboards, en maatwerk software die alles verbindt.",
    results: ["Al je tools gekoppeld", "Data op één plek", "Op maat gebouwd"],
    size: "",
    visual: <CodeVisual />,
  },
  {
    title: "Professionele Websites",
    text: "Een website die klanten binnenhaalt, niet alleen mooi is. SEO-geoptimaliseerd, razendsnel, en gebouwd om te converteren.",
    results: ["Meer klanten via Google", "Werkt perfect op mobiel", "Binnen 2 weken live"],
    size: "",
    visual: <WebsiteVisual />,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#52527A]/8 ${service.size}`}
    >
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(82,82,122,0.04), transparent 40%)`,
        }}
      />

      <h3 className="text-xl font-bold text-[#1a1a2e]">{service.title}</h3>
      <p className="mt-3 font-[family-name:var(--font-urbanist)] text-sm leading-relaxed text-[#52527A]">
        {service.text}
      </p>

      {/* Results */}
      <div className="mt-4 flex flex-wrap gap-2">
        {service.results.map((result, i) => (
          <span key={i} className="rounded-full bg-[#B9EACB]/15 px-3 py-1 text-xs font-medium text-[#2d7a4f]">
            {result}
          </span>
        ))}
      </div>

      {/* Interactive visual */}
      {service.visual}
    </motion.div>
  );
}

export default function AIServicesSection() {
  return (
    <section id="diensten" className="relative overflow-hidden bg-white/40 backdrop-blur-sm py-28 lg:py-36">
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#52527A]/10 bg-white px-4 py-1.5 text-sm font-medium text-[#52527A] shadow-sm">
            Wat wij doen
          </span>
          <h2 className="mt-6 text-4xl font-bold text-[#1a1a2e] sm:text-5xl">
            Wij nemen het werk{" "}
            <span className="relative">
              uit handen
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0 8 Q50 0 100 5 Q150 10 200 2" fill="none" stroke="#B9EACB" strokeWidth="3" />
              </svg>
            </span>
          </h2>
          <p className="mt-6 font-[family-name:var(--font-urbanist)] text-lg text-[#52527A]">
            AI-automatiseringen, maatwerk software en professionele websites. Alles wat jouw bedrijf nodig heeft om te groeien zonder extra personeel.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
