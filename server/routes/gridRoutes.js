const express = require("express");
const gridController = require("../controllers/gridController");

const router = express.Router();

router.get("/", gridController.getGridState);

module.exports = router;
