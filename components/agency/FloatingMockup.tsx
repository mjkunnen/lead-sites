"use client";

import { motion } from "framer-motion";

export default function FloatingMockup() {
  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      {/* Floating shadow */}
      <motion.div
        animate={{ scale: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 left-[10%] right-[10%] h-8 rounded-full bg-blue-900/10 blur-xl"
      />

      {/* Laptop frame */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotateX: [2, -1, 2], rotateY: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Screen */}
        <div className="relative overflow-hidden rounded-t-xl border-[3px] border-gray-800 bg-white shadow-2xl">
          {/* Browser bar */}
          <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2">
            <div className="flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <div className="h-2 w-2 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 rounded bg-white px-3 py-0.5 text-[9px] text-gray-400 shadow-inner">
              uwbedrijf.nl
            </div>
          </div>

          {/* Website content mockup */}
          <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:h-[280px]">
            {/* Hero mockup */}
            <div className="flex flex-col items-center pt-4">
              <div className="h-1.5 w-16 rounded-full bg-blue-200" />
              <div className="mt-2 h-2.5 w-32 rounded-full bg-gray-800/70" />
              <div className="mt-1.5 h-1.5 w-24 rounded-full bg-gray-300" />
              <div className="mt-3 h-5 w-16 rounded bg-blue-500" />
            </div>

            {/* Cards row */}
            <div className="mt-4 grid grid-cols-3 gap-2 px-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
                  className="rounded bg-white p-2 shadow-sm"
                >
                  <div className="h-8 w-full rounded bg-gradient-to-br from-blue-100 to-indigo-100" />
                  <div className="mt-1.5 h-1 w-3/4 rounded-full bg-gray-200" />
                  <div className="mt-1 h-1 w-1/2 rounded-full bg-gray-100" />
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-3 flex justify-center gap-4 px-4">
              {["50+", "4.9★", "5d"].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-[10px] font-bold text-blue-600">{stat}</div>
                  <div className="h-0.5 w-6 rounded-full bg-gray-200 mt-0.5" />
                </motion.div>
              ))}
            </div>

            {/* Animated cursor */}
            <motion.div
              animate={{
                x: [40, 100, 80, 120, 40],
                y: [60, 30, 80, 50, 60],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1L6 14L8 8L14 6L1 1Z" fill="#2563EB" stroke="white" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Laptop base */}
        <div className="mx-auto h-3 w-[110%] -translate-x-[5%] rounded-b-xl bg-gradient-to-b from-gray-700 to-gray-800" />
        <div className="mx-auto h-1 w-[70%] rounded-b bg-gray-600" />
      </motion.div>
    </div>
  );
}
