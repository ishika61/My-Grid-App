const asyncHandler = require("../utils/asyncHandler");
const gridService = require("../services/gridService");

const getGridState = asyncHandler(async (req, res) => {
  const cells = await gridService.getGridState();

  res.status(200).json({
    success: true,
    count: cells.length,
    cells,
  });
});

module.exports = {
  getGridState,
};
