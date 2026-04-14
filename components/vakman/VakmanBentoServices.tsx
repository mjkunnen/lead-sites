'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { VakmanIcon } from './VakmanIcons';
import { t } from '@/lib/i18n';

export default function VakmanBentoServices({ content }: { content: SiteContent }) {
  const tr = t(content.lang);
  return (
    <section id="diensten" className="mt-20 px-6 scroll-mt-20">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">{tr.vakman.servicesLabel}</span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">{tr.vakman.servicesHeading}</h2>
      </motion.div>

      <div className="space-y-4">
        {content.services.map((service, i) => {
          const isReversed = i % 2 !== 0;
          const hasImage = content.gallery?.[i];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className={`flex ${isReversed ? 'flex-row-reverse' : 'flex-row'} gap-4 bg-white rounded-2xl overflow-hidden shadow-sm group ${hasImage ? 'min-h-[160px]' : 'p-6'}`}
            >
              {/* Image side */}
              {hasImage && (
                <div className="relative w-2/5 shrink-0 overflow-hidden">
                  <img
                    src={hasImage.url}
                    alt={hasImage.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
                </div>
              )}

              {/* Content side */}
              <div className={`flex-1 flex flex-col justify-center ${hasImage ? 'p-5' : ''}`}>
                <motion.div
                  className="w-9 h-9 bg-[#004ac6]/5 rounded-lg flex items-center justify-center text-[#004ac6] mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <VakmanIcon name={service.icon || 'default'} className="h-4 w-4" />
                </motion.div>
                <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#004ac6] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{service.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
