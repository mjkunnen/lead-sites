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
      const eased = progress === 1
        ? 1
        : 1 - Math.pow(2, -10 * progress) * Math.cos((progress * 10 - 0.75) * ((2 * Math.PI) / 3));
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 50, suffix: "+", label: "Projecten opgeleverd" },
  { value: 5, suffix: " dagen", label: "Gemiddelde oplevering" },
  { value: 100, suffix: "%", label: "Klanttevredenheid" },
  { value: 30, suffix: "%", label: "Meer online leads" },
];

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 py-16">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
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
              <div className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white sm:text-5xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
