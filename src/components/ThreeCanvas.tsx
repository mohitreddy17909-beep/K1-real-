/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 80;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10b981, 1.5, 150);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Create a particle network of properties/plots
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color definitions
    const greenColor = new THREE.Color('#10b981');
    const skyBlueColor = new THREE.Color('#0ea5e9');
    const subtleGrey = new THREE.Color('#64748b');

    for (let i = 0; i < particleCount; i++) {
      // Create cluster coordinates to replicate plots structure
      const x = (Math.random() - 0.5) * 150;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 60;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color scheme distribution (mostly subtle grey, with highlights of green and blue)
      const rand = Math.random();
      let pickedColor = subtleGrey;
      if (rand > 0.85) {
        pickedColor = greenColor;
      } else if (rand > 0.7) {
        pickedColor = skyBlueColor;
      }

      colors[i * 3] = pickedColor.r;
      colors[i * 3 + 1] = pickedColor.g;
      colors[i * 3 + 2] = pickedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Texture for smooth circular physical glowing particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(16, 185, 129, 0.8)');
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const circleTexture = new THREE.CanvasTexture(canvas);

    // Material
    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: circleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Particle System
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Line segments to show interconnections ("Verified Grid Matrix")
    const maxDistance = 25;
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });

    // We instantiate geometry that will be updated in the animation loop
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6); // Max connections approximation
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // Track Cursor coordinates relative to window center
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouseRef.current.targetY = (event.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer to handle flexible fluid layouts
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      
      // Interpolate mouse movement elegantly for extreme responsiveness with cinematic lag inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Gently orbit points
      points.rotation.y = elapsedTime * 0.02 + mouseRef.current.x * 0.005;
      points.rotation.x = elapsedTime * 0.01 + mouseRef.current.y * 0.005;

      // Dynamic Connection Lines calculation
      const posArr = geometry.attributes.position.array as Float32Array;
      const linePosArr = new Float32Array(particleCount * 6);
      let lineIndex = 0;

      // Rotate local points on paper inside the loop to match parent rotation 
      const tempPoints: THREE.Vector3[] = [];
      const rotY = points.rotation.y;
      const rotX = points.rotation.x;

      for (let i = 0; i < particleCount; i++) {
        const vx = posArr[i * 3];
        const vy = posArr[i * 3 + 1];
        const vz = posArr[i * 3 + 2];

        // Apply custom slow noise wave logic
        const offsetWave = Math.sin(elapsedTime * 0.3 + vx * 0.04) * 1.5;
        const pVec = new THREE.Vector3(vx, vy + offsetWave, vz);
        pVec.applyEuler(new THREE.Euler(rotX, rotY, 0));
        tempPoints.push(pVec);
      }

      // Draw short connection edges on the fly to simulate active real estate neural cluster
      let connectionLimit = 0;
      for (let i = 0; i < particleCount; i++) {
        if (connectionLimit > 140) break; // performance guard
        for (let j = i + 1; j < particleCount; j++) {
          const dist = tempPoints[i].distanceTo(tempPoints[j]);
          if (dist < maxDistance) {
            linePosArr[lineIndex * 6] = tempPoints[i].x;
            linePosArr[lineIndex * 6 + 1] = tempPoints[i].y;
            linePosArr[lineIndex * 6 + 2] = tempPoints[i].z;

            linePosArr[lineIndex * 6 + 3] = tempPoints[j].x;
            linePosArr[lineIndex * 6 + 4] = tempPoints[j].y;
            linePosArr[lineIndex * 6 + 5] = tempPoints[j].z;

            lineIndex++;
            connectionLimit++;
          }
        }
      }

      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePosArr, 3));
      lineGeo.setDrawRange(0, lineIndex * 2);

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      circleTexture.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" 
      style={{ zIndex: 0 }}
      id="three-particles-canvas"
    />
  );
}
