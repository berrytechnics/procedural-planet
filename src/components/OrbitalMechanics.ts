// Formula for newtonian gravity: G(m1*m2)/d
// const G = 6.6743 * Math.pow(10, -11);
// Where G=<gravitational_constant> m1=mass1, m2=mass2, d=<distance_between_bodies>
// Calculate the force of every body on every other body, on every frame.
import { Vector3 } from "three";
const G = 100;
function calculateForce(mass1, mass2, distance) {
  return (G * mass1 * mass2) / Math.pow(distance, 2);
}
const bodies = new Map();
export default {
  calculateForceApplied: (body1Name: string, body2Name: string) => {
    const body1 = bodies.get(body1Name);
    const body2 = bodies.get(body2Name);
    const pos1 = new Vector3();
    const pos2 = new Vector3();
    body1.ref.current.children[0].getWorldPosition(pos1);
    body2.ref.current.children[0].getWorldPosition(pos2);
    const distance = pos1.distanceTo(pos2);
    const force = (G * body1.mass * body2.mass) / Math.pow(distance, 2);

    const direction = new Vector3();
    direction.subVectors(pos2, pos1).normalize();
    body1.ref.current.position.addScaledVector(direction, force);
  },
  addBody: (name: string, body: any) => bodies.set(name, body),
  getBody: (name?: string) => (name ? bodies.get(name) : bodies.values()),
};
