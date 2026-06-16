// export default function StatsPanel({
//   stats,
//   currentRank,
//   cooldownRemainingMs,
//   onlineCount,
// }) {
//   if (!stats) {
//     return null;
//   }

//   const cooldownSeconds = Math.ceil(cooldownRemainingMs / 1000);
//   const items = [
//     { label: "Captured", value: stats.claimedCells },
//     { label: "Capture %", value: `${stats.claimPercentage}%` },
//     { label: "Online", value: onlineCount },
//     { label: "Captures / Min", value: stats.capturesPerMinute || 0 },
//     { label: "Your Rank", value: currentRank ? `#${currentRank}` : "-" },
//     {
//       label: "Most Active",
//       value: stats.mostActivePlayer?.ownerName || "-",
//     },
//     {
//       label: "Cooldown",
//       value: cooldownRemainingMs > 0 ? `${cooldownSeconds}s` : "Ready",
//     },
//   ];

//   return (
//     <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
//           Advanced Stats
//         </h2>
//         <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
//           {stats.claimedCells}/{stats.totalCells}
//         </span>
//       </div>
//       <div className="grid grid-cols-2 gap-3">
//         {items.map((item) => (
//           <div
//             key={item.label}
//             className="rounded-lg bg-slate-50 px-3 py-3 transition hover:bg-white hover:shadow-sm"
//           >
//             <p className="text-xs uppercase tracking-wide text-slate-400">
//               {item.label}
//             </p>
//             <p className="mt-1 text-lg font-bold text-slate-900 transition-all">
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




export default function StatsPanel({
  stats,
  currentRank,
  cooldownRemainingMs,
  onlineCount,
}) {
  if (!stats) {
    return null;
  }

  const cooldownSeconds = Math.ceil(cooldownRemainingMs / 1000);

  const items = [
    { label: "Captured", value: stats.claimedCells, accent: false },
    { label: "Capture %", value: `${stats.claimPercentage}%`, accent: false },
    { label: "Online", value: onlineCount, accent: false },
    { label: "Cap / min", value: stats.capturesPerMinute || 0, accent: false },
    {
      label: "Your rank",
      value: currentRank ? `#${currentRank}` : "—",
      accent: Boolean(currentRank),
    },
    {
      label: "Most active",
      value: stats.mostActivePlayer?.ownerName || "—",
      small: true,
    },
    {
      label: "Cooldown",
      value: cooldownRemainingMs > 0 ? `${cooldownSeconds}s` : "Ready",
      accent: cooldownRemainingMs === 0,
    },
  ];

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#161b27] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
          Stats
        </h2>
        <span className="rounded-md bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 text-[11px] font-mono text-white/30">
          {stats.claimedCells}/{stats.totalCells}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/[0.04] border-b border-white/[0.04]">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-[#161b27] px-4 py-3 transition hover:bg-white/[0.02]"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium">
              {item.label}
            </p>
            <p
              className={`mt-1 text-base font-bold font-mono tabular-nums leading-none transition-all ${
                item.accent
                  ? "text-indigo-400"
                  : item.small
                  ? "text-sm text-white/70 truncate"
                  : "text-white/80"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}