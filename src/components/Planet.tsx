import { useLayoutEffect, useRef } from "react";
import Terrain from "./Terrain";

export default function Planet(props: {
  key?:any;
  count?: number;
  name?: string;
  radius: number;
  detail: number;
  color?: string;
  ocean?: string;
  fbmOpts?: any;
  perlinOpts?: { scale?: number; amplitude?: number }[];
  onInit?: (ref: any) => void;
}) {
  const groupRef = useRef<any>();
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
    props.onInit?.(groupRef);
  }, [props]);
  return (
    <group name={props.name ? `${props.name}_group` : undefined} ref={groupRef}>
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
