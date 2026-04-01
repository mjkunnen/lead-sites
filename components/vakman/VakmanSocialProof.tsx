'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { t } from '@/lib/i18n';

export default function VakmanSocialProof({ content }: { content: SiteContent }) {
  const labels = t(content.lang);
  const rating = 4.9;
  const reviewCount = content.stats?.reviews_count ?? content.reviews?.length ?? 0;
  const projects = content.stats?.projects ?? 0;
  const years = content.stats?.years ?? 0;

  const badges = [
    { icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ), text: `${rating} sterren`, highlight: true },
    reviewCount > 0 ? { icon: (
      <svg className="w-3.5 h-3.5 text-[#eab308]" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ), text: `${reviewCount} reviews` } : null,
    projects > 0 ? { icon: (
      <svg className="w-3.5 h-3.5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ), text: `${projects}+ projecten` } : null,
    years > 0 ? { icon: (
      <svg className="w-3.5 h-3.5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ), text: `${years}+ jaar` } : null,
  ].filter(Boolean) as Array<{ icon: React.ReactNode; text: string; highlight?: boolean }>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="bg-[#f7f9fb] py-4"
    >
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06, ease: [0.25, 1, 0.5, 1] }}
              className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-[12px] font-medium text-[#0f172a]"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              {badge.icon}
              <span>{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
