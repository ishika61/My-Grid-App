const SOCKET_EVENTS = {
  // Client → Server
  USER_JOIN: "user:join",
  CELL_CAPTURE: "cell:capture",

  // Server → Client
  USER_JOINED: "user:joined",
  USER_JOIN_ERROR: "user:join:error",
  CELL_UPDATE: "cell:update",
  CELL_CAPTURE_RESULT: "cell:capture:result",
  ONLINE_UPDATE: "online:update",
  ACTIVITY_UPDATE: "activity:update",
  LEADERBOARD_UPDATE: "leaderboard:update",
  STATS_UPDATE: "stats:update",
};

module.exports = SOCKET_EVENTS;
