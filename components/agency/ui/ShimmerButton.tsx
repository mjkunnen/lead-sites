"use client";

import { ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function ShimmerButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
}: ShimmerButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    rounded-full bg-[#6366F1] px-8 py-4
    text-lg font-semibold text-white
    shadow-[0_0_30px_rgba(99,102,241,0.3)]
    transition-all duration-300
    hover:bg-[#818CF8] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]
    overflow-hidden
    ${className}
  `;

  const shimmer = (
    <span
      className="absolute inset-0 overflow-hidden rounded-full"
      aria-hidden="true"
    >
      <span
        className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />
    </span>
  );

  if (href) {
    return (
      <a href={href} className={baseStyles}>
        {shimmer}
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseStyles}>
      {shimmer}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
