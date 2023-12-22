import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import Physics from "./Physics";
import NovaCelestia from "./Bodies/NovaCelestia";
import VesperaMagna from "./Bodies/VesperaMagna";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { PointLightHelper } from "three";
import Trismegistus from "./Bodies/Trismegistus";
import { useRef } from "react";
function App() {
  const ref = useRef<any>();
  useHelper(ref, PointLightHelper, 100000, "green");
  useThree(({ camera }) => {
    camera.position.set(0, 0, 100000);
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
      <VesperaMagna />
      <Trismegistus />
      <OrbitControls />
    </>
  );
}

export default App;
