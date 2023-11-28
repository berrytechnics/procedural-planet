import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";
import Gravity from "./Gravity";
const bodies = new Map<string, AnyObject>();
const Bodies = {
  addBody: (body: any) => {
    bodies.set(body.name, body);
  },
  getBody: (name: string) => bodies.get(name),
  removeBody: (name: string) => bodies.delete(name),
  updateBody: (name: string, body: any) => bodies.set(name, body),
  tick: (delta: number) => {
    for (const [name, body] of bodies) {
      Gravity.applyForces(name, body, delta);
    }
  },
};
export { Bodies, bodies };
