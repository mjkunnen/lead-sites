"use client";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";

export default function Services({ content }: { content: SiteContent }) {
  return (
    <section id="diensten" className="bg-gray-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          Onze diensten
        </h2>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {content.services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-gray-800 bg-gray-900/50 p-8 transition hover:border-blue-600/50 hover:bg-gray-900"
            >
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-gray-400 leading-relaxed">
                {service.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
