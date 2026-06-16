// export default function OnlineUsers({ count, users, now }) {
//   return (
//     <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
//           Online Now
//         </h2>
//         <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
//           <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
//           {count}
//         </span>
//       </div>

//       {users.length === 0 ? (
//         <p className="text-sm text-slate-500">No players online</p>
//       ) : (
//         <div className="flex flex-wrap gap-2">
//           {users.map((user) => (
//             <span
//               key={user.socketId || `${user.username}-${user.color}`}
//               className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-white hover:shadow-sm"
//               title={
//                 user.cooldownUntil && new Date(user.cooldownUntil).getTime() > now
//                   ? "On capture cooldown"
//                   : "Ready"
//               }
//             >
//               <span
//                 className={[
//                   "h-2.5 w-2.5 rounded-full",
//                   user.cooldownUntil &&
//                   new Date(user.cooldownUntil).getTime() > now
//                     ? "animate-pulse"
//                     : "",
//                 ]
//                   .filter(Boolean)
//                   .join(" ")}
//                 style={{ backgroundColor: user.color }}
//               />
//               {user.username}
//             </span>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }




export default function OnlineUsers({ count, users, now }) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#161b27] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
          Online
        </h2>
        <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-[11px] font-semibold text-emerald-400 font-mono">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {count}
        </span>
      </div>

      <div className="p-3">
        {users.length === 0 ? (
          <p className="text-xs text-white/25 py-2 text-center">No players online</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {users.map((user) => {
              const onCooldown =
                user.cooldownUntil && new Date(user.cooldownUntil).getTime() > now;
              return (
                <span
                  key={user.socketId || `${user.username}-${user.color}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/60 transition hover:border-white/15 hover:bg-white/[0.07]"
                  title={onCooldown ? "On cooldown" : "Ready"}
                >
                  <span
                    className={`h-2 w-2 rounded-full shrink-0 ${onCooldown ? "animate-pulse opacity-50" : ""}`}
                    style={{ backgroundColor: user.color }}
                  />
                  {user.username}
                  {onCooldown ? (
                    <span className="text-amber-500/70 text-[10px]">⏳</span>
                  ) : null}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}








