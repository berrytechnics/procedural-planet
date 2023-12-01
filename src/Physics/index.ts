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
        if (body1.name !== body2.name) {
          const collision = Collision.detectCollision(body2, body1);
          if (collision) {
            if (body1.name == "Sol" || body2.name == "Sol") {
              const notSun = body1.name == "Sol" ? body2 : body1;
              notSun.ref.current.visible = false;
            } else {
              // Collide planets here
              body1.velocity.reflect(body1.velocity.clone().normalize());
            }
          } else Gravity.applyForce(body1, body2, delta);
        }
      });
    });
  },
};
export default Bodies;
