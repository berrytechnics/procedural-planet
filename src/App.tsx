import { useFrame, useThree } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Physics from "./Physics";

function App() {
  useThree(({ camera }) => {
    camera.position.set(0, 500, 0);
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
        <OrbitControls />
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
