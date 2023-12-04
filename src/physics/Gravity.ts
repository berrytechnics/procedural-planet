import { Vector3 } from "three";
import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";
const G = 100;
const Gravity = {
  calculateForce: (
    mass1: number,
    mass2: number,
    distance: number,
    delta: number
  ) => {
    // Doesn't this mean that a small body and a large body exert equal forces on eachother?
    // Yes in fact. This is Newtons Universal Law of Gravity. (G*m1*m2/r^2)
    // You also need to account for Newton's Third Law of Gravity. (F=m*a)
    return G * ((mass1 * mass2) / Math.pow(distance, 2)) * delta;
  },
  applyForce: (body1: AnyObject, body2: AnyObject, delta: number) => {
    if (body2.static) return;
    // Get body world positions.
    const body1Position = body1.ref.current.getWorldPosition(new Vector3());
    const body2Position = body2.ref.current.getWorldPosition(new Vector3());
    // Calculate universal gravitational force.
    const distance = body1Position.distanceTo(body2Position);
    const direction = new Vector3()
      .subVectors(body2Position, body1Position)
      .normalize();
    const universalForce = Gravity.calculateForce(
      body1.mass,
      body2.mass,
      distance,
      delta
    );
    // Forces are equal and opposite according to Newton's third law
    const appliedForce =
      universalForce * (body2.mass / (body1.mass + body2.mass));
    // Apply force to body2's velocity.
    const newVelocity = body2.velocity
      .clone()
      .addScaledVector(direction, appliedForce);
    body2.velocity = newVelocity;
    body2.ref.current.position.x -= newVelocity.x;
    body2.ref.current.position.y -= newVelocity.y;
    body2.ref.current.position.z -= newVelocity.z;
    body2.ref.current.position.needsUpdate = true;
  },
};
export default Gravity;
