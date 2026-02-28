import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function WorkerModel({ scale = 0.01 }) { 
  //
  const { scene } = useGLTF("/models/worker_apl.glb");
  const modelRef = useRef();

  // Optimized rotation without using deprecated Clock
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale} 
      position={[0, -0.9, 0]} 
    />
  );
}