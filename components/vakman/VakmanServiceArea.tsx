'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { t } from '@/lib/i18n';

export default function VakmanServiceArea({ content }: { content: SiteContent }) {
  const tr = t(content.lang);
  const city = content.contact.city;

  return (
    <section className="mt-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-8 overflow-hidden"
      >
        {/* Animated radar */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-32 h-32 rounded-full border-2 border-[#004ac6]/10"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-[#004ac6] shadow-lg shadow-[#004ac6]/30"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center">
          <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">
            {tr.vakman.serviceAreaLabel}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1 mb-3">
            {city} {tr.vakman.serviceAreaSuffix}
          </h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {tr.vakman.serviceAreaDesc1} {city} {tr.vakman.serviceAreaDesc2}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
