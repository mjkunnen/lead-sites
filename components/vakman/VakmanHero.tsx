"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { SiteContent } from "@/lib/types";

/* ── Magnetic button ─────────────────────────────────────────────── */
function MagneticButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.a>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
export default function VakmanHero({
  content,
}: {
  content: SiteContent;
}) {
  const words = content.hero.headline.split(" ");
  const accentStart = Math.max(words.length - 2, 0);
  const totalWords = words.length;

  const phone = content.contact.phone ?? "";
  const whatsappHref = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
  const stats = content.stats;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Background image ──────────────────────────────────── */}
      <Image
        src={content.hero.image_url}
        alt={`${content.business_name} project`}
        fill
        className="object-cover"
        priority
      />

      {/* ── Gradient overlay ──────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

      {/* ── Content — anchored to bottom ──────────────────────── */}
      <div className="absolute inset-0 flex items-end">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-16 md:pb-20 w-full">
          {/* ── Availability badge ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-green-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            Beschikbaar voor nieuwe projecten
          </motion.div>

          {/* ── Headline with word stagger ────────────────────── */}
          <h1 className="font-heading text-[32px] leading-[1.1] text-white sm:text-[40px] md:text-[48px] lg:text-[56px]">
            {words.map((word, idx) => {
              const isAccent = idx >= accentStart;
              const isLast = idx === totalWords - 1;
              return (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                    delay: 0.15 + idx * 0.08,
                  }}
                  className={`inline-block mr-[0.3em] ${
                    isAccent ? "text-[#60a5fa]" : ""
                  }`}
                >
                  {word}
                  {isLast && (
                    <motion.span
                      className="block h-[3px] bg-[#60a5fa] rounded-full mt-1"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + totalWords * 0.08 + 0.2,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </motion.span>
              );
            })}
          </h1>

          {/* ── Subheadline ───────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-body mt-6 max-w-xl text-base leading-relaxed text-white/70"
          >
            {content.hero.subheadline}
          </motion.p>

          {/* ── Stats row ─────────────────────────────────────── */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-6 text-white/80 text-sm font-subheading mt-6"
            >
              {stats.years && (
                <span className="font-semibold">
                  {stats.years}+{" "}
                  <span className="font-normal text-white/60">
                    jaar ervaring
                  </span>
                </span>
              )}
              {stats.years && stats.projects && (
                <span className="w-px h-4 bg-white/20" />
              )}
              {stats.projects && (
                <span className="font-semibold">
                  {stats.projects}+{" "}
                  <span className="font-normal text-white/60">projecten</span>
                </span>
              )}
              {stats.projects && stats.reviews_count && (
                <span className="w-px h-4 bg-white/20" />
              )}
              {stats.reviews_count && (
                <span className="font-semibold">
                  4.9★{" "}
                  <span className="font-normal text-white/60">
                    {stats.reviews_count} reviews
                  </span>
                </span>
              )}
            </motion.div>
          )}

          {/* ── CTA cluster ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            {/* Primary — blue solid with shimmer + magnetic */}
            <MagneticButton
              href={whatsappHref}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#2563eb] px-8 py-4 text-base font-semibold text-white transition-shadow hover:shadow-xl hover:shadow-blue-600/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">{content.hero.cta_primary}</span>
              <svg
                className="relative h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </MagneticButton>

            {/* Secondary — white/20 backdrop-blur outlined */}
            <a
              href="#projecten"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/15"
            >
              {content.hero.cta_secondary}
            </a>
          </motion.div>

          {/* ── Trust badges ──────────────────────────────────── */}
          {content.trust_badges && content.trust_badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {content.trust_badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3.5 py-1.5 text-sm text-white/90"
                >
                  <svg
                    className="h-4 w-4 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {badge}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
