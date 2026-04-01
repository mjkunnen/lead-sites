'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanPreloader({ content }: { content: SiteContent }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show on first visit
    if (sessionStorage.getItem('preloader_done')) {
      setShow(false);
      return;
    }

    const start = performance.now();
    const duration = 1800;
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setShow(false);
          sessionStorage.setItem('preloader_done', '1');
        }, 300);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[100] bg-[#0f172a] flex flex-col items-center justify-center"
        >
          {/* Logo / Business name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <span className="text-2xl font-extrabold text-white tracking-tight">
              {content.business_name}
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#004ac6] rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* City */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3 }}
            className="text-[11px] text-white/40 uppercase tracking-[0.2em] mt-4"
          >
            {content.contact.city}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
