import { Perlin, FBM } from "three-noise";
import { Color, Vector2, Vector3 } from "three";
import { Face } from "three/examples/jsm/Addons.js";
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
export default {
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
        new Vector2(
          position.array[i],
          position.array[i + 1],
          position.array[i + 2]
        )
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
  generateTerrainColor: (meshRef: any) => {
    const faceIndices = ["a", "b", "c", "d"];
    const { geometry } = meshRef.current;
    // first, assign colors to vertices as desired
    for (let i = 0; i < geometry.vertices.length; i++) {
      const size = 100;
      const point = geometry.vertices[i];
      const color = new Color(0xffffff);
      color.setRGB(
        0.5 + point.x / size,
        0.5 + point.y / size,
        0.5 + point.z / size
      );
      geometry.colors[i] = color; // use this array for convenience
    }
    // copy the colors to corresponding positions
    //     in each face's vertexColors array.
    for (let i = 0; i < geometry.faces.length; i++) {
      const face = geometry.faces[i];
      const numberOfSides = face instanceof Face ? 3 : 4;
      for (let j = 0; j < numberOfSides; j++) {
        const vertexIndex = face[faceIndices[j]];
        face.vertexColors[j] = geometry.colors[vertexIndex];
      }
    }
    geometry.colorsNeedUpdate = true;
    return;
  },
};
