// "use client";

// import { useRef, useState } from "react";
// import Cell from "./Cell";
// import { GRID_SIZE } from "@/lib/constants";

// export default function Grid({
//   cells,
//   onCapture,
//   currentUser,
//   pendingCell,
//   recentCaptureIndex,
// }) {
//   const dragStartRef = useRef(null);
//   const [scale, setScale] = useState(1);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);

//   if (!cells.length) {
//     return null;
//   }

//   const updateScale = (nextScale) => {
//     setScale(Math.min(2.2, Math.max(0.75, Number(nextScale))));
//   };

//   const handlePointerDown = (event) => {
//     if (event.button !== 0) return;
//     if (event.target.closest("[data-cell-button='true']")) return;

//     dragStartRef.current = {
//       pointerId: event.pointerId,
//       startX: event.clientX,
//       startY: event.clientY,
//       offset,
//     };
//     setIsDragging(true);
//     event.currentTarget.setPointerCapture(event.pointerId);
//   };

//   const handlePointerMove = (event) => {
//     if (!dragStartRef.current) return;

//     const deltaX = event.clientX - dragStartRef.current.startX;
//     const deltaY = event.clientY - dragStartRef.current.startY;

//     setOffset({
//       x: dragStartRef.current.offset.x + deltaX,
//       y: dragStartRef.current.offset.y + deltaY,
//     });
//   };

//   const stopDragging = () => {
//     dragStartRef.current = null;
//     setIsDragging(false);
//   };

//   const resetView = () => {
//     setScale(1);
//     setOffset({ x: 0, y: 0 });
//   };

//   return (
//     <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
//       <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={() => updateScale(scale - 0.15)}
//             className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
//             title="Zoom out"
//           >
//             -
//           </button>
//           <input
//             type="range"
//             min="0.75"
//             max="2.2"
//             step="0.05"
//             value={scale}
//             onChange={(event) => updateScale(event.target.value)}
//             className="h-2 w-28 accent-indigo-600"
//             aria-label="Grid zoom"
//           />
//           <button
//             type="button"
//             onClick={() => updateScale(scale + 0.15)}
//             className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
//             title="Zoom in"
//           >
//             +
//           </button>
//         </div>
//         <button
//           type="button"
//           onClick={resetView}
//           className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
//         >
//           Reset view
//         </button>
//       </div>

//       <div
//         className={[
//           "relative h-[min(78vw,650px)] min-h-[340px] touch-none overflow-hidden rounded-md bg-slate-100",
//           isDragging ? "cursor-grabbing" : "cursor-grab",
//         ].join(" ")}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={stopDragging}
//         onPointerCancel={stopDragging}
//       >
//         <div
//           className="absolute left-1/2 top-1/2 grid aspect-square w-[min(72vw,620px)] min-w-[320px] origin-center gap-[2px] rounded-md bg-slate-200 p-2 shadow-sm transition-transform duration-150"
//           style={{
//             gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
//             transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
//           }}
//         >
//           {cells.map((cell) => (
//             <Cell
//               key={cell.index}
//               cell={cell}
//               onCapture={onCapture}
//               currentUser={currentUser}
//               isPending={pendingCell === cell.index}
//               isRecentCapture={recentCaptureIndex === cell.index}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useRef, useState } from "react";
import Cell from "./Cell";
import { GRID_SIZE } from "@/lib/constants";

export default function Grid({
  cells,
  onCapture,
  currentUser,
  pendingCell,
  recentCaptureIndex,
}) {
  const dragStartRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  if (!cells.length) {
    return null;
  }

  const updateScale = (nextScale) => {
    setScale(Math.min(2.2, Math.max(0.75, Number(nextScale))));
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    if (event.target.closest("[data-cell-button='true']")) return;

    dragStartRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offset,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragStartRef.current) return;

    const deltaX = event.clientX - dragStartRef.current.startX;
    const deltaY = event.clientY - dragStartRef.current.startY;

    setOffset({
      x: dragStartRef.current.offset.x + deltaX,
      y: dragStartRef.current.offset.y + deltaY,
    });
  };

  const stopDragging = () => {
    dragStartRef.current = null;
    setIsDragging(false);
  };

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-3">
      {/* Controls row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => updateScale(scale - 0.15)}
            className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-white/5 text-sm font-bold text-white/50 transition hover:border-indigo-400/40 hover:text-indigo-400 hover:bg-indigo-500/10"
            title="Zoom out"
          >
            −
          </button>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0.75"
              max="2.2"
              step="0.05"
              value={scale}
              onChange={(event) => updateScale(event.target.value)}
              className="h-1 w-24 accent-indigo-500 appearance-none rounded-full bg-white/10 cursor-pointer"
              aria-label="Grid zoom"
            />
          </div>
          <button
            type="button"
            onClick={() => updateScale(scale + 0.15)}
            className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-white/5 text-sm font-bold text-white/50 transition hover:border-indigo-400/40 hover:text-indigo-400 hover:bg-indigo-500/10"
            title="Zoom in"
          >
            +
          </button>
          <span className="ml-1 font-mono text-[11px] text-white/25 tabular-nums">
            {Math.round(scale * 100)}%
          </span>
        </div>

        <button
          type="button"
          onClick={resetView}
          className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-white/40 transition hover:border-white/20 hover:text-white/70"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v2M5 7v2M1 5h2M7 5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Reset
        </button>
      </div>

      {/* Grid viewport */}
      <div
        className={[
          "relative h-[min(76vw,620px)] min-h-[320px] touch-none overflow-hidden rounded-lg bg-[#0f1117] border border-white/[0.06]",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        ].join(" ")}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div
          className="absolute left-1/2 top-1/2 grid aspect-square w-[min(70vw,580px)] min-w-[300px] origin-center gap-[2px] rounded-md bg-white/[0.04] p-2 shadow-[0_0_60px_rgba(99,102,241,0.08)] transition-transform duration-150"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
          }}
        >
          {cells.map((cell) => (
            <Cell
              key={cell.index}
              cell={cell}
              onCapture={onCapture}
              currentUser={currentUser}
              isPending={pendingCell === cell.index}
              isRecentCapture={recentCaptureIndex === cell.index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}