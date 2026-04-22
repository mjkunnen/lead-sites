'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { t } from '@/lib/i18n';

function AnimatedNumber({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function VakmanStats({ content }: { content: SiteContent }) {
  const tr = t(content.lang);
  const stats = content.stats;
  const reviewCount = content.reviews?.length ?? 0;
  const avgRating = reviewCount > 0
    ? (content.reviews.reduce((sum, r) => sum + r.stars, 0) / reviewCount).toFixed(1)
    : '5.0';

  const items = [
    { value: stats?.years ?? 10, suffix: '+', label: tr.vakman.statsYears },
    { value: stats?.projects ?? 500, suffix: '+', label: tr.vakman.statsProjects },
  ];

  return (
    <section className="px-6 mt-8 relative z-20">
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center"
          >
            <span className="text-2xl font-black text-[#004ac6] leading-none">
              <AnimatedNumber value={item.value} suffix={item.suffix} />
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mt-1">
              {item.label}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-[#004ac6] leading-none">{avgRating}</span>
            <motion.svg
              className="w-4 h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </motion.svg>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mt-1">
            Rating
          </span>
        </motion.div>
      </div>
    </section>
  );
}
