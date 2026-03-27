"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { t, Lang } from "@/lib/i18n";

const iconMap: Record<string, React.ReactNode> = {
  scissors: <path strokeLinecap="round" strokeLinejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0010.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />,
  palette: <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />,
  sparkles: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />,
  heart: <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />,
  default: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />,
};

function ServiceCard({ service, index, lang }: { service: SiteContent["services"][0]; index: number; lang?: Lang }) {
  const i = t(lang);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const icon = iconMap[service.icon] || iconMap.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
      }}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/10"
    >
      {/* Mouse-following gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(180,130,80,0.07), transparent 60%)`,
        }}
      />

      <div className="relative">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-900 text-amber-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-amber-800 group-hover:shadow-lg group-hover:shadow-amber-200">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {icon}
          </svg>
        </div>
        <h3 className="text-xl font-bold text-stone-900">{service.title}</h3>
        <p className="mt-3 text-stone-500 leading-relaxed">{service.text}</p>
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-amber-800 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {i.services.more}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function LeadServices({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="diensten" ref={ref} className="relative bg-stone-100 py-20 sm:py-32 overflow-hidden">
      {/* Parallax warm orbs */}
      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-200/30 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-rose-200/20 blur-[100px]" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 text-sm font-medium tracking-widest text-amber-700/60 uppercase mb-6">
            <span className="h-px w-8 bg-amber-600/30" />
            {i.services.label}
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-stone-900 sm:text-5xl">
            {i.services.heading1}<br />{i.services.heading2}
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {content.services.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} lang={content.lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
