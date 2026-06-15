const express = require("express");
const gridRoutes = require("./gridRoutes");
const statsRoutes = require("./statsRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

router.use("/grid", gridRoutes);
router.use("/stats", statsRoutes);

module.exports = router;
