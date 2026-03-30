import React, { useState } from "react";
import DragPuzzlePiece from "./DragPuzzlePiece";
import { generateEdgeStates } from "./puzzleUtils";

const ROWS = 3;
const COLS = 4;
const PIECE_COUNT = ROWS * COLS;
const PIECE_WIDTH = 96; // px
const PIECE_HEIGHT = 96; // px
const IMG_URL = "/cat-puzzle.jpg";

function shuffle<T>(array: T[]): T[] {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Each piece: { id, row, col, edgeState }
const edgeStates = generateEdgeStates(ROWS, COLS);
const pieces = Array.from({ length: PIECE_COUNT }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  return {
    id: i,
    row,
    col,
    edgeState: edgeStates[row][col] as [number, number, number, number],
  };
});

export default function DragPuzzle() {
  // workspace: array of piece ids or null (empty)
  const [workspace, setWorkspace] = useState<(number | null)[]>(Array(PIECE_COUNT).fill(null));
  // pile: array of piece ids (not yet placed)
  const [pile, setPile] = useState<number[]>(shuffle(pieces.map(p => p.id)));
  const [dragged, setDragged] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);

  function handleDragStart(id: number) {
    setDragged(id);
  }
  function handleDragEnd() {
    setDragged(null);
  }
  function handleDrop(idx: number) {
    if (dragged === null) return;
    if (workspace[idx] !== null) return;
    // Place dragged piece in workspace
    const newWorkspace = workspace.slice();
    newWorkspace[idx] = dragged;
    setWorkspace(newWorkspace);
    setPile(pile.filter(p => p !== dragged));
    setDragged(null);
    // Check solved
    if (newWorkspace.every((id, i) => id === i)) setSolved(true);
  }
  function handleReturnToPile(idx: number) {
    // Remove from workspace, return to pile
    const id = workspace[idx];
    if (id === null) return;
    const newWorkspace = workspace.slice();
    newWorkspace[idx] = null;
    setWorkspace(newWorkspace);
    setPile([...pile, id]);
    setSolved(false);
  }
  function handleReset() {
    setWorkspace(Array(PIECE_COUNT).fill(null));
    setPile(shuffle(pieces.map(p => p.id)));
    setSolved(false);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex flex-wrap gap-2 min-h-[100px] p-2 border border-border rounded bg-muted">
        {/* Pile */}
        {pile.map(id => {
          const piece = pieces[id];
          return (
            <div key={id} style={{ width: PIECE_WIDTH, height: PIECE_HEIGHT }}>
              <DragPuzzlePiece
                imgUrl={IMG_URL}
                width={PIECE_WIDTH}
                height={PIECE_HEIGHT}
                row={piece.row}
                col={piece.col}
                edgeState={piece.edgeState}
                gridRows={ROWS}
                gridCols={COLS}
                draggable
                onDragStart={() => handleDragStart(id)}
                onDragEnd={handleDragEnd}
                style={{ opacity: dragged === id ? 0.5 : 1 }}
              />
            </div>
          );
        })}
      </div>
      <div
        className="grid gap-1 border border-border rounded bg-background"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, ${PIECE_WIDTH}px))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, ${PIECE_HEIGHT}px))`,
        }}
      >
        {workspace.map((id, idx) => {
          const isOver = dragged !== null && workspace[idx] === null;
          const piece = id !== null ? pieces[id] : null;
          return (
            <div
              key={idx}
              onDragOver={e => { if (dragged !== null && workspace[idx] === null) e.preventDefault(); }}
              onDrop={() => handleDrop(idx)}
              className={`flex items-center justify-center border border-border bg-muted/50 relative ${isOver ? 'ring-2 ring-accent' : ''}`}
              style={{ width: PIECE_WIDTH, height: PIECE_HEIGHT }}
            >
              {piece && (
                <div className="absolute inset-0">
                  <DragPuzzlePiece
                    imgUrl={IMG_URL}
                    width={PIECE_WIDTH}
                    height={PIECE_HEIGHT}
                    row={piece.row}
                    col={piece.col}
                    edgeState={piece.edgeState}
                    gridRows={ROWS}
                    gridCols={COLS}
                    draggable
                    onDragStart={() => handleDragStart(id!)}
                    onDragEnd={handleDragEnd}
                    style={{}}
                  />
                  <div
                    className="absolute inset-0"
                    onDoubleClick={() => handleReturnToPile(idx)}
                    title="Double-click to return to pile"
                    style={{ cursor: 'pointer', background: 'transparent' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-accent text-foreground rounded hover:bg-accent/80 transition"
        onClick={handleReset}
      >
        Reset
      </button>
      {solved && <div className="mt-2 text-green-600 font-medium">Solved!</div>}
      <div className="mt-2 text-xs text-muted-foreground">Drag pieces to the grid. Double-click a placed piece to return it to the pile.</div>
    </div>
  );
}
