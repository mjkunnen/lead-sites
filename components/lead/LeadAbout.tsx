"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteContent } from "@/lib/types";
import TiltImage from "./TiltImage";

export default function LeadAbout({ content }: { content: SiteContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const firstImage = content.gallery?.[0];
  const secondImage = content.gallery?.[1];

  return (
    <section id="over" ref={ref} className="relative bg-stone-50 py-32 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Images stack with parallax */}
          <div className="relative h-[500px] lg:h-[600px]">
            {firstImage && (
              <motion.div style={{ y: imgY }} className="absolute top-0 left-0 w-[75%] z-10">
                <TiltImage
                  src={firstImage.url}
                  alt={firstImage.alt}
                  className="aspect-[4/5] rounded-3xl shadow-2xl shadow-stone-300/50"
                  intensity={10}
                />
              </motion.div>
            )}
            {secondImage && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 right-0 w-[55%] z-20"
              >
                <TiltImage
                  src={secondImage.url}
                  alt={secondImage.alt}
                  className="aspect-[3/4] rounded-3xl shadow-2xl shadow-stone-300/50 border-4 border-white"
                  intensity={12}
                />
              </motion.div>
            )}
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-3xl bg-amber-100 -z-10" />
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-sm font-medium tracking-widest text-amber-700/60 uppercase mb-6">
              <span className="h-px w-8 bg-amber-600/30" />
              Over ons
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-stone-900 sm:text-5xl leading-tight">
              Een salon met<br />
              <span className="text-amber-800">karakter</span>
            </h2>
            <p className="mt-8 text-lg text-stone-500 leading-relaxed">
              {content.about}
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-stone-200 pt-10">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-stone-900"
                >
                  {content.reviews.length}+
                </motion.div>
                <p className="mt-1 text-sm text-stone-400">Reviews</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-stone-900"
                >
                  5.0
                </motion.div>
                <p className="mt-1 text-sm text-stone-400">Gemiddeld</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-amber-800"
                >
                  Oribe
                </motion.div>
                <p className="mt-1 text-sm text-stone-400">Ambassadeur</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
