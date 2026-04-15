// Utility to generate a continuous spiral SVG path string
export function generateSpiralPath(cx, cy, coils, radius, spacing, points = 500) {
  let path = '';
  for (let i = 0; i <= points; i++) {
    const theta = coils * 2 * Math.PI * (i / points);
    const r = radius + spacing * theta;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    if (i === 0) {
      path = `M${x},${y}`;
    } else {
      path += ` L${x},${y}`;
    }
  }
  return path;
}
