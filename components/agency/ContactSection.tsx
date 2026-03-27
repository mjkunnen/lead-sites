"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/agency-data";
import ShimmerButton from "./ui/ShimmerButton";
import LampEffect from "./ui/LampEffect";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Connect EmailJS or server action
    await new Promise((r) => setTimeout(r, 1000));

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.05),_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <LampEffect>
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
            Neem contact op
          </h2>
        </LampEffect>

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Bericht verstuurd!</h3>
                <p className="mt-2 text-[#94A3B8]">We nemen binnen 24 uur contact met u op.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {[
                  { name: "name", label: "Naam", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phone", label: "Telefoon", type: "tel" },
                ].map((field) => (
                  <div key={field.name} className="group relative">
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      placeholder={field.label}
                      className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-5 py-4 text-white placeholder:text-[#94A3B8]/50 transition-all focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
                    />
                  </div>
                ))}
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Uw bericht"
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-5 py-4 text-white placeholder:text-[#94A3B8]/50 transition-all focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 resize-none"
                  />
                </div>
                <ShimmerButton type="submit" className={loading ? "opacity-70 pointer-events-none" : ""}>
                  {loading ? "Versturen..." : "Verstuur bericht"}
                </ShimmerButton>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <h3 className="text-2xl font-bold">Liever direct contact?</h3>
            <p className="text-[#94A3B8] leading-relaxed">
              Bel ons, stuur een WhatsApp, of laat een bericht achter. We reageren altijd binnen 24 uur.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-4 transition-all hover:border-[rgba(99,102,241,0.3)] hover:bg-[rgba(255,255,255,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6366F1]/20">
                  <svg className="h-5 w-5 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#94A3B8]">Telefoon</p>
                  <p className="font-semibold">{siteConfig.phone}</p>
                </div>
              </a>

              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-4 transition-all hover:border-green-500/30 hover:bg-green-500/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#94A3B8]">WhatsApp</p>
                  <p className="font-semibold">Stuur een bericht</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-4 transition-all hover:border-[rgba(99,102,241,0.3)] hover:bg-[rgba(255,255,255,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6366F1]/20">
                  <svg className="h-5 w-5 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#94A3B8]">Email</p>
                  <p className="font-semibold">{siteConfig.email}</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
