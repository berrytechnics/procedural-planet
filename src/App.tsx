import { useFrame, useThree } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Physics from "./Physics";
import Star from "./Bodies/Star";
import One from "./Bodies/One";
import { Vector3 } from "three";

function App() {
  useThree(({ camera }) => {
    // camera.position.set(0, 100, 0);
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
          rotation={.2}
        />
        <One
          mass={4}
          size={8}
          detail={64}
          velocity={new Vector3(-.3, 0, 0)}
          position={new Vector3(100, 0, 0)}
        />

        <OrbitControls />
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
