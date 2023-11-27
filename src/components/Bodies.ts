import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";
import Collision from "./Collision";
import Gravity from "./Gravity";
const bodies = new Map<string, AnyObject>();
const Bodies = {
  addBody: (body: AnyObject) => {
    bodies.set(body.name, body);
  },
  getBody: (name: string) => bodies.get(name),
  removeBody: (name: string) => bodies.delete(name),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateBody: (name: string, body: any) => bodies.set(name, body),
  hasBody: (name: string) => bodies.has(name),
  clearBodies: () => {
    bodies.clear();
  },
  count: () => bodies.size,
  tick: (delta:number) => {
  delta;
   bodies.forEach(()=>{
      Gravity.applyForces();
      Collision.detectCollisions();
    })
  },
};
export { Bodies, bodies };
