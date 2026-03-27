"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";
import TiltImage from "./TiltImage";

export default function LeadGallery({ content }: { content: SiteContent }) {
  if (!content.gallery || content.gallery.length < 3) return null;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const col1Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const i = t(content.lang);
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => { setIsTouch(window.matchMedia("(pointer: coarse)").matches); }, []);

  // Split images into 3 columns (desktop) or 2 columns (mobile)
  const cols = [
    content.gallery.filter((_, i) => i % 3 === 0),
    content.gallery.filter((_, i) => i % 3 === 1),
    content.gallery.filter((_, i) => i % 3 === 2),
  ];

  const colMotions = [col1Y, col2Y, col3Y];

  return (
    <section id="gallerij" ref={ref} className="bg-white py-20 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 text-sm font-medium tracking-widest text-amber-700/60 uppercase mb-6">
            <span className="h-px w-8 bg-amber-600/30" />
            {i.gallery.label}
            <span className="h-px w-8 bg-amber-600/30" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-stone-900 sm:text-5xl">
            {i.gallery.heading1}<br />{i.gallery.heading2}
          </h2>
        </motion.div>

        {/* 3-column masonry with parallax (2-col on mobile, no parallax on touch) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {colMotions.map((y, colIdx) => (
            <motion.div
              key={colIdx}
              style={isTouch ? undefined : { y }}
              className={`flex flex-col gap-3 sm:gap-4 ${colIdx === 2 ? "hidden md:flex" : ""}`}
            >
              {cols[colIdx].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <TiltImage
                    src={img.url}
                    alt={img.alt}
                    className={`w-full rounded-2xl sm:rounded-3xl ${
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
