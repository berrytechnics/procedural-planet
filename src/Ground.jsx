/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react'
import { DoubleSide } from 'three'
import helpers from './helpers';

const AMPLITUDE = 10;

function Ground ()
{
  const meshRef = useRef();
  useEffect( () => helpers.generatePerlinTerrain( meshRef, AMPLITUDE ), [] )
  return ( <mesh ref={ meshRef } rotation-x={ Math.PI / 2 } >
    <planeGeometry args={ [ 512, 512, 64, 64 ] } />
    <meshStandardMaterial color="#C2B280" side={ DoubleSide } />
  </mesh> )
}

export default Ground
