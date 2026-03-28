"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";

export default function VakmanFAQ({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-3 text-sm font-medium tracking-widest text-[#2563eb]/50 uppercase mb-6">
            <span className="h-px w-8 bg-[#2563eb]/20" />
            {i.faq.label}
            <span className="h-px w-8 bg-[#2563eb]/20" />
          </div>
          <h2
            className="text-3xl font-bold text-slate-900 sm:text-5xl"
            style={{ fontFamily: "var(--p-font-heading)" }}
          >
            {i.faq.heading}
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {content.faq.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl transition-colors duration-300 ${
                  isOpen
                    ? "bg-[#0f172a]"
                    : "bg-[#f8fafc]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span
                    className={`text-base font-semibold transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#2563eb] text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14m7-7H5"
                      />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-300 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
