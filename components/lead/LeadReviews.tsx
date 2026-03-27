"use client";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";

function ReviewCard({ review }: { review: SiteContent["reviews"][0] }) {
  return (
    <div className="w-[300px] sm:w-[380px] shrink-0 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-sm mx-2 sm:mx-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex gap-0.5 mb-5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`h-4 w-4 ${i < review.stars ? "text-amber-400" : "text-stone-200"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-stone-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-sm font-bold text-amber-100">
            {review.name.charAt(0)}
          </div>
          <span className="font-semibold text-stone-900">{review.name}</span>
        </div>
        {review.date && <span className="text-xs text-stone-400">{review.date}</span>}
      </div>
    </div>
  );
}

export default function LeadReviews({ content }: { content: SiteContent }) {
  const doubled = [...content.reviews, ...content.reviews];

  return (
    <section id="reviews" className="bg-stone-100 py-20 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-3 text-sm font-medium tracking-widest text-amber-700/60 uppercase mb-6">
              <span className="h-px w-8 bg-amber-600/30" />
              Reviews
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-stone-900 sm:text-5xl">
              Wat onze klanten<br />ervaren
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-playfair)] text-6xl font-bold text-stone-900">5.0</span>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-1 text-sm text-stone-400">{content.reviews.length}+ beoordelingen</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-100 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((review, i) => (
            <ReviewCard key={`a-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 */}
      <div className="mt-4 relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-100 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee [animation-direction:reverse] hover:[animation-play-state:paused]">
          {[...doubled].reverse().map((review, i) => (
            <ReviewCard key={`b-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
