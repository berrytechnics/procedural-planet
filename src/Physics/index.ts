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
    // Compare all bodies to each other.
    Bodies.bodies.forEach((body1) => {
      Bodies.bodies.forEach((body2) => {
        // If body1 and body2 are different bodies.
        if (body1.name !== body2.name) {
          const collision = Collision.detectCollision(body2, body1);
          // Break if collision with invisible body.
          if (!body1.ref.current.visible || !body2.ref.current.visible) return;
          if (collision) {
            // Remove smaller body and add half of its mass to the other.
            if (body1.mass > body2.mass) {
              body1.mass += body2.mass / 2;
              body2.mass = 0;
              body2.ref.current.visible = false;
            } else {
              body2.mass += body1.mass / 2;
              body1.mass = 0;
              body1.ref.current.visible = false;
            }
            // Step gravity.
          } else Gravity.applyForce(body1, body2, delta);
        }
      });
    });
  },
};
export default Bodies;
