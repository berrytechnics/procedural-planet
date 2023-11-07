import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Terrain from "./Terrain";
import { Color } from "three";

const vertexShader = `
varying vec2 vUv;
void main()	{
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;
const fragmentShader = `
//#extension GL_OES_standard_derivatives : enable

    void main() {
      gl_FragColor = vec4(100.0, 100.0, 100.0, 1.0);
    }
`;

export default function Planet(props: {
  radius: number;
  detail: number;
  color?: string;
  ocean?: boolean;
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
    Terrain.generateTerrainColor(planetRef);
  }, []);
  return (
    <group ref={groupRef}>
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[props.radius, props.detail]} />
        <meshStandardMaterial color={props.color} />
        {/* <shaderMaterial fragmentShader={fragmentShader} derivatives={true} /> */}
      </mesh>
      {props.ocean && (
        <mesh>
          <sphereGeometry
            args={[props.radius, props.detail / 2, props.detail / 2]}
          />
          <meshStandardMaterial opacity={0.8} transparent color="#224488" />
        </mesh>
      )}
    </group>
  );
}
