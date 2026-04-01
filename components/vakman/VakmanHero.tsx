'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanHero({ content }: { content: SiteContent }) {
  const phone = content.contact?.phone;
  const whatsapp = phone ? `https://wa.me/${phone.replace(/[\s\-\+]/g, '')}` : null;

  return (
    <section className="relative min-h-[80dvh] flex flex-col justify-end overflow-hidden">
      {/* Background image — native img for reliability */}
      <img
        src={content.hero.image_url}
        alt={content.business_name}
        className="absolute inset-0 w-full h-full object-cover"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      {/* Clean dark gradient — stronger at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 px-6 pb-10 max-w-xl">
        {content.tagline && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
              {content.tagline}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[32px] md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
        >
          {content.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[15px] text-white/80 leading-relaxed mb-8 max-w-sm"
        >
          {content.hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="flex gap-3"
        >
          {phone && (
            <a
              href={`tel:${phone}`}
              className="vakman-shimmer-btn flex-1 bg-[#004ac6] text-white py-4 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,74,198,0.35)] active:scale-95 transition-transform"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Bel direct
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="vakman-shimmer-btn flex-1 bg-[#25D366] text-white py-4 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(37,211,102,0.3)] active:scale-95 transition-transform"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              WhatsApp
            </a>
          )}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
