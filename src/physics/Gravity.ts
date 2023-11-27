import { Vector3 } from "three";
import { bodies } from "../components/Bodies";
const G = 1;
const Gravity = {
  calculateForce: (mass1: number, mass2: number, distance: number) => {
    return (G * mass1 * mass2) / Math.pow(distance, 2);
  },
  applyForces: () => {
    for (const [name, body] of bodies) {
      for (const [name2, body2] of bodies) {
        if (name !== name2) {
          const b1p = body.ref.current.children[0].getWorldPosition(
            new Vector3()
          );
          const b2p = body2.ref.current.children[0].getWorldPosition(
            new Vector3()
          );
          const distance = b1p.distanceTo(b2p);

          const direction = new Vector3().subVectors(b2p, b1p).normalize();
          const force = Gravity.calculateForce(body.mass, body2.mass, distance);

          // apply force to body2's velocity.
          const newVelocity = body2.velocity
            .clone()
            .addScaledVector(direction, force);
        //   body2.velocity = newVelocity;
        //   body2.ref.current.position.x = newVelocity.x;
        //   body2.ref.current.position.y = newVelocity.y;
        //   body2.ref.current.position.z = newVelocity.z;
        //   body2.ref.current.position.needsUpdate = true;
        //   bodies.set(body2.name, body2);
        }
      }
    }
  },
};
export default Gravity;
