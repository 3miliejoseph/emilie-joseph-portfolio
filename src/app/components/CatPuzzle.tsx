import React, { useState } from "react";

const GRID_SIZE = 3; // 3x3 puzzle
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

function shuffle(array: number[]) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isSolved(tiles: number[]) {
  return tiles.every((tile, idx) => tile === idx);
}

export default function CatPuzzle() {
  const [tiles, setTiles] = useState(() => shuffle([...Array(TILE_COUNT).keys()]));
  const [solved, setSolved] = useState(false);

  function handleTileClick(idx: number) {
    if (solved) return;
    // Find the empty tile (last tile)
    const emptyIdx = tiles.indexOf(TILE_COUNT - 1);
    // Only allow swap if clicked tile is adjacent to empty
    const canSwap = (a: number, b: number) => {
      const rowA = Math.floor(a / GRID_SIZE), colA = a % GRID_SIZE;
      const rowB = Math.floor(b / GRID_SIZE), colB = b % GRID_SIZE;
      return (
        (rowA === rowB && Math.abs(colA - colB) === 1) ||
        (colA === colB && Math.abs(rowA - rowB) === 1)
      );
    };
    if (canSwap(idx, emptyIdx)) {
      const newTiles = tiles.slice();
      [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
      setTiles(newTiles);
      if (isSolved(newTiles)) setSolved(true);
    }
  }

  function handleReset() {
    setTiles(shuffle([...Array(TILE_COUNT).keys()]));
    setSolved(false);
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 80px))`,
          gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 80px))`,
        }}
      >
        {tiles.map((tile, idx) => {
          // Hide the last tile (empty space)
          if (tile === TILE_COUNT - 1) return <div key={idx} style={{ width: 80, height: 80 }} />;
          const row = Math.floor(tile / GRID_SIZE);
          const col = tile % GRID_SIZE;
          return (
            <div
              key={idx}
              className="cursor-pointer border border-border bg-background"
              style={{
                width: 80,
                height: 80,
                backgroundImage: 'url(/cat-puzzle.jpg)',
                backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                backgroundPosition: `${(col * 100) / (GRID_SIZE - 1)}% ${(row * 100) / (GRID_SIZE - 1)}%`,
                transition: 'box-shadow 0.1s',
              }}
              onClick={() => handleTileClick(idx)}
            />
          );
        })}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-accent text-foreground rounded hover:bg-accent/80 transition"
        onClick={handleReset}
      >
        {solved ? "Shuffle Again" : "Reset"}
      </button>
      {solved && <div className="mt-2 text-green-600 font-medium">Solved!</div>}
    </div>
  );
}
