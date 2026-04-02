"use client";

import { motion } from "framer-motion";

const dataNodes = [
  { x: -160, y: -90, delay: 0, label: "AI", color: "blue" },
  { x: 140, y: -110, delay: 0.5, label: "API", color: "purple" },
  { x: 170, y: 70, delay: 1, label: "CRM", color: "cyan" },
  { x: -150, y: 100, delay: 1.5, label: "Web", color: "blue" },
  { x: 0, y: -160, delay: 0.8, label: "Data", color: "purple" },
  { x: -70, y: 150, delay: 1.2, label: "Mail", color: "cyan" },
];

export default function HeroOrb() {
  return (
    <div className="relative flex h-[420px] w-[420px] items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, #6366F1, transparent, #06B6D4, transparent)",
          filter: "blur(40px)",
          opacity: 0.3,
        }}
      />

      {/* Orbiting ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4"
      >
        <div className="h-full w-full rounded-full border border-blue-500/20" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="h-3 w-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
        </div>
      </motion.div>

      {/* Orbiting ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-12"
      >
        <div className="h-full w-full rounded-full border border-purple-500/15" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
        </div>
      </motion.div>

      {/* Orbiting ring 3 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-20"
      >
        <div className="h-full w-full rounded-full border border-cyan-500/10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
        </div>
      </motion.div>

      {/* Main orb */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 0 60px rgba(59, 130, 246, 0.3), 0 0 120px rgba(59, 130, 246, 0.1)",
            "0 0 80px rgba(139, 92, 246, 0.4), 0 0 160px rgba(139, 92, 246, 0.15)",
            "0 0 60px rgba(59, 130, 246, 0.3), 0 0 120px rgba(59, 130, 246, 0.1)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-32 w-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #60a5fa, #3b82f6 40%, #7c3aed 70%, #4c1d95)",
        }}
      >
        {/* Inner shine */}
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle at 35% 25%, rgba(255,255,255,0.4), transparent 50%)",
          }}
        />

        {/* Floating particles around orb */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-blue-400"
            style={{
              left: `${20 + Math.cos(i * 1.05) * 40 + 30}%`,
              top: `${20 + Math.sin(i * 1.05) * 40 + 30}%`,
              boxShadow: "0 0 8px rgba(96, 165, 250, 0.6)",
            }}
          />
        ))}
      </motion.div>

      {/* Floating data nodes */}
      {dataNodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, delay: node.delay },
            scale: { duration: 0.5, delay: 0.8 + node.delay },
            y: { duration: 4, repeat: Infinity, delay: node.delay, ease: "easeInOut" },
          }}
          className="absolute"
          style={{
            left: `calc(50% + ${node.x}px)`,
            top: `calc(50% + ${node.y}px)`,
          }}
        >
          <div
            className={`rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur-md ${
              node.color === "blue"
                ? "text-blue-400"
                : node.color === "purple"
                  ? "text-purple-400"
                  : "text-cyan-400"
            }`}
          >
            {node.label}
          </div>
        </motion.div>
      ))}

      {/* Bottom reflection */}
      <div
        className="absolute bottom-4 h-[40px] w-[180px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15), transparent)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
