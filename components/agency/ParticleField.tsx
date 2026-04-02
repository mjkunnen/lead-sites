"use client";

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleField() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true } },
          color: { value: ["#3B82F6", "#8B5CF6", "#06B6D4"] },
          opacity: { value: { min: 0.1, max: 0.3 } },
          size: { value: { min: 1, max: 2 } },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            outModes: "bounce",
          },
          links: {
            enable: true,
            distance: 150,
            color: "#3B82F6",
            opacity: 0.08,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: { distance: 150, links: { opacity: 0.2 } },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
