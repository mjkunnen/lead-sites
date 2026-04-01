'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { VakmanIcon } from './VakmanIcons';

const serviceIcons: Record<string, string> = {
  keukenmontage: 'kitchen',
  montage: 'kitchen',
  kitwerk: 'sparkles',
  afwerking: 'sparkles',
  apparatuur: 'wrench',
  installatie: 'wrench',
  interieurbouw: 'palette',
  interieur: 'palette',
  maatwerk: 'ruler',
};

function getIconName(title: string, fallback: string): string {
  const lower = title.toLowerCase();
  for (const [key, icon] of Object.entries(serviceIcons)) {
    if (lower.includes(key)) return icon;
  }
  return fallback;
}

export default function VakmanServices({ content }: { content: SiteContent }) {
  return (
    <section id="diensten" className="mt-20 px-6 scroll-mt-20">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">
          Diensten
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Wat wij doen
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {content.services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
            whileHover={{ y: -3, boxShadow: '0 8px 25px rgba(0,0,0,0.06)' }}
            className="bg-white p-5 rounded-xl shadow-sm group"
          >
            <motion.div
              className="w-10 h-10 bg-[#004ac6]/5 rounded-lg flex items-center justify-center text-[#004ac6] mb-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <VakmanIcon name={getIconName(service.title, service.icon)} className="h-5 w-5" />
            </motion.div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#004ac6] transition-colors">
              {service.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
