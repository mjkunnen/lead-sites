'use client';

import { motion } from 'framer-motion';

export default function VakmanWaveDivider({ flip = false, color = '#f7f9fb' }: { flip?: boolean; color?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''}`}
      style={{ height: 50, marginTop: -2 }}
    >
      <motion.svg
        className="absolute bottom-0 h-full"
        viewBox="0 0 2400 50"
        preserveAspectRatio="none"
        style={{ width: '200%' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <path
          fill={color}
          d="M0 25 Q300 0 600 25 Q900 50 1200 25 Q1500 0 1800 25 Q2100 50 2400 25 L2400 50 L0 50Z"
        />
      </motion.svg>
    </div>
  );
}
