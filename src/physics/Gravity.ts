import { Vector3 } from "three";
import RigidBodies from ".";
import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";
const G = 1;
const Gravity = {
  calculateForce: (
    mass1: number,
    mass2: number,
    distance: number,
    delta: number
  ) => {
    return G * ((mass1 * mass2) / Math.pow(distance, 2)) * delta;
  },
  applyForce: (body1: AnyObject, body2: AnyObject, delta: number) => {
    if (body2.static) return;
    // Get body world positions.
    const body1Position = body1.ref.current.getWorldPosition(new Vector3());
    const body2Position = body2.ref.current.getWorldPosition(new Vector3());
    // Calculate applied force.
    const distance = body1Position.distanceTo(body2Position);
    const direction = new Vector3()
      .subVectors(body2Position, body1Position)
      .normalize();
    const force = Gravity.calculateForce(
      body1.mass,
      body2.mass,
      distance,
      delta
    );
    // Apply force to body2's velocity.
    const newVelocity = body2.velocity
      .clone()
      .addScaledVector(direction, force);
    body2.velocity = newVelocity;
    body2.ref.current.position.x -= newVelocity.x;
    body2.ref.current.position.y -= newVelocity.y;
    body2.ref.current.position.z -= newVelocity.z;
    body2.ref.current.position.needsUpdate = true;
    RigidBodies.bodies.set(body2.name, body2);
  },
};
export default Gravity;
