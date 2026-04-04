import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MobileSun } from "./MobileSun";

interface NebulaSphereProps {
  width?: number;
  height?: number;
  particleCount?: number;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  showControls?: boolean;
  autoRotate?: boolean;
  theme?: string;
  onRotationUpdate?: (rotation: { x: number; y: number }) => void;
}

// Helper function to convert hex color to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 }; // Default to white if parsing fails
};

export function NebulaSphere({
  width = 800,
  height = 800,
  particleCount: initialParticleCount = 360,
  primaryColor: initialPrimaryColor = "#FDB813", // Golden yellow
  secondaryColor: initialSecondaryColor = "#FFDD57", // Bright yellow
  tertiaryColor: initialTertiaryColor = "#FFA500", // Orange
  showControls = false, // Changed to false by default
  autoRotate = true,
  theme = "light",
  onRotationUpdate,
}: NebulaSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false); // Ref to track hover state without triggering effect re-run
  const [showCustomize, setShowCustomize] = useState(false);

  // Interaction modes
  const [interactionMode, setInteractionMode] = useState<'repel' | 'attract' | 'swirl'>('repel');

  // Detect if mobile for performance optimizations - use window width instead of component width
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1000;
  
  // Detect Safari browser
  const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Customizable parameters with aggressive mobile optimizations
  const [particleCount, setParticleCount] = useState(isMobile ? 80 : initialParticleCount); // Drastically reduced particles on mobile
  const [sphereRadius, setSphereRadius] = useState(240); // Reduced from 283.5 to make sun smaller while maintaining ratio
  const [rotationSpeed, setRotationSpeed] = useState(isMobile ? 0.025 : 0.015); // Even faster on mobile
  const [warpStrength, setWarpStrength] = useState(30); // Increased for more responsive interaction
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor);
  const [secondaryColor, setSecondaryColor] = useState(initialSecondaryColor);
  const [tertiaryColor, setTertiaryColor] = useState(initialTertiaryColor);

  const animationRef = useRef<number>();
  const mousePos = useRef({ x: width / 2, y: height / 2 });
  const targetMousePos = useRef({ x: width / 2, y: height / 2 }); // For smooth mouse interpolation
  const rotationRef = useRef({ x: 0, y: 0 }); // Track rotation for callback
  const particleDisplacements = useRef<
    {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      sizeVariation: number;
      brightnessVariation: number;
      colorVariation: number;
    }[]
  >([]);
  const waves = useRef<{ x: number; y: number; startTime: number; duration: number }[]>([]);
  const lastWaveTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: isSafari, // Better compatibility with Safari
      willReadFrequently: false
    });
    if (!ctx) return;

    const centerX = width / 2;
    const centerY = height / 2 - 50; // Moved down by 10px
    const radius = sphereRadius;
    let time = 0;
    let animationActive = true;
    let lastFrameTime = performance.now(); // Track time for delta calculation

    // Create sphere points in 3D space with Fibonacci sphere distribution
    const createSpherePoints = () => {
      const points: { x: number; y: number; z: number }[] = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const angleIncrement = Math.PI * 2 * goldenRatio;

      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = angleIncrement * i;

        const x = Math.sin(inclination) * Math.cos(azimuth) * radius;
        const y = Math.sin(inclination) * Math.sin(azimuth) * radius;
        const z = Math.cos(inclination) * radius;

        points.push({ x, y, z });
      }

      return points;
    };

    const spherePoints = createSpherePoints();
    
    // Create spiral particles
    const createSpiralPoints = () => {
      // Disable spiral particles on mobile for better performance
      if (isMobile) {
        return [];
      }
      
      const points: { x: number; y: number; z: number; isSpiralParticle: boolean }[] = [];
      const spiralArms = 3;
      const spiralTurns = 2.5;
      const spiralMaxRadius = radius * 1.0; // Extended to full sphere radius
      const particlesPerArm = 120; // Increased particles to fill the larger area
      
      for (let arm = 0; arm < spiralArms; arm++) {
        const armOffset = (arm / spiralArms) * Math.PI * 2;
        
        for (let i = 0; i < particlesPerArm; i++) {
          const t = i / particlesPerArm;
          const angle = t * spiralTurns * Math.PI * 2 + armOffset;
          const r = t * spiralMaxRadius;
          
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          const z = 0; // Flat on the XY plane initially
          
          points.push({ x, y, z, isSpiralParticle: true });
        }
      }
      
      return points;
    };
    
    const spiralPoints = createSpiralPoints();
    const allPoints = [...spherePoints, ...spiralPoints];

    // Initialize particle properties
    if (particleDisplacements.current.length !== allPoints.length) {
      particleDisplacements.current = allPoints.map((_, index) => {
        const isSpiralParticle = index >= spherePoints.length;
        return {
          x: 0,
          y: 0,
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          sizeVariation: 1, // Uniform size - no variation
          brightnessVariation: isSpiralParticle ? 1.1 : (0.7 + Math.random() * 0.3), // Spiral particles slightly darker
          colorVariation: Math.random(), // 0 to 1 for color mixing
        };
      });
    }

    // Rotate point in 3D space
    const rotatePoint = (
      point: { x: number; y: number; z: number },
      angleX: number,
      angleY: number
    ) => {
      // Rotate around X axis
      let y = point.y * Math.cos(angleX) - point.z * Math.sin(angleX);
      let z = point.y * Math.sin(angleX) + point.z * Math.cos(angleX);

      // Rotate around Y axis
      const x = point.x * Math.cos(angleY) - z * Math.sin(angleY);
      z = point.x * Math.sin(angleY) + z * Math.cos(angleY);

      return { x, y, z };
    };

    // Project 3D point to 2D
    const project = (point: { x: number; y: number; z: number }) => {
      const perspective = 600;
      const scale = perspective / (perspective + point.z);
      return {
        x: point.x * scale + centerX,
        y: point.y * scale + centerY,
        z: point.z,
        scale: scale,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const currentTime = performance.now();
      let deltaTime = (currentTime - lastFrameTime) / 1000; // Time in seconds since last frame
      
      // Clamp delta time to prevent large jumps (e.g., when tab is hidden or lag occurs)
      // This prevents animation "jumping" on Safari when switching tabs
      deltaTime = Math.min(deltaTime, 0.1); // Cap at 100ms (10fps minimum)
      
      lastFrameTime = currentTime;

      time += deltaTime;

      // Automatic rotation - ensure it always runs
      if (autoRotate) {
        rotationRef.current.y += rotationSpeed;
        rotationRef.current.x = Math.sin(time * 0.3) * 0.2; // Gentle wobble
      }

      // Draw sun rays BEFORE particles (so particles appear on top)
      const rayCount = isMobile ? 12 : 24; // Fewer rays on mobile
      const rayLength = radius * 2.4; // Slightly reduced for balanced size
      
      // Get color values
      const primaryRgb = hexToRgb(primaryColor);
      const secondaryRgb = hexToRgb(secondaryColor);
      const tertiaryRgb = hexToRgb(tertiaryColor);
      
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Optimize ray rendering for better performance
      const particlesPerRay = isMobile ? 12 : 18; // Significantly reduce particles on mobile
      const raySegments = isMobile ? 8 : 10; // Reduce segments on mobile
      
      // Draw subtle, particle-like rays
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + time * 0.3; // Slower rotation
        const innerRadius = radius * 1.15; // Increased to start rays further from sphere edge
        
        // Alternate between colors for variation
        const colorIndex = i % 3;
        let rayColor;
        if (colorIndex === 0) rayColor = primaryRgb;
        else if (colorIndex === 1) rayColor = secondaryRgb;
        else rayColor = tertiaryRgb;
        
        // Alternating ray sizes - every other ray is smaller
        const raySizeMultiplier = i % 2 === 0 ? 1.0 : 0.65;
        const rayLengthAdjusted = innerRadius + (rayLength - innerRadius) * raySizeMultiplier;
        
        // FIRST: Draw the warm glow shape underneath the ray
        ctx.save();
        ctx.beginPath();
        
        // Create a path that follows the ray shape
        const glowWidth = 24 * raySizeMultiplier; // Balanced size for visible but not overwhelming rays
        const startX = Math.cos(angle) * innerRadius;
        const startY = Math.sin(angle) * innerRadius;
        const endX = Math.cos(angle) * rayLengthAdjusted;
        const endY = Math.sin(angle) * rayLengthAdjusted;
        
        // Create wavy path for the glow
        const segments = raySegments;
        const waveAmplitude = 15 * raySizeMultiplier; // How much the wave oscillates
        const waveFrequency = 3 + (i % 3); // Vary frequency per ray
        
        // Create gradient along the ray path
        const rayGradient = ctx.createLinearGradient(
          startX, startY,
          endX, endY
        );
        
        // Warm glow colors along the ray
        const glowPulse = Math.sin(time * 1.5 + i * 0.3) * 0.1 + 0.9;
        rayGradient.addColorStop(0, `rgba(255, 200, 50, ${0.15 * glowPulse})`); // Reduced from 0.35
        rayGradient.addColorStop(0.3, `rgba(253, 184, 19, ${0.12 * glowPulse})`); // Reduced from 0.25
        rayGradient.addColorStop(0.6, `rgba(255, 165, 0, ${0.08 * glowPulse})`); // Reduced from 0.15
        rayGradient.addColorStop(1, `rgba(255, 140, 0, 0)`);
        
        // Draw the wavy glow path with tapered width for pointed tips
        ctx.globalCompositeOperation = 'lighter'; // Additive blending for glow
        
        // Calculate wavy path points
        const pathPoints: {x: number, y: number}[] = [];
        for (let seg = 0; seg <= segments; seg++) {
          const t = seg / segments;
          const distance = innerRadius + (rayLengthAdjusted - innerRadius) * t;
          
          // Calculate wave offset perpendicular to the ray
          const waveOffset = Math.sin(t * Math.PI * waveFrequency + time * 2) * waveAmplitude * Math.sin(t * Math.PI); // Fade wave at start and end
          
          // Base position along the ray
          const baseX = Math.cos(angle) * distance;
          const baseY = Math.sin(angle) * distance;
          
          // Perpendicular offset for the wave
          const perpAngle = angle + Math.PI / 2;
          const wavyX = baseX + Math.cos(perpAngle) * waveOffset;
          const wavyY = baseY + Math.sin(perpAngle) * waveOffset;
          
          pathPoints.push({x: wavyX, y: wavyY});
        }
        
        // Draw the glow as a tapered shape (pointed tip)
        ctx.beginPath();
        
        // Draw one side of the ray (widening from center)
        for (let seg = 0; seg <= segments; seg++) {
          const t = seg / segments;
          const point = pathPoints[seg];
          
          // Taper the width from full at base to zero at tip
          const widthMultiplier = (1 - t); // Linear taper
          const currentWidth = glowWidth * widthMultiplier * 0.5; // 0.5 because we draw both sides
          
          // Calculate perpendicular offset for this side
          const localAngle = angle;
          const perpAngle = localAngle + Math.PI / 2;
          const sideX = point.x + Math.cos(perpAngle) * currentWidth;
          const sideY = point.y + Math.sin(perpAngle) * currentWidth;
          
          if (seg === 0) {
            ctx.moveTo(sideX, sideY);
          } else {
            ctx.lineTo(sideX, sideY);
          }
        }
        
        // Draw back along the other side
        for (let seg = segments; seg >= 0; seg--) {
          const t = seg / segments;
          const point = pathPoints[seg];
          
          // Taper the width from full at base to zero at tip
          const widthMultiplier = (1 - t);
          const currentWidth = glowWidth * widthMultiplier * 0.5;
          
          // Calculate perpendicular offset for other side
          const localAngle = angle;
          const perpAngle = localAngle - Math.PI / 2;
          const sideX = point.x + Math.cos(perpAngle) * currentWidth;
          const sideY = point.y + Math.sin(perpAngle) * currentWidth;
          
          ctx.lineTo(sideX, sideY);
        }
        
        ctx.closePath();
        ctx.fillStyle = rayGradient;
        ctx.fill();
        
        ctx.globalCompositeOperation = 'source-over'; // Reset to normal blending
        ctx.restore();
        
        // THEN: Draw the particle-based ray on top
        // Create particle-like ray effect
        
        for (let j = 0; j < particlesPerRay; j++) {
          const t = j / particlesPerRay;
          
          // Use the wavy path points instead of straight line
          const segmentIndex = Math.floor(t * segments);
          const point = pathPoints[Math.min(segmentIndex, pathPoints.length - 1)];
          
          // Calculate how many particles to draw at this position (more at base, fewer at tip)
          const particleCountAtPosition = Math.max(1, Math.floor((1 - t) * 10)); // Reduced from 12 to 10
          
          // Size diminishes with distance - thicker near sphere, thinner as it extends
          const particleSize = (2.8 - t * 2.2) * (1 + Math.sin(time * 2 + i + j * 0.1) * 0.15) * raySizeMultiplier;
          
          // Opacity diminishes with distance - reduced opacity
          const opacity = (1 - t * 0.7) * (0.5 + Math.sin(time * 3 + i * 0.5 + j * 0.2) * 0.12); // Reduced from 0.65 to 0.5
          
          // Draw multiple particles at this position to create thickness
          for (let k = 0; k < particleCountAtPosition; k++) {
            // Offset perpendicular to the ray direction
            const offsetAmount = (k - (particleCountAtPosition - 1) / 2) * particleSize * 1.8; // Increased from 1.5 to 1.8
            const perpAngle = angle + Math.PI / 2;
            const x = point.x + Math.cos(perpAngle) * offsetAmount;
            const y = point.y + Math.sin(perpAngle) * offsetAmount;
            
            // Draw ray particle with minimal glow
            const glowSize = particleSize * 2;
            const glow = ctx.createRadialGradient(
              x,
              y,
              0,
              x,
              y,
              glowSize
            );
            glow.addColorStop(0, `rgba(${rayColor.r}, ${rayColor.g}, ${rayColor.b}, ${opacity * 0.9})`);
            glow.addColorStop(0.5, `rgba(${rayColor.r}, ${rayColor.g}, ${rayColor.b}, ${opacity * 0.5})`);
            glow.addColorStop(1, `rgba(${rayColor.r}, ${rayColor.g}, ${rayColor.b}, 0)`);
            
            ctx.beginPath();
            ctx.arc(x, y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
            
            // Core particle
            ctx.beginPath();
            ctx.arc(x, y, particleSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rayColor.r}, ${rayColor.g}, ${rayColor.b}, ${opacity})`;
            ctx.fill();
          }
        }
      }
      
      ctx.restore();

      // Draw warm central glow AFTER rays but BEFORE particles
      ctx.save();
      const centralGlowRadius = radius * 1.4; // Large warm glow in the center
      const centralGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        centralGlowRadius
      );
      
      // Warm orangey-yellow glow with pulsing effect
      const glowPulse = Math.sin(time * 1.5) * 0.15 + 0.85; // Gentle pulse between 0.7 and 1.0
      centralGlow.addColorStop(0, `rgba(255, 200, 50, ${0.4 * glowPulse})`); // Bright warm center
      centralGlow.addColorStop(0.3, `rgba(253, 184, 19, ${0.3 * glowPulse})`); // Golden yellow
      centralGlow.addColorStop(0.5, `rgba(255, 165, 0, ${0.2 * glowPulse})`); // Orange
      centralGlow.addColorStop(0.7, `rgba(255, 140, 0, ${0.1 * glowPulse})`); // Darker orange
      centralGlow.addColorStop(1, `rgba(255, 120, 0, 0)`); // Fade to transparent
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, centralGlowRadius, 0, Math.PI * 2);
      ctx.fillStyle = centralGlow;
      ctx.fill();
      ctx.restore();

      // Interpolate mouse position for smooth interaction
      const mouseInterpolationFactor = 0.18; // Smooth mouse tracking for fluid circular motion
      mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * mouseInterpolationFactor;
      mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * mouseInterpolationFactor;

      // Create new waves when hovering
      if (isHoveredRef.current) {
        const currentTime = Date.now();
        // Create waves more frequently for smoother, more continuous effect
        if (currentTime - lastWaveTime.current > 80) {
          waves.current.push({
            x: mousePos.current.x,
            y: mousePos.current.y,
            startTime: currentTime,
            duration: 2000, // Slightly longer for smoother fadeout
          });
          lastWaveTime.current = currentTime;
        }
      }

      // Clean up old waves
      const currentFrameTime = Date.now();
      waves.current = waves.current.filter(
        (wave) => currentFrameTime - wave.startTime < wave.duration
      );

      // Rotate and project all points
      const projectedPoints = allPoints.map((point, i) => {
        if (i >= particleDisplacements.current.length) return null;

        const displacement = particleDisplacements.current[i];
        
        // Check if this is a spiral particle (index >= sphere particle count)
        const isSpiralParticle = i >= spherePoints.length;
        
        // For sphere particles: rotate FIRST, then apply displacement (displacement in rotated space)
        // For spiral particles: no rotation, displacement in screen space
        const rotated = isSpiralParticle 
          ? point // Spiral particles don't rotate
          : rotatePoint(point, rotationRef.current.x, rotationRef.current.y); // Rotate the base position
        
        // Now apply displacement in rotated/screen space
        const displacedPoint = {
          x: rotated.x + displacement.x,
          y: rotated.y + displacement.y,
          z: rotated.z + displacement.z,
        };

        // Project the particle to screen space
        const projectedParticle = project(displacedPoint);

        // Calculate distance in 2D screen space for uniform interaction across the entire sphere
        const dx2D = projectedParticle.x - mousePos.current.x;
        const dy2D = projectedParticle.y - mousePos.current.y;
        const distance = Math.sqrt(dx2D * dx2D + dy2D * dy2D);

        // Apply wave/ripple effects that emanate from hover points
        waves.current.forEach((wave) => {
          const timeSinceStart = currentFrameTime - wave.startTime;
          
          // Calculate distance from this particle to the wave origin
          const dxWave = projectedParticle.x - wave.x;
          const dyWave = projectedParticle.y - wave.y;
          const distanceFromWave = Math.sqrt(dxWave * dxWave + dyWave * dyWave);

          // Wave travels at 400 pixels per second
          const waveSpeed = 400; // pixels per second
          const waveRadius = (timeSinceStart / 1000) * waveSpeed;
          const waveThickness = 70; // Thicker wave band for broader, smoother effect

          // Check if particle is within the wave band
          const distanceFromWaveFront = Math.abs(distanceFromWave - waveRadius);
          
          if (distanceFromWaveFront < waveThickness) {
            // Particle is in the wave! Calculate oscillating displacement
            const bandPosition = 1 - (distanceFromWaveFront / waveThickness); // 0 at edge, 1 at center
            
            // Smooth easing for band position - creates gentler wave curves
            const easedBandPosition = bandPosition * bandPosition * (3 - 2 * bandPosition); // Smoothstep
            
            // Fade over lifetime with smooth easing
            const fadeProgress = timeSinceStart / wave.duration; // 0 to 1
            const easedFade = fadeProgress * fadeProgress; // Quadratic ease for smooth fadeout
            const fadeMultiplier = 1 - easedFade; // 1 to 0
            
            // Oscillating sine wave - creates the classic water ripple
            const oscillationFrequency = 2.5; // Reduced frequency for smoother, longer waves
            const oscillationPhase = (distanceFromWaveFront / waveThickness) * Math.PI * 2 * oscillationFrequency;
            const oscillation = Math.sin(oscillationPhase);
            
            // Direction away from wave origin
            const waveAngle = Math.atan2(dyWave, dxWave);
            
            // Wave amplitude with smooth oscillation
            const amplitude = 40 * easedBandPosition * oscillation * fadeMultiplier;
            
            // Apply oscillating wave force with reduced multiplier for gentler motion
            displacement.vx += Math.cos(waveAngle) * amplitude * 0.2;
            displacement.vy += Math.sin(waveAngle) * amplitude * 0.2;
            
            // Subtle depth oscillation for 3D effect
            displacement.vz += amplitude * 0.12 * Math.sign(rotated.z);
          }
        });

        // Apply velocity to position
        displacement.x += displacement.vx;
        displacement.y += displacement.vy;
        displacement.z += displacement.vz;

        // Higher damping for smoother, more liquid-like motion
        const damping = 0.92; // Increased for smoother deceleration
        displacement.vx *= damping;
        displacement.vy *= damping;
        displacement.vz *= damping;

        // Spring force back to origin - strong for quick return
        const springStrength = 0.05; // Strong spring for responsive snap-back
        displacement.vx -= displacement.x * springStrength;
        displacement.vy -= displacement.y * springStrength;
        displacement.vz -= displacement.z * springStrength;

        // Apply rotation only to sphere particles (spiral stays stationary)
        // Both are affected by interaction forces, but only sphere spins
        const finalPoint = isSpiralParticle 
          ? displacedPoint // Spiral particles don't rotate
          : rotatePoint(displacedPoint, rotationRef.current.x, rotationRef.current.y); // Sphere particles rotate
        return { ...project(finalPoint), index: i };
      }).filter((p): p is NonNullable<typeof p> => p !== null);

      // Sort by depth
      const sortedPoints = projectedPoints.sort((a, b) => a.z - b.z);

      // Draw particles
      sortedPoints.forEach((point) => {
        const particleData = particleDisplacements.current[point.index];
        if (!particleData) return;

        const brightness = (point.z + radius) / (radius * 2);
        const baseSize = 2.8; // Increased from 2 for bigger particles
        const size = baseSize * particleData.sizeVariation * point.scale;

        if (!isFinite(size) || size <= 0 || !isFinite(point.x) || !isFinite(point.y)) {
          return;
        }

        const alpha = brightness * particleData.brightnessVariation * 1.3; // Increased opacity

        if (!isFinite(alpha) || alpha <= 0) {
          return;
        }

        // Mix colors based on color variation
        const colorMix = particleData.colorVariation;
        let r, g, b;
        
        // Check if this is a spiral particle
        const isSpiralParticle = point.index >= spherePoints.length;

        if (isSpiralParticle && theme === 'light') {
          // Spiral particles in light mode: use lighter orange tones
          const orangeRgb = { r: 255, g: 180, b: 80 }; // Light orange
          const burntOrangeRgb = { r: 255, g: 160, b: 60 }; // Medium orange
          const deepOrangeRgb = { r: 255, g: 170, b: 100 }; // Peachy orange
          
          if (colorMix < 0.5) {
            // Orange to Deep Orange
            const t = colorMix / 0.5;
            r = Math.floor(orangeRgb.r + (deepOrangeRgb.r - orangeRgb.r) * t);
            g = Math.floor(orangeRgb.g + (deepOrangeRgb.g - orangeRgb.g) * t);
            b = Math.floor(orangeRgb.b + (deepOrangeRgb.b - orangeRgb.b) * t);
          } else {
            // Deep Orange to Burnt Orange
            const t = (colorMix - 0.5) / 0.5;
            r = Math.floor(deepOrangeRgb.r + (burntOrangeRgb.r - deepOrangeRgb.r) * t);
            g = Math.floor(deepOrangeRgb.g + (burntOrangeRgb.g - deepOrangeRgb.g) * t);
            b = Math.floor(deepOrangeRgb.b + (burntOrangeRgb.b - burntOrangeRgb.b) * t);
          }
        } else if (colorMix < 0.33) {
          // Primary to Secondary
          const t = colorMix / 0.33;
          r = Math.floor(primaryRgb.r + (secondaryRgb.r - primaryRgb.r) * t);
          g = Math.floor(primaryRgb.g + (secondaryRgb.g - primaryRgb.g) * t);
          b = Math.floor(primaryRgb.b + (secondaryRgb.b - primaryRgb.b) * t);
        } else if (colorMix < 0.66) {
          // Secondary to Tertiary
          const t = (colorMix - 0.33) / 0.33;
          r = Math.floor(secondaryRgb.r + (tertiaryRgb.r - secondaryRgb.r) * t);
          g = Math.floor(secondaryRgb.g + (tertiaryRgb.g - secondaryRgb.g) * t);
          b = Math.floor(secondaryRgb.b + (tertiaryRgb.b - secondaryRgb.b) * t);
        } else {
          // Tertiary to Primary
          const t = (colorMix - 0.66) / 0.34;
          r = Math.floor(tertiaryRgb.r + (primaryRgb.r - tertiaryRgb.r) * t);
          g = Math.floor(tertiaryRgb.g + (primaryRgb.g - tertiaryRgb.g) * t);
          b = Math.floor(tertiaryRgb.b + (primaryRgb.b - tertiaryRgb.b) * t);
        }

        // Minimal subtle glow - just a slight halo
        const glowSize = size * 1.5;
        if (isFinite(glowSize) && glowSize > 0) {
          const glow = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            glowSize
          );
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`);
          glow.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`);
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.beginPath();
          ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Solid core - the main particle
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(alpha, 0.95)})`;
        ctx.fill();
      });

      if (animationActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      animationActive = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    width,
    height,
    particleCount,
    sphereRadius,
    rotationSpeed,
    warpStrength,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    interactionMode,
    autoRotate,
  ]);

  const updateHoverFromPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * width;
    const y = ((e.clientY - bounds.top) / bounds.height) * height;

    // Check if mouse is within the sphere radius (use smaller radius to avoid ray edges)
    const centerX = width / 2;
    const centerY = height / 2 - 50;
    const dx = x - centerX;
    const dy = y - centerY;
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

    // Use 0.9 multiplier to create a smaller detection zone, excluding ray edges
    if (distanceFromCenter <= sphereRadius * 0.9) {
      if (!isHoveredRef.current) {
        setIsHovered(true);
        isHoveredRef.current = true;
      }
      mousePos.current.x = x;
      mousePos.current.y = y;
      targetMousePos.current.x = x;
      targetMousePos.current.y = y;
    } else {
      // Mouse is outside sphere core - turn off hover
      if (isHoveredRef.current) {
        setIsHovered(false);
        isHoveredRef.current = false;
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    isHoveredRef.current = false;
  };

  // Use MobileSun component for all devices, animate scale on hover
  return (
    <motion.div
      ref={containerRef}
      className="relative"
      animate={{
        scale: isHovered ? 1.055 : 1,
        y: isHovered ? -6 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
        mass: 0.9,
      }}
      style={{
        cursor: 'pointer',
        transition: 'filter 0.4s ease',
        filter: theme === 'light'
          ? isHovered
            ? 'drop-shadow(0 0 20px rgba(255,165,0,0.42))'
            : 'drop-shadow(0 0 10px rgba(255,165,0,0.16))'
          : isHovered
            ? 'drop-shadow(0 0 20px rgba(232,121,249,0.42))'
            : 'drop-shadow(0 0 10px rgba(232,121,249,0.16))',
      }}
    >
      <MobileSun
        width={width}
        height={height}
        theme={theme}
        sunScale={1}
        hovered={isHovered}
      />
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
        onMouseMove={updateHoverFromPointer}
        onMouseLeave={handleMouseLeave}
      />
    </motion.div>
  );
}