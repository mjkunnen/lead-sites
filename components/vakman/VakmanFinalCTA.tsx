'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanFinalCTA({ content }: { content: SiteContent }) {
  const phone = content.contact?.phone;
  const whatsapp = phone ? `https://wa.me/${phone.replace(/[\s\-\+]/g, '')}` : null;
  const hasImage = content.gallery && content.gallery.length > 1;

  return (
    <section className="mt-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-end"
      >
        {/* Background image or gradient */}
        {hasImage ? (
          <>
            <img
              src={content.gallery![content.gallery!.length - 1].url}
              alt={content.business_name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#004ac6]/80" />
        )}

        <div className="relative z-10 p-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3"
          >
            Klaar om te beginnen?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white/70 mb-6 max-w-sm mx-auto"
          >
            Neem vandaag nog contact op voor een vrijblijvende offerte. Wij reageren binnen 24 uur.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            {phone && (
              <motion.a
                href={`tel:${phone}`}
                whileTap={{ scale: 0.97 }}
                className="vakman-shimmer-btn flex-1 bg-white text-[#0f172a] py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Bel direct
              </motion.a>
            )}
            {whatsapp && (
              <motion.a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="flex-1 bg-white/15 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-white/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
                WhatsApp
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
