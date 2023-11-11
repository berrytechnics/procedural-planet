import { Canvas } from "@react-three/fiber";
import { FirstPersonControls, OrbitControls, PointerLockControls } from "@react-three/drei";
import Planet from "./components/Planet";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useRef, useState } from "react";
import { Box3, DoubleSide, Vector3 } from "three";
import Ground from "./components/Ground";

function App() {
  const planet = {
    name: "earth",
    // onInit: (ref: any) => (sunRef.current = ref),
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
  };

  const planets = [
    planet,
    planet,
    planet,
    planet,
    planet,
    planet,
    planet,
    planet,
    planet,
    planet,
    planet,
    planet,
  ];
  const [canvasSize, setCanvasSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const controlRef = useRef<any>();
  window.addEventListener("resize", () => {
    setCanvasSize([window.innerWidth, window.innerHeight]);
  });
  window.addEventListener('keydown',e=>{
    switch(e.key) {
      case 'w':
        controlRef.current.position.setX(controlRef.current.position.x+1)
        break;
      case 'a':
        controlRef.current.position.setY(controlRef.current.position.y+1)
        break;
      case 's':
        controlRef.current.position.setX(controlRef.current.position.x-1)
        break;
      case 'd':
        controlRef.current.position.setY(controlRef.current.position.y-1)
        break;
    }
    // controlRef.current.position.setX(controlRef.current.position.x -1)
  });
  return (
    <div style={{ width: canvasSize[0], height: canvasSize[1] }}>
      <Canvas
        camera={{
          // lookAt: () => new Vector3(0, 0, 0),
          position: [0, 20, 10],
          near: 1,
          far: 1000000,
        }}
      >
        <Suspense>
          <Physics gravity={[0, -9.81, 0]}>
            <ambientLight intensity={.2} />
            <directionalLight intensity={1} position={[0,20,10]} />
            <RigidBody colliders="trimesh" lockTranslations>
              <Ground />
            </RigidBody>
            <RigidBody>
              <mesh ref={controlRef} position={[0, 50, 0]}>
                <sphereGeometry />
                <meshPhongMaterial color="grey" />
              </mesh>
            </RigidBody>
            <PointerLockControls />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
