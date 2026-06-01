'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Particle system — warm bokeh
    const COUNT = 280;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);

    const warmPalette = [
      new THREE.Color(1.0, 0.55, 0.15),   // warm orange
      new THREE.Color(1.0, 0.75, 0.35),   // amber
      new THREE.Color(1.0, 0.92, 0.70),   // warm white
      new THREE.Color(0.90, 0.45, 0.10),  // deep orange
      new THREE.Color(0.55, 0.72, 1.0),   // soft monitor blue
      new THREE.Color(1.0, 1.0, 0.95),    // near white
    ];

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 18;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 8 - 2;

      const col = warmPalette[Math.floor(Math.random() * warmPalette.length)];
      colors[i3]     = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i]  = Math.random() * 55 + 8;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = Math.random() * 0.0004 + 0.0002;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Soft bokeh circle texture
    const texSize = 128;
    const texCanvas = document.createElement('canvas');
    texCanvas.width = texSize;
    texCanvas.height = texSize;
    const ctx = texCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(texSize / 2, texSize / 2, 0, texSize / 2, texSize / 2, texSize / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    grad.addColorStop(0.7, 'rgba(255,255,255,0.1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, texSize, texSize);
    const bokehTex = new THREE.CanvasTexture(texCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      map: bokehTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      opacity: 0.65,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let rafId: number;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const t0 = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = (performance.now() - t0) * 0.001;

      // Float particles
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const phase = phases[i];
        const speed = speeds[i];
        posAttr.array[i3 + 1] = (posAttr.array[i3 + 1] as number) + speed * 0.3;
        // sine oscillation on X
        (posAttr.array as Float32Array)[i3] += Math.sin(t * 0.3 + phase) * 0.0008;
        // wrap vertically
        if ((posAttr.array[i3 + 1] as number) > 5.5) {
          (posAttr.array as Float32Array)[i3 + 1] = -5.5;
        }
      }
      posAttr.needsUpdate = true;

      // Camera parallax — very gentle
      targetX += (mouseX * 0.25 - targetX) * 0.04;
      targetY += (mouseY * 0.15 - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Slow rotation of whole system
      points.rotation.z = t * 0.008;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      bokehTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
}
