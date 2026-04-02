"use client";

import { motion } from "framer-motion";
import { reviews } from "@/lib/agency-data";

function StarIcon() {
  return (
    <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="w-[350px] shrink-0 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
      <div className="flex gap-0.5">
        {Array.from({ length: review.stars }).map((_, j) => (
          <StarIcon key={j} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-400">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-semibold text-white">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{review.name}</p>
          <p className="text-xs text-gray-500">{review.company}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsMarquee() {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="relative py-24 lg:py-32 bg-[#060609]">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
            Reviews
          </span>
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Wat klanten zeggen
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Meer dan 50 tevreden ondernemers gingen je voor.
          </p>
        </motion.div>
      </div>

      {/* Infinite marquee */}
      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent" />

        <div className="flex animate-marquee gap-6">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-8"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-white">50+</div>
          <div className="text-sm text-gray-500">Klanten</div>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="text-center">
          <div className="flex items-center gap-1 text-2xl font-bold text-white">
            4.9
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="text-sm text-gray-500">Beoordeling</div>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="text-center">
          <div className="text-2xl font-bold text-white">100%</div>
          <div className="text-sm text-gray-500">Aanbevolen</div>
        </div>
      </motion.div>
    </section>
  );
}
