const Cell = require("../models/Cell");
const Activity = require("../models/Activity");
const ApiError = require("../utils/ApiError");
const { TOTAL_CELLS } = require("../config/constants");

const getGridState = async () => {
  const cells = await Cell.find()
    .sort({ index: 1 })
    .select("index row col ownerName ownerId color capturedAt")
    .lean();

  return cells;
};

const captureCell = async ({ cellIndex, ownerName, ownerId, color }) => {
  if (
    typeof cellIndex !== "number" ||
    cellIndex < 0 ||
    cellIndex >= TOTAL_CELLS
  ) {
    throw new ApiError(400, "Invalid cell index");
  }

  if (!ownerName || !ownerName.trim()) {
    throw new ApiError(400, "Owner name is required");
  }

  if (!ownerId) {
    throw new ApiError(400, "Owner id is required");
  }

  if (!color) {
    throw new ApiError(400, "Color is required");
  }

  const trimmedOwner = ownerName.trim();

  const updatedCell = await Cell.findOneAndUpdate(
    {
      index: cellIndex,
      ownerName: null,
    },
    {
      $set: {
        ownerName: trimmedOwner,
        ownerId,
        color,
        capturedAt: new Date(),
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!updatedCell) {
    const existingCell = await Cell.findOne({ index: cellIndex }).lean();

    if (!existingCell) {
      throw new ApiError(404, "Cell not found");
    }

    return {
      success: false,
      cell: existingCell,
      message: "Cell is already captured",
    };
  }

  const activity = await Activity.create({
    type: "capture",
    ownerName: trimmedOwner,
    ownerId,
    color,
    cellIndex: updatedCell.index,
    row: updatedCell.row,
    col: updatedCell.col,
  });

  return {
    success: true,
    cell: updatedCell,
    activity,
  };
};

module.exports = {
  getGridState,
  captureCell,
};
