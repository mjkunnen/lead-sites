'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '@/lib/types';

export default function VakmanWhatsAppBubble({ content }: { content: SiteContent }) {
  const phone = content.contact?.phone;
  if (!phone) return null;

  const whatsapp = `https://wa.me/${phone.replace(/[\s\-\+]/g, '')}`;
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    const hideTooltip = setTimeout(() => setTooltip(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTooltip); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-24 md:bottom-8 right-5 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute bottom-full right-0 mb-3 bg-white rounded-xl shadow-lg px-4 py-2.5 whitespace-nowrap border border-slate-100"
              >
                <p className="text-sm font-semibold text-slate-900">Stel uw vraag via WhatsApp</p>
                <p className="text-[11px] text-slate-400">Reactie binnen 24 uur</p>
                {/* Triangle */}
                <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bubble */}
          <motion.a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.68-1.318A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.798-6.382-2.144l-.447-.334-2.786.784.852-2.669-.373-.476A9.958 9.958 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
          </motion.a>

          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
