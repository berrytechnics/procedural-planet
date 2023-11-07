import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Terrain from "./Terrain";

/* eslint-disable react/no-unknown-property */
export default function Planet(props: {
  radius: number;
  detail: number;
  color?: string;
  fbmOpts?: any;
  gui?: any;
}) {
  const settings = {
    radius: props.radius,
    detail: props.detail,
    color: props.color,
    fbmOpts: props.fbmOpts,
  }
  props.gui.add(props, "radius", 1, 10000);
  props.gui.add(props, "detail", 1, 100);
  props.gui.addColor(settings, "color");
  props.gui.add(settings.fbmOpts, "octaves", 1, 100);
  props.gui.add(settings.fbmOpts, "lacunarity", 1, 100);
  props.gui.add(settings.fbmOpts, "scale", 1, 100);
  props.gui.add(settings.fbmOpts, "amplitude", 1, 100);
  props.gui.add(settings.fbmOpts, "persistance", 0.001, 1);
  const planetRef = useRef<any>();
  const groupRef = useRef<any>();
  useFrame(() => {
    groupRef.current.rotation.y += 0.001;
  });
  useEffect(() => {
    Terrain.generate3DPerlinTerrain(planetRef, 1, 20);
    Terrain.generate3DPerlinTerrain(planetRef, 0.9, 15);
    Terrain.generate3DPerlinTerrain(planetRef, 0.1, 0.1);
    Terrain.generateFBM3DTerrian(planetRef, settings.fbmOpts);
  }, [planetRef]);
  return (
    <group ref={groupRef}>
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[settings.radius, settings.detail]} />
        <meshStandardMaterial color={settings.color} />
      </mesh>
      <mesh>
        <sphereGeometry
          args={[settings.radius * 1.01, settings.detail / 2, settings.detail / 2]}
        />
        <meshStandardMaterial opacity={0.8} transparent color="#224488" />
      </mesh>
    </group>
  );
}
