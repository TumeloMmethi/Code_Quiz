import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShootingStar = () => {
  const meshRef = useRef();
  const [startPos] = useState(() => new THREE.Vector3(
    Math.random() * 20 - 10,
    Math.random() * 10 + 5,
    Math.random() * 10 - 5
  ));
  const [velocity] = useState(() => new THREE.Vector3(
    -0.1 - Math.random() * 0.2,
    -0.1 - Math.random() * 0.2,
    0
  ));
  const [life, setLife] = useState(0);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.add(velocity);
      setLife(prev => prev + 1);
    }
  });

  // Auto remove after short time
  if (life > 100) return null;

  return (
    <mesh ref={meshRef} position={startPos}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
};

export default ShootingStar;
