"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "over", label: "Over mij" },
  { id: "diensten", label: "Diensten" },
  { id: "werkwijze", label: "Werkwijze" },
  { id: "portfolio", label: "Portfolio" },
  { id: "prijzen", label: "Prijzen" },
  { id: "contact", label: "Contact" },
];

export default function ScrollIndicator() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const closest = visible.reduce((a, b) =>
            Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
          );
          setActiveId(closest.target.id);
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="relative text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          {section.label}
          {activeId === section.id && (
            <motion.div
              layoutId="nav-pill"
              className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-blue-600"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </a>
      ))}
    </>
  );
}
