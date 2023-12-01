import { useFrame, useThree } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Physics from "./Physics";
import Star from "./Bodies/Star";
import One from "./Bodies/One";
import Two from "./Bodies/Two";
import Three from "./Bodies/Three";
import { Vector3 } from "three";

function App() {
  useThree(({ camera }) => {
    camera.position.set(0, 2000, 0);
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
          mass={3000}
          size={32}
          detail={64}
          velocity={new Vector3(0, 0, 0)}
          rotation={0.005}
        />
        <One
          mass={40}
          size={8}
          detail={64}
          velocity={new Vector3(0, 0, 1.5)}
          position={new Vector3(140, 0, 0)}
          rotation={0.01}
        />

        <Two
          mass={50}
          size={16}
          detail={64}
          velocity={new Vector3(0, 0, -1.2)}
          position={new Vector3(-250, 0, 0)}
          rotation={0.008}
        />
        <Three
          mass={150}
          size={24}
          detail={64}
          velocity={new Vector3(0, 0, -.5)}
          position={new Vector3(-1200, 0, 0)}
          rotation={0.05}
        />
        <One
          name="four"
          mass={40}
          size={8}
          detail={64}
          velocity={new Vector3(0, 0, 1.3)}
          position={new Vector3(180, 0, 0)}
          rotation={0.01}
        />

        <Two
          name="five"
          mass={50}
          size={16}
          detail={64}
          velocity={new Vector3(0, 0, -1)}
          position={new Vector3(-350, 0, 0)}
          rotation={0.008}
        />
        <Three
          name="six"
          mass={150}
          size={24}
          detail={64}
          velocity={new Vector3(0, 0, -1)}
          position={new Vector3(-900, 0, 0)}
          rotation={0.05}
        />
        <OrbitControls />
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
