'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { VakmanIcon } from './VakmanIcons';
import type { SiteContent } from '@/lib/types';
import type { IconName } from '@/lib/types';

function ServiceCard({ service, index, featured }: {
  service: { title: string; text: string; icon: IconName };
  index: number;
  featured: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        className="relative col-span-full rounded-2xl bg-[#0f172a] p-8 md:p-10 overflow-hidden group cursor-default"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37,99,235,0.12), transparent 60%)' }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2563eb]/20 flex items-center justify-center text-[#60a5fa]">
              <VakmanIcon name={service.icon} className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-[#2563eb] text-white text-xs font-subheading font-semibold">Populair</span>
          </div>
          <h3 className="font-subheading font-bold text-xl text-white mb-3">{service.title}</h3>
          <p className="font-body text-sm text-slate-400 leading-relaxed max-w-md">{service.text}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl bg-[#fafafa] border border-slate-100 p-6 md:p-8 overflow-hidden group cursor-default hover:shadow-lg hover:border-slate-200 transition-all duration-300"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37,99,235,0.06), transparent 60%)' }} />
      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mb-4 group-hover:bg-[#2563eb] group-hover:text-white transition-colors duration-300">
          <VakmanIcon name={service.icon} className="w-5 h-5" />
        </div>
        <h3 className="font-subheading font-bold text-lg text-slate-900 mb-2">{service.title}</h3>
        <p className="font-body text-sm text-slate-500 leading-relaxed">{service.text}</p>
      </div>
    </motion.div>
  );
}

export default function VakmanServices({ content }: { content: SiteContent }) {
  const services = content.services;
  if (!services?.length) return null;

  return (
    <section id="diensten" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="font-subheading text-xs font-semibold text-[#2563eb] uppercase tracking-wider mb-3 block">Diensten</span>
          <h2 className="font-heading text-3xl md:text-4xl text-slate-900">Wat wij voor u doen</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service as { title: string; text: string; icon: IconName }} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
