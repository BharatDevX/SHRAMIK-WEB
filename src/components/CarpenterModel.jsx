import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function CarpenterModel(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/low-poly_construction_workers_animated.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((a) => a.play());
    }
  }, [actions]);

  return (
    <group ref={group} {...props} rotation={[0, (Math.PI / 200)-1.5, 0]}>
    <primitive object={scene} scale={1} />
  </group>
  );
}