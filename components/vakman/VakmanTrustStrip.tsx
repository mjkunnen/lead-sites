'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import type { SiteContent } from '@/lib/types';

export default function VakmanTrustStrip({ content }: { content: SiteContent }) {
  const stats = content.stats;
  if (!stats) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="relative z-10 -mt-10 mb-16 px-4"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 p-6 md:p-8">
        <div className="grid grid-cols-3 divide-x divide-slate-100">
          {stats.years && (
            <div className="text-center px-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-heading text-2xl md:text-3xl text-slate-900">
                  <AnimatedCounter target={stats.years} label="" suffix="+" />
                </span>
              </div>
              <p className="font-body text-xs md:text-sm text-slate-500 mt-1">Jaar ervaring</p>
            </div>
          )}
          {stats.projects && (
            <div className="text-center px-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-heading text-2xl md:text-3xl text-slate-900">
                  <AnimatedCounter target={stats.projects} label="" suffix="+" />
                </span>
              </div>
              <p className="font-body text-xs md:text-sm text-slate-500 mt-1">Projecten</p>
            </div>
          )}
          {stats.reviews_count && (
            <div className="text-center px-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-heading text-2xl md:text-3xl text-slate-900">4.9</span>
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 2.1, type: 'spring' }} className="text-[#f59e0b] text-lg">★</motion.span>
              </div>
              <p className="font-body text-xs md:text-sm text-slate-500 mt-1">{stats.reviews_count} reviews</p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
