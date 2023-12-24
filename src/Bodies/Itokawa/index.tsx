import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import RigidBody from "../../Physics";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

export default function Itokawa() {
  const { nodes, materials } = useGLTF("./src/Bodies/Itokawa/Itokawa.glb");
  const meshRef = useRef<Mesh>(null);
  const currentAttributes = useMemo(() => {
    return {
      name: "Itokawa",
      mass: 100,
      velocity: new Vector3(0, 0, 150000),
      position: new Vector3(10000, 0, 0),
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
    <mesh
      ref={meshRef}
      position={currentAttributes.position}
      geometry={nodes.itokawa_LP instanceof Mesh ?nodes.itokawa_LP.geometry : []}
      material={materials.itokawa}
    />
  );
}

useGLTF.preload("./Itokawa.glb");
