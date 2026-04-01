'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanTrustBadges({ content }: { content: SiteContent }) {
  const badges = [
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, label: 'Verzekerd', sub: 'Bedrijfsaansprakelijkheid' },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, label: 'KvK geregistreerd', sub: 'Officieel bedrijf' },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>, label: 'Beoordeeld', sub: `${content.stats?.reviews_count ?? content.reviews.length}+ reviews` },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: 'Snel geregeld', sub: 'Reactie binnen 24 uur' },
  ];

  return (
    <section className="mt-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">Zekerheid</span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">U kunt op ons rekenen</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#004ac6]/5 flex items-center justify-center text-[#004ac6] shrink-0 group-hover:bg-[#004ac6]/10 transition-colors">
              {badge.icon}
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block leading-tight">{badge.label}</span>
              <span className="text-[11px] text-slate-400">{badge.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
