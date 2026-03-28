"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";
import TiltImage from "@/components/lead/TiltImage";
import AnimatedCounter from "./AnimatedCounter";

export default function VakmanStats({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const stats = content.stats;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => { setIsTouch(window.matchMedia("(pointer: coarse)").matches); }, []);

  const firstImage = content.gallery?.[0];
  const secondImage = content.gallery?.[1];

  return (
    <section id="over" ref={ref} className="relative bg-[#09090b] py-20 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Animated counters */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 grid grid-cols-3 gap-6"
          >
            {stats.years && (
              <div className="text-center text-white">
                <AnimatedCounter target={stats.years} label={i.vakman.statsYears} suffix="+" />
                <div className="mx-auto mt-4 h-px w-12 bg-white/10" />
              </div>
            )}
            {stats.projects && (
              <div className="text-center text-white">
                <AnimatedCounter target={stats.projects} label={i.vakman.statsProjects} suffix="+" />
                <div className="mx-auto mt-4 h-px w-12 bg-white/10" />
              </div>
            )}
            {stats.reviews_count && (
              <div className="text-center text-white">
                <AnimatedCounter target={stats.reviews_count} label={i.vakman.statsReviews} />
                <div className="mx-auto mt-4 h-px w-12 bg-white/10" />
              </div>
            )}
          </motion.div>
        )}

        {/* About + 3D TiltImage stack */}
        {content.about && (
          <div className="grid items-center gap-12 sm:gap-20 lg:grid-cols-2">
            {/* Image stack with parallax + 3D tilt */}
            <div className="relative h-[350px] sm:h-[500px] lg:h-[600px]">
              {firstImage && (
                <motion.div style={isTouch ? undefined : { y: imgY }} className="absolute top-0 left-0 w-[75%] z-10">
                  <TiltImage
                    src={firstImage.url}
                    alt={firstImage.alt}
                    className="aspect-[4/5] rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/60"
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
                    className="aspect-[3/4] rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/60 border-2 border-white/5"
                    intensity={12}
                  />
                </motion.div>
              )}
            </div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 text-sm font-medium tracking-widest text-blue-400/50 uppercase mb-6">
                <span className="h-px w-8 bg-blue-500/20" />
                {i.about.label}
              </div>
              <h2
                className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight"
              >
                {content.lang === "nl" ? "Vakwerk met" : "Craftsmanship with"}
                <br />
                <span className="text-blue-400">{content.lang === "nl" ? "aandacht voor detail" : "attention to detail"}</span>
              </h2>
              <p className="mt-8 text-lg text-zinc-400 leading-relaxed">
                {content.about}
              </p>

              {/* Stats row */}
              <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-8 border-t border-white/5 pt-8 sm:pt-10">
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-4xl font-bold text-white"
                  >
                    {content.reviews.length}+
                  </motion.div>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-500">{i.about.reviews}</p>
                </div>
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-4xl font-bold text-white"
                  >
                    5.0
                  </motion.div>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-500">{i.about.average}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
