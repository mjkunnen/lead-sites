'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { t } from '@/lib/i18n';

export default function VakmanGoogleBadge({ content }: { content: SiteContent }) {
  const tr = t(content.lang);
  const totalReviews = content.stats?.reviews_count ?? content.reviews?.length ?? 0;
  const avgRating = content.reviews?.length > 0
    ? (content.reviews.reduce((sum, r) => sum + r.stars, 0) / content.reviews.length).toFixed(1)
    : '5.0';
  const mapsUrl = content.contact.maps_url;

  return (
    <section className="mt-16 px-6">
      <motion.a
        href={mapsUrl || '#reviews'}
        target={mapsUrl ? '_blank' : undefined}
        rel={mapsUrl ? 'noopener noreferrer' : undefined}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -2 }}
        className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 cursor-pointer group relative overflow-hidden"
      >
        {/* Google G icon */}
        <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 border border-slate-100">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>

        {/* Rating info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-black text-slate-900">{avgRating}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500">
            {tr.vakman.googleBadgeBasedOn} <span className="font-bold text-slate-700">{totalReviews} {tr.vakman.googleReviews}</span>
          </p>
        </div>

        {/* Arrow */}
        <svg className="w-5 h-5 text-slate-300 group-hover:text-[#004ac6] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.a>
    </section>
  );
}
