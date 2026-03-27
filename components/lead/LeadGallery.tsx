"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/lib/types";

export default function LeadGallery({ content }: { content: SiteContent }) {
  if (!content.gallery || content.gallery.length === 0) return null;

  // Bento-style layout: first image large, rest smaller
  const [main, ...rest] = content.gallery;

  return (
    <section id="gallerij" className="bg-white py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Gallerij</span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-slate-900 sm:text-5xl">
            Een kijkje in onze salon
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Main large image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 cursor-pointer"
          >
            <Image
              src={main.url}
              alt={main.alt}
              width={800}
              height={600}
              className="object-cover w-full h-full min-h-[300px] md:min-h-[500px] transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>

          {/* Smaller images */}
          {rest.slice(0, 4).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              <Image
                src={img.url}
                alt={img.alt}
                width={400}
                height={300}
                className="object-cover w-full h-full min-h-[200px] transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
