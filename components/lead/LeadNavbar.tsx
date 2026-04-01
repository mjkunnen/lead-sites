"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";

export default function LeadNavbar({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isVakman = content.palette === "vakman";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 400 && y > lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const links = [
    { label: i.nav.about, href: "#over" },
    { label: i.nav.services, href: "#diensten" },
    ...(isVakman ? [{ label: i.vakman.projectsLabel, href: "#projecten" }] : [{ label: i.nav.gallery, href: "#gallerij" }]),
    { label: i.nav.reviews, href: "#reviews" },
    { label: i.nav.contact, href: "#contact" },
  ];

  const ctaLabel = isVakman ? i.vakman.ctaQuote : i.nav.book;
  const ctaHref = isVakman
    ? (content.contact.phone ? `https://wa.me/${content.contact.phone.replace(/[^0-9+]/g, "")}` : content.contact.maps_url)
    : (content.contact.booking_url || `tel:${content.contact.phone}`);
  const ctaExternal = isVakman || !!content.contact.booking_url;

  const phoneDisplay = content.contact.phone;
  const phoneHref = `tel:${content.contact.phone}`;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isVakman
              ? "bg-white/90 backdrop-blur-2xl border-b border-slate-100/50"
              : "bg-white/90 backdrop-blur-xl shadow-sm border-b border-stone-100"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo / Business name */}
          <a
            href="#"
            className={`text-xl font-bold transition-colors duration-300 ${
              isVakman
                ? `font-heading text-slate-900`
                : `font-[family-name:var(--font-playfair)] ${scrolled ? "text-stone-900" : "text-white"}`
            }`}
          >
            {content.business_name}
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isVakman
                    ? `font-body text-slate-600 hover:text-slate-900`
                    : `hover:text-amber-700 ${scrolled ? "text-stone-500" : "text-white/70"}`
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Phone number — vakman only, visible sm+ */}
            {isVakman && phoneDisplay && (
              <a
                href={phoneHref}
                className={`hidden font-subheading text-sm font-semibold transition-colors sm:inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {phoneDisplay}
              </a>
            )}

            {/* CTA button */}
            <a
              href={ctaHref}
              target={ctaExternal ? "_blank" : undefined}
              rel={ctaExternal ? "noopener noreferrer" : undefined}
              className={`relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                isVakman
                  ? `font-subheading bg-[#2563eb] text-white hover:bg-[#1d4ed8]`
                  : scrolled
                    ? "bg-stone-900 text-white hover:bg-amber-800"
                    : "bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25"
              }`}
            >
              {ctaLabel}
              {isVakman && (
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isVakman ? "text-slate-900" : scrolled ? "text-stone-900" : "text-white"
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden ${
              isVakman ? "bg-white" : "bg-stone-50"
            }`}
          >
            {links.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                onClick={() => setMenuOpen(false)}
                className={`text-3xl font-bold ${
                  isVakman ? "font-heading text-slate-900" : "font-[family-name:var(--font-playfair)] text-stone-900"
                }`}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Phone in mobile menu — vakman only */}
            {isVakman && phoneDisplay && (
              <a
                href={phoneHref}
                onClick={() => setMenuOpen(false)}
                className="font-subheading text-lg font-semibold text-slate-700 flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {phoneDisplay}
              </a>
            )}

            <a
              href={ctaHref}
              target={ctaExternal ? "_blank" : undefined}
              rel={ctaExternal ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`relative overflow-hidden mt-4 rounded-full px-8 py-4 text-lg font-semibold ${
                isVakman
                  ? "bg-[#2563eb] text-white font-subheading"
                  : "bg-stone-900 text-white"
              }`}
            >
              {isVakman ? i.vakman.ctaQuote : i.nav.bookMobile}
              {isVakman && (
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
