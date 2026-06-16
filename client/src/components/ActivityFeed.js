// import EmptyState from "./EmptyState";

// const formatTime = (value) => {
//   if (!value) return "";

//   return new Intl.DateTimeFormat("en", {
//     hour: "numeric",
//     minute: "2-digit",
//     second: "2-digit",
//   }).format(new Date(value));
// };

// export default function ActivityFeed({ activities }) {
//   return (
//     <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
//       <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
//         Recent Activity
//       </h2>

//       {activities.length === 0 ? (
//         <EmptyState
//           title="No activity yet"
//           description="Captures will appear here in real time."
//         />
//       ) : (
//         <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
//           {activities.map((activity) => (
//             <li
//               key={activity._id || `${activity.cellIndex}-${activity.createdAt}`}
//               className="animate-[slideIn_0.25s_ease-out] flex items-start gap-3 rounded-lg bg-slate-50 px-3 py-2 transition hover:bg-white hover:shadow-sm"
//             >
//               <span
//                 className="mt-1 h-3 w-3 shrink-0 rounded-full"
//                 style={{ backgroundColor: activity.color }}
//               />
//               <div className="min-w-0 flex-1">
//                 <p className="text-sm text-slate-700">
//                   <span className="font-semibold">{activity.ownerName}</span>{" "}
//                   captured cell ({activity.row}, {activity.col})
//                 </p>
//                 <p className="text-xs text-slate-400">
//                   {formatTime(activity.createdAt)}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </section>
//   );
// }










import EmptyState from "./EmptyState";

const formatTime = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
};

export default function ActivityFeed({ activities }) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#161b27] overflow-hidden">
      <div className="border-b border-white/[0.06] px-4 py-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
          Activity
        </h2>
      </div>

      <div className="p-3">
        {activities.length === 0 ? (
          <EmptyState
            title="No activity yet"
            description="Captures will appear here live."
          />
        ) : (
          <ul className="max-h-56 space-y-1 overflow-y-auto pr-0.5 scrollbar-thin">
            {activities.map((activity) => (
              <li
                key={activity._id || `${activity.cellIndex}-${activity.createdAt}`}
                className="animate-[slideIn_0.2s_ease-out] flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition hover:bg-white/[0.03]"
              >
                <span
                  className="mt-0.5 h-2 w-2 shrink-0 rounded-full ring-1 ring-black/20"
                  style={{ backgroundColor: activity.color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-white/60 leading-snug">
                    <span className="font-semibold text-white/80">
                      {activity.ownerName}
                    </span>{" "}
                    <span className="text-white/30">captured</span>{" "}
                    <span className="font-mono text-[11px] text-white/40">
                      ({activity.row},{activity.col})
                    </span>
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-white/20">
                    {formatTime(activity.createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}