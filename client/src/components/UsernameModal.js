// "use client";

// import { useState } from "react";

// export default function UsernameModal({ onJoin, error, isConnected }) {
//   const [username, setUsername] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onJoin(username);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
//       <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-2xl">
//         <div className="mb-6">
//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
//             Grid Conquest
//           </p>
//           <h2 className="mt-2 text-2xl font-bold text-slate-900">
//             Enter your username
//           </h2>
//           <p className="mt-2 text-sm text-slate-500">
//             Claim cells on a shared 20x20 grid. A unique color will be assigned
//             to you when you join.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="username"
//               className="mb-2 block text-sm font-medium text-slate-700"
//             >
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(event) => setUsername(event.target.value)}
//               placeholder="e.g. Nova"
//               maxLength={20}
//               autoFocus
//               className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//             />
//           </div>

//           {error ? (
//             <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
//               {error}
//             </p>
//           ) : null}

//           {!isConnected ? (
//             <p className="text-sm text-amber-600">Connecting to server...</p>
//           ) : null}

//           <button
//             type="submit"
//             disabled={!isConnected || username.trim().length < 2}
//             className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
//           >
//             Join Grid
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }






"use client";

import { useState } from "react";

export default function UsernameModal({ onJoin, error, isConnected }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onJoin(username);
  };

  const isReady = isConnected && username.trim().length >= 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md">
      {/* Subtle glow behind modal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm rounded-2xl border border-white/[0.10] bg-[#161b27] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

        <div className="p-7">
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="#6366f1"/>
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="#6366f1" opacity="0.5"/>
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="#6366f1" opacity="0.5"/>
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="#6366f1" opacity="0.3"/>
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-400">
                Grid Conquest
              </span>
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">
              Choose your name
            </h2>
            <p className="mt-2 text-sm text-white/40 leading-relaxed">
              Claim cells on a shared 20×20 grid. You'll receive a unique color when you join.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-medium text-white/40 uppercase tracking-wider"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="e.g. Nova"
                maxLength={20}
                autoFocus
                className="w-full rounded-lg border border-white/[0.10] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 focus:bg-white/[0.06]"
              />
            </div>

            {error ? (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5">
                <span className="text-red-400 text-xs">⚠</span>
                <p className="text-xs text-red-400">{error}</p>
              </div>
            ) : null}

            {!isConnected ? (
              <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs text-amber-400">Connecting to server…</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!isReady}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/[0.07] disabled:text-white/25 mt-1"
            >
              {isConnected ? "Join Game →" : "Connecting…"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
