import { useEffect, useRef } from "react";
import { useFrame } from '@react-three/fiber'
import helpers from "./helpers";

/* eslint-disable react/no-unknown-property */
export default function Planet ()
{
    const planetRef = useRef();
    useFrame( () =>
    {
        planetRef.current.rotation.y += 0.005;
    } )
    useEffect( () =>
    {
        helpers.generate3DPerlinTerrain( planetRef, 2, 20 )
        helpers.generate3DPerlinTerrain( planetRef, 5, 20 )
        helpers.generateFBM3DTerrian( planetRef, {
            seed: Math.random(),
            amplitude: 4,
            scale: 25,
            octaves: 12,
            persistance: .5,
            lacunarity: 10,
            redistribution: 4
        } );
    }, [] );
    return <mesh ref={ planetRef } >
        <icosahedronGeometry args={ [ 64, 128 ] } />
        <meshStandardMaterial color={ 'grey' } />
    </mesh>
}
