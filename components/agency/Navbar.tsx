"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/agency-data";
import ShimmerButton from "./ui/ShimmerButton";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 100);
      setScrolled(y > 50);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed left-4 right-4 top-4 z-[100] rounded-2xl px-6 py-3 transition-colors duration-300 md:left-6 md:right-6 ${
          scrolled
            ? "border border-[rgba(255,255,255,0.08)] bg-[#050816]/80 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-tight"
          >
            Netjes<span className="text-[#6366F1]">Online</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-[#94A3B8] transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <ShimmerButton href="#contact" className="px-5 py-2.5 text-sm">
              Gratis adviesgesprek
            </ShimmerButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 bg-[#050816]/95 backdrop-blur-xl"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="font-[family-name:var(--font-playfair)] text-3xl font-bold"
              >
                {link.label}
              </motion.a>
            ))}
            <ShimmerButton
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4"
            >
              Gratis adviesgesprek
            </ShimmerButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
