import { useLayoutEffect, useRef } from "react";
import RigidBody from "../Physics";
import { Vector3, useFrame } from "@react-three/fiber";
export default function Star(props: {
  name: string;
  mass: number;
  size: number;
  detail: number;
  velocity: Vector3;
  static?: boolean;
  rotation?: number;
}) {
  const { name, mass, size, detail, velocity } = props;
  const meshRef = useRef<any>();
  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.computeBoundingSphere();
      RigidBody.addBody({
        name: name,
        mass: mass,
        size: size,
        detail: detail,
        velocity: velocity,
        static: props.static ?? false,
        ref: meshRef,
      });
    }
  }, [detail, name, mass, size, props.static, velocity]);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (props.rotation ?? 1);
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, detail, detail]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
