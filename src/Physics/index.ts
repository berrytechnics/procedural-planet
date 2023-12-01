import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";
import Gravity from "./Gravity";
import Collision from "./Collision";
import { Vector3 } from "three";
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
        if (body1.name !== body2.name) {
          const collision = Collision.detectCollision(body2, body1);
          if (collision) {
            if (body1.name == "Sol")
              body1.velcity = body2.velocity = new Vector3(0, 0, 0);
            else {
              body2.velocity.add(body1.velocity);
              body1.velocity.sub(body2.velocity);
            }
          }
          Gravity.applyForce(body1, body2, delta);
        }
      });
    });
  },
};
export default Bodies;
