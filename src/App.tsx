import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Planet from "./components/Planet";
import { Suspense } from "react";
import { Vector3 } from "three";
import { Bodies } from "./components/Bodies";

function App() {
  const planets = [
    {
      name: "earth",
      ocean: "enabled",
      radius: 16,
      mass: 1,
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
        { scale: 15, amplitude: 2},
        { scale: 40, amplitude: .5},
      ],
    },
    {
      name: "earth2",
      ocean: "enabled",
      mass: 1,
      radius: 16,
      detail: 64,
      color: "white",
      initialVelocity: new Vector3(0, 0, 0),
      position: new Vector3(100, 0, 0),
      fbmOpts: {
        amplitude: 0.5,
        scale: 0.2,
        octaves: 24,
        persistance: 0.1,
        lacunarity: 5,
        redistribution: 2,
      },
      perlinOpts: [
        { scale: 15, amplitude: 2},
        { scale: 40, amplitude: .5},
      ],
    },
  ];
  useFrame((_, delta) => Bodies.tick(delta));
  return (
    <Suspense>
      <directionalLight
        color="#ffffff"
        intensity={1}
        position={[-100, 100, 80]}
      />
      <ambientLight intensity={0.2} />
      {planets.map((planet, i) => (
        <Planet
          key={i}
          {...planet}
          last={i + 1 === planets.length ? true : false}
        />
      ))}
      {/* <Stars speed={0.02} /> */}
      <OrbitControls />
      {/* <PointerLockControls /> */}
    </Suspense>
  );
}

export default App;
