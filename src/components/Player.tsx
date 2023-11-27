/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useRef } from "react";
import { Vector3 } from "three";
import { Bodies } from "./Bodies";

export default function Player(props: {
  name?: string;
  mass: number;
  position: Vector3;
  initialVelocity: Vector3;
}) {
  const playerRef = useRef<any>();
  useLayoutEffect(() => {
    Bodies.addBody({
      ref: playerRef,
      velocity: props.initialVelocity,
      ...props,
    });
  }, [props]);
  return (
    <mesh
      name={props.name ? `${props.name}_player` : "undefined_player"}
      ref={playerRef}
      position={props.position}
    ></mesh>
  );
}
