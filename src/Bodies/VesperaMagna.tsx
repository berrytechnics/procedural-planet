import { useLayoutEffect, useMemo, useRef } from "react";
import RigidBody from "../Physics";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export default function VesperaMagna() {
  const meshRef = useRef<any>();
  const currentAttributes = useMemo(() => {
    return {
      name: "Nova Celestia",
      mass: 100,
      size: 256,
      detail: 8,
      velocity: new Vector3(0, 1, 0),
      position: new Vector3(8000, 0, 0),
      rotation: 0.05,
      ref: meshRef,
    };
  }, []);
  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.computeBoundingSphere();
      RigidBody.addBody(currentAttributes);
    }
  }, [currentAttributes]);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * currentAttributes.rotation;
    }
  });

  return (
    <mesh position={currentAttributes.position} ref={meshRef}>
      <sphereGeometry
        args={[
          currentAttributes.size,
          currentAttributes.detail,
          currentAttributes.detail,
        ]}
      />
      <meshStandardMaterial wireframe color="white" />
    </mesh>
  );
}
