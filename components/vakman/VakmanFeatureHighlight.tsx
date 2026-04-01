'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanFeatureHighlight({ content }: { content: SiteContent }) {
  const phone = content.contact?.phone;
  const topReview = content.reviews?.[0];

  return (
    <section className="mt-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#0f172a] rounded-2xl overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#004ac6]/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#004ac6]/5 rounded-full blur-[60px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          {/* Floating shapes */}
          <motion.div
            className="absolute w-3 h-3 rounded-full border border-white/10"
            animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '20%', right: '15%' }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-sm bg-white/5"
            animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -90, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '60%', right: '25%' }}
          />
          <motion.div
            className="absolute w-4 h-4 rounded-full border border-[#004ac6]/20"
            animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ bottom: '25%', left: '20%' }}
          />
        </div>

        <div className="relative z-10 p-8">
          {/* Mini stats row */}
          <div className="flex gap-6 mb-8">
            <div>
              <span className="text-3xl font-black text-white">{content.stats?.projects ?? '100'}+</span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Projecten</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <span className="text-3xl font-black text-white">{content.stats?.years ?? '5'}+</span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Jaar actief</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <span className="text-3xl font-black text-white">24u</span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Reactietijd</p>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
            Vakwerk waar u op kunt vertrouwen
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-md">
            {content.about
              ? content.about.split('.').slice(0, 2).join('.') + '.'
              : `${content.business_name} staat voor kwaliteit en betrouwbaarheid.`
            }
          </p>

          {/* Steps */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {['We komen langs', 'We bekijken de situatie', 'We gaan aan het werk', 'U geniet van het resultaat'].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-[#004ac6]/20 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs text-slate-300">{step}</span>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          {topReview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
            >
              <p className="text-sm text-slate-300 italic leading-relaxed mb-3 line-clamp-3">
                &ldquo;{topReview.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#004ac6]/30 flex items-center justify-center text-[10px] font-bold text-white">
                  {topReview.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-white">{topReview.name}</span>
              </div>
            </motion.div>
          )}

          {/* CTA */}
          {phone && (
            <motion.a
              href={`tel:${phone}`}
              whileTap={{ scale: 0.97 }}
              className="vakman-shimmer-btn mt-6 w-full bg-[#004ac6] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Neem contact op
            </motion.a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
