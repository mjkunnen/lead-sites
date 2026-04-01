'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanFAQ({ content }: { content: SiteContent }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="mt-20 px-6 scroll-mt-20">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">
          FAQ
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Veelgestelde vragen
        </h2>
      </motion.div>
      <div className="space-y-4">
        {content.faq.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`bg-white rounded-xl shadow-sm overflow-hidden transition-shadow ${
                isOpen ? 'shadow-md ring-1 ring-[#004ac6]/10' : ''
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex items-center justify-between p-5 w-full text-left font-bold text-slate-900"
              >
                {item.question}
                <motion.svg
                  className="w-5 h-5 text-slate-400 shrink-0 ml-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
