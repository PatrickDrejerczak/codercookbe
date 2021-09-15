const express = require("express");
const router = express.Router();
const unitController = require("../controller/unit.controller");

// Create a new unit
router.post("/", unitController.createUnit);

module.exports = router;
