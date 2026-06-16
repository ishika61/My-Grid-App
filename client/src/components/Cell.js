// "use client";

// export default function Cell({
//   cell,
//   onCapture,
//   currentUser,
//   isPending,
//   isRecentCapture,
// }) {
//   const isOwned = Boolean(cell?.ownerName);
//   const isMine =
//     currentUser &&
//     (cell?.ownerId
//       ? cell.ownerId === currentUser.socketId
//       : cell?.ownerName === currentUser.username &&
//         cell?.color === currentUser.color);

//   const handleClick = () => {
//     if (!isOwned) {
//       onCapture(cell.index);
//     }
//   };

//   return (
//     <button
//       type="button"
//       data-cell-button="true"
//       onClick={handleClick}
//       disabled={isOwned || isPending}
//       title={
//         isOwned
//           ? `Owned by ${cell.ownerName}`
//           : `Capture cell (${cell.row}, ${cell.col})`
//       }
//       className={[
//         "aspect-square rounded-[3px] border transition-all duration-200",
//         isOwned
//           ? "border-black/10 shadow-inner"
//           : "border-slate-200 bg-white hover:scale-105 hover:border-indigo-300 hover:bg-indigo-50",
//         isPending ? "animate-pulse ring-2 ring-indigo-300" : "",
//         isRecentCapture ? "animate-[capture_0.6s_ease-out]" : "",
//         isMine ? "ring-2 ring-white/90" : "",
//         !isOwned && !isPending
//           ? "cursor-pointer hover:brightness-105"
//           : "cursor-default",
//       ]
//         .filter(Boolean)
//         .join(" ")}
//       style={
//         isOwned
//           ? {
//               backgroundColor: cell.color,
//             }
//           : undefined
//       }
//     />
//   );
// }



"use client";

export default function Cell({
  cell,
  onCapture,
  currentUser,
  isPending,
  isRecentCapture,
}) {
  const isOwned = Boolean(cell?.ownerName);
  const isMine =
    currentUser &&
    (cell?.ownerId
      ? cell.ownerId === currentUser.socketId
      : cell?.ownerName === currentUser.username &&
        cell?.color === currentUser.color);

  const handleClick = () => {
    if (!isOwned) {
      onCapture(cell.index);
    }
  };

  // Get initials for owned cells (show at larger zoom or on hover)
  const initials = isOwned
    ? cell.ownerName.slice(0, 2).toUpperCase()
    : null;

  return (
    <button
      type="button"
      data-cell-button="true"
      onClick={handleClick}
      disabled={isOwned || isPending}
      title={
        isOwned
          ? `${cell.ownerName} (${cell.row}, ${cell.col})`
          : `Capture (${cell.row}, ${cell.col})`
      }
      className={[
        "aspect-square rounded-[2px] border transition-all duration-150 relative group",
        isOwned
          ? "border-black/20 shadow-inner"
          : "border-white/[0.06] bg-white/[0.03] hover:scale-110 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:z-10",
        isPending ? "animate-pulse ring-1 ring-indigo-400 ring-offset-0" : "",
        isRecentCapture ? "animate-[capture_0.5s_ease-out]" : "",
        isMine ? "ring-1 ring-white/60 ring-offset-[1px] ring-offset-[#161b27]" : "",
        !isOwned && !isPending
          ? "cursor-pointer"
          : "cursor-default",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        isOwned
          ? { backgroundColor: cell.color }
          : undefined
      }
    >
      {/* Initials shown on hover for owned cells */}
      {isOwned && initials ? (
        <span
          className="absolute inset-0 flex items-center justify-center text-[6px] font-bold text-white/0 group-hover:text-white/80 transition-colors duration-150 leading-none select-none"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
        >
          {initials}
        </span>
      ) : null}

      {/* My cell indicator dot */}
      {isMine ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-1 w-1 rounded-full bg-white/70" />
        </span>
      ) : null}
    </button>
  );
}