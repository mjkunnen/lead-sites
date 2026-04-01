'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanProjects({ content }: { content: SiteContent }) {
  const gallery = content.gallery;
  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="projecten" className="mt-20 px-6 scroll-mt-20">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">
          Portfolio
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Recent werk
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {gallery.map((item, i) => {
          const isLarge = i === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-xl overflow-hidden group ${
                isLarge ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-bold">{item.alt}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
