import { useEffect, useRef } from "react";
import helpers from "./helpers";

/* eslint-disable react/no-unknown-property */
export default function Planet ()
{
    const planetRef = useRef();
    useEffect( () =>
    {
        helpers.generateFBM3DTerrian( planetRef, {
            seed: Math.random(),
            amplitude: 1,
            scale: 3,
            octaves: 12,
            persistance: .2,
            lacunarity: 3,
            redistribution: 3
        } );
    }, [] );
    return <mesh ref={ planetRef } >
        <icosahedronGeometry args={ [ 64, 64 ] } />
        <meshNormalMaterial flatShading />
    </mesh>
}
