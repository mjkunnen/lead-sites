'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SiteContent } from '@/lib/types';

function Slider({ beforeUrl, afterUrl, label }: { beforeUrl: string; afterUrl: string; label: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  return (
    <div className="space-y-2">
      <motion.div
        ref={containerRef}
        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize select-none touch-none"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onPointerMove={(e) => {
          if (e.buttons > 0 || e.pointerType === 'touch') handleMove(e.clientX);
        }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          handleMove(e.clientX);
        }}
      >
        <Image src={afterUrl} alt="Na" fill className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={beforeUrl} alt="Voor" fill className="object-cover" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10 shadow-lg"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full z-20">
          Voor
        </div>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full z-20">
          Na
        </div>
      </motion.div>
      <p className="text-xs text-slate-500 font-medium text-center">{label}</p>
    </div>
  );
}

export default function VakmanBeforeAfterShowcase({ content }: { content: SiteContent }) {
  const items = content.before_after;
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-20 px-6">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#004ac6] font-bold tracking-widest uppercase text-[10px]">
          Resultaat
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Voor &amp; na
        </h2>
      </motion.div>

      <div className="space-y-6">
        {items.map((item, i) => (
          <Slider key={i} beforeUrl={item.before_url} afterUrl={item.after_url} label={item.label} />
        ))}
      </div>
    </section>
  );
}
