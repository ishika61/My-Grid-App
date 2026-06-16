// import EmptyState from "./EmptyState";

// export default function Leaderboard({ entries }) {
//   const topScore = Math.max(1, ...entries.map((entry) => entry.capturedCells));

//   return (
//     <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
//           Leaderboard
//         </h2>
//         <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
//           Top {entries.length}
//         </span>
//       </div>

//       {entries.length === 0 ? (
//         <EmptyState
//           title="No captures yet"
//           description="Be the first to claim a cell on the grid."
//         />
//       ) : (
//         <ul className="space-y-2">
//           {entries.map((entry, index) => (
//             <li
//               key={entry.ownerId || `${entry.ownerName}-${entry.color}`}
//               className="rounded-lg bg-slate-50 px-3 py-3 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
//             >
//               <div className="flex items-center justify-between gap-3">
//                 <div className="flex min-w-0 items-center gap-3">
//                   <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-500">
//                     {entry.rank || index + 1}
//                   </span>
//                   <span
//                     className="h-3 w-3 shrink-0 rounded-full"
//                     style={{ backgroundColor: entry.color }}
//                   />
//                   <span className="truncate text-sm font-medium text-slate-800">
//                     {entry.ownerName}
//                   </span>
//                 </div>
//                 <span className="text-sm font-semibold text-indigo-600 transition-all duration-300">
//                   {entry.capturedCells}
//                 </span>
//               </div>

//               <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
//                 <div
//                   className="h-full rounded-full bg-indigo-500 transition-all duration-500"
//                   style={{
//                     width: `${(entry.capturedCells / topScore) * 100}%`,
//                   }}
//                 />
//               </div>
//               <p className="mt-2 text-xs text-slate-500">
//                 {entry.capturedCells === 1
//                   ? "1 captured cell"
//                   : `${entry.capturedCells} captured cells`}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </section>
//   );
// }










import EmptyState from "./EmptyState";

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard({ entries }) {
  const topScore = Math.max(1, ...entries.map((entry) => entry.capturedCells));

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#161b27] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
          Leaderboard
        </h2>
        <span className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[11px] font-mono text-indigo-400">
          Top {entries.length}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="p-4">
          <EmptyState
            title="No captures yet"
            description="Be the first to claim a cell."
          />
        </div>
      ) : (
        <ul className="divide-y divide-white/[0.04]">
          {entries.map((entry, index) => {
            const rank = entry.rank || index + 1;
            const pct = (entry.capturedCells / topScore) * 100;
            return (
              <li
                key={entry.ownerId || `${entry.ownerName}-${entry.color}`}
                className="group flex items-center gap-3 px-4 py-2.5 transition hover:bg-white/[0.03]"
              >
                {/* Rank */}
                <div className="w-5 shrink-0 text-center">
                  {rank <= 3 ? (
                    <span className="text-sm leading-none">{RANK_MEDALS[rank - 1]}</span>
                  ) : (
                    <span className="text-[11px] font-mono text-white/25">{rank}</span>
                  )}
                </div>

                {/* Color dot */}
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/20"
                  style={{ backgroundColor: entry.color }}
                />

                {/* Name + bar */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13px] font-medium text-white/75">
                      {entry.ownerName}
                    </span>
                    <span className="shrink-0 font-mono text-[12px] font-semibold text-indigo-400 tabular-nums">
                      {entry.capturedCells}
                    </span>
                  </div>
                  {/* Mini bar */}
                  <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-indigo-500/60 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}