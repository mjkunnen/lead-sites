"use client";

import { motion } from "framer-motion";
import { pricingPlans } from "@/lib/agency-data";
import TiltCard from "./ui/TiltCard";
import WordReveal from "./WordReveal";
import StaggerReveal from "./StaggerReveal";

export default function Pricing() {
  return (
    <section id="prijzen" className="relative overflow-hidden bg-gray-50 py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute -right-20 bottom-40 h-80 w-80 rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
            Prijzen
          </span>
          <WordReveal text="Transparante prijzen" className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl" />
          <p className="mt-4 text-lg text-gray-600">
            Geen verborgen kosten. U weet precies waar u aan toe bent.
          </p>
        </motion.div>

        <StaggerReveal className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <TiltCard
              key={i}
              className={`relative flex h-full flex-col rounded-2xl p-8 transition-shadow duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-blue-600 to-indigo-700 shadow-xl shadow-blue-200"
                  : "border border-gray-100 bg-white shadow-sm hover:shadow-lg"
              }`}
            >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold text-yellow-900 shadow-lg">
                      Meest gekozen
                    </span>
                  </div>
                )}

                <h3 className={`text-lg font-semibold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-sm ${plan.highlighted ? "text-blue-100" : "text-gray-500"}`}>
                  {plan.description}
                </p>

                <div className="mt-6">
                  <span className={`font-[family-name:var(--font-playfair)] text-5xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-2 text-sm ${plan.highlighted ? "text-blue-200" : "text-gray-500"}`}>
                    eenmalig
                  </span>
                </div>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <svg
                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? "text-blue-200" : "text-blue-600"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.highlighted ? "text-blue-50" : "text-gray-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`group relative mt-8 block overflow-hidden rounded-xl py-3.5 text-center text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-white text-blue-600 shadow-lg hover:shadow-xl"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              </TiltCard>
          ))}
        </StaggerReveal>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center text-sm text-gray-500"
        >
          Liever een maandelijks pakket?{" "}
          <a href="#contact" className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2">
            Vanaf €99/maand all-inclusive
          </a>
        </motion.p>
      </div>
    </section>
  );
}
