import { useLayoutEffect, useRef } from "react";
import RigidBody from "../Physics";
import { Vector3, useFrame } from "@react-three/fiber";
export default function Planet(props: {
  name?: string;
  mass: number;
  size: number;
  detail: number;
  velocity: Vector3;
  position: Vector3;
  rotation?: number;
}) {
  const { mass, size, detail, velocity } = props;
  const meshRef = useRef<any>();
  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.computeBoundingSphere();
      RigidBody.addBody({
        name: props.name ?? "One",
        mass: mass,
        size: size,
        detail: detail,
        velocity: velocity,
        ref: meshRef,
      });
    }
  }, [detail, mass, size, props.name, velocity]);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (props.rotation ?? 1);
    }
  });
  return (
    <mesh position={props.position} ref={meshRef}>
      <sphereGeometry args={[size, detail, detail]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
