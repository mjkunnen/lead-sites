"use client";

import { motion } from "framer-motion";

export default function HeroOrb() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, #6366F1, transparent, #06B6D4, transparent)",
          filter: "blur(40px)",
          opacity: 0.3,
        }}
      />

      {/* Main orb */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-[300px] w-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(129, 140, 248, 0.4), rgba(99, 102, 241, 0.2) 40%, rgba(6, 182, 212, 0.15) 70%, transparent)",
          boxShadow:
            "0 0 80px rgba(99, 102, 241, 0.3), inset 0 0 80px rgba(99, 102, 241, 0.1)",
        }}
      >
        {/* Inner glass highlight */}
        <div
          className="absolute left-[15%] top-[10%] h-[40%] w-[50%] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15), transparent)",
            filter: "blur(10px)",
          }}
        />

        {/* Orbiting ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20px]"
        >
          <div
            className="h-full w-full rounded-full border border-[rgba(99,102,241,0.2)]"
            style={{
              transform: "rotateX(60deg) rotateZ(10deg)",
            }}
          />
        </motion.div>

        {/* Orbiting ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-40px]"
        >
          <div
            className="h-full w-full rounded-full border border-[rgba(6,182,212,0.15)]"
            style={{
              transform: "rotateX(70deg) rotateZ(-20deg)",
            }}
          />
        </motion.div>

        {/* Floating particles around orb */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i * 0.8) * 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#818CF8]"
            style={{
              left: `${20 + Math.cos(i * 0.8) * 40 + 30}%`,
              top: `${20 + Math.sin(i * 1.2) * 40 + 30}%`,
              boxShadow: "0 0 6px rgba(129, 140, 248, 0.6)",
            }}
          />
        ))}
      </motion.div>

      {/* Bottom reflection */}
      <div
        className="absolute bottom-[10%] h-[60px] w-[200px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15), transparent)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
