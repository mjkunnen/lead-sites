'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltImage from '@/components/lead/TiltImage';
import type { SiteContent } from '@/lib/types';

export default function VakmanHeroImage({ content }: { content: SiteContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const clipPath = useTransform(clipProgress, (v) => {
    const size = 10 + v * 90;
    return `inset(${50 - size / 2}% ${50 - size / 2}% ${50 - size / 2}% ${50 - size / 2}% round 14px)`;
  });

  if (!content.hero.image_url) return null;

  return (
    <section ref={ref} className="relative px-4 -mt-8 mb-0">
      <div className="max-w-5xl mx-auto">
        <motion.div style={{ clipPath }} className="relative rounded-[14px] overflow-hidden aspect-[16/9]">
          <TiltImage
            src={content.hero.image_url}
            alt={`${content.business_name} project`}
            className="absolute inset-0 w-full h-full"
            intensity={8}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center justify-between">
              <span className="text-white font-subheading font-semibold text-sm">
                {content.business_name}
              </span>
              <a href="#projecten" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-subheading font-medium hover:bg-white/30 transition-colors">
                Bekijk <span className="text-sm">↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
