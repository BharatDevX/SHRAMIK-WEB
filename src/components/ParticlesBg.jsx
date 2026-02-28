import Particles from "@tsparticles/react";

export default function ParticlesBg() {
  return (
    <Particles
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 50, density: { enable: true, value_area: 900 } },
          color: { value: ["#FFD600", "#1a3a8f", "#ffffff"] },
          size: { value: { min: 1, max: 2.2 } },
          opacity: {
            value: { min: 0.08, max: 0.3 },
            animation: { enable: true, speed: 0.7, sync: false },
          },
          move: { enable: true, speed: 0.35, direction: "none", outModes: "out" },
          links: {
            enable: true,
            color: "#FFD600",
            opacity: 0.05,
            distance: 150,
            width: 1,
          },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 70, duration: 0.4 } },
        },
      }}
    />
  );
}
