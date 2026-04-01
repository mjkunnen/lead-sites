'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiteContent } from '@/lib/types';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function VakmanInlineStats({ content }: { content: SiteContent }) {
  const stats = content.stats;
  const totalReviews = stats?.reviews_count ?? content.reviews?.length ?? 0;

  const items = [
    { value: stats?.projects ?? 100, suffix: '+', label: 'projecten' },
    { value: stats?.years ?? 5, suffix: '+', label: 'jaar ervaring' },
    { value: totalReviews, suffix: '', label: '5-sterren reviews' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5 }}
      className="mt-12 px-6"
    >
      <div className="flex items-center justify-around bg-white rounded-2xl py-6 px-4 shadow-sm border border-slate-100">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <span className="text-2xl md:text-3xl font-black text-[#004ac6] leading-none">
              <Counter value={item.value} suffix={item.suffix} />
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">
              {item.label}
            </span>
            {i < items.length - 1 && (
              <div className="hidden" />
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
