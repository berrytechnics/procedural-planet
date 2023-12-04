import { Vector3, Matrix4 } from "three";
import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";

const G = 10000000;

const Gravity = {
  calculateForce: (
    mass1: number,
    mass2: number,
    distance: number,
    delta: number
  ) => {
    const force = G * ((mass1 * mass2) / (distance * distance)) * delta;
    return force;
  },
  applyForce: (body1: AnyObject, body2: AnyObject, delta: number) => {
    if (!body1 || !body2) return;

    const body1Position = new Vector3();
    const body2Position = new Vector3();

    body1.ref.current.getWorldPosition(body1Position);
    body2.ref.current.getWorldPosition(body2Position);

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

    const appliedForce =
      universalForce * (body1.mass / (body1.mass + body2.mass));
    const newVelocity = body2.velocity
      .clone()
      .addScaledVector(direction, appliedForce);
    body2.velocity = newVelocity;

    const velocityDelta = new Vector3().copy(newVelocity).multiplyScalar(delta);
    const positionMatrix = new Matrix4().makeTranslation(
      -velocityDelta.x,
      -velocityDelta.y,
      -velocityDelta.z
    );
    body2.ref.current.applyMatrix4(positionMatrix);
  },
};

export default Gravity;
