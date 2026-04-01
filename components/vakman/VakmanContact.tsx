'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

export default function VakmanContact({ content }: { content: SiteContent }) {
  const phone = content.contact?.phone;
  const whatsapp = phone ? `https://wa.me/${phone.replace(/[\s\-\+]/g, '')}` : null;
  const address = content.contact.address ?? content.contact.city;
  const mapsQuery = encodeURIComponent(`${content.business_name} ${address}`);
  const mapsLink = content.contact.maps_url || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <section id="contact" className="mt-20 px-6 mb-12 scroll-mt-20">
      {/* Google Maps embed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden mb-6 shadow-sm"
      >
        <iframe
          src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          className="w-full h-[220px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Locatie ${content.business_name}`}
        />
      </motion.div>

      {/* Contact card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Neem contact op</h2>

          <div className="space-y-5 mb-8">
            {content.contact.address && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm">Locatie</p>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-white transition-colors underline underline-offset-2">
                    {content.contact.address}
                  </a>
                </div>
              </div>
            )}

            {content.working_hours && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm">Werktijden</p>
                  {Object.entries(content.working_hours).map(([day, hours]) => (
                    <p key={day} className="text-slate-400 text-sm">{day}: {hours}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {phone && (
              <motion.a
                href={`tel:${phone}`}
                className="vakman-shimmer-btn w-full bg-[#004ac6] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Bel direct
              </motion.a>
            )}
            {whatsapp && (
              <motion.a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="vakman-shimmer-btn w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                WhatsApp nu
              </motion.a>
            )}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/10 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Routebeschrijving
            </a>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#004ac6]/10 rounded-full blur-[60px]" />
      </motion.div>
    </section>
  );
}
