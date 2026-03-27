"use client";

import { reviews } from "@/lib/agency-data";
import Marquee from "./ui/Marquee";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? "text-amber-400" : "text-gray-700"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="w-80 shrink-0 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-6 backdrop-blur-sm">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < review.stars} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-4 border-t border-[rgba(255,255,255,0.05)] pt-4">
        <p className="font-semibold text-sm">{review.name}</p>
        <p className="text-xs text-[#94A3B8]">
          {review.company} — {review.city}
        </p>
      </div>
    </div>
  );
}

export default function ReviewsMarquee() {
  const firstHalf = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondHalf = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
          Wat klanten zeggen
        </h2>
      </div>

      <div className="mt-16 flex flex-col gap-6">
        <Marquee direction="left" speed={50}>
          {firstHalf.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </Marquee>
        <Marquee direction="right" speed={45}>
          {secondHalf.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
