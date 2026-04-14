'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { t } from '@/lib/i18n';

const localeMap = { en: 'en-GB', nl: 'nl-NL', fr: 'fr-FR' } as const;

export default function VakmanUrgentieCTA({ content }: { content: SiteContent }) {
  const tr = t(content.lang);
  const phone = content.contact?.phone;
  const whatsapp = phone ? `https://wa.me/${phone.replace(/[\s\-\+]/g, '')}` : null;
  const slots = content.availability?.slots ?? 3;
  const locale = localeMap[content.lang ?? 'nl'] ?? 'nl-NL';
  const month = content.availability?.month === 'auto'
    ? new Date().toLocaleString(locale, { month: 'long' })
    : content.availability?.month ?? new Date().toLocaleString(locale, { month: 'long' });

  // Dynamic headline based on niche
  const niche = content.niche?.toLowerCase() ?? '';
  const nicheAction: Record<string, string> = {
    keuken: tr.vakman.nicheKeuken,
    keukenmontage: tr.vakman.nicheKeuken,
    schilder: tr.vakman.nicheSchilder,
    loodgieter: tr.vakman.nicheLoodgieter,
    timmerman: tr.vakman.nicheTimmerman,
    aannemer: tr.vakman.nicheAannemer,
    tegelzetter: tr.vakman.nicheTegelzetter,
    vloerlegger: tr.vakman.nicheVloerlegger,
    dakdekker: tr.vakman.nicheDakdekker,
    elektricien: tr.vakman.nicheElektricien,
    hovenier: tr.vakman.nicheHovenier,
    badkamer: tr.vakman.nicheBadkamer,
    installateur: tr.vakman.nicheInstallateur,
  };
  const headline = nicheAction[niche] || `${content.business_name} ${tr.vakman.nicheFallback}?`;

  return (
    <section className="mt-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="relative bg-gradient-to-br from-[#004ac6] to-[#0037a1] rounded-2xl p-8 text-white overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-white/5 blur-[40px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '-20%', right: '-10%' }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-white/5 blur-[30px]"
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ bottom: '-10%', left: '10%' }}
          />
        </div>

        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-bold uppercase tracking-wider">
              {tr.urgencyHeading1} {slots} {tr.vakman.urgencySpots} {tr.urgencyHeading3} {month}
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {headline}
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-6 max-w-md">
            {tr.vakman.urgencyDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {phone && (
              <motion.a
                href={`tel:${phone}`}
                className="flex-1 bg-white text-[#004ac6] py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tr.vakman.urgencyCallQuote}
              </motion.a>
            )}
            {whatsapp && (
              <motion.a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white/15 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/20"
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                WhatsApp
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
