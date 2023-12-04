import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Physics from "./Physics";
import One from "./Bodies/Planet";
import { Vector3 } from "three";
import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";


function App() {
  useThree(({ camera }) => {
    camera.position.set(0, 100000, 0);
    camera.lookAt(0, 0, 0);
  });
  useFrame((_, delta) => Physics.tick(delta));
  return (
    <>
      <ambientLight intensity={1} />
      // initV = Math.sqrt(G*m/r) where m = parent body mass and r = orbit radius (pos.x)
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
          velocity: new Vector3(0, 0, 3550),
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
      {/* <audio src="audio/Frozen_Star.mp3" autoPlay loop /> */}

    </>
  );
}

export default App;
