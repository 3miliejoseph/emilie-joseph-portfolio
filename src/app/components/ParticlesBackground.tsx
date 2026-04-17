import { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number, tick = 0;
    const COLOR = theme === 'light' ? [255, 165, 0] : [232, 121, 249]; // Orange for light, purple for dark
    const N = 1200; // Increased number of particles

    function init() {
      W = canvas.width = window.innerWidth;
      // Always use full document height to reach footer
      const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);
      H = canvas.height = documentHeight;
    }

    const COLS = 100;
    const ROWS = 50;
    const CAM_DIST = 900;
    const TILT = 0.15;

    function getRibbonMask(nx, ny) {
      const d = (nx + ny - 1.0);
      const width = 0.8;
      const s = Math.abs(d) / width;
      if (s >= 1) return 0;
      return Math.pow(1 - s * s, 1.5);
    }

    function getZ(nx, ny, t) {
      const along  = nx - ny;
      const across = nx + ny;
      const w1 = Math.sin(along * Math.PI * 3.0 + t * 0.8) * 0.55;
      const w2 = Math.sin(along * Math.PI * 1.4 - t * 0.5 + across * 1.5) * 0.28;
      const w3 = Math.sin(along * Math.PI * 5.5 + t * 0.38) * 0.12;
      return w1 + w2 + w3;
    }

    function project(x3, y3, z3) {
      const W = canvas.width, H = canvas.height;
      const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
      const ry = y3 * cosT - z3 * sinT;
      const rz = y3 * sinT + z3 * cosT;
      const scale = CAM_DIST / (CAM_DIST + rz);
      return { sx: W * 0.4 + x3 * scale, sy: H / 2 + ry * scale, scale, rz };
    }

    function draw() {
      if (!ctx || !canvas) return;
      
      const W = canvas.width, H = canvas.height;
      
      // Clear with transparent background
      ctx.clearRect(0, 0, W, H);

      const gridW = W * 1.1;
      const gridH = H * 1.1;
      const cellW = gridW / (COLS - 1);
      const cellH = gridH / (ROWS - 1);
      const zAmp  = H * 0.12;

      const pts = [];

      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const nx = i / (COLS - 1);
          const ny = j / (ROWS - 1);
          const mask = getRibbonMask(nx, ny);
          if (mask < 0.01) continue;

          const z  = getZ(nx, ny, tick);
          const x3 = i * cellW - gridW / 2;
          const y3 = j * cellH - gridH / 2;
          const z3 = z * zAmp;

          const { sx, sy, scale, rz } = project(x3, y3, z3);

          const brightness = (z + 1) / 2;
          const blend = brightness * mask;

          // Theme-aware colors
          const baseColor = theme === 'light' ? [255, 165, 0] : [232, 121, 249]; // Orange for light, purple for dark
          const r = Math.round(baseColor[0] * (0.6 + blend * 0.4));
          const g = Math.round(baseColor[1] * (0.6 + blend * 0.4));
          const b = Math.round(baseColor[2] * (0.6 + blend * 0.4));
          const alpha = mask * (0.12 + brightness * 0.7);
          const topBias = (1.0 - ny) * 0.4; // Larger particles at top
          const size  = scale * (0.4 + brightness * mask * 1.2 + topBias);

          pts.push({ sx, sy, r, g, b, alpha, size, brightness, mask, rz });
        }
      }

      pts.sort((a, b) => a.rz - b.rz);

      for (const p of pts) {
        if (p.size < 0.15) continue;

        if (p.brightness > 0.76 && p.mask > 0.45) {
          const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, p.size * 6);
          grad.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${(p.brightness - 0.76) * p.mask * 0.2})`);
          grad.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, p.size * 6, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
        ctx.fill();
      }

      tick += 0.008;
      ctx.shadowBlur = 0;
      animationFrameRef.current = requestAnimationFrame(draw);
    }

    function handleResize() {
      setTimeout(() => {
        init();
      }, 100);
    }

    window.addEventListener('resize', handleResize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        minHeight: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
