// src/components/Fireworks.js
import React, { useEffect, useRef } from 'react';

const Fireworks = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let fireworks = [];
    let particles = [];

    const random = (min, max) => Math.random() * (max - min) + min;

    function createFirework() {
      let firework = {
        x: random(0, w),
        y: h,
        targetY: random(h / 4, h / 2),
        speed: 2,
        hue: random(0, 360),
      };
      fireworks.push(firework);
    }

    function updateFireworks() {
      for (let i = fireworks.length - 1; i >= 0; i--) {
        let fw = fireworks[i];
        fw.y -= fw.speed;
        if (fw.y <= fw.targetY) {
          createParticles(fw.x, fw.y, fw.hue);
          fireworks.splice(i, 1);
        }
      }
    }

    function createParticles(x, y, hue) {
      for (let i = 0; i < 30; i++) {
        particles.push({
          x,
          y,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 5 + 2,
          radius: Math.random() * 2 + 1,
          life: 100,
          hue,
        });
      }
    }

    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
        p.speed *= 0.95;
        if (p.life <= 0) particles.splice(i, 1);
      }
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, w, h);

      fireworks.forEach(fw => {
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${fw.hue}, 100%, 50%)`;
        ctx.fill();
      });

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
        ctx.fill();
      });
    }

    function loop() {
      updateFireworks();
      updateParticles();
      draw();
      requestAnimationFrame(loop);
    }

    setInterval(createFirework, 800);
    loop();

    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    });

  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1, // ✅ Push it behind everything
      }}
    />
  );
};

export default Fireworks;
