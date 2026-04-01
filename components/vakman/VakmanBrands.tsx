'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanBrands({ content }: { content: SiteContent }) {
  const brands = (content as any).brands as string[] | undefined;
  if (!brands || brands.length === 0) return null;

  const doubled = [...brands, ...brands];

  return (
    <section className="mt-20 py-12 bg-[#f2f4f6] overflow-hidden">
      <motion.div
        className="px-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">
          Ervaring met
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Merken waar wij mee werken
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f2f4f6] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f2f4f6] to-transparent z-10" />
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-white px-8 py-4 rounded-xl shadow-sm border border-slate-100 shrink-0"
            >
              <span className="text-sm font-bold text-slate-600 tracking-wide">{brand}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
