"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 6;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const trailPositions = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("cursor-active");
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-hover]"
      );
      cursor.style.width = isHoverable ? "60px" : "20px";
      cursor.style.height = isHoverable ? "60px" : "20px";
    };

    let raf: number;
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;
      cursor.style.transform = `translate(${posRef.current.x - cursor.offsetWidth / 2}px, ${posRef.current.y - cursor.offsetHeight / 2}px)`;

      let prevX = posRef.current.x;
      let prevY = posRef.current.y;
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const trail = trailPositions.current[i];
        const speed = 0.1 - i * 0.012;
        trail.x += (prevX - trail.x) * speed;
        trail.y += (prevY - trail.y) * speed;
        const el = trailRefs.current[i];
        if (el) {
          const size = 12 - i * 1.5;
          el.style.transform = `translate(${trail.x - size / 2}px, ${trail.y - size / 2}px)`;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.opacity = `${0.3 - i * 0.04}`;
        }
        prevX = trail.x;
        prevY = trail.y;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full bg-blue-400 mix-blend-difference md:block"
          aria-hidden="true"
        />
      ))}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-5 w-5 rounded-full bg-white mix-blend-difference transition-[width,height] duration-300 ease-out md:block"
        aria-hidden="true"
      />
    </>
  );
}
