const Cell = require("../models/Cell");
const { GRID_SIZE, TOTAL_CELLS } = require("../config/constants");

const initializeGrid = async () => {
  const existingCount = await Cell.countDocuments();

  if (existingCount >= TOTAL_CELLS) {
    console.log(`Grid already initialized (${existingCount} cells)`);
    return;
  }

  const operations = [];

  for (let index = 0; index < TOTAL_CELLS; index += 1) {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    operations.push({
      updateOne: {
        filter: { index },
        update: {
          $setOnInsert: {
            index,
            row,
            col,
            ownerName: null,
            ownerId: null,
            color: null,
            capturedAt: null,
          },
        },
        upsert: true,
      },
    });
  }

  const result = await Cell.bulkWrite(operations, { ordered: false });
  const insertedCount = result.upsertedCount ?? 0;

  console.log(
    `Grid initialized: ${insertedCount} new cells created (${await Cell.countDocuments()} total)`
  );
};

module.exports = initializeGrid;
