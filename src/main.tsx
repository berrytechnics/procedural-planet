import "./index.css";
import ReactDOM from "react-dom/client";
import { MutableRefObject, useRef } from "react";
import { Object3D, Object3DEventMap, PointLightHelper } from "three";
import { Canvas } from "@react-three/fiber";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useHelper } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Physics from "./Physics";
import NovaCelestia from "./Bodies/NovaCelestia";
import VesperaMagna from "./Bodies/VesperaMagna";
import Trismegistus from "./Bodies/Trismegistus";
import Itokawa from './Bodies/Itokawa';

export function Universe() {
  const ref = useRef<MutableRefObject<Object3D<Object3DEventMap>>>(null);
  useHelper(ref.current, PointLightHelper, 100000, "green");
  useThree(({ camera }) => {
    camera.position.set(0, 100000, 0);
    camera.lookAt(0, 0, 0);
  });
  useFrame((_, delta) => Physics.tick(delta));

  return (
    <>
      <EffectComposer>
        <Bloom luminanceSmoothing={0.9} height={1000} />
      </EffectComposer>
      <pointLight intensity={1000000000} distance={10000000} color="white" />
      <NovaCelestia />
      <Itokawa />
      <VesperaMagna />
      <Trismegistus />
      <Stars
        radius={10000000}
        depth={5000}
        count={10000}
        factor={200000}
        saturation={0}
        fade
        speed={0.01}
      />
      <OrbitControls />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas camera={{ near: .01, far: 100000000 }}>
      <ambientLight intensity={.01} />
      <Universe />
    </Canvas>
  </div>
);
