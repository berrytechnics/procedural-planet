import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";
import Gravity from "./Gravity";
import Collision from "./Collision";
const Bodies = {
  bodies: new Map<string, AnyObject>(),
  addBody: (body: AnyObject) => {
    Bodies.bodies.set(body.name, body);
  },
  getBody: (name: string) => Bodies.bodies.get(name),
  removeBody: (name: string) => Bodies.bodies.delete(name),
  updateBody: (name: string, body: AnyObject) => Bodies.bodies.set(name, body),
  tick: (delta: number) => {
    Bodies.bodies.forEach((body1) => {
      Bodies.bodies.forEach((body2) => {
        if (body1 !== body2) {
          const collision = Collision.detectCollision(body2, body1);
          if(!collision)Gravity.applyForce(body1, body2, delta);
        }
      });
    });
  },
};
export default Bodies;
