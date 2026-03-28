"use client";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";

function ReviewCard({ review }: { review: SiteContent["reviews"][0] }) {
  return (
    <div className="w-[300px] sm:w-[380px] shrink-0 rounded-2xl bg-white border border-slate-100 shadow-sm p-6 sm:p-8 mx-2 sm:mx-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4"
            fill={i < review.stars ? "#f59e0b" : "#e2e8f0"}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-slate-600 leading-relaxed text-sm">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef3c7] text-xs font-bold text-[#b45309]">
          {review.name.charAt(0)}
        </div>
        <span className="font-semibold text-slate-900 text-sm">{review.name}</span>
        {review.date && <span className="ml-auto text-xs text-slate-400">{review.date}</span>}
      </div>
    </div>
  );
}

export default function VakmanReviews({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const doubled = [...content.reviews, ...content.reviews];
  const average =
    content.reviews.length > 0
      ? (
          content.reviews.reduce((sum, r) => sum + r.stars, 0) /
          content.reviews.length
        ).toFixed(1)
      : "5.0";
  const fullStars = Math.round(parseFloat(average));

  return (
    <section id="reviews" className="relative bg-[#f8fafc] py-20 sm:py-32 overflow-hidden">
      {/* Header */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-3 text-sm font-medium tracking-widest text-[#b45309]/50 uppercase mb-6">
              <span className="h-px w-8 bg-[#b45309]/20" />
              {i.reviews.label}
            </div>
            <h2
              className="font-heading text-3xl font-bold text-slate-900 sm:text-5xl"
            >
              {i.reviews.heading1}
              <br />
              {i.reviews.heading2}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="font-heading text-5xl font-bold text-slate-900"
            >
              {average}
            </span>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <svg
                    key={idx}
                    className="h-5 w-5"
                    fill={idx < fullStars ? "#f59e0b" : "#e2e8f0"}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {content.reviews.length}+ {i.reviews.count}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee row 1 — forward */}
      <div className="group relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
          {doubled.map((review, idx) => (
            <ReviewCard key={`a-${idx}`} review={review} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reverse */}
      <div className="group mt-4 relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-[marquee-reverse_40s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...doubled].reverse().map((review, idx) => (
            <ReviewCard key={`b-${idx}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
