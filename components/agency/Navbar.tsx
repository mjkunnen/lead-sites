"use client";

import { useState, useEffect } from "react";
import { navLinks } from "@/lib/agency-data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 shadow-sm backdrop-blur-xl border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold text-[#1a1a2e]">
            Netjes<span className="text-[#52527A]">Online</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-urbanist)] text-sm text-[#52527A] transition-colors hover:text-[#1a1a2e]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-[#1a1a2e] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2a2a4e] hover:shadow-lg hover:shadow-[#1a1a2e]/10"
            >
              Gratis adviesgesprek
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span className={`h-0.5 w-6 bg-[#1a1a2e] transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-[#1a1a2e] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-[#1a1a2e] transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white">
          <button onClick={() => setMenuOpen(false)} className="absolute right-6 top-6 text-[#52527A]" aria-label="Sluiten">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-2xl font-semibold text-[#1a1a2e]">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-4 rounded-full bg-[#1a1a2e] px-8 py-3 text-lg font-semibold text-white">
            Gratis adviesgesprek
          </a>
        </div>
      )}
    </>
  );
}
