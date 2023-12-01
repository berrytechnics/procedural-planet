import { useFrame, useThree } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Physics from "./Physics";
import Star from "./Bodies/Star";
import One from "./Bodies/One";
import Two from "./Bodies/Two";
import { Vector3 } from "three";

function App() {
  useThree(({ camera }) => {
    camera.position.set(0, 800, 0);
    camera.lookAt(0, 0, 0);
  });
  useFrame((_, delta) => Physics.tick(delta));
  return (
    <>
      <Suspense fallback={null}>
        <directionalLight
          color="#ffffff"
          intensity={2}
          position={[-100, 100, 80]}
        />
        <ambientLight intensity={0.25} />
        <Star
          static
          name="Sol"
          mass={1000}
          size={32}
          detail={64}
          velocity={new Vector3(0, 0, 0)}
          rotation={0.005}
        />
        <One
          mass={4}
          size={8}
          detail={64}
          velocity={new Vector3(0, 0, 0.3)}
          position={new Vector3(140, 0, 0)}
          rotation={0.01}
        />
        <One
          name="extra"
          mass={3}
          size={6}
          detail={64}
          velocity={new Vector3(0, 0, 0.25)}
          position={new Vector3(120, 0, 0)}
          rotation={0.01}
        />
        <One
          name="extr2"
          mass={6}
          size={8}
          detail={64}
          velocity={new Vector3(0, 0, -0.4)}
          position={new Vector3(-80, 0, 0)}
          rotation={0.01}
        />
        <Two
          mass={5}
          size={16}
          detail={64}
          velocity={new Vector3(0, 0, -0.2)}
          position={new Vector3(-250, 0, 0)}
          rotation={0.008}
        />
        <OrbitControls />
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
