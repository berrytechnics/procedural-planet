import { useEffect, useRef } from 'react'
import { DoubleSide } from 'three'
import Terrain from '../Terrain';

const AMPLITUDE = 10;

function Ground ()
{
  const meshRef = useRef<any>();
  useEffect( () => Terrain.generatePerlinTerrain( meshRef, AMPLITUDE ), [] )
  return ( <mesh ref={ meshRef } rotation-x={ Math.PI / 2 } >
    <planeGeometry args={ [ 512, 512, 64, 64 ] } />
    <meshStandardMaterial color="#C2B280" side={ DoubleSide } />
  </mesh> )
}

export default Ground
