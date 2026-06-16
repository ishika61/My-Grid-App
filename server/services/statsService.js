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
        _id: {
          ownerId: { $ifNull: ["$ownerId", "$ownerName"] },
          ownerName: "$ownerName",
          color: "$color",
        },
        color: { $first: "$color" },
        ownerName: { $first: "$ownerName" },
        ownerId: { $first: "$ownerId" },
        capturedCells: { $sum: 1 },
      },
    },
    {
      $sort: { capturedCells: -1, ownerName: 1 },
    },
    {
      $limit: limit,
    },
    {
      $project: {
        _id: 0,
        ownerName: 1,
        ownerId: 1,
        color: 1,
        capturedCells: 1,
      },
    },
  ]);

  return leaderboard.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
};

const getGridStats = async () => {
  const [claimedCount, uniqueOwners, capturesLastMinute, leaderboard] =
    await Promise.all([
      Cell.countDocuments({
        ownerName: { $ne: null },
      }),
      Cell.distinct("ownerName", {
        ownerName: { $ne: null },
      }),
      Activity.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 60 * 1000) },
      }),
      getLeaderboard(1),
    ]);

  return {
    totalCells: TOTAL_CELLS,
    claimedCells: claimedCount,
    unclaimedCells: TOTAL_CELLS - claimedCount,
    uniqueOwners: uniqueOwners.length,
    claimPercentage: Number(((claimedCount / TOTAL_CELLS) * 100).toFixed(1)),
    capturesPerMinute: capturesLastMinute,
    mostActivePlayer: leaderboard[0] || null,
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
