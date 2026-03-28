"use client";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";

function ContactCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="rounded-2xl bg-[#1e293b] border border-slate-700/50 p-6 transition-all duration-300 hover:border-slate-600/50"
    >
      {children}
    </motion.div>
  );
}

export default function VakmanContact({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const phone = content.contact.phone;
  const cleanPhone = phone?.replace(/[^0-9]/g, "");
  const whatsappUrl = phone ? `https://wa.me/${cleanPhone}` : null;

  return (
    <section id="contact" className="relative bg-[#0f172a] py-20 sm:py-32 overflow-hidden">
      {/* Subtle gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-3 text-sm font-medium tracking-widest text-blue-400/50 uppercase mb-6">
            <span className="h-px w-8 bg-blue-500/20" />
            {i.contact.label}
            <span className="h-px w-8 bg-blue-500/20" />
          </div>
          <h2
            className="font-heading text-3xl font-bold text-white sm:text-5xl"
          >
            {i.contact.heading1}{" "}
            <span className="text-[#2563eb]">{i.contact.heading2}</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            {i.contact.subtext}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Primary CTA — full width */}
          <motion.a
            href={whatsappUrl || content.contact.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group sm:col-span-2 lg:col-span-3 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] p-8 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-[0_0_30px_rgba(37,99,235,0.3)] animate-[cta-glow_3s_ease-in-out_infinite]"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{i.vakman.ctaQuote}</h3>
                <p className="mt-1 text-blue-100/60">{i.contact.subtext}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white transition-transform group-hover:scale-110 group-hover:translate-x-1">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </motion.a>

          {/* Phone */}
          {phone && (
            <ContactCard delay={0.05}>
              <a href={`tel:${cleanPhone}`} className="group block">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4 transition-all group-hover:scale-110">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{i.contact.phone}</p>
                <p className="mt-1 text-lg font-semibold text-white">{phone}</p>
              </a>
            </ContactCard>
          )}

          {/* WhatsApp */}
          {whatsappUrl && (
            <ContactCard delay={0.1}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-xl animate-ping bg-emerald-400/20" style={{ animationDuration: "2s" }} />
                  <svg className="relative h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <p className="text-xs text-emerald-400/50 uppercase tracking-wider">{i.contact.whatsapp}</p>
                <p className="mt-1 text-lg font-semibold text-white">{i.contact.whatsappCta}</p>
              </a>
            </ContactCard>
          )}

          {/* Email */}
          {content.contact.email && (
            <ContactCard delay={0.15}>
              <a href={`mailto:${content.contact.email}`} className="group block">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4 transition-all group-hover:scale-110">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{i.contact.email}</p>
                <p className="mt-1 text-lg font-semibold text-white">{content.contact.email}</p>
              </a>
            </ContactCard>
          )}

          {/* Location */}
          <ContactCard delay={0.2}>
            <a
              href={content.contact.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4 transition-all group-hover:scale-110">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{i.contact.location}</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {content.contact.address || content.contact.city}
              </p>
            </a>
          </ContactCard>

          {/* Working hours */}
          {content.working_hours && Object.keys(content.working_hours).length > 0 && (
            <ContactCard delay={0.25}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
                {content.lang === "nl" ? "Openingstijden" : "Opening hours"}
              </p>
              <div className="space-y-1.5">
                {Object.entries(content.working_hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-slate-400">{day}</span>
                    <span className="font-medium text-white">{hours}</span>
                  </div>
                ))}
              </div>
            </ContactCard>
          )}
        </div>
      </div>
    </section>
  );
}
