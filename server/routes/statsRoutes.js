const express = require("express");
const statsController = require("../controllers/statsController");

const router = express.Router();

router.get("/leaderboard", statsController.getLeaderboard);
router.get("/stats", statsController.getGridStats);
router.get("/activity", statsController.getRecentActivity);
router.get("/online", statsController.getOnlineUsers);

module.exports = router;
