"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";

function FAQItem({ question, answer, index, isVakman }: { question: string; answer: string; index: number; isVakman: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`rounded-2xl border transition-all duration-300 ${
        isVakman
          ? open
            ? "border-[var(--p-accent)]/30 bg-[var(--p-bg-card)] shadow-lg"
            : "border-transparent hover:bg-[var(--p-bg-card)]"
          : open
            ? "border-amber-200/60 bg-white shadow-lg shadow-amber-900/5"
            : "border-transparent hover:bg-white/60"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 sm:px-8 py-5 sm:py-6 text-left"
      >
        <span className={`text-base sm:text-lg font-semibold pr-4 ${
          isVakman ? "text-[var(--p-text-primary)]" : "text-stone-900"
        }`}>{question}</span>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          isVakman
            ? open ? "bg-[var(--p-accent)] text-white rotate-180" : "bg-white/10 text-[var(--p-text-muted)]"
            : open ? "bg-amber-800 text-white rotate-180" : "bg-stone-100 text-stone-400"
        }`}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`px-5 sm:px-8 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed ${
              isVakman ? "text-[var(--p-text-muted)]" : "text-stone-500"
            }`}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LeadFAQ({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const isVakman = content.palette === "vakman";

  return (
    <section className={`py-20 sm:py-32 ${isVakman ? "bg-[var(--p-bg-primary)]" : "bg-stone-50"}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={isVakman ? "mb-16" : "text-center mb-16"}
        >
          {isVakman ? (
            <>
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--p-accent)]">
                {i.faq.label}
              </span>
              <h2
                className="mt-3 text-3xl font-bold text-[var(--p-text-primary)] sm:text-4xl"
                style={{ fontFamily: "var(--p-font-heading)" }}
              >
                {i.faq.heading}
              </h2>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-3 text-sm font-medium tracking-widest text-amber-700/60 uppercase mb-6">
                <span className="h-px w-8 bg-amber-600/30" />
                {i.faq.label}
                <span className="h-px w-8 bg-amber-600/30" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-stone-900 sm:text-5xl">
                {i.faq.heading}
              </h2>
            </>
          )}
        </motion.div>
        <div className="flex flex-col gap-3">
          {content.faq.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} index={i} isVakman={isVakman} />
          ))}
        </div>
      </div>
    </section>
  );
}
