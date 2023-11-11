import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Planet from "./components/Planet";
import { Suspense, useState } from "react";
import { Vector3 } from "three";

function App() {
  const planets = [
    {
      mass: 1,
      name: "earth",
      ocean: "enabled",
      radius: 16,
      detail: 64,
      color: "white",
      fbmOpts: {
        amplitude: 0.5,
        scale: 0.2,
        octaves: 24,
        persistance: 0.1,
        lacunarity: 5,
        redistribution: 2,
      },
      perlinOpts: [
        { scale: 5, amplitude: 40 },
        { scale: 1, amplitude: 10 },
      ],
    },
    {
      mass: 2,
      name: "earth2",
      ocean: "enabled",
      radius: 16,
      detail: 64,
      color: "white",
      fbmOpts: {
        amplitude: 0.5,
        scale: 0.2,
        octaves: 24,
        persistance: 0.1,
        lacunarity: 5,
        redistribution: 2,
      },
      perlinOpts: [
        { scale: 5, amplitude: 40 },
        { scale: 1, amplitude: 10 },
      ],
    },
  ];
  const [canvasSize, setCanvasSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  window.addEventListener("resize", () => {
    setCanvasSize([window.innerWidth, window.innerHeight]);
  });
  return (
    <div style={{ width: canvasSize[0], height: canvasSize[1] }}>
      <Canvas camera={{ position: [0, 0, 150], near: 1, far: 1000000 }}>
        <Suspense>
          <directionalLight
            color="#ffffff"
            intensity={1}
            position={[-100, 100, 80]}
          />
          <ambientLight intensity={0.2} />
          {planets.map((planet, i) => {
            return (
              <Planet
                initialVelocity={new Vector3(0, 0, i < 1 ? -10 : 10)}
                position={new Vector3(i * 100, 0, 0)}
                {...planet}
              />
            );
          })}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
