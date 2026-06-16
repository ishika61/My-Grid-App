// "use client";

// import { useGridApp } from "@/hooks/useGridApp";
// import ActivityFeed from "./ActivityFeed";
// import Grid from "./Grid";
// import Leaderboard from "./Leaderboard";
// import LoadingSpinner from "./LoadingSpinner";
// import OnlineUsers from "./OnlineUsers";
// import StatsPanel from "./StatsPanel";
// import UsernameModal from "./UsernameModal";

// export default function Dashboard() {
//   const {
//     cells,
//     stats,
//     leaderboard,
//     activities,
//     onlineUsers,
//     currentUser,
//     isLoading,
//     isConnected,
//     joinError,
//     captureError,
//     pendingCell,
//     recentCaptureIndex,
//     cooldownRemainingMs,
//     now,
//     joinGame,
//     captureCell,
//   } = useGridApp();

//   const currentRank = currentUser
//     ? leaderboard.findIndex((entry) =>
//         entry.ownerId
//           ? entry.ownerId === currentUser.socketId
//           : entry.ownerName === currentUser.username &&
//             entry.color === currentUser.color
//       ) + 1
//     : 0;
//   const cooldownRemainingSeconds = Math.ceil(cooldownRemainingMs / 1000);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f5f7fb]">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f7fb]">
//       {!currentUser ? (
//         <UsernameModal
//           onJoin={joinGame}
//           error={joinError}
//           isConnected={isConnected}
//         />
//       ) : null}

//       <header className="border-b border-slate-200 bg-white/95">
//         <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
//               Real-time Grid
//             </p>
//             <h1 className="text-2xl font-bold text-slate-900">Grid Conquest</h1>
//             <p className="text-sm text-slate-500">
//               A shared 20x20 board with live ownership updates.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <span
//               className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                 isConnected
//                   ? "bg-emerald-50 text-emerald-700"
//                   : "bg-amber-50 text-amber-700"
//               }`}
//             >
//               {isConnected ? "Live" : "Reconnecting..."}
//             </span>

//             {currentUser ? (
//               <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
//                 <span
//                   className="h-3 w-3 rounded-full"
//                   style={{ backgroundColor: currentUser.color }}
//                 />
//                 {currentUser.username}
//               </div>
//             ) : null}

//             {currentUser ? (
//               <div
//                 className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                   cooldownRemainingMs > 0
//                     ? "bg-amber-50 text-amber-700"
//                     : "bg-indigo-50 text-indigo-700"
//                 }`}
//               >
//                 {cooldownRemainingMs > 0
//                   ? `Cooldown ${cooldownRemainingSeconds}s`
//                   : "Ready to capture"}
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//         {captureError ? (
//           <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {captureError}
//           </div>
//         ) : null}

//         <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
//           <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
//             <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//               <h2 className="text-lg font-semibold text-slate-900">
//                 Battle Grid
//               </h2>
//               {stats ? (
//                 <div className="w-full sm:w-64">
//                   <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
//                     <span>Claimed</span>
//                     <span>{stats.claimPercentage}%</span>
//                   </div>
//                   <div className="h-2 overflow-hidden rounded-full bg-slate-100">
//                     <div
//                       className="h-full rounded-full bg-indigo-500 transition-all duration-500"
//                       style={{ width: `${stats.claimPercentage}%` }}
//                     />
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//             <Grid
//               cells={cells}
//               onCapture={captureCell}
//               currentUser={currentUser}
//               pendingCell={pendingCell}
//               recentCaptureIndex={recentCaptureIndex}
//             />
//           </section>

//           <aside className="space-y-6">
//             <OnlineUsers
//               count={onlineUsers.count}
//               users={onlineUsers.users}
//               now={now}
//             />
//             <StatsPanel
//               stats={stats}
//               currentRank={currentRank}
//               cooldownRemainingMs={cooldownRemainingMs}
//               onlineCount={onlineUsers.count}
//             />
//             <Leaderboard entries={leaderboard} />
//             <ActivityFeed activities={activities} />
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// }






"use client";

import { useGridApp } from "@/hooks/useGridApp";
import ActivityFeed from "./ActivityFeed";
import Grid from "./Grid";
import Leaderboard from "./Leaderboard";
import LoadingSpinner from "./LoadingSpinner";
import OnlineUsers from "./OnlineUsers";
import StatsPanel from "./StatsPanel";
import UsernameModal from "./UsernameModal";

export default function Dashboard() {
  const {
    cells,
    stats,
    leaderboard,
    activities,
    onlineUsers,
    currentUser,
    isLoading,
    isConnected,
    joinError,
    captureError,
    pendingCell,
    recentCaptureIndex,
    cooldownRemainingMs,
    now,
    joinGame,
    captureCell,
  } = useGridApp();

  const currentRank = currentUser
    ? leaderboard.findIndex((entry) =>
        entry.ownerId
          ? entry.ownerId === currentUser.socketId
          : entry.ownerName === currentUser.username &&
            entry.color === currentUser.color
      ) + 1
    : 0;
  const cooldownRemainingSeconds = Math.ceil(cooldownRemainingMs / 1000);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      {!currentUser ? (
        <UsernameModal
          onJoin={joinGame}
          error={joinError}
          isConnected={isConnected}
        />
      ) : null}

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0f1117]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/20 border border-indigo-500/30">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#6366f1"/>
                <rect x="8" y="1" width="5" height="5" rx="1" fill="#6366f1" opacity="0.5"/>
                <rect x="1" y="8" width="5" height="5" rx="1" fill="#6366f1" opacity="0.5"/>
                <rect x="8" y="8" width="5" height="5" rx="1" fill="#6366f1" opacity="0.3"/>
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white leading-none">Grid Conquest</h1>
              <p className="text-xs text-white/30 mt-0.5">20 × 20 shared board</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Connection status */}
            <div className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium border ${
              isConnected
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              {isConnected ? "Live" : "Reconnecting"}
            </div>

            {/* Cooldown badge */}
            {currentUser ? (
              <div className={`rounded-md px-2.5 py-1.5 text-xs font-medium border ${
                cooldownRemainingMs > 0
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
              }`}>
                {cooldownRemainingMs > 0
                  ? `⏳ ${cooldownRemainingSeconds}s cooldown`
                  : "✦ Ready"}
              </div>
            ) : null}

            {/* User pill */}
            {currentUser ? (
              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
                <span
                  className="h-2 w-2 rounded-full ring-1 ring-white/20"
                  style={{ backgroundColor: currentUser.color }}
                />
                {currentUser.username}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Error banner */}
      {captureError ? (
        <div className="border-b border-red-500/20 bg-red-500/10 px-6 py-2.5 text-center text-xs font-medium text-red-400">
          {captureError}
        </div>
      ) : null}

      {/* Main layout */}
      <main className="mx-auto max-w-[1400px] px-6 py-6">
        <div className="grid gap-5 xl:grid-cols-[1fr_300px]">

          {/* Left: Grid */}
          <div className="rounded-xl border border-white/[0.08] bg-[#161b27] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-white">Battle Grid</h2>
                {stats ? (
                  <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] font-mono text-white/40">
                    {stats.claimedCells}/{stats.totalCells}
                  </span>
                ) : null}
              </div>
              {stats ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                      style={{ width: `${stats.claimPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-white/40">{stats.claimPercentage}%</span>
                </div>
              ) : null}
            </div>
            <div className="p-4">
              <Grid
                cells={cells}
                onCapture={captureCell}
                currentUser={currentUser}
                pendingCell={pendingCell}
                recentCaptureIndex={recentCaptureIndex}
              />
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="flex flex-col gap-4">
            <OnlineUsers
              count={onlineUsers.count}
              users={onlineUsers.users}
              now={now}
            />
            <StatsPanel
              stats={stats}
              currentRank={currentRank}
              cooldownRemainingMs={cooldownRemainingMs}
              onlineCount={onlineUsers.count}
            />
            <Leaderboard entries={leaderboard} />
            <ActivityFeed activities={activities} />
          </aside>
        </div>
      </main>
    </div>
  );
}