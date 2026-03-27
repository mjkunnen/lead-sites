"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("preloader-shown")) {
      setLoading(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            sessionStorage.setItem("preloader-shown", "1");
            setLoading(false);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050816]"
        >
          {/* SVG Logo "N" with path draw */}
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="mb-8"
          >
            <motion.path
              d="M 15 65 L 15 15 L 65 65 L 65 15"
              stroke="#6366F1"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            />
          </motion.svg>

          {/* Progress bar */}
          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4]"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <p className="mt-4 font-[family-name:var(--font-mono)] text-sm text-[#94A3B8]">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
