"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteContent } from "@/lib/types";
import TiltImage from "./TiltImage";

export default function LeadGallery({ content }: { content: SiteContent }) {
  if (!content.gallery || content.gallery.length < 3) return null;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const col1Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Split images into 3 columns
  const cols = [
    content.gallery.filter((_, i) => i % 3 === 0),
    content.gallery.filter((_, i) => i % 3 === 1),
    content.gallery.filter((_, i) => i % 3 === 2),
  ];

  return (
    <section id="gallerij" ref={ref} className="bg-white py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 text-sm font-medium tracking-widest text-amber-700/60 uppercase mb-6">
            <span className="h-px w-8 bg-amber-600/30" />
            Gallerij
            <span className="h-px w-8 bg-amber-600/30" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-stone-900 sm:text-5xl">
            Stap binnen in<br />onze wereld
          </h2>
        </motion.div>

        {/* 3-column masonry with parallax */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[col1Y, col2Y, col3Y].map((y, colIdx) => (
            <motion.div key={colIdx} style={{ y }} className="flex flex-col gap-4">
              {cols[colIdx].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <TiltImage
                    src={img.url}
                    alt={img.alt}
                    className={`w-full rounded-3xl ${
                      (colIdx + i) % 2 === 0 ? "aspect-[3/4]" : "aspect-square"
                    }`}
                    intensity={8}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
