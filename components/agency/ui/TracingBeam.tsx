"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface TracingBeamProps {
  children: ReactNode;
  className?: string;
}

export default function TracingBeam({ children, className = "" }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Track line (dim) */}
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.05)] md:left-8" />

      {/* Active beam (glowing) */}
      <motion.div
        className="absolute left-6 top-0 w-[2px] md:left-8"
        style={{
          height,
          opacity,
          background: "linear-gradient(to bottom, #6366F1, #06B6D4)",
          boxShadow: "0 0 8px rgba(99, 102, 241, 0.6)",
        }}
      />

      {/* Content */}
      <div className="relative pl-16 md:pl-20">{children}</div>
    </div>
  );
}
