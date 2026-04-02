"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 60, suffix: "%", label: "Minder handmatig werk" },
  { value: 600, suffix: "+", label: "Tools te koppelen" },
  { value: 2, suffix: " weken", label: "Van idee naar live" },
  { value: 40, suffix: "%", label: "Meer klanten online" },
];

export default function StatsBar() {
  return (
    <section className="relative bg-[#1a1a2e] py-20">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            Direct AI implementeren
          </h3>
          <p className="mt-2 font-[family-name:var(--font-urbanist)] text-white/60">
            Onze cijfers spreken voor zich
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white sm:text-5xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
