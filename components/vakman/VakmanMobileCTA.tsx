'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '@/lib/types';

export default function VakmanMobileCTA({ content }: { content: SiteContent }) {
  const phone = content.contact?.phone;
  const whatsapp = phone ? `https://wa.me/${phone.replace(/[\s\-\+]/g, '')}` : null;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!phone && !whatsapp) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/90 backdrop-blur-lg shadow-[0_-8px_32px_rgba(0,0,0,0.06)] rounded-t-3xl border-t border-slate-100 md:hidden"
        >
          {phone && (
            <motion.a
              href={`tel:${phone}`}
              className="flex flex-col items-center justify-center text-[#004ac6] py-3 w-full"
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-7 h-7 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-widest">Bel Nu</span>
            </motion.a>
          )}
          {whatsapp && (
            <motion.a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-[#006e2f] text-white rounded-2xl py-3 w-full mx-2 shadow-lg shadow-green-900/20"
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-7 h-7 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-widest">WhatsApp</span>
            </motion.a>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
