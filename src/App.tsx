import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Physics from "./Physics";
import One from "./Bodies/Planet";
import { Vector3 } from "three";
import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";

import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

function App() {
  useThree(({ camera }) => {
    camera.position.set(0, 100000, 0);
    camera.lookAt(0, 0, 0);
  });
  useFrame((_, delta) => Physics.tick(delta));
  return (
    <>
      <directionalLight position={[0, 0, -1000]} />
      <ambientLight intensity={0.1} />
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={1} levels={8} intensity={40} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
      {[
        {
          name: "1",
          mass: 100000,
          size: 1024,
          detail: 8,
          velocity: new Vector3(0, 0, 0),
          position: new Vector3(0, 0, 0),
          rotation: 0.01,
        },
        {
          name: "2",
          mass: 100,
          size: 512,
          detail: 8,
          velocity: new Vector3(0, 0, 3000),
          position: new Vector3(50000, 0, 0),
          rotation: 0.01,
        },
        {
          name: "2a",
          mass: 100,
          size: 128,
          detail: 8,
          velocity: new Vector3(0, 0, 3500),
          position: new Vector3(48000, 0, 0),
          rotation: 0.01,
        },

      ].map((planet: AnyObject) => (
        <One
          key={planet.name}
          name={planet.name}
          mass={planet.mass}
          size={planet.size}
          detail={planet.detail}
          velocity={planet.velocity}
          position={planet.position}
          rotation={planet.rotation}
        />
      ))}
      <OrbitControls />
    </>
  );
}

export default App;
