const mongoose = require("mongoose");
const { TOTAL_CELLS } = require("../config/constants");

const cellSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
      unique: true,
      min: 0,
      max: TOTAL_CELLS - 1,
    },
    row: {
      type: Number,
      required: true,
      min: 0,
    },
    col: {
      type: Number,
      required: true,
      min: 0,
    },
    ownerName: {
      type: String,
      default: null,
    },
    ownerId: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    capturedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

cellSchema.index({ ownerName: 1 });
cellSchema.index({ ownerId: 1 });
cellSchema.index({ row: 1, col: 1 });

module.exports = mongoose.model("Cell", cellSchema);
