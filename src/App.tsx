import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "./components/Planet";
import { useState } from "react";

function App() {
  const [canvasSize, setCanvasSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  window.addEventListener("resize", () => {
    setCanvasSize([window.innerWidth, window.innerHeight]);
  });
  return (
    <div style={{ width: canvasSize[0], height: canvasSize[1] }}>
      <Canvas camera={{ position: [0, 0, 75], near:1, far:1000 }}>
        <directionalLight
          color="#f48037"
          intensity={0.6}
          position={[-100, 100, 80]}
        />
        <directionalLight
          color="white"
          intensity={2}
          position={[-100, 100, 80]}
        />
        <ambientLight intensity={0.1} />
        <OrbitControls />
        <Planet
          ocean
          radius={64}
          detail={128}
          color={"grey"}
          fbmOpts={{
            seed: Math.random(),
            amplitude: 1,
            scale: 0.1,
            octaves: 12,
            persistance: 0.1,
            lacunarity: 10,
            redistribution: 5,
          }}
          perlinOpts={[
            { scale: 1, amplitude: 25 },
            { scale: 1, amplitude: 10 },
            { scale: 0.01, amplitude: 2 },
          ]}
        />
        <Stars speed={.05} />
      </Canvas>
    </div>
  );
}

export default App;
