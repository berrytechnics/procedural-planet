import { useLayoutEffect, useRef, useState } from "react";
import Terrain from "./Terrain";
import OrbitalMechanics from "./OrbitalMechanics";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
export default function Planet(props: {
  key?: any;
  mass?: number;
  count?: number;
  position: Vector3;
  name: string;
  radius: number;
  detail: number;
  color?: string;
  ocean?: string;
  fbmOpts?: any;
  initialVelocity?: Vector3;
  perlinOpts?: { scale?: number; amplitude?: number }[];
}) {
  const groupRef = useRef<any>();
  const bodyRef = useRef<any>();
  const planetRef = useRef<any>();
  const oceanRef = useRef<any>();
  useLayoutEffect(() => {
    {
      props.perlinOpts &&
        props.perlinOpts.forEach(({ scale, amplitude }) => {
          Terrain.generate3DPerlinTerrain(planetRef, scale, amplitude);
        });
    }
    {
      props.fbmOpts && Terrain.generateFBM3DTerrian(planetRef, props.fbmOpts);
    }
    Terrain.generate3DTerrainColor(planetRef, oceanRef);
    OrbitalMechanics.addBody(props.name ?? "none", {
      mass: props.mass,
      ref: groupRef,
      init: 0,
    });
  }, [props]);
  useFrame((state, delta) => {
    if (props.name === "earth") {
      OrbitalMechanics.calculateForceApplied("earth", "earth2");
    } else {
      OrbitalMechanics.calculateForceApplied("earth2", "earth");
    }
  });
  return (
    <group ref={groupRef} position={props.position}>
      {/* <RigidBody colliders="trimesh" key={props.name} ref={bodyRef} position={props.position}> */}
      <mesh
        ref={planetRef}
        name={props.name ? `${props.name}_planet` : undefined}
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
            name={props.name + "_ocean"}
            args={[props.radius, props.detail / 2, props.detail / 2]}
          />
          <meshPhongMaterial opacity={0.95} transparent color="#064273" />
        </mesh>
      )}
      {/* </RigidBody> */}
    </group>
  );
}
