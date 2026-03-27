"use client";

import { motion } from "framer-motion";
import { pricingPlans } from "@/lib/agency-data";
import GlassCard from "./ui/GlassCard";
import ShimmerButton from "./ui/ShimmerButton";
import MagneticButton from "./ui/MagneticButton";
import LampEffect from "./ui/LampEffect";

export default function Pricing() {
  return (
    <section id="prijzen" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <LampEffect>
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
            Transparante prijzen
          </h2>
        </LampEffect>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={plan.highlighted ? "lg:-mt-4 lg:mb-4" : ""}
            >
              <GlassCard
                hover={true}
                className={`relative flex flex-col p-8 ${
                  plan.highlighted
                    ? "border-[rgba(99,102,241,0.4)] shadow-[0_0_40px_rgba(99,102,241,0.15)]"
                    : ""
                }`}
              >
                {/* Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="relative inline-flex items-center rounded-full bg-[#6366F1] px-4 py-1 text-xs font-semibold overflow-hidden">
                      <span className="absolute inset-0 animate-[shimmer_3s_infinite]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />
                      <span className="relative">Meest gekozen</span>
                    </span>
                  </div>
                )}

                {/* Plan info */}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-[#94A3B8]">{plan.description}</p>

                <div className="mt-6">
                  <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-sm text-[#94A3B8]">eenmalig</span>
                </div>

                {/* Features */}
                <ul className="mt-8 flex flex-col gap-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#6366F1]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#94A3B8]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  {plan.highlighted ? (
                    <ShimmerButton href="#contact" className="w-full">
                      {plan.cta}
                    </ShimmerButton>
                  ) : (
                    <MagneticButton href="#contact" className="inline-flex w-full items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] px-8 py-4 text-lg font-semibold transition-colors hover:border-[rgba(99,102,241,0.5)] hover:bg-[rgba(99,102,241,0.1)]">
                      {plan.cta}
                    </MagneticButton>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Monthly option */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-[#94A3B8]"
        >
          Liever een maandelijks pakket?{" "}
          <a href="#contact" className="text-[#6366F1] underline underline-offset-4 transition-colors hover:text-[#818CF8]">
            Vanaf €99/maand all-inclusive
          </a>
        </motion.p>
      </div>
    </section>
  );
}
