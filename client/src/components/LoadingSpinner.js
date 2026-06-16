// export default function LoadingSpinner({ label = "Loading grid..." }) {
//   return (
//     <div className="flex flex-col items-center justify-center gap-4 py-24">
//       <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
//       <p className="text-sm font-medium text-slate-500">{label}</p>
//     </div>
//   );
// }








export default function LoadingSpinner({ label = "Loading grid..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-500" />
      </div>
      <p className="text-xs font-medium text-white/30 tracking-wide">{label}</p>
    </div>
  );
}