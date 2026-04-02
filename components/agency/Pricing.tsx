"use client";

import { motion } from "framer-motion";
import { pricingPlans } from "@/lib/agency-data";

export default function Pricing() {
  return (
    <section id="prijzen" className="relative overflow-hidden bg-white/40 backdrop-blur-sm py-28 lg:py-36">
      <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#C1D6F9]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#52527A]/10 bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#52527A]">
            Prijzen
          </span>
          <h2 className="mt-6 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Transparante <span className="text-[#52527A]">prijzen</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-[#1a1a2e] shadow-xl shadow-[#1a1a2e]/15"
                  : "bg-[#FAFAFA] hover:bg-white hover:shadow-lg hover:shadow-[#52527A]/5"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#B9EACB] px-4 py-1 text-xs font-bold text-[#1a1a2e]">
                    Meest gekozen
                  </span>
                </div>
              )}

              <h3 className={`text-lg font-semibold ${plan.highlighted ? "text-white" : "text-[#1a1a2e]"}`}>{plan.name}</h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? "text-white/60" : "text-[#52527A]"}`}>{plan.description}</p>

              <div className="mt-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-[#1a1a2e]"}`}>{plan.price}</span>
                {plan.price !== "Op maat" && (
                  <span className={`ml-2 text-sm ${plan.highlighted ? "text-white/50" : "text-[#52527A]"}`}>eenmalig</span>
                )}
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <svg className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? "text-[#B9EACB]" : "text-[#52527A]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlighted ? "text-white/80" : "text-[#52527A]"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`group relative mt-8 block overflow-hidden rounded-full py-3.5 text-center text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-white text-[#1a1a2e] hover:shadow-lg"
                    : "bg-[#1a1a2e] text-white hover:shadow-lg hover:shadow-[#1a1a2e]/10"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
