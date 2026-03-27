"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LampEffectProps {
  children: ReactNode;
  className?: string;
}

export default function LampEffect({ children, className = "" }: LampEffectProps) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Glowing line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "12rem", opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="h-[2px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent"
      />
      {/* Glow bloom */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "16rem", opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
        className="h-8 -mt-4 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.3),_transparent_70%)] blur-lg"
      />
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="-mt-2"
      >
        {children}
      </motion.div>
    </div>
  );
}
