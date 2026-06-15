const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["capture"],
      default: "capture",
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
    },
    cellIndex: {
      type: Number,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

activitySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Activity", activitySchema);
