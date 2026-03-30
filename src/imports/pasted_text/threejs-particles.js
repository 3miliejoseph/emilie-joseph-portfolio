📦 EXACT PACKAGE VERSIONS
{
  "dependencies": {
    "@react-three/drei": "^9.105.6",
    "@react-three/fiber": "^8.15.19",
    "three": "^0.162.0",
    "@types/three": "^0.183.1"
  },
  "peerDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
🎯 EXACT IMPORTS (Mobile-Optimized)
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
Key Point: No @react-three/fiber Canvas - we use native Three.js for mobile performance!

🖼️ CANVAS CONFIGURATION (Lines 554-618)
// Initialize Three.js scene
useEffect(() => {
  if (!threeCanvasRef.current) return;

  // Create scene
  const scene = new THREE.Scene();
  scene.background = null; // Transparent for starfield background
  sceneRef.current = scene;

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    50,                                    // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1,                                   // Near plane
    1000                                   // Far plane
  );
  camera.position.z = 5;
  cameraRef.current = camera;

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: threeCanvasRef.current,
    antialias: true,
    alpha: true,                          // Transparent background
    powerPreference: 'low-power',         // Mobile battery optimization
    failIfMajorPerformanceCaveat: false,  // Still render on low-end devices
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  rendererRef.current = renderer;

  // Handle resize
  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current) return;
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', handleResize);

  // Cleanup
  return () => {
    window.removeEventListener('resize', handleResize);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
  };
}, []);
⚛️ PARTICLE GENERATION LOGIC (Lines 620-875)
Mars Color Palette (Lines 767-775)
if (currentPlanet.name === "Mars") {
  const variation = Math.random();
  color = variation > 0.7 
    ? new THREE.Color("#8b3a3a")  // Dark Mars red (30%)
    : variation > 0.4 
    ? new THREE.Color("#cd5c5c")  // Indian red (30%)
    : new THREE.Color("#e25822");  // Bright Mars orange (40%)
  particleSize = 0.07;
}
Golden Ratio Distribution (Lines 670-695)
const numParticles = 4000;
const positions = new Float32Array(numParticles * 3);
const colors = new Float32Array(numParticles * 3);
const sizes = new Float32Array(numParticles);
const radius = 2;
const goldenRatio = (1 + Math.sqrt(5)) / 2;

for (let i = 0; i < numParticles; i++) {
  // Fibonacci sphere distribution for even coverage
  const y_norm = 1 - (i / (numParticles - 1)) * 2; // y: 1 to -1
  const radiusAtY = Math.sqrt(1 - y_norm * y_norm);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i; // Golden angle

  const x_norm = Math.cos(theta) * radiusAtY;
  const z_norm = Math.sin(theta) * radiusAtY;

  // Scale to actual radius
  const x = x_norm * radius;
  const y = y_norm * radius;
  const z = z_norm * radius;

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
  
  // ... color logic ...
  
  colors[i * 3] = color.r;
  colors[i * 3 + 1] = color.g;
  colors[i * 3 + 2] = color.b;
  sizes[i] = particleSize;
}
Geometry & Material (Lines 791-827)
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

// Create circular particle texture
const canvas = document.createElement('canvas');
canvas.width = 64;
canvas.height = 64;
const ctx = canvas.getContext('2d')!;

// Radial gradient for soft particles
const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 64, 64);

const texture = new THREE.CanvasTexture(canvas);

const material = new THREE.PointsMaterial({
  size: 0.08,
  map: texture,
  vertexColors: true,
  sizeAttenuation: true,
  transparent: true,
  opacity: 1.0,
  blending: THREE.AdditiveBlending,  // Glowing effect
  depthWrite: false,                 // Prevent z-fighting
});

const particles = new THREE.Points(geometry, material);
sceneRef.current.add(particles);
particlesRef.current = particles;
🔄 ANIMATION LOOP (Lines 877-963)
Auto-Spin Logic (Lines 886-898)
const animate = () => {
  if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

  // Auto-rotate when no interaction
  const shouldAutoSpin = (
    (controlModeRef.current === 'hand' && gesture.numHands === 0 && !isDraggingRef.current) ||
    (controlModeRef.current === 'mouse' && !isDraggingRef.current)
  );

  if (shouldAutoSpin) {
    rotationRef.current = {
      x: rotationRef.current.x,           // Keep tilt constant
      y: rotationRef.current.y + 0.005,   // Spin 0.005 rad/frame (~0.29°/frame)
    };
    setRotation(rotationRef.current);
  }

  // Apply rotation to particles
  if (particlesRef.current) {
    particlesRef.current.rotation.x = rotationRef.current.x;
    particlesRef.current.rotation.y = rotationRef.current.y;
    particlesRef.current.scale.setScalar(zoomRef.current);
  }

  rendererRef.current.render(sceneRef.current, cameraRef.current);
  animationFrameRef.current = requestAnimationFrame(animate);
};

animate();
At 60fps:

0.005 rad/frame × 60 fps = 0.3 rad/sec = ~17°/second
Full rotation: 360° / 17° ≈ 21 seconds
🎨 WRAPPER COMPONENT
// Canvas ref
const threeCanvasRef = useRef<HTMLCanvasElement>(null);

// Refs for Three.js objects
const sceneRef = useRef<THREE.Scene | null>(null);
const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
const particlesRef = useRef<THREE.Points | null>(null);
const animationFrameRef = useRef<number | null>(null);

// Rotation state (using refs to avoid re-renders)
const rotationRef = useRef({ x: 0, y: 0 });
const zoomRef = useRef(0.5);

return (
  <div className="relative w-full h-screen bg-black overflow-hidden">
    {/* 3D Canvas */}
    <canvas
      ref={threeCanvasRef}
      className="absolute inset-0 w-full h-full z-10"
    />
  </div>
);
📱 MOBILE-SPECIFIC OPTIMIZATIONS
1. visualViewport API (Lines 522-552)
useEffect(() => {
  const handleViewportResize = () => {
    const newHeight = window.visualViewport?.height || window.innerHeight;
    setViewportHeight(newHeight);
  };

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleViewportResize);
    window.visualViewport.addEventListener('scroll', handleViewportResize);
  }

  window.addEventListener('resize', handleViewportResize);

  return () => {
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', handleViewportResize);
      window.visualViewport.removeEventListener('scroll', handleViewportResize);
    }
    window.removeEventListener('resize', handleViewportResize);
  };
}, []);
2. Responsive Scaling (Lines 51-68)
const getResponsiveScale = () => {
  const width = window.innerWidth;
  const height = window.visualViewport?.height || window.innerHeight;
  const minDimension = Math.min(width, height);
  
  if (minDimension < 375) return 0.45;   // Very small phones
  if (minDimension < 480) return 0.50;   // Small phones
  if (minDimension < 640) return 0.55;   // Standard phones
  if (minDimension < 768) return 0.65;   // Large phones
  if (minDimension < 1024) return 0.75;  // Tablets
  if (minDimension < 1280) return 0.85;  // Small laptops
  if (minDimension < 1500) return 0.90;  // Standard laptops
  return 1.0;                             // Desktop
};
3. Touch Gesture Controls (Lines 351-506)
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    // Pinch zoom
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const distance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
    setLastTouchDistance(distance);
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    e.preventDefault(); // Prevent browser zoom
    
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const distance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
    
    if (lastTouchDistance !== null) {
      const zoomFactor = distance / lastTouchDistance;
      setZoom(prev => Math.max(0.3, Math.min(3, prev * zoomFactor)));
    }
    
    setLastTouchDistance(distance);
  }
};
🎁 COMPLETE STANDALONE MARS COMPONENT
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function MarsParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  // Generate Mars particles
  useEffect(() => {
    if (!sceneRef.current) return;

    const numParticles = 4000;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const radius = 2;

    for (let i = 0; i < numParticles; i++) {
      // Golden ratio sphere distribution
      const y_norm = 1 - (i / (numParticles - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y_norm * y_norm);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const y = y_norm * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Mars color variations
      const variation = Math.random();
      const color = variation > 0.7 
        ? new THREE.Color("#8b3a3a")
        : variation > 0.4 
        ? new THREE.Color("#cd5c5c")
        : new THREE.Color("#e25822");

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.08,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    sceneRef.current.add(particles);
    particlesRef.current = particles;

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      // Auto-spin
      rotationRef.current.y += 0.005;

      if (particlesRef.current) {
        particlesRef.current.rotation.x = rotationRef.current.x;
        particlesRef.current.rotation.y = rotationRef.current.y;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-screen" />;
}
✅ KEY DIFFERENCES FROM STANDARD THREE.JS
No @react-three/fiber Canvas - Direct WebGL for performance
powerPreference: 'low-power' - Mobile battery optimization
visualViewport API - Handles mobile browser UI (address bar)
AdditiveBlending - Creates glowing particle effect
Refs instead of state - Prevents re-renders during animation
requestAnimationFrame - Synced with 60fps display refresh