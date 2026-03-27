"use client";

import { motion } from "framer-motion";
import { pricingPlans } from "@/lib/agency-data";

export default function Pricing() {
  return (
    <section id="prijzen" className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 sm:text-4xl">
            Transparante prijzen
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Geen verborgen kosten. U weet precies waar u aan toe bent.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-xl bg-white p-8 shadow-sm ${
                plan.highlighted
                  ? "ring-2 ring-blue-600 shadow-md"
                  : "border border-gray-100"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                    Meest gekozen
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{plan.description}</p>

              <div className="mt-6">
                <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm text-gray-500">eenmalig</span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 block rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Liever een maandelijks pakket?{" "}
          <a href="#contact" className="font-medium text-blue-600 hover:text-blue-700">
            Vanaf €99/maand all-inclusive
          </a>
        </p>
      </div>
    </section>
  );
}
