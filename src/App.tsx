import { useFrame, useThree } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import Planet from "./components/Planet";
import { Suspense } from "react";
import { Vector3 } from "three";
import { Bodies } from "./physics/Bodies";

function App() {
  const planets = [
    {
      name: "earth",
      rotation: 0.1,
      ocean: "enabled",
      radius: 16,
      mass: 1000,
      static: true,
      detail: 64,
      color: "white",
      initialVelocity: new Vector3(0, 0, 0),
      position: new Vector3(0, 0, 0),
      fbmOpts: {
        amplitude: 0.5,
        scale: 0.2,
        octaves: 24,
        persistance: 0.1,
        lacunarity: 5,
        redistribution: 2,
      },
      perlinOpts: [
        { scale: 15, amplitude: 2 },
        { scale: 40, amplitude: 0.5 },
      ],
    },
    {
      name: "moon",
      rotation: 1,
      radius: 4,
      mass: 100,
      detail: 8,
      color: "white",
      initialVelocity: new Vector3(0, 0, 2.6),
      position: new Vector3(150, 0, 0),
      fbmOpts: {
        amplitude: 0.5,
        scale: 0.2,
        octaves: 24,
        persistance: 0.1,
        lacunarity: 5,
        redistribution: 2,
      },
      perlinOpts: [
        { scale: 15, amplitude: 2 },
        { scale: 40, amplitude: 0.5 },
      ],
    },
  ];
  useThree(({ camera }) => {
    camera.position.set(0, 500, 0);
    camera.lookAt(0, 0, 0);
  });
  useFrame((_, delta) => Bodies.tick(delta));
  return (
    <>
      <Suspense fallback={null}>
        <directionalLight
          color="#ffffff"
          intensity={2}
          position={[-100, 100, 80]}
        />
        <ambientLight intensity={0.25} />
        {planets.map((planet, i) => (
          <Planet
            key={i}
            {...planet}
            last={i + 1 === planets.length ? true : false}
          />
        ))}
        <OrbitControls />
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
