import { useLayoutEffect, useRef } from "react";
import RigidBody from "../Physics";
import { Vector3 } from "@react-three/fiber";
export default function Planet(props: {
  name?: string;
  mass: number;
  size: number;
  detail: number;
  velocity: Vector3;
  position: Vector3;
}) {
  const { mass, size, detail, velocity } = props;
  const meshRef = useRef<any>();
  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.computeBoundingSphere();
      RigidBody.addBody({
        name: props.name ?? "Two",
        mass: mass,
        size: size,
        detail: detail,
        velocity: velocity,
        ref: meshRef,
      });
    }
  }, [detail, mass, size, props.name, velocity]);
  return (
    <mesh position={props.position} ref={meshRef}>
      <sphereGeometry args={[size, detail, detail]} />
      <meshStandardMaterial wireframe color="grey" />
    </mesh>
  );
}
