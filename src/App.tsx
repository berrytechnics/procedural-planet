import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Physics from "./Physics";
import NovaCelestia from "./Bodies/NovaCelestia";
import Effects from "./Effects";
import VesperaMagna from "./Bodies/VesperaMagna";
function App() {
  useThree(({ camera }) => {
    camera.position.set(0, 100000, 0);
    camera.lookAt(0, 0, 0);
  });
  useFrame((_, delta) => Physics.tick(delta));
  return (
    <>
      <ambientLight intensity={0.1} />
      <NovaCelestia />
      <VesperaMagna />
      <OrbitControls />
      <Effects />
    </>
  );
}

export default App;
