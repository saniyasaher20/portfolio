import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'; // empty canvas
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'; // helper things to draw on the empty canvas; useGLTF-allows us to import 3D models
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./public/desktop_pc/scene.gltf')
  
  return (
    // react three fiber docs for more details
    // for creating a 3D model we wont use div, we use mesh
    <mesh>
      {/* inside mesh, we'll use lighting otherwise we won't be able to see the model */}
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      {/* self-posing component to which we will pass the component */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.25]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // set the initial value of the isMobile state variable
    setIsMobile(mediaQuery.matches)

    // define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    // rmeove the listener when the component is unmounted
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  })

  return (
    // camera(important) - position : [x, y, z], fov= field of view = how wide our view will be
    // gl - to perfectly render out component
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* this will allow us to move the model in 360deg */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2} //rotate in a specific plane of axis
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />

    </Canvas>
  )
}
export default ComputersCanvas;