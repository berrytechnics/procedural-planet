import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Terrain from "./Terrain";

export default function Planet(props: {
  radius: number;
  detail: number;
  color?: string;
  ocean?: "enabled" | "disabled";
  fbmOpts?: any;
  perlinOpts?: { scale?: number; amplitude?: number }[];
}) {
  const groupRef = useRef<any>();
  const planetRef = useRef<any>();
  const oceanRef = useRef<any>();
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
    Terrain.generateTerrainColor(planetRef, oceanRef);
  }, []);
  return (
    <group ref={groupRef}>
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[props.radius, props.detail]} />
        <meshPhongMaterial shininess={0.2} vertexColors color={props.color} />
      </mesh>
      {props.ocean === "enabled" && (
        <mesh ref={oceanRef}>
          <sphereGeometry
            args={[props.radius, props.detail / 2, props.detail / 2]}
          />
          <meshPhongMaterial opacity={0.8} transparent color="#064273" />
        </mesh>
      )}
    </group>
  );
}
