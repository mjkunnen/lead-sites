"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/agency-data";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white/40 backdrop-blur-sm py-28 lg:py-36">
      <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-[#C1D6F9]/15 blur-[120px]" />
      <div className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-[#B9EACB]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#52527A]/10 bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#52527A]">
            Contact
          </span>
          <h2 className="mt-6 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Klaar om te <span className="text-[#52527A]">starten?</span>
          </h2>
          <p className="mt-4 font-[family-name:var(--font-urbanist)] text-lg text-[#52527A]">
            Plan een gratis discovery call en ontdek wat AI voor jouw bedrijf kan betekenen.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-2xl bg-[#FAFAFA] p-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B9EACB]/30">
                  <svg className="h-8 w-8 text-[#2d7a4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#1a1a2e]">Bericht verstuurd!</h3>
                <p className="mt-2 text-[#52527A]">We nemen binnen 24 uur contact met je op.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl bg-[#FAFAFA] p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#1a1a2e]">Naam</label>
                    <input id="name" type="text" name="name" required className="w-full rounded-xl border border-[#52527A]/10 bg-white px-4 py-3 text-[#1a1a2e] transition-all focus:border-[#52527A]/30 focus:outline-none focus:ring-2 focus:ring-[#52527A]/10" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#1a1a2e]">Email</label>
                    <input id="email" type="email" name="email" required className="w-full rounded-xl border border-[#52527A]/10 bg-white px-4 py-3 text-[#1a1a2e] transition-all focus:border-[#52527A]/30 focus:outline-none focus:ring-2 focus:ring-[#52527A]/10" />
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#1a1a2e]">Telefoon</label>
                  <input id="phone" type="tel" name="phone" className="w-full rounded-xl border border-[#52527A]/10 bg-white px-4 py-3 text-[#1a1a2e] transition-all focus:border-[#52527A]/30 focus:outline-none focus:ring-2 focus:ring-[#52527A]/10" />
                </div>
                <div className="mt-5">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#1a1a2e]">Bericht</label>
                  <textarea id="message" name="message" rows={4} required className="w-full resize-none rounded-xl border border-[#52527A]/10 bg-white px-4 py-3 text-[#1a1a2e] transition-all focus:border-[#52527A]/30 focus:outline-none focus:ring-2 focus:ring-[#52527A]/10" />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-6 w-full overflow-hidden rounded-full bg-[#1a1a2e] py-3.5 font-semibold text-white shadow-lg shadow-[#1a1a2e]/10 transition-all hover:shadow-xl hover:shadow-[#1a1a2e]/15 disabled:opacity-60"
                >
                  <span className="relative z-10">{loading ? "Versturen..." : "Verstuur bericht"}</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-5 lg:col-span-2"
          >
            {[
              { icon: "phone", title: "Bel mij", value: siteConfig.phone, href: `tel:${siteConfig.phone}`, sub: "Ma-Vr 09:00-17:00", color: "bg-[#C1D6F9]/20 text-[#52527A]" },
              { icon: "whatsapp", title: "WhatsApp", value: "Stuur een bericht", href: siteConfig.whatsapp, sub: "Direct antwoord", color: "bg-[#B9EACB]/20 text-[#2d7a4f]" },
              { icon: "email", title: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, sub: "Reactie binnen 24 uur", color: "bg-[#E8D5F5]/20 text-[#52527A]" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-[#FAFAFA] p-6 transition-all hover:bg-white hover:shadow-md hover:shadow-[#52527A]/5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}>
                  <div className="h-2.5 w-2.5 rounded-full bg-current" />
                </div>
                <h3 className="mt-3 font-semibold text-[#1a1a2e]">{item.title}</h3>
                <a href={item.href} target={item.icon === "whatsapp" ? "_blank" : undefined} className="mt-1 block text-lg font-semibold text-[#52527A] hover:text-[#1a1a2e]">
                  {item.value}
                </a>
                <p className="mt-1 text-sm text-[#52527A]/60">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
