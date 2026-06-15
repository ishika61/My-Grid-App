const SOCKET_EVENTS = require("../events");
const gridService = require("../../services/gridService");
const statsService = require("../../services/statsService");
const onlineUsersService = require("../../services/onlineUsersService");
const ApiError = require("../../utils/ApiError");

const broadcastRealtimeUpdates = async (io) => {
  const [leaderboard, stats] = await Promise.all([
    statsService.getLeaderboard(10),
    statsService.getGridStats(),
  ]);

  io.emit(SOCKET_EVENTS.LEADERBOARD_UPDATE, { leaderboard });
  io.emit(SOCKET_EVENTS.STATS_UPDATE, { stats });
};

const registerGridHandlers = (io, socket) => {
  socket.on(SOCKET_EVENTS.CELL_CAPTURE, async ({ cellIndex } = {}) => {
    const user = onlineUsersService.get(socket.id);

    if (!user) {
      socket.emit(SOCKET_EVENTS.CELL_CAPTURE_RESULT, {
        success: false,
        message: "You must join with a username before capturing cells",
      });
      return;
    }

    try {
      const result = await gridService.captureCell({
        cellIndex: Number(cellIndex),
        ownerName: user.username,
        color: user.color,
      });

      if (result.success) {
        io.emit(SOCKET_EVENTS.CELL_UPDATE, { cell: result.cell });
        io.emit(SOCKET_EVENTS.ACTIVITY_UPDATE, { activity: result.activity });

        socket.emit(SOCKET_EVENTS.CELL_CAPTURE_RESULT, {
          success: true,
          cell: result.cell,
        });

        await broadcastRealtimeUpdates(io);
        return;
      }

      socket.emit(SOCKET_EVENTS.CELL_CAPTURE_RESULT, {
        success: false,
        cell: result.cell,
        message: result.message,
      });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Failed to capture cell";

      socket.emit(SOCKET_EVENTS.CELL_CAPTURE_RESULT, {
        success: false,
        message,
      });
    }
  });
};

module.exports = {
  registerGridHandlers,
  broadcastRealtimeUpdates,
};
