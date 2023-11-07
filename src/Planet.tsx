import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Terrain from "./Terrain";

/* eslint-disable react/no-unknown-property */
export default function Planet(props: {
  radius: number;
  detail: number;
  color?: string;
  fbmOpts?: any;
  perlinOpts?: { scale?: number; amplitude?: number }[];
}) {
  const planetRef = useRef<any>();
  const groupRef = useRef<any>();
  useFrame(() => {
    groupRef.current.rotation.y += 0.001;
  });
  useEffect(() => {
    {
      props.perlinOpts &&
        props.perlinOpts.forEach(({ scale, amplitude }) => {
          Terrain.generate3DPerlinTerrain(planetRef, scale, amplitude);
        });
    }
    {
      props.fbmOpts && Terrain.generateFBM3DTerrian(planetRef, props.fbmOpts);
    }
  }, []);
  return (
    <group ref={groupRef}>
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[props.radius, props.detail]} />
        <meshStandardMaterial color={props.color} />
      </mesh>
      <mesh>
        <sphereGeometry
          args={[props.radius, props.detail / 2, props.detail / 2]}
        />
        <meshStandardMaterial opacity={0.8} transparent color="#224488" />
      </mesh>
    </group>
  );
}
