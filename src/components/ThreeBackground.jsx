import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const mount = containerRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1800;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 120;
      posArray[i+1] = (Math.random() - 0.5) * 70;
      posArray[i+2] = (Math.random() - 0.5) * 60 - 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Second layer – white particles
    const particlesGeometry2 = new THREE.BufferGeometry();
    const posArray2 = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000 * 3; i += 3) {
      posArray2[i] = (Math.random() - 0.5) * 140;
      posArray2[i+1] = (Math.random() - 0.5) * 80;
      posArray2[i+2] = (Math.random() - 0.5) * 70;
    }
    particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
    const particlesMaterial2 = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh2 = new THREE.Points(particlesGeometry2, particlesMaterial2);
    scene.add(particlesMesh2);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;
      particlesMesh.rotation.y = time * 0.2;
      particlesMesh.rotation.x = time * 0.1;
      particlesMesh2.rotation.y = -time * 0.15;
      particlesMesh2.rotation.x = time * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ThreeBackground;