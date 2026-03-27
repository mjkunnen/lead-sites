"use client";

import { motion } from "framer-motion";
import { ReactNode, Children } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  clipPath?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const clipItemVariants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  visible: { opacity: 1, clipPath: "inset(0% 0 0 0)" },
};

export default function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  clipPath = false,
}: StaggerRevealProps) {
  const variants = clipPath ? clipItemVariants : itemVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={variants}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
