import { useLayoutEffect, useRef } from "react";
import Terrain from "./Terrain";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Bodies } from "./Bodies";

export default function Planet(props: {
  key?: any;
  count?: number;
  mass: number;
  last: boolean;
  name?: string;
  radius: number;
  detail: number;
  color?: string;
  ocean?: string;
  fbmOpts?: any;
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
    Bodies.addBody({
      name: props.name,
      ref: groupRef,
      velocity: props.initialVelocity,
      ...props,
    });
  }, [props]);
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
        <icosahedronGeometry args={[props.radius, props.detail]} />
        <meshPhongMaterial shininess={0.2} vertexColors color={props.color} />
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
