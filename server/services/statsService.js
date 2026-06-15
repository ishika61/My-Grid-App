const Cell = require("../models/Cell");
const Activity = require("../models/Activity");
const { TOTAL_CELLS } = require("../config/constants");

const getLeaderboard = async (limit = 10) => {
  const leaderboard = await Cell.aggregate([
    {
      $match: {
        ownerName: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$ownerName",
        color: { $first: "$color" },
        capturedCells: { $sum: 1 },
      },
    },
    {
      $sort: { capturedCells: -1, _id: 1 },
    },
    {
      $limit: limit,
    },
    {
      $project: {
        _id: 0,
        ownerName: "$_id",
        color: 1,
        capturedCells: 1,
      },
    },
  ]);

  return leaderboard;
};

const getGridStats = async () => {
  const claimedCount = await Cell.countDocuments({
    ownerName: { $ne: null },
  });

  const uniqueOwners = await Cell.distinct("ownerName", {
    ownerName: { $ne: null },
  });

  return {
    totalCells: TOTAL_CELLS,
    claimedCells: claimedCount,
    unclaimedCells: TOTAL_CELLS - claimedCount,
    uniqueOwners: uniqueOwners.length,
    claimPercentage: Number(((claimedCount / TOTAL_CELLS) * 100).toFixed(1)),
  };
};

const getRecentActivity = async (limit = 20) => {
  const activities = await Activity.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("type ownerName color cellIndex row col createdAt")
    .lean();

  return activities;
};

module.exports = {
  getLeaderboard,
  getGridStats,
  getRecentActivity,
};
