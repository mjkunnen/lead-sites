"use client";

import { useEffect, useRef } from "react";

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;
    const dpr = window.devicePixelRatio || 1;
    const size = 500;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 180;

    // Generate points on sphere
    const points: { lat: number; lon: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lon = 0; lon < 360; lon += 20) {
        points.push({ lat: (lat * Math.PI) / 180, lon: (lon * Math.PI) / 180 });
      }
    }

    // Generate arcs (connections between random points)
    const arcs: { from: number; to: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < 8; i++) {
      arcs.push({
        from: Math.floor(Math.random() * points.length),
        to: Math.floor(Math.random() * points.length),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
      });
    }

    function project(lat: number, lon: number) {
      const x = radius * Math.cos(lat) * Math.sin(lon + rotation);
      const y = radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.cos(lon + rotation);
      return { x: cx + x, y: cy - y, z, visible: z > -20 };
    }

    function draw() {
      ctx!.clearRect(0, 0, size, size);
      rotation += 0.004;

      // Draw latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        ctx!.beginPath();
        let started = false;
        for (let lon = 0; lon <= 360; lon += 3) {
          const lonRad = (lon * Math.PI) / 180;
          const p = project(latRad, lonRad);
          if (p.visible) {
            if (!started) {
              ctx!.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx!.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx!.strokeStyle = "rgba(59, 130, 246, 0.12)";
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Draw longitude lines
      for (let lon = 0; lon < 360; lon += 30) {
        const lonRad = (lon * Math.PI) / 180;
        ctx!.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const latRad = (lat * Math.PI) / 180;
          const p = project(latRad, lonRad);
          if (p.visible) {
            if (!started) {
              ctx!.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx!.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx!.strokeStyle = "rgba(59, 130, 246, 0.08)";
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Draw points
      for (const point of points) {
        const p = project(point.lat, point.lon);
        if (p.visible) {
          const alpha = 0.2 + (p.z / radius) * 0.5;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx!.fill();
        }
      }

      // Draw arcs
      for (const arc of arcs) {
        const from = points[arc.from];
        const to = points[arc.to];
        const pFrom = project(from.lat, from.lon);
        const pTo = project(to.lat, to.lon);

        if (pFrom.visible && pTo.visible) {
          // Draw arc line
          const midX = (pFrom.x + pTo.x) / 2;
          const midY = Math.min(pFrom.y, pTo.y) - 40;

          ctx!.beginPath();
          ctx!.moveTo(pFrom.x, pFrom.y);
          ctx!.quadraticCurveTo(midX, midY, pTo.x, pTo.y);
          ctx!.strokeStyle = "rgba(139, 92, 246, 0.25)";
          ctx!.lineWidth = 1;
          ctx!.stroke();

          // Draw moving dot on arc
          arc.progress += arc.speed;
          if (arc.progress > 1) arc.progress = 0;

          const t = arc.progress;
          const dotX = (1 - t) * (1 - t) * pFrom.x + 2 * (1 - t) * t * midX + t * t * pTo.x;
          const dotY = (1 - t) * (1 - t) * pFrom.y + 2 * (1 - t) * t * midY + t * t * pTo.y;

          ctx!.beginPath();
          ctx!.arc(dotX, dotY, 3, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(139, 92, 246, 0.8)";
          ctx!.fill();

          // Glow
          ctx!.beginPath();
          ctx!.arc(dotX, dotY, 8, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(139, 92, 246, 0.15)";
          ctx!.fill();
        }
      }

      // Outer glow ring
      const gradient = ctx!.createRadialGradient(cx, cy, radius - 10, cx, cy, radius + 30);
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.05)");
      gradient.addColorStop(1, "transparent");
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius + 30, 0, Math.PI * 2);
      ctx!.fillStyle = gradient;
      ctx!.fill();

      animationId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ width: 500, height: 500 }}
        className="max-w-full"
      />
      {/* Center glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-40 w-40 rounded-full bg-blue-500/10 blur-[60px]" />
      </div>
    </div>
  );
}
