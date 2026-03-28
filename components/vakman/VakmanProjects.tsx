'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltImage from '@/components/lead/TiltImage';
import BeforeAfter from './BeforeAfter';
import type { SiteContent } from '@/lib/types';
import { t } from '@/lib/i18n';

function ParallaxColumn({ images, offset, side }: {
  images: { url: string; alt: string }[];
  offset: number;
  side: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className="space-y-4">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="rounded-2xl overflow-hidden"
        >
          <TiltImage
            src={img.url}
            alt={img.alt}
            className={`w-full object-cover ${side === 'left' ? 'aspect-[3/4]' : 'aspect-square'}`}
            intensity={8}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function VakmanProjects({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const gallery = content.gallery || [];
  const beforeAfter = content.before_after || [];

  if (gallery.length === 0 && beforeAfter.length === 0) return null;

  const leftCol = gallery.filter((_, idx) => idx % 2 === 0);
  const rightCol = gallery.filter((_, idx) => idx % 2 === 1);

  return (
    <section id="projecten" className="py-20 px-4 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="font-subheading text-xs font-semibold text-[#2563eb] uppercase tracking-wider mb-3 block">{i.vakman.projectsLabel}</span>
          <h2 className="font-heading text-3xl md:text-4xl text-slate-900">{i.vakman.projectsHeading}</h2>
        </motion.div>

        {beforeAfter.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {beforeAfter.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="rounded-2xl overflow-hidden">
                <BeforeAfter
                  beforeUrl={item.before_url}
                  afterUrl={item.after_url}
                  label={item.label}
                  beforeLabel={i.vakman.beforeLabel}
                  afterLabel={i.vakman.afterLabel}
                />
              </motion.div>
            ))}
          </div>
        )}

        {gallery.length >= 2 && (
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <ParallaxColumn images={leftCol} offset={40} side="left" />
            <ParallaxColumn images={rightCol} offset={-40} side="right" />
          </div>
        )}
      </div>
    </section>
  );
}
