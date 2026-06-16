const SOCKET_EVENTS = require("../events");
const gridService = require("../../services/gridService");
const statsService = require("../../services/statsService");
const onlineUsersService = require("../../services/onlineUsersService");
const ApiError = require("../../utils/ApiError");
const { CAPTURE_COOLDOWN_MS } = require("../../config/constants");

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

    if (onlineUsersService.isCaptureInFlight(socket.id)) {
      socket.emit(SOCKET_EVENTS.CELL_CAPTURE_RESULT, {
        success: false,
        message: "Capture already in progress",
      });
      return;
    }

    const cooldown = onlineUsersService.getCooldown(socket.id);

    if (cooldown.isActive) {
      socket.emit(SOCKET_EVENTS.CELL_CAPTURE_RESULT, {
        success: false,
        cooldownUntil: cooldown.cooldownUntil,
        remainingMs: cooldown.remainingMs,
        message: "Capture cooldown is active",
      });
      return;
    }

    try {
      onlineUsersService.setCaptureInFlight(socket.id, true);

      const result = await gridService.captureCell({
        cellIndex: Number(cellIndex),
        ownerName: user.username,
        ownerId: socket.id,
        color: user.color,
      });

      if (result.success) {
        const cooldownUntil = onlineUsersService.markCapture(
          socket.id,
          CAPTURE_COOLDOWN_MS
        );
        onlineUsersService.setCaptureInFlight(socket.id, false);

        io.emit(SOCKET_EVENTS.CELL_UPDATE, { cell: result.cell });
        io.emit(SOCKET_EVENTS.ACTIVITY_UPDATE, { activity: result.activity });
        io.emit(SOCKET_EVENTS.ONLINE_UPDATE, {
          count: onlineUsersService.getCount(),
          users: onlineUsersService.getPublicList(),
        });

        socket.emit(SOCKET_EVENTS.CELL_CAPTURE_RESULT, {
          success: true,
          cell: result.cell,
          cooldownUntil,
        });

        await broadcastRealtimeUpdates(io);
        return;
      }

      onlineUsersService.setCaptureInFlight(socket.id, false);

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
    } finally {
      onlineUsersService.setCaptureInFlight(socket.id, false);
    }
  });
};

module.exports = {
  registerGridHandlers,
  broadcastRealtimeUpdates,
};
