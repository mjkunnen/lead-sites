"use client";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";

function ReviewCard({ review }: { review: SiteContent["reviews"][0] }) {
  return (
    <div className="w-[350px] shrink-0 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm mx-3">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < review.stars ? "text-amber-400" : "text-slate-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="mt-5 text-slate-600 leading-relaxed">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-sm font-bold text-white">
            {review.name.charAt(0)}
          </div>
          <span className="font-semibold text-slate-900">{review.name}</span>
        </div>
        {review.date && (
          <span className="text-xs text-slate-400">{review.date}</span>
        )}
      </div>
    </div>
  );
}

export default function LeadReviews({ content }: { content: SiteContent }) {
  // Double the reviews for infinite scroll effect
  const doubledReviews = [...content.reviews, ...content.reviews];

  return (
    <section id="reviews" className="bg-slate-50 py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Reviews</span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-slate-900 sm:text-5xl">
            Wat klanten zeggen
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-6 w-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-900">5.0</span>
            <span className="text-slate-400">op basis van {content.reviews.length}+ reviews</span>
          </div>
        </motion.div>
      </div>

      {/* Marquee row 1 - left to right */}
      <div className="mt-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubledReviews.map((review, i) => (
            <ReviewCard key={`a-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 - right to left */}
      <div className="mt-4 relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee [animation-direction:reverse] hover:[animation-play-state:paused]">
          {[...doubledReviews].reverse().map((review, i) => (
            <ReviewCard key={`b-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
