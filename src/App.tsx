import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Physics from "./Physics";
import NovaCelestia from "./Bodies/NovaCelestia";
import VesperaMagna from "./Bodies/VesperaMagna";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
function App() {
  useThree(({ camera }) => {
    camera.position.set(0, 100000, 0);
    camera.lookAt(0, 0, 0);
  });
  useFrame((_, delta) => Physics.tick(delta));
  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
      <ambientLight intensity={0.1} />
      <NovaCelestia />
      <VesperaMagna />
      <OrbitControls />
    </>
  );
}

export default App;
