<<<<<<< Updated upstream
import Collision from "./Collision";
import Gravity from "./Gravity";
import Terrain from "./Terrain";

const bodies = new Map();
=======
import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";
import Collision from "../physics/Collision";
import Gravity from "../physics/Gravity";
const bodies = new Map<string, AnyObject>();
>>>>>>> Stashed changes
const Bodies = {
  addBody: (body: any) => {
    bodies.set(body.name, body)
    body.last && Bodies.initBodies();
  },
  getBody: (name: string) => bodies.get(name),
  removeBody: (name: string) => bodies.delete(name),
  updateBody: (name: string, body: any) => bodies.set(name, body),
  initBodies: () => {
    for (const [name, body] of bodies) {
      // {
      //   body.perlinOpts &&
      //     body.perlinOpts.forEach((opt) => {
      //       Terrain.generate3DPerlinTerrain(
      //         body.ref.current.children[0],
      //         opt.amplitude,
      //         opt.scale
      //       );
      //     });
      // }
      // {
      //   body.fbmOpts &&
      //     Terrain.generateFBM3DTerrian(
      //       body.ref.current.children[0],
      //       body.fbmOpts
      //     );
      // }
      // Terrain.generate3DTerrainColor(
      //   body.ref.current.children[0],
      //   body.ref.current.children[1] ?? undefined
      // );
    }
  },
  tick: (delta: number) => {
    for (const [name, body] of bodies) {
      Collision.detectCollisions();
      Gravity.applyForces();
    }
  },
};
export { Bodies, bodies };
