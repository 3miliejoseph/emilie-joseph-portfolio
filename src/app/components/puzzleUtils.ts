// Utility to generate SVG path for a puzzle piece with tabs/slots
// Each piece is defined by its row, col, and the tab/slot state of each edge
// Edges: [top, right, bottom, left] (1 = tab, -1 = slot, 0 = flat)

export function getPuzzlePiecePath(
  width: number,
  height: number,
  edgeState: [number, number, number, number],
  tabSize = 0.3 // relative to min(width, height)
): string {
  // edgeState: [top, right, bottom, left]
  // tabSize: 0.3 means 30% of min(width, height)
  const w = width;
  const h = height;
  const tab = tabSize * Math.min(w, h);
  const midW = w / 2;
  const midH = h / 2;

  // Helper for a single edge
  function edge(startX: number, startY: number, dx: number, dy: number, tabDir: number, isHorizontal: boolean) {
    // Flat
    if (tabDir === 0) {
      return `L ${startX + dx} ${startY + dy}`;
    }
    // Tab or slot (Bezier curve)
    const tabLength = isHorizontal ? w / 3 : h / 3;
    const tabWidth = tab;
    const sign = tabDir;
    if (isHorizontal) {
      // Horizontal edge (top/bottom)
      const y = startY + dy;
      const x0 = startX;
      const x1 = startX + tabLength / 3;
      const x2 = startX + tabLength * 2 / 3;
      const x3 = startX + dx;
      const tabY = y + sign * tabWidth;
      return [
        `L ${x1} ${y}`,
        `C ${x1} ${y} ${x1} ${tabY} ${midW} ${tabY}`,
        `C ${x2} ${tabY} ${x2} ${y} ${x3} ${y}`
      ].join(' ');
    } else {
      // Vertical edge (left/right)
      const x = startX + dx;
      const y0 = startY;
      const y1 = startY + tabLength / 3;
      const y2 = startY + tabLength * 2 / 3;
      const y3 = startY + dy;
      const tabX = x + sign * tabWidth;
      return [
        `L ${x} ${y1}`,
        `C ${x} ${y1} ${tabX} ${y1} ${tabX} ${midH}`,
        `C ${tabX} ${y2} ${x} ${y2} ${x} ${y3}`
      ].join(' ');
    }
  }

  // Start at top-left
  let d = `M 0 0`;
  // Top edge
  d += ' ' + edge(0, 0, w, 0, edgeState[0], true);
  // Right edge
  d += ' ' + edge(w, 0, 0, h, edgeState[1], false);
  // Bottom edge
  d += ' ' + edge(w, h, -w, 0, edgeState[2], true);
  // Left edge
  d += ' ' + edge(0, h, 0, -h, edgeState[3], false);
  d += ' Z';
  return d;
}

// Generate edge states for a grid so that adjacent pieces match
export function generateEdgeStates(rows: number, cols: number) {
  // For each piece, store [top, right, bottom, left]
  const edgeStates: [number, number, number, number][][] = [];
  for (let r = 0; r < rows; r++) {
    edgeStates[r] = [];
    for (let c = 0; c < cols; c++) {
      // Top: flat if first row, else -bottom of above
      // Left: flat if first col, else -right of left
      // Right: random tab/slot unless last col
      // Bottom: random tab/slot unless last row
      const top = r === 0 ? 0 : -edgeStates[r - 1][c][2];
      const left = c === 0 ? 0 : -edgeStates[r][c - 1][1];
      const right = c === cols - 1 ? 0 : Math.random() > 0.5 ? 1 : -1;
      const bottom = r === rows - 1 ? 0 : Math.random() > 0.5 ? 1 : -1;
      edgeStates[r][c] = [top, right, bottom, left];
    }
  }
  return edgeStates;
}
