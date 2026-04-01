'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanReviews({ content }: { content: SiteContent }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="reviews" className="mt-20 scroll-mt-20">
      <div className="px-6">
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">
              Referenties
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Wat klanten zeggen
            </h2>
          </div>
          <div className="text-right shrink-0 ml-4">
            <div className="flex justify-end gap-0.5 text-amber-500">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400">{content.stats?.reviews_count ?? content.reviews.length} REVIEWS</span>
          </div>
        </motion.div>

        {/* Scroll progress */}
        <div className="h-0.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
          <motion.div className="h-full bg-[#004ac6] rounded-full" style={{ width: progressWidth }} />
        </div>
      </div>

      {/* Horizontal slider */}
      <div ref={scrollRef} className="flex overflow-x-auto gap-4 pb-4 pl-6 pr-6 no-scrollbar snap-x snap-mandatory">
        {content.reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
            className="min-w-[280px] max-w-[300px] bg-white p-5 rounded-xl shadow-sm border border-slate-50 shrink-0 snap-start"
          >
            <div className="flex gap-0.5 text-amber-500 mb-2">
              {Array.from({ length: review.stars }, (_, j) => (
                <svg key={j} className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-4">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6] text-[10px] font-bold">
                {review.name.charAt(0)}
              </div>
              <span className="font-bold text-slate-900 text-xs">{review.name}</span>
              {review.date && <span className="text-[10px] text-slate-400">{review.date}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
