import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Terrain from "./Terrain";

export default function Planet(props: {
  name?: string;
  radius: number;
  detail: number;
  color?: string;
  ocean?: "enabled" | "disabled";
  fbmOpts?: any;
  perlinOpts?: { scale?: number; amplitude?: number }[];
  onInit?: (ref: any) => void;
}) {
  const groupRef = useRef<any>();
  const planetRef = useRef<any>();
  const oceanRef = useRef<any>();
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
    props.onInit?.(groupRef);
  }, []);
  return (
    <group name={props.name ? `${props.name}_group` : undefined} ref={groupRef}>
      <mesh
        name={props.name ? `${props.name}_planet` : undefined}
        ref={planetRef}
      >
        <icosahedronGeometry args={[props.radius, props.detail]} />
        <meshPhongMaterial shininess={0.2} vertexColors color={props.color} />
      </mesh>
      {props.ocean === "enabled" && (
        <mesh
          name={props.name ? `${props.name}_ocean` : undefined}
          ref={oceanRef}
        >
          <sphereGeometry
            args={[props.radius, props.detail / 2, props.detail / 2]}
          />
          <meshPhongMaterial opacity={0.8} transparent color="#064273" />
        </mesh>
      )}
    </group>
  );
}
