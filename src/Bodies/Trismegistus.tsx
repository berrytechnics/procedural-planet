import { useLayoutEffect, useMemo, useRef } from "react";
import RigidBody from "../Physics";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
export default function Trismegistus() {
  const meshRef = useRef<any>();
  const currentAttributes = useMemo(() => {
    return {
      name: "Trismegistus",
      mass: 1000,
      size: 512,
      detail: 96,
      velocity: new Vector3(0, 0, -300000),
      position: new Vector3(-60000, 0, 0),
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
    <mesh  position={currentAttributes.position} ref={meshRef}>
      <sphereGeometry
        args={[
          currentAttributes.size,
          currentAttributes.detail,
          currentAttributes.detail,
        ]}
      />
      <meshLambertMaterial color={'white'} />
    </mesh>
  );
}
