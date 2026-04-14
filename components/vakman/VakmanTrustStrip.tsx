'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { t } from '@/lib/i18n';

export default function VakmanTrustStrip({ content }: { content: SiteContent }) {
  const tr = t(content.lang);
  const badges = content.trust_badges ?? [
    `${content.stats?.reviews_count ?? content.reviews.length}x ${tr.vakman.trustBadgeReviewsSuffix}`,
    tr.vakman.trustBadgeExperience,
    tr.vakman.trustBadgeFreeQuote,
    tr.vakman.trustBadgeResponse,
  ];

  const icons = [
    <svg key="star" className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    <svg key="verified" className="w-4 h-4 text-[#004ac6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
    <svg key="quote" className="w-4 h-4 text-[#004ac6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
    <svg key="speed" className="w-4 h-4 text-[#004ac6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  ];

  // Double the badges for infinite marquee
  const allBadges = [...badges, ...badges];

  return (
    <section className="bg-[#f2f4f6] py-6 overflow-hidden">
      <motion.div
        className="flex flex-nowrap gap-4 px-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {allBadges.map((badge, i) => (
          <div
            key={i}
            className="whitespace-nowrap bg-white px-4 py-2 rounded-full border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-700 shrink-0"
          >
            {icons[i % icons.length]}
            {badge}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
