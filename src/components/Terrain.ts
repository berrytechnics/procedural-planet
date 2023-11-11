import { Perlin, FBM } from "three-noise";
import { BufferAttribute, Color, Vector2, Vector3 } from "three";
const defaultOptions = {
  amplitude: 1,
  scale: 3,
  octaves: 12,
  persistance: 0.2,
  lacunarity: 3,
  redistribution: 3,
};
const Terrain = {
  /**
   * Map `value` from range `x` to range `y`.
   */
  map_range: (value: number, x1: number, y1: number, x2: number, y2: number) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2,
  /**
   * Generate Perlin noise terrain for a 3D surface.
   */
  generate3DPerlinTerrain: (meshRef: any, amplitude = 1, scale = 30) => {
    const perlin = new Perlin(Math.random());
    const { geometry } = meshRef.current;
    const { position } = geometry.attributes;
    // For each vertex in the geometry.
    for (let i = 0; i < position.array.length; i += 3) {
      // Generate a noise value for the current vector, accounting for scale.
      const noiseVal = perlin.get3(
        new Vector3(
          position.array[i] / scale,
          position.array[i + 1] / scale,
          position.array[i + 2] / scale
        )
      );
      // Get the current vector.
      const vector = new Vector3(
        position.array[i],
        position.array[i + 1],
        position.array[i + 2]
      );
      // Get the normal of the current vector.
      const direction = vector.clone().normalize();
      // Add the noise value to the vector value in the direction of the normal, accounting for the amplitude.
      const newVector = vector
        .clone()
        .addScaledVector(direction, noiseVal * amplitude);
      position.array[i] = newVector.x;
      position.array[i + 1] = newVector.y;
      position.array[i + 2] = newVector.z;
    }
    // Update the mesh and recalculate the normals.
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  },
  /**
   * Generate FBM noise terrain for a 3D surface.
   */
  generateFBM3DTerrian: (meshRef: any, options = defaultOptions) => {
    // Init noise function.
    const noise = new FBM(options);
    const { geometry } = meshRef.current;
    const { position } = geometry.attributes;
    // For each vector in the geometry.
    for (let i = 0; i < position.array.length; i += 3) {
      // Generate a noise value for the current vector.
      const noiseVal = noise.get3(
        new Vector3(
          position.array[i],
          position.array[i + 1],
          position.array[i + 2]
        )
      );
      // Get the current vector.
      const vector = new Vector3(
        position.array[i],
        position.array[i + 1],
        position.array[i + 2]
      );
      // Get the normal of the current vector.
      const direction = vector.clone().normalize();
      // Add the noise value to the vector value in the direction of the normal.
      const newVector = vector.clone().addScaledVector(direction, noiseVal);
      position.array[i] = newVector.x;
      position.array[i + 1] = newVector.y;
      position.array[i + 2] = newVector.z;
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  },
  /**
   * Generate terrain color for a 3D surface.
   */
  generate3DTerrainColor: (meshRef: any, oceanRef?: any) => {
    const { geometry } = meshRef.current;
    const { position } = geometry.attributes;
    // Compute the bounding sphere of the geometry.
    geometry.computeBoundingSphere();
    // Center the ocean on the planet.
    if (oceanRef.current) {
      oceanRef.current.position.set(
        geometry.boundingSphere.center.x,
        geometry.boundingSphere.center.y,
        geometry.boundingSphere.center.z
      );
      oceanRef.current.position.needsUpdate = true;
    }
    // Create a color matrix.
    const colorMatrix = new Float32Array(position.array.length);
    // For each vector in the geometry.
    for (let i = 0; i < position.array.length; i += 3) {
      const point = new Vector3(
        position.array[i],
        position.array[i + 1],
        position.array[i + 2]
      );
      let color;
      // Get the altitude of the point.
      const altitude = point.distanceTo(geometry.boundingSphere.center);
      // Generate a color value based on the altitude.
      const colorValue = Terrain.map_range(
        altitude,
        geometry.parameters.radius,
        geometry.boundingSphere.radius,
        0,
        100
      );
      // Map colors to the altitude.
      if (colorValue < 0) {
        color = new Color("#C2B280"); // Sand.
      } else if (colorValue < 50) {
        let randColor = "#";
        const letters = "5678";
        for (let i = 0; i < 6; i++) {
          if ([2, 3].includes(i)) {
            randColor += letters[Math.floor(Math.random() * letters.length)];
            continue;
          }
          randColor += "1";
        }
        color = new Color(randColor); // Grass/Forest.
      } else if (colorValue < 85 && colorValue < 85.5) {
        const rV = Terrain.map_range(Math.random(), 0, 1, 0.2, 0.3);
        color = new Color(rV, rV, rV); // Stone/Timberline.
      } else {
        color = new Color("white"); // Snow.
      }

      colorMatrix[i] = color.r;
      colorMatrix[i + 1] = color.g;
      colorMatrix[i + 2] = color.b;
    }
    // Update the mesh.
    const colorBuffer = new BufferAttribute(colorMatrix, 3);
    geometry.setAttribute("color", colorBuffer);
    geometry.attributes.color.needsUpdate = true;
    return;
  },

};
export default Terrain;
