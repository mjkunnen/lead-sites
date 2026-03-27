"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/lib/types";

export default function LeadAbout({ content }: { content: SiteContent }) {
  const firstImage = content.gallery?.[0];

  return (
    <section id="over" className="relative bg-white py-28 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Over ons</span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-slate-900 sm:text-5xl leading-tight">
              {content.tagline || content.business_name}
            </h2>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed">
              {content.about}
            </p>

            {/* Awards */}
            {content.awards && content.awards.length > 0 && (
              <div className="mt-8 flex flex-col gap-3">
                {content.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50">
                      <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {award}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10">
              <a
                href={content.contact.booking_url || `tel:${content.contact.phone}`}
                target={content.contact.booking_url ? "_blank" : undefined}
                rel={content.contact.booking_url ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 font-semibold text-white transition-all hover:bg-slate-800 hover:scale-105 active:scale-95"
              >
                Maak een afspraak
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Image with floating effect */}
          {firstImage && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-300/50">
                <Image
                  src={firstImage.url}
                  alt={firstImage.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full aspect-[4/3]"
                  unoptimized
                />
              </div>
              {/* Floating decorative element */}
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">{content.reviews.length}+</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/60">Reviews</div>
                </div>
              </div>
              {/* Accent dot pattern */}
              <div className="absolute -top-4 -right-4 grid grid-cols-3 gap-2 opacity-20">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-slate-900" />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
