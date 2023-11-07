import { Perlin, FBM } from 'three-noise';
import { Vector2, Vector3 } from 'three';
const perlin = new Perlin( Math.random() );
export default {
    generatePerlinTerrain: ( meshRef, amplitude = 1, scale = 30 ) =>
    {
        const { geometry } = meshRef.current;
        const { position } = geometry.attributes;
        for ( let i = 0; i < position.array.length; i += 3 ) {
            const noiseVal = perlin.get2( new Vector2( position.array[ i ] / scale, position.array[ i + 1 ] / scale ) );
            position.array[ i + 2 ] += noiseVal * amplitude * ( Math.random() * 2 );
        }
        position.needsUpdate = true;
        geometry.computeVertexNormals();
    },
    generate3DPerlinTerrain: ( meshRef, amplitude = 1, scale = 30 ) =>
    {
        const { geometry } = meshRef.current;
        const { position } = geometry.attributes;
        for ( let i = 0; i < position.array.length; i += 3 ) {
            const noiseVal = perlin.get3( new Vector3( position.array[ i ] / scale, position.array[ i + 1 ] / scale, position.array[ i + 2 ] / scale ) );
            const vector = new Vector3( position.array[ i ], position.array[ i + 1 ], position.array[ i + 2 ] );
            const direction = vector.clone().normalize();
            const newVector = vector.clone().addScaledVector( direction, noiseVal * amplitude );
            position.array[ i ] = newVector.x;
            position.array[ i + 1 ] = newVector.y;
            position.array[ i + 2 ] = newVector.z;
        }
        position.needsUpdate = true;
        geometry.computeVertexNormals();
    },
    generateFBMTerrian: ( meshRef, options = {
        seed: Math.random(),
        amplitude: 1,
        scale: 50,
        octaves: 4,
        persistance: 0.5,
        lacunarity: 1,
        redistribution: 1
    } ) =>
    {
        const noise = new FBM( options );
        const { geometry } = meshRef.current;
        const { position } = geometry.attributes;
        for ( let i = 0; i < position.array.length; i += 3 ) {
            const noiseVal = noise.get2( new Vector2( position.array[ i ], position.array[ i + 1 ], position.array[ i + 2 ] ) );
            const vector = new Vector2( position.array[ i ], position.array[ i + 2 ] );
            const direction = vector.clone().normalize();
            const newVector = vector.clone().addScaledVector( direction, noiseVal * options.amplitude );
            position.array[ i + 1 ] = newVector.y;

        }
        position.needsUpdate = true;
        geometry.computeVertexNormals();

    },
    generateFBM3DTerrian: ( meshRef, options = {
        seed: Math.random(),
        amplitude: 1,
        scale: 50,
        octaves: 4,
        persistance: 0.5,
        lacunarity: 1,
        redistribution: 1
    } ) =>
    {
        const noise = new FBM( options );
        const { geometry } = meshRef.current;
        const { position } = geometry.attributes;
        for ( let i = 0; i < position.array.length; i += 3 ) {
            const noiseVal = noise.get3( new Vector3( position.array[ i ], position.array[ i + 1 ], position.array[ i + 2 ] ) );
            const vector = new Vector3( position.array[ i ], position.array[ i + 1 ], position.array[ i + 2 ] );
            const direction = vector.clone().normalize();
            const newVector = vector.clone().addScaledVector( direction, noiseVal * options.amplitude );
            position.array[ i ] = newVector.x;
            position.array[ i + 1 ] = newVector.y;
            position.array[ i + 2 ] = newVector.z;

        }
        position.needsUpdate = true;
        geometry.computeVertexNormals();

    },
}