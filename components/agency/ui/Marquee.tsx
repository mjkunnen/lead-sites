"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  direction = "left",
  speed = 40,
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`flex shrink-0 gap-6 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
          style={{
            animation: `marquee-scroll ${speed}s linear infinite`,
            animationDirection,
          }}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
