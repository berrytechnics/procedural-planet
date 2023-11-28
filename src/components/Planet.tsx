import { useLayoutEffect, useRef } from "react";
import Terrain from "./Terrain";
import { Vector3 } from "@react-three/fiber";
import { Texture } from "three";
import { Bodies } from "../physics/Bodies";
import { useFrame } from "@react-three/fiber";
export default function Planet(props: {
  key?: number | string;
  count?: number;
  mass: number;
  last: boolean;
  rotation?: number;
  name?: string;
  radius: number;
  static?: boolean;
  terrain?: Texture[];
  detail: number;
  color?: string;
  ocean?: string;
  fbmOpts?: {
    amplitude: number;
    scale: number;
    octaves: number;
    persistance: number;
    lacunarity: number;
    redistribution: number;
  };
  position: Vector3;
  initialVelocity: Vector3;
  perlinOpts?: { scale?: number; amplitude?: number }[];
}) {
  const groupRef = useRef<any>();
  const planetRef = useRef<any>();
  const oceanRef = useRef<any>();
  useLayoutEffect(() => {
    {
      props.perlinOpts &&
        props.perlinOpts.forEach((opt) => {
          Terrain.generate3DPerlinTerrain(planetRef, opt.amplitude, opt.scale);
        });
    }
    {
      props.fbmOpts && Terrain.generateFBM3DTerrian(planetRef, props.fbmOpts);
    }
    Terrain.generate3DTerrainColor(planetRef, oceanRef);
    planetRef.current.geometry.computeBoundingSphere();
    Bodies.addBody({
      name: props.name,
      ref: groupRef,
      velocity: props.initialVelocity,
      ...props,
    });
  }, [props]);
  useFrame(
    (_, delta) => (groupRef.current.rotation.y += delta * (props.rotation ?? 0))
  );
  return (
    <group
      name={props.name ? `${props.name}_group` : undefined}
      ref={groupRef}
      position={props.position}
    >
      <instancedMesh
        ref={planetRef}
        args={[undefined, undefined, props.count ?? 1]}
        name={props.name ? `${props.name}_planet` : undefined}
      >
        <icosahedronGeometry args={[props.radius, props.detail * 4]} />
        <meshPhongMaterial vertexColors shininess={0.5} />
      </instancedMesh>
      {props.ocean === "enabled" && (
        <instancedMesh
          name={props.name ? `${props.name}_ocean` : undefined}
          ref={oceanRef}
          args={[undefined, undefined, props.count ?? 1]}
        >
          <sphereGeometry
            args={[props.radius, props.detail / 2, props.detail / 2]}
          />
          <meshPhongMaterial opacity={0.95} transparent color="#064273" />
        </instancedMesh>
      )}
    </group>
  );
}
