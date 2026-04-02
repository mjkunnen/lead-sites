"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/lib/agency-data";

function FAQItem({ item, isOpen, toggle }: { item: typeof faqItems[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-[#52527A]/8">
      <button onClick={toggle} className="flex w-full items-center justify-between py-5 text-left">
        <span className="pr-8 text-base font-medium text-[#1a1a2e]">{item.question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-5 w-5 shrink-0 text-[#52527A]"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-[family-name:var(--font-urbanist)] text-sm leading-relaxed text-[#52527A]">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-transparent py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#52527A]/10 bg-white px-4 py-1.5 text-sm font-medium text-[#52527A] shadow-sm">
            FAQ
          </span>
          <h2 className="mt-6 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">Veelgestelde vragen</h2>
        </motion.div>

        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
          {faqItems.map((item, i) => (
            <FAQItem key={i} item={item} isOpen={openIndex === i} toggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
