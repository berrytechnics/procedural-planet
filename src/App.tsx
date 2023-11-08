import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "./components/Planet";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useRef, useState } from "react";

function App() {
  const earthRef = useRef<any>();
  const [canvasSize, setCanvasSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  window.addEventListener("resize", () => {
    setCanvasSize([window.innerWidth, window.innerHeight]);
  });
  return (
    <div style={{ width: canvasSize[0], height: canvasSize[1] }}>
      <Canvas camera={{ position: [0, 0, 75], near: 1, far: 1000 }}>
        <Suspense>
          <directionalLight
            color="#ffffff"
            intensity={1}
            position={[-100, 100, 80]}
          />
          <ambientLight intensity={0.2} />
          <Physics gravity={[0, 0, 0]}>
            <RigidBody angularVelocity={[0, 0.5, 0]} linearVelocity={[0, 0, 0]}>
              <Planet
                name="Earth"
                onInit={(ref) => (earthRef.current = ref)}
                ocean="enabled"
                radius={32}
                detail={128}
                color={"white"}
                fbmOpts={{
                  seed: Math.random(),
                  amplitude: 0.5,
                  scale: 0.2,
                  octaves: 24,
                  persistance: 0.1,
                  lacunarity: 5,
                  redistribution: 2,
                }}
                perlinOpts={[
                  { scale: 1, amplitude: 10 },
                  { scale: 0.01, amplitude: 2 },
                ]}
              />
            </RigidBody>
          </Physics>
          <Stars speed={0.05} />
          <OrbitControls />
          {/* <PointerLockControls /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
