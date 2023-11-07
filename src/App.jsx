/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import Planet from './Planet';
import { useEffect, useRef } from 'react';
function App ()
{
  return ( <div style={ { width: window.innerWidth, height: window.innerHeight } }>
    <Canvas camera={ { position: [ 0, 100, 250 ] } } style={ { height: window.innerHeight, width: window.innerWidth } }>
      <directionalLight intensity={ 1 } position={ [ -100, 100, 0 ] } />
      <ambientLight intensity={ 1 } />
      <OrbitControls />
      <Planet />
    </Canvas>
  </div> )
}

export default App
