"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/agency-data";
import TracingBeam from "./ui/TracingBeam";
import LampEffect from "./ui/LampEffect";

export default function ProcessTimeline() {
  return (
    <section id="werkwijze" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <LampEffect>
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
            Van idee naar live in 4 stappen
          </h2>
        </LampEffect>

        <div className="mt-20">
          <TracingBeam>
            <div className="flex flex-col gap-16">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="relative"
                >
                  {/* Glowing dot on the beam line */}
                  <div className="absolute -left-[52px] top-1 flex h-8 w-8 items-center justify-center md:-left-[64px]">
                    <div className="absolute h-8 w-8 rounded-full bg-[#6366F1]/20 blur-md" />
                    <div className="relative h-3 w-3 rounded-full bg-[#6366F1]" />
                  </div>

                  {/* Step number */}
                  <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[#6366F1]">
                    Stap {step.number}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-[#94A3B8]">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </div>
    </section>
  );
}
