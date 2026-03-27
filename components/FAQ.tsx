"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteContent } from "@/lib/types";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left text-lg font-semibold text-slate-900 transition-colors hover:text-slate-600"
      >
        {question}
        <svg
          className={`ml-4 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
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
            <p className="pb-6 text-slate-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">FAQ</span>
          <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-slate-900 sm:text-4xl">
            Veelgestelde vragen
          </h2>
        </motion.div>
        <div className="mt-12">
          {content.faq.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
