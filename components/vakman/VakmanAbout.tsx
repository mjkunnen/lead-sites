'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '@/lib/types';

function FloatingIcon({ children, delay, duration, className = '' }: { children: React.ReactNode; delay: number; duration: number; className?: string }) {
  return (
    <motion.div
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-[#b45309] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function VakmanAbout({ content }: { content: SiteContent }) {
  if (!content.about) return null;

  const sentences = content.about.split('. ');

  return (
    <motion.section
      id="over"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4"
    >
      <div className="max-w-4xl mx-auto relative">
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-amber-50/50 p-8 md:p-12 relative overflow-hidden">
          {/* Floating icons - positioned at corners */}
          <FloatingIcon delay={0} duration={4} className="top-4 left-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </FloatingIcon>
          <FloatingIcon delay={1.5} duration={5} className="top-6 right-8">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </FloatingIcon>
          <FloatingIcon delay={0.8} duration={4.5} className="bottom-8 right-16">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </FloatingIcon>

          <div className="relative z-10 max-w-xl">
            <span className="font-subheading text-xs font-semibold text-[#b45309] uppercase tracking-wider mb-4 block">Over ons</span>
            <h2 className="font-heading text-2xl md:text-3xl text-slate-900 mb-6">{content.business_name}</h2>
            <div className="font-body text-[15px] text-slate-600 leading-relaxed space-y-4">
              {sentences.map((sentence, i) => (
                <p key={i} className={i === 0 ? 'font-medium text-slate-700' : ''}>
                  {sentence}{i < sentences.length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
