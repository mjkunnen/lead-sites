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
    { label: i.nav.gallery, href: "#gallerij" },
    { label: i.nav.reviews, href: "#reviews" },
    { label: i.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-stone-100"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className={`font-[family-name:var(--font-playfair)] text-xl font-bold transition-colors duration-300 ${scrolled ? "text-stone-900" : "text-white"}`}>
            {content.business_name}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-amber-700 ${
                  scrolled ? "text-stone-500" : "text-white/70"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={content.contact.booking_url || `tel:${content.contact.phone}`}
              target={content.contact.booking_url ? "_blank" : undefined}
              rel={content.contact.booking_url ? "noopener noreferrer" : undefined}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                scrolled
                  ? "bg-stone-900 text-white hover:bg-amber-800"
                  : "bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25"
              }`}
            >
              {i.nav.book}
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors ${scrolled ? "text-stone-900" : "text-white"}`}
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-stone-50 flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-stone-900"
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href={content.contact.booking_url || `tel:${content.contact.phone}`}
              target={content.contact.booking_url ? "_blank" : undefined}
              rel={content.contact.booking_url ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full bg-stone-900 px-8 py-4 text-lg font-semibold text-white"
            >
              {i.nav.bookMobile}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
