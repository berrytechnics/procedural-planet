import { Vector3 } from "three";
import { AnyObject } from "three/examples/jsm/nodes/Nodes.js";
const Collision = {
  detectCollision: (body1: AnyObject, body2: AnyObject) => {
    const body1Position = body1.ref.current.getWorldPosition(new Vector3());
    const body2Position = body2.ref.current.getWorldPosition(new Vector3());
    const distance = body2Position.distanceTo(body1Position) - (body1.size+body2.size);
    return(distance<=0)
  },
};
export default Collision;
