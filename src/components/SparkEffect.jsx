import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Sparks({ active }) {
  const group = useRef();

  useFrame(() => {
    if (!active || !group.current) return;

    group.current.children.forEach((p) => {
      p.position.x += p.userData.vx;
      p.position.y += p.userData.vy;
      p.material.opacity -= 0.02;

      if (p.material.opacity <= 0) {
        p.position.set(0, 0, 0);
        p.material.opacity = 1;

        p.userData.vx = (Math.random() - 0.5) * 0.2;
        p.userData.vy = Math.random() * 0.3;
      }
    });
  });

  return (
    <group ref={group} position={[0, 0.5, 0]}>
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh
          key={i}
          userData={{
            vx: (Math.random() - 0.5) * 0.2,
            vy: Math.random() * 0.3,
          }}
        >
          <planeGeometry args={[0.03, 0.15]} />
          <meshBasicMaterial
            color="#FFD600"
            transparent
            opacity={1}
          />
        </mesh>
      ))}
    </group>
  );
}