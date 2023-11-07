/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GUI from "lil-gui";
import Planet from "./Planet";
import { useState } from "react";

const gui = new GUI();
function App() {
  const [canvasSize, setCanvasSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  window.addEventListener("resize", () => {
    setCanvasSize([window.innerWidth, window.innerHeight]);
  });
  const [settings, setSettings] = useState({
    scale: 1,
    detail: 1,
  });
  gui
    .add({ scale: 1 }, "scale", 1, 1000, 1)
    .onChange((v: number) => setSettings({ ...settings, scale: v }));
  return (
    <div style={{ width: canvasSize[0], height: canvasSize[1] }}>
      <Canvas camera={{ position: [0, 0, 75] }}>
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
          radius={32 * settings.scale}
          detail={128}
          color={"grey"}
          fbmOpts={{
            seed: Math.random(),
            amplitude: 1,
            scale: .1,
            octaves: 12,
            persistance: 0.1,
            lacunarity: 10,
            redistribution: 5,
          }}
          perlinOpts={[
            { scale: 1, amplitude: 25 },
            { scale: 1, amplitude: 10 },
            { scale: .05, amplitude: 2 },
          ]}
        />
      </Canvas>
    </div>
  );
}

export default App;
