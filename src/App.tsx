import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { FlyControls, OrbitControls, Stars } from "@react-three/drei";
import Planet from "./components/Planet";
import { Suspense } from "react";
import { TextureLoader, Vector3 } from "three";
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
        { scale: 15, amplitude: 2 },
        { scale: 40, amplitude: 0.5 },
      ],
    },
  ];
  const terrain = useLoader(TextureLoader, [
    "/textures/map.jpg",
    "/textures/normal.jpg",
  ]);
  useThree(({ camera }) => {
    camera.position.z = planets[0].radius * 2;
    camera.lookAt(0, 0, 0);
  });
  useFrame((_, delta) => Bodies.tick(delta));
  return (
    <Suspense fallback={<h1 style={{ color: "red" }}>LOADING...</h1>}>
      <directionalLight
        color="#ffffff"
        intensity={2}
        position={[-100, 100, 80]}
      />
      <ambientLight intensity={0.5} />
      {planets.map((planet, i) => (
        <Planet
          key={i}
          terrain={terrain}
          {...planet}
          last={i + 1 === planets.length ? true : false}
        />
      ))}
      {/* <Stars speed={0.02} /> */}
      {/* <FlyControls rollSpeed={0.1} movementSpeed={1} /> */}
      <OrbitControls />
    </Suspense>
  );
}

export default App;
