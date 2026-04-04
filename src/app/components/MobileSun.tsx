import { useRef, useEffect } from "react";
import * as THREE from "three";

interface MobileSunProps {
  width?: number;
  height?: number;
  theme?: string;
  isStatic?: boolean;
  sunScale?: number;
  paletteVariant?: "default" | "vibrant";
  densityVariant?: "default" | "reduced";
  particleScale?: number;
}

export function MobileSun({
  width = 400,
  height = 400,
  theme = "light",
  isStatic = false,
  sunScale = 1,
  paletteVariant = "default",
  densityVariant = "default",
  particleScale = 1,
}: MobileSunProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const spiralRef = useRef<THREE.Points | null>(null); // Spiral particles reference
  const raysRef = useRef<THREE.Points | null>(null); // Ray particles reference
  const glowRef = useRef<THREE.Mesh | null>(null); // Center glow reference

  // Detect desktop for higher quality rendering
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const hasReducedDensity = densityVariant === "reduced";

  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const getSpherePalette = (currentTheme: string) => {
    if (paletteVariant === "vibrant") {
      return currentTheme === "dark"
        ? ["#C084FC", "#8B5CF6", "#6366F1", "#F472B6", "#EC4899"]
        : ["#C95B00", "#E06A00", "#FF7A00", "#FF9B00", "#FFBE2E"];
    }

    return currentTheme === "dark"
      ? ["#8B5CF6", "#6366F1", "#D946EF", "#A855F7", "#9333EA"]
      : ["#FDB813", "#FFDD57", "#FFA500", "#FFD700", "#FFC107"];
  };

  const getSpiralPalette = (currentTheme: string) => {
    if (paletteVariant === "vibrant") {
      return currentTheme === "dark"
        ? ["#FF4FD8", "#F000B8", "#F472B6", "#E879F9"]
        : ["#A34700", "#C95B00", "#E06A00", "#FF8A00", "#FFBF3C"];
    }

    return currentTheme === "dark"
      ? ["#FF6FD8", "#D946EF", "#F0ABFC", "#E879F9"]
      : ["#FFA500", "#FFB84D", "#FFCC80", "#FFC107", "#FFD700"];
  };

  const getRayPalettes = (currentTheme: string) => {
    if (paletteVariant === "vibrant") {
      return {
        even:
          currentTheme === "dark"
            ? ["#A855F7", "#C084FC", "#7C3AED", "#6366F1"]
            : ["#B44B00", "#D46000", "#F57B00", "#FF9A00"],
        odd:
          currentTheme === "dark"
            ? ["#FF4FD8", "#F472B6", "#E879F9", "#D946EF"]
            : ["#D98A00", "#F0A800", "#FFC233", "#FFDC66"],
      };
    }

    return {
      even:
        currentTheme === "dark"
          ? ["#8B5CF6", "#A78BFA", "#7C3AED", "#6D28D9"]
          : ["#FFA500", "#FFB84D", "#FFCC80", "#FFC107"],
      odd:
        currentTheme === "dark"
          ? ["#FF6FD8", "#F0ABFC", "#E879F9", "#D946EF"]
          : ["#FFD700", "#FFED4E", "#FFEB3B", "#FFE082"],
    };
  };

  const createGlowTexture = (currentTheme: string) => {
    const glowCanvas = document.createElement("canvas");
    const glowSize = 256;
    glowCanvas.width = glowSize;
    glowCanvas.height = glowSize;
    const glowCtx = glowCanvas.getContext("2d");
    if (!glowCtx) return null;

    const glowCenter = glowSize / 2;
    const glowGradient = glowCtx.createRadialGradient(
      glowCenter,
      glowCenter,
      0,
      glowCenter,
      glowCenter,
      glowCenter
    );

    const glowColor = paletteVariant === "vibrant"
      ? currentTheme === "dark"
        ? "255, 79, 216"
        : "235, 130, 0"
      : currentTheme === "dark"
        ? "255, 111, 216"
        : "255, 215, 0";
    const glowStrength = paletteVariant === "vibrant" ? [0.56, 0.34, 0.14, 0.04] : [0.6, 0.4, 0.15, 0.05];
    glowGradient.addColorStop(0, `rgba(${glowColor}, ${glowStrength[0]})`);
    glowGradient.addColorStop(0.2, `rgba(${glowColor}, ${glowStrength[1]})`);
    glowGradient.addColorStop(0.5, `rgba(${glowColor}, ${glowStrength[2]})`);
    glowGradient.addColorStop(0.8, `rgba(${glowColor}, ${glowStrength[3]})`);
    glowGradient.addColorStop(1, `rgba(${glowColor}, 0)`);

    glowCtx.fillStyle = glowGradient;
    glowCtx.fillRect(0, 0, glowSize, glowSize);

    return new THREE.CanvasTexture(glowCanvas);
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene with transparent background
    const scene = new THREE.Scene();
    scene.background = null; // Transparent
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      50, // FOV
      width / height, // Aspect ratio
      0.1, // Near plane
      1000 // Far plane
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer with optimizations based on device
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true, // Transparent background
      powerPreference: isDesktop ? "high-performance" : "low-power", // Desktop uses high performance
      failIfMajorPerformanceCaveat: false, // Still render on low-end devices
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      isDesktop ? Math.min(window.devicePixelRatio, 3) : Math.min(window.devicePixelRatio, 2)
    ); // Lower pixel ratio for mobile to improve performance
    rendererRef.current = renderer;

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [width, height]);

  // Generate particles once. Theme changes should only recolor existing buffers.
  useEffect(() => {
    if (!sceneRef.current) return;

    // Remove old particles if they exist
    if (particlesRef.current) {
      sceneRef.current.remove(particlesRef.current);
      particlesRef.current.geometry.dispose();
      (particlesRef.current.material as THREE.Material).dispose();
    }

    // Color palette based on theme
    const colorPalette = getSpherePalette(theme).map((hex) => new THREE.Color(hex));

    // Particle configuration (from Mars sphere)
    const numParticles = hasReducedDensity
      ? isDesktop
        ? 620
        : 460
      : isDesktop
        ? 1020
        : 615; // Further reduced for mobile (10% reduction)
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const radius = 0.61; // Reduced from 0.68 for smaller sun

    // Golden ratio distribution (Fibonacci sphere)
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

      // Random color from palette
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const color = colorPalette[colorIndex];

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Create particle texture (soft glow)
    const canvas = document.createElement("canvas");
    // Higher resolution texture for desktop 4K clarity
    const textureSize = isDesktop ? 128 : 64;
    canvas.width = textureSize;
    canvas.height = textureSize;
    const ctx = canvas.getContext("2d")!;

    // Radial gradient for soft particles
    const centerPoint = textureSize / 2;
    const gradient = ctx.createRadialGradient(centerPoint, centerPoint, 0, centerPoint, centerPoint, centerPoint);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.4, "rgba(255, 255, 255, 1)"); // Sharper - keep solid longer
    gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.5)"); // Steeper falloff
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, textureSize, textureSize);

    const texture = new THREE.CanvasTexture(canvas);

    // Create material with glowing effect
    const material = new THREE.PointsMaterial({
      size: (hasReducedDensity ? 0.044 : 0.058) * particleScale, // Slightly finer reduced-density sphere for a denser desktop-like read on mobile
      map: texture,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: hasReducedDensity ? 0.84 : 1.0,
      blending: THREE.NormalBlending, // Remove glow effect
      depthWrite: false, // Prevent z-fighting
    });

    // Create particle system
    const particles = new THREE.Points(geometry, material);
    sceneRef.current.add(particles);
    particlesRef.current = particles;

    // Create spiral particles in the center
    // Remove old spiral if exists
    if (spiralRef.current) {
      sceneRef.current.remove(spiralRef.current);
      spiralRef.current.geometry.dispose();
      (spiralRef.current.material as THREE.Material).dispose();
    }

    // Spiral configuration - much more prominent to match reference
    const spiralArms = 3;
    const spiralTurns = 2.8; // Reduced turns to spread arms apart more
    const spiralMaxRadius = radius * (isDesktop ? 1.0 : 1.06); // Extend slightly farther on mobile so the spiral reaches the sphere edge
    const particlesPerArm = hasReducedDensity
      ? isDesktop
        ? 180
        : 84
      : isDesktop
        ? 306
        : 138; // Keep mobile spiral dense enough to read as continuous without overloading mobile
    const totalSpiralParticles = spiralArms * particlesPerArm;

    const spiralPositions = new Float32Array(totalSpiralParticles * 3);
    const spiralColors = new Float32Array(totalSpiralParticles * 3);
    const spiralSizes = new Float32Array(totalSpiralParticles); // Individual particle sizes

    // Brighter, more prominent colors for spiral
    const spiralColorPalette = getSpiralPalette(theme).map((hex) => new THREE.Color(hex));

    let spiralIndex = 0;
    for (let arm = 0; arm < spiralArms; arm++) {
      const armOffset = (arm / spiralArms) * Math.PI * 2;

      for (let i = 0; i < particlesPerArm; i++) {
        const t = i / particlesPerArm;
        const angle = t * spiralTurns * Math.PI * 2 + armOffset;
        const r = t * spiralMaxRadius; // Start from 0 to eliminate black hole in center

        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        const z = 0; // Flat on XY plane

        spiralPositions[spiralIndex * 3] = x;
        spiralPositions[spiralIndex * 3 + 1] = y;
        spiralPositions[spiralIndex * 3 + 2] = z;

        // Random color from spiral palette
        const colorIndex = Math.floor(
          Math.random() * spiralColorPalette.length
        );
        const color = spiralColorPalette[colorIndex];

        spiralColors[spiralIndex * 3] = color.r;
        spiralColors[spiralIndex * 3 + 1] = color.g;
        spiralColors[spiralIndex * 3 + 2] = color.b;

        // Make particles larger near the center to fill black spot
        // Size gradually decreases from center (t=0) to edge (t=1)
        const baseSize = hasReducedDensity
          ? isDesktop
            ? 0.084
            : 0.05
          : isDesktop
            ? 0.066
            : 0.064;
        const centerBoost = hasReducedDensity
          ? isDesktop
            ? t < 0.38
              ? (1 - t / 0.38) * 3.1
              : 0
            : 0
          : t < 0.3
            ? isDesktop
              ? (1 - t / 0.3) * 2.5
              : 0
            : 0;
        spiralSizes[spiralIndex] = baseSize * (1 + centerBoost) * particleScale;

        spiralIndex++;
      }
    }

    // Create spiral geometry
    const spiralGeometry = new THREE.BufferGeometry();
    spiralGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(spiralPositions, 3)
    );
    spiralGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(spiralColors, 3)
    );
    spiralGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(spiralSizes, 1)
    );

    // Reuse same texture for consistency
    const spiralMaterial = new THREE.PointsMaterial({
      size: (hasReducedDensity ? (isDesktop ? 0.084 : 0.05) : isDesktop ? 0.066 : 0.064) * particleScale, // Base size (overridden by individual sizes)
      map: texture,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: hasReducedDensity ? (isDesktop ? 0.9 : 0.96) : isDesktop ? 0.575 : 0.7475,
      blending: THREE.NormalBlending, // Remove glow effect
      depthWrite: false,
    });

    // Create spiral particle system
    const spiral = new THREE.Points(spiralGeometry, spiralMaterial);
    sceneRef.current.add(spiral);
    spiralRef.current = spiral;

    // Create ray particles
    // Remove old rays if exists
    if (raysRef.current) {
      sceneRef.current.remove(raysRef.current);
      raysRef.current.geometry.dispose();
      (raysRef.current.material as THREE.Material).dispose();
    }

    // Ray configuration - create horizontal segments that form ray shapes
    const numRayArms = 12; // Keep 12 rays for both mobile and desktop
    const rayPositions: number[] = [];
    const rayColors: number[] = [];
    const raySizes: number[] = [];
    const rayArmIndices: number[] = [];

    // Create alternating color palettes for rays based on theme
    const rayPalettes = getRayPalettes(theme);
    const rayColorPalette1 = rayPalettes.even.map((hex) => new THREE.Color(hex));
    const rayColorPalette2 = rayPalettes.odd.map((hex) => new THREE.Color(hex));

    for (let arm = 0; arm < numRayArms; arm++) {
      const baseAngle = (arm / numRayArms) * Math.PI * 2;
      
      // Alternate between color palettes
      const rayColorPalette = arm % 2 === 0 ? rayColorPalette1 : rayColorPalette2;
      
      // Alternate between long and short rays
      const isLongRay = arm % 2 === 0;
      const maxDistance = isLongRay ? 1.2 : 0.8; // Shorter rays - reduced from 1.8 and 1.2
      
      // Number of horizontal segments in this ray (MORE segments = closer together)
      const numSegments = isLongRay ? 18 : 12; // Increased for closer segments
      
      for (let seg = 1; seg < numSegments; seg++) { // Start from 1 to skip first segment closest to sphere
        // Distance from center for this segment
        const distT = seg / numSegments;
        const distance = radius * (1.0 + distT * maxDistance); // Start closer at 1.0 instead of 1.1
        
        // Add wave effect to ray - sine wave creates flowing undulation
        const waveFrequency = 3; // More waves for more uniform appearance
        const waveAmplitude = 0.08; // Reduced amplitude for shorter waves
        const waveOffset = Math.sin(distT * Math.PI * waveFrequency) * waveAmplitude;
        
        // Segment length decreases as we go outward (creates tapering ray shape)
        const segmentLength = 0.25 * (1 - distT * 0.95); // Gets 95% shorter at tip
        
        // Number of particles in this horizontal segment - creates pointed tips
        const particlesInSegment = Math.max(1, Math.floor(20 * Math.pow(1 - distT, 1.5))); // Sharper taper to 1 particle at tip
        
        for (let p = 0; p < particlesInSegment; p++) {
          // Position along the horizontal segment (perpendicular to ray direction)
          const segT = (p / particlesInSegment) - 0.5; // -0.5 to 0.5 (centered)
          
          // Create horizontal segment perpendicular to ray direction
          const perpAngle = baseAngle + Math.PI / 2; // Perpendicular angle
          
          // Base position along the ray (with wave offset added to angle)
          const rayX = Math.cos(baseAngle + waveOffset) * distance;
          const rayY = Math.sin(baseAngle + waveOffset) * distance;
          
          // Offset perpendicular to ray direction
          const offsetX = Math.cos(perpAngle + waveOffset) * segT * segmentLength;
          const offsetY = Math.sin(perpAngle + waveOffset) * segT * segmentLength;
          
          const x = rayX + offsetX;
          const y = rayY + offsetY;
          const z = 0; // Flat on XY plane

          rayPositions.push(x, y, z);

          // Random color from ray palette
          const colorIndex = Math.floor(Math.random() * rayColorPalette.length);
          const color = rayColorPalette[colorIndex];

          rayColors.push(color.r, color.g, color.b);

          // Set individual particle size
          raySizes.push((hasReducedDensity ? 0.052 : 0.055) * particleScale); // Slightly larger footer rays for better definition while keeping the spiral readable
          rayArmIndices.push(arm);
        }
      }
    }

    // Create ray geometry
    const rayGeometry = new THREE.BufferGeometry();
    rayGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(rayPositions), 3)
    );
    rayGeometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(rayColors), 3));
    rayGeometry.setAttribute("size", new THREE.BufferAttribute(new Float32Array(raySizes), 1));
    rayGeometry.setAttribute("armIndex", new THREE.BufferAttribute(new Float32Array(rayArmIndices), 1));

    // Reuse same texture for consistency
    const rayMaterial = new THREE.PointsMaterial({
      size: (hasReducedDensity ? 0.052 : 0.055) * particleScale, // Slightly larger footer rays for better definition
      map: texture,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: hasReducedDensity ? 0.74 : 1.0,
      blending: THREE.NormalBlending, // Remove glow effect
      depthWrite: false,
    });

    // Create ray particle system
    const rays = new THREE.Points(rayGeometry, rayMaterial);
    sceneRef.current.add(rays);
    raysRef.current = rays;

    // Create center glow
    // Remove old glow if exists
    if (glowRef.current) {
      sceneRef.current.remove(glowRef.current);
      glowRef.current.geometry.dispose();
      (glowRef.current.material as THREE.Material).dispose();
    }

    // Create soft radial glow texture
    const glowTexture = createGlowTexture(theme);
    if (!glowTexture) return;

    // Create plane for glow (positioned behind everything)
    const glowGeometry = new THREE.PlaneGeometry(radius * 2, radius * 2);
    const glowMaterial = new THREE.MeshBasicMaterial({
      map: glowTexture,
      transparent: true,
      opacity: hasReducedDensity ? 0.78 : 1.0,
      blending: THREE.NormalBlending, // Additive for glow effect
      depthWrite: false,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -0.5; // Position behind sphere and spiral
    sceneRef.current.add(glow);
    glowRef.current = glow;


    return () => {
      if (particlesRef.current) {
        geometry.dispose();
        material.dispose();
      }
      if (spiralRef.current) {
        spiralGeometry.dispose();
        spiralMaterial.dispose();
      }
      if (raysRef.current) {
        rayGeometry.dispose();
        rayMaterial.dispose();
      }
      if (glowRef.current) {
        glowGeometry.dispose();
        glowMaterial.dispose();
      }
    };
  }, []);

  // Recolor existing geometry/materials on theme change without resetting animation state.
  useEffect(() => {
    const sphere = particlesRef.current;
    const spiral = spiralRef.current;
    const rays = raysRef.current;
    const glow = glowRef.current;

    if (sphere) {
      const palette = getSpherePalette(theme).map((hex) => new THREE.Color(hex));
      const colorAttr = sphere.geometry.getAttribute("color") as THREE.BufferAttribute;
      for (let i = 0; i < colorAttr.count; i++) {
        const idx = Math.floor(pseudoRandom(i + 1) * palette.length);
        const color = palette[idx];
        colorAttr.setXYZ(i, color.r, color.g, color.b);
      }
      colorAttr.needsUpdate = true;
    }

    if (spiral) {
      const palette = getSpiralPalette(theme).map((hex) => new THREE.Color(hex));
      const colorAttr = spiral.geometry.getAttribute("color") as THREE.BufferAttribute;
      for (let i = 0; i < colorAttr.count; i++) {
        const idx = Math.floor(pseudoRandom(i + 101) * palette.length);
        const color = palette[idx];
        colorAttr.setXYZ(i, color.r, color.g, color.b);
      }
      colorAttr.needsUpdate = true;
    }

    if (rays) {
      const palettes = getRayPalettes(theme);
      const even = palettes.even.map((hex) => new THREE.Color(hex));
      const odd = palettes.odd.map((hex) => new THREE.Color(hex));
      const colorAttr = rays.geometry.getAttribute("color") as THREE.BufferAttribute;
      const armIndexAttr = rays.geometry.getAttribute("armIndex") as THREE.BufferAttribute;
      for (let i = 0; i < colorAttr.count; i++) {
        const armIndex = armIndexAttr ? armIndexAttr.getX(i) : 0;
        const useEven = armIndex % 2 === 0;
        const palette = useEven ? even : odd;
        const idx = Math.floor(pseudoRandom(i + 777) * palette.length);
        const color = palette[idx];
        colorAttr.setXYZ(i, color.r, color.g, color.b);
      }
      colorAttr.needsUpdate = true;
    }

    if (glow) {
      const mat = glow.material as THREE.MeshBasicMaterial;
      const oldMap = mat.map;
      const texture = createGlowTexture(theme);
      if (texture) {
        mat.map = texture;
        mat.needsUpdate = true;
        oldMap?.dispose();
      }
    }
  }, [theme]);

      useEffect(() => {
        particlesRef.current?.scale.setScalar(sunScale);
        spiralRef.current?.scale.setScalar(sunScale);
        raysRef.current?.scale.setScalar(sunScale);
        glowRef.current?.scale.setScalar(sunScale);

        if (isStatic && sceneRef.current && cameraRef.current && rendererRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }, [sunScale, isStatic]);

  // Animation loop
  useEffect(() => {
    if (isStatic) {
      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      return;
    }

    const animate = () => {
      if (
        !sceneRef.current ||
        !cameraRef.current ||
        !rendererRef.current ||
        !particlesRef.current
      ) {
        return;
      }

      // Auto-spin (from Mars sphere)
      rotationRef.current.y += 0.005; // ~17°/second at 60fps

      // Apply rotation to sphere particles (rotates with sphere)
      particlesRef.current.rotation.x = rotationRef.current.x;
      particlesRef.current.rotation.y = rotationRef.current.y;

      // Spiral stays stationary (doesn't rotate) - creates visual contrast
      // The sphere spins around the stationary spiral

      // Rays rotate slowly (slower than sphere)
      if (raysRef.current) {
        raysRef.current.rotation.z += 0.002; // Slow rotation
      }

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isStatic]);

  // Ensure static mode re-renders when theme updates recolor buffers.
  useEffect(() => {
    if (!isStatic) return;
    if (sceneRef.current && cameraRef.current && rendererRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, [isStatic, theme, sunScale]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: `${width}px`,
        height: `${height}px`,
        touchAction: "none",
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
      }}
    />
  );
}