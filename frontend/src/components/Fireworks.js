// // src/components/Fireworks.js
// import React, { useEffect, useRef } from 'react';

// const Fireworks = () => {
//   const canvasRef = useRef();

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let w = window.innerWidth;
//     let h = window.innerHeight;
//     canvas.width = w;
//     canvas.height = h;

//     let fireworks = [];
//     let particles = [];

//     const random = (min, max) => Math.random() * (max - min) + min;

//     function createFirework() {
//       let firework = {
//         x: random(0, w),
//         y: h,
//         targetY: random(h / 4, h / 2),
//         speed: 2,
//         hue: random(0, 360),
//       };
//       fireworks.push(firework);
//     }

//     function updateFireworks() {
//       for (let i = fireworks.length - 1; i >= 0; i--) {
//         let fw = fireworks[i];
//         fw.y -= fw.speed;
//         if (fw.y <= fw.targetY) {
//           createParticles(fw.x, fw.y, fw.hue);
//           fireworks.splice(i, 1);
//         }
//       }
//     }

//     function createParticles(x, y, hue) {
//       for (let i = 0; i < 40; i++) {
//         const angle = Math.random() * 2 * Math.PI;
//         const z = random(-1, 1); // Fake depth: -1 (far) to 1 (near)
//         const speed = random(2, 6);
//         particles.push({
//           x,
//           y,
//           angle,
//           z,
//           speed,
//           radius: random(1, 3),
//           life: 100,
//           hue,
//         });
//       }
//     }

//     function updateParticles() {
//       for (let i = particles.length - 1; i >= 0; i--) {
//         let p = particles[i];
//         // Simulate 3D spread: angle on X-Y and depth affects scale
//         const spread = p.speed;
//         p.x += Math.cos(p.angle) * spread;
//         p.y += Math.sin(p.angle) * spread;
//         p.life--;
//         p.speed *= 0.95;
//         if (p.life <= 0) particles.splice(i, 1);
//       }
//     }

//     function draw() {
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
//       ctx.fillRect(0, 0, w, h);

//       fireworks.forEach(fw => {
//         ctx.beginPath();
//         ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
//         ctx.fillStyle = `hsl(${fw.hue}, 100%, 50%)`;
//         ctx.fill();
//       });

//       particles.forEach(p => {
//         // Simulate depth-based size and brightness
//         const depthFactor = (p.z + 1) / 2; // range 0–1
//         const size = p.radius * (1 + depthFactor * 2); // Bigger if "closer"
//         const brightness = 50 + depthFactor * 50; // 50–100%
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
//         ctx.fillStyle = `hsl(${p.hue}, 100%, ${brightness}%)`;
//         ctx.fill();
//       });
//     }

//     function loop() {
//       updateFireworks();
//       updateParticles();
//       draw();
//       requestAnimationFrame(loop);
//     }

//     setInterval(createFirework, 700);
//     loop();

//     window.addEventListener('resize', () => {
//       w = window.innerWidth;
//       h = window.innerHeight;
//       canvas.width = w;
//       canvas.height = h;
//     });
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none',
//         zIndex: -1,
//       }}
//     />
//   );
// };

// export default Fireworks;


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
