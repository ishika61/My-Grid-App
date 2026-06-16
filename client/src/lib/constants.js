export const GRID_SIZE = 20;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
export const CAPTURE_COOLDOWN_MS = 3000;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const SOCKET_EVENTS = {
  USER_JOIN: "user:join",
  CELL_CAPTURE: "cell:capture",
  USER_JOINED: "user:joined",
  USER_JOIN_ERROR: "user:join:error",
  CELL_UPDATE: "cell:update",
  CELL_CAPTURE_RESULT: "cell:capture:result",
  ONLINE_UPDATE: "online:update",
  ACTIVITY_UPDATE: "activity:update",
  LEADERBOARD_UPDATE: "leaderboard:update",
  STATS_UPDATE: "stats:update",
};
