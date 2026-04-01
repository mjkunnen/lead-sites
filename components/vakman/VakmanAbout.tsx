'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanAbout({ content }: { content: SiteContent }) {
  if (!content.about) return null;

  const sentences = content.about.split('. ').filter(Boolean);

  return (
    <section id="over" className="mt-20 px-6 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">
          Over ons
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Vakmanschap als standaard
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {content.gallery?.[0] && (
          <motion.div
            className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={content.gallery[0].url}
              alt={content.gallery[0].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        <div className="space-y-4">
          {sentences.map((sentence, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`text-sm leading-relaxed ${i === 0 ? 'text-slate-900 font-medium text-base' : 'text-slate-500'}`}
            >
              {sentence}{sentence.endsWith('.') ? '' : '.'}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
