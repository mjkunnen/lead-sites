"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className={`
        rounded-2xl border border-[rgba(255,255,255,0.08)]
        bg-[rgba(255,255,255,0.05)] backdrop-blur-xl
        ${hover ? "transition-all duration-300 hover:border-[rgba(99,102,241,0.3)] hover:bg-[rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
