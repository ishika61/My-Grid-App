// export default function EmptyState({ title, description }) {
//   return (
//     <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
//       <p className="text-sm font-semibold text-slate-700">{title}</p>
//       {description ? (
//         <p className="mt-1 text-xs text-slate-500">{description}</p>
//       ) : null}
//     </div>
//   );
// }




export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] px-4 py-6 text-center">
      <p className="text-[12px] font-medium text-white/30">{title}</p>
      {description ? (
        <p className="mt-1 text-[11px] text-white/20">{description}</p>
      ) : null}
    </div>
  );
}