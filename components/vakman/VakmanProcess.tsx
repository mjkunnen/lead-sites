'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/types';

const defaultSteps = [
  { title: 'Contact', description: 'U neemt contact op via telefoon of WhatsApp. We bespreken uw wensen.' },
  { title: 'Offerte', description: 'We komen langs voor een vrijblijvende offerte op maat.' },
  { title: 'Uitvoering', description: 'Op de afgesproken datum gaan we aan de slag. Vakkundig en volgens planning.' },
  { title: 'Oplevering', description: 'Na een eindcontrole leveren we het werk netjes op.' },
];

export default function VakmanProcess({ content }: { content: SiteContent }) {
  const steps = content.process_steps ?? defaultSteps;

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
          Werkwijze
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Hoe wij werken
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200 md:left-1/2 md:-translate-x-px" />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] }}
              className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
            >
              <motion.div
                className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-[#004ac6]/20 md:left-1/2 md:-translate-x-1/2 z-10"
                whileInView={{ scale: [0, 1.15, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.2, ease: [0.25, 1, 0.5, 1] }}
              >
                {i + 1}
              </motion.div>

              <div className={`bg-white rounded-xl p-5 shadow-sm ${i % 2 === 0 ? 'md:text-right md:col-start-1' : 'md:col-start-2'}`}>
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
