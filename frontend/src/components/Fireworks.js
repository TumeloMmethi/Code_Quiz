import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Firework() {
  const ref = useRef();
  const [positions] = useState(() => {
    const temp = [];
    const spread = 25;  // Spread particles across a larger space
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * spread - spread / 2;  // Random X in the range [-spread/2, spread/2]
      const y = Math.random() * spread - spread / 2;  // Random Y in the range [-spread/2, spread/2]
      const z = Math.random() * spread - spread / 2;  // Random Z in the range [-spread/2, spread/2]
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = time * 0.2;  // Rotate the particles over time
    }
  });

  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial
        color="#ff66cc"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        transparent
      />
    </Points>
  );
}

const Fireworks3D = () => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
      camera={{ position: [0, 0, 10], fov: 75 }}
    >
      <ambientLight />
      <Firework />
    </Canvas>
  );
};

export default Fireworks3D;
