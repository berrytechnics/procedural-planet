import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Terrain from "./Terrain";

/* eslint-disable react/no-unknown-property */
export default function Planet(props: {
  radius: number;
  detail: number;
  color?: string;
  fbmOpts?: any;
}) {
  const planetRef = useRef<any>();
  const groupRef = useRef<any>();
  useFrame(() => {
    groupRef.current.rotation.y += 0.005;
  });
  useEffect(() => {
    Terrain.generate3DPerlinTerrain(planetRef, 1, 20);
    Terrain.generate3DPerlinTerrain(planetRef, 0.9, 15);
    Terrain.generate3DPerlinTerrain(planetRef, 0.1, 0.1);
    Terrain.generateFBM3DTerrian(planetRef, props.fbmOpts);
  }, [planetRef]);
  return (
    <group ref={groupRef}>
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[props.radius, props.detail]} />
        <meshStandardMaterial color={props.color} />
      </mesh>
      <mesh>
        <sphereGeometry
          args={[props.radius * 1.01, props.detail / 2, props.detail / 2]}
        />
        <meshStandardMaterial opacity={0.8} transparent color="#224488" />
      </mesh>
    </group>
  );
}
