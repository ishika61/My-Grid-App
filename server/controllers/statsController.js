const asyncHandler = require("../utils/asyncHandler");
const statsService = require("../services/statsService");
const onlineUsersService = require("../services/onlineUsersService");

const getLeaderboard = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
  const leaderboard = await statsService.getLeaderboard(limit);

  res.status(200).json({
    success: true,
    leaderboard,
  });
});

const getGridStats = asyncHandler(async (req, res) => {
  const stats = await statsService.getGridStats();

  res.status(200).json({
    success: true,
    stats,
  });
});

const getRecentActivity = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
  const activities = await statsService.getRecentActivity(limit);

  res.status(200).json({
    success: true,
    activities,
  });
});

const getOnlineUsers = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    count: onlineUsersService.getCount(),
    users: onlineUsersService.getPublicList(),
  });
});

module.exports = {
  getLeaderboard,
  getGridStats,
  getRecentActivity,
  getOnlineUsers,
};
