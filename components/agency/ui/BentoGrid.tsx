"use client";

import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  children: ReactNode;
  className?: string;
  span?: "col-span-1" | "col-span-2";
}

export function BentoGridItem({
  children,
  className = "",
  span = "col-span-1",
}: BentoGridItemProps) {
  return (
    <div className={`${span === "col-span-2" ? "sm:col-span-2" : ""} ${className}`}>
      {children}
    </div>
  );
}
