"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`rounded-2xl border transition-all duration-300 ${
        open ? "border-amber-200/60 bg-white shadow-lg shadow-amber-900/5" : "border-transparent hover:bg-white/60"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 sm:px-8 py-5 sm:py-6 text-left"
      >
        <span className="text-base sm:text-lg font-semibold text-stone-900 pr-4">{question}</span>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          open ? "bg-amber-800 text-white rotate-180" : "bg-stone-100 text-stone-400"
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
            <p className="px-5 sm:px-8 pb-5 sm:pb-6 text-sm sm:text-base text-stone-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LeadFAQ({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  return (
    <section className="bg-stone-50 py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 text-sm font-medium tracking-widest text-amber-700/60 uppercase mb-6">
            <span className="h-px w-8 bg-amber-600/30" />
            {i.faq.label}
            <span className="h-px w-8 bg-amber-600/30" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-stone-900 sm:text-5xl">
            {i.faq.heading}
          </h2>
        </motion.div>
        <div className="flex flex-col gap-3">
          {content.faq.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
