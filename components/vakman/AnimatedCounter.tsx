"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  target,
  label,
  suffix = "",
  className,
}: {
  target: number;
  label: string;
  suffix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target]);

  return (
    <div ref={ref} className={className ?? "text-center"}>
      <span className="text-current">
        {count}
        {suffix && <span>{suffix}</span>}
      </span>
      {label && (
        <div className="mt-2 text-sm font-medium text-zinc-500">{label}</div>
      )}
    </div>
  );
}
