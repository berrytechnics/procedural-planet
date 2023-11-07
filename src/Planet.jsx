import { useEffect, useRef } from "react";
import { useFrame } from '@react-three/fiber'
import helpers from "./helpers";

/* eslint-disable react/no-unknown-property */
export default function Planet ()
{
    const planetRef = useRef();
    const groupRef = useRef();
    useFrame( () =>
    {
        groupRef.current.rotation.y += 0.005;
    } )
    useEffect( () =>
    {
        helpers.generate3DPerlinTerrain( planetRef, 1, 20 );
        helpers.generate3DPerlinTerrain( planetRef, .9, 15 );
        helpers.generate3DPerlinTerrain( planetRef, .1, .1 );
        helpers.generateFBM3DTerrian( planetRef, {
            seed: Math.random(),
            amplitude: 2,
            scale: 10,
            octaves: 12,
            persistance: .5,
            lacunarity: 10,
            redistribution: 4
        } );
    }, [] );
    return <group ref={ groupRef }>
        <mesh ref={ planetRef } >
            <icosahedronGeometry args={ [ 64, 128 ] } />
            <meshStandardMaterial color={ 'grey' } />
        </mesh>
        <mesh>
            <sphereGeometry args={ [ 64.3, 24, 24 ] } />
            <meshStandardMaterial color="#224488" />
        </mesh>
    </group>
}
