import { Perlin, FBM } from "three-noise";
import { BufferAttribute, Color, Vector2, Vector3 } from "three";
const perlin = new Perlin(Math.random());
const defaultOptions = {
  seed: Math.random(),
  amplitude: 1,
  scale: 3,
  octaves: 12,
  persistance: 0.2,
  lacunarity: 3,
  redistribution: 3,
};
const Terrain = {
  map_range: (value: number, x1: number, y1: number, x2: number, y2: number) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2,
  generatePerlinTerrain: (meshRef: any, amplitude = 1, scale = 30) => {
    const { geometry } = meshRef.current;
    const { position } = geometry.attributes;
    for (let i = 0; i < position.array.length; i += 3) {
      const noiseVal = perlin.get2(
        new Vector2(position.array[i] / scale, position.array[i + 1] / scale)
      );
      position.array[i + 2] += noiseVal * amplitude * (Math.random() * 2);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  },
  generate3DPerlinTerrain: (meshRef: any, amplitude = 1, scale = 30) => {
    const { geometry } = meshRef.current;
    const { position } = geometry.attributes;
    for (let i = 0; i < position.array.length; i += 3) {
      const noiseVal = perlin.get3(
        new Vector3(
          position.array[i] / scale,
          position.array[i + 1] / scale,
          position.array[i + 2] / scale
        )
      );
      const vector = new Vector3(
        position.array[i],
        position.array[i + 1],
        position.array[i + 2]
      );
      const direction = vector.clone().normalize();
      const newVector = vector
        .clone()
        .addScaledVector(direction, noiseVal * amplitude);
      position.array[i] = newVector.x;
      position.array[i + 1] = newVector.y;
      position.array[i + 2] = newVector.z;
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  },
  generateFBMTerrian: (meshRef: any, options = defaultOptions) => {
    const noise = new FBM(options);
    const { geometry } = meshRef.current;
    const { position } = geometry.attributes;
    for (let i = 0; i < position.array.length; i += 3) {
      const noiseVal = noise.get2(
        new Vector2(position.array[i], position.array[i + 2])
      );
      const vector = new Vector2(position.array[i], position.array[i + 2]);
      const direction = vector.clone().normalize();
      const newVector = vector
        .clone()
        .addScaledVector(direction, noiseVal * options.amplitude);
      position.array[i + 1] = newVector.y;
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  },
  generateFBM3DTerrian: (meshRef: any, options = defaultOptions) => {
    const noise = new FBM(options);
    const { geometry } = meshRef.current;
    const { position } = geometry.attributes;
    for (let i = 0; i < position.array.length; i += 3) {
      const noiseVal = noise.get3(
        new Vector3(
          position.array[i],
          position.array[i + 1],
          position.array[i + 2]
        )
      );
      const vector = new Vector3(
        position.array[i],
        position.array[i + 1],
        position.array[i + 2]
      );
      const direction = vector.clone().normalize();
      const newVector = vector.clone().addScaledVector(direction, noiseVal);
      position.array[i] = newVector.x;
      position.array[i + 1] = newVector.y;
      position.array[i + 2] = newVector.z;
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  },
  generateTerrainColor: (meshRef: any, oceanRef?: any) => {
    const { geometry } = meshRef.current;
    const { position } = geometry.attributes;
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

    const colorMatrix = new Float32Array(position.array.length);

    for (let i = 0; i < position.array.length; i += 3) {
      const point = new Vector3(
        position.array[i],
        position.array[i + 1],
        position.array[i + 2]
      );
      let color;
      const altitude = point.distanceTo(geometry.boundingSphere.center);
      const colorValue = Terrain.map_range(
        altitude,
        geometry.parameters.radius,
        geometry.boundingSphere.radius,
        0,
        100
      );

      if (colorValue < 0) {
        color = new Color("sandybrown");
      } else if (colorValue < 50) {
        color = new Color("green");
      } else if (colorValue < 85 && colorValue < 85.5) {
        color = new Color("grey");
      } else {
        color = new Color("white");
      }

      colorMatrix[i] = color.r;
      colorMatrix[i + 1] = color.g;
      colorMatrix[i + 2] = color.b;
    }
    const colorBuffer = new BufferAttribute(colorMatrix, 3);
    geometry.setAttribute("color", colorBuffer);
    geometry.attributes.color.needsUpdate = true;
    return;
  },
};
export default Terrain;
