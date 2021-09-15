const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

// Get all recipes in the specific category
router.get("/:category", categoryController.getSingleCategory);

// Create a new category
router.post("/", categoryController.createCategory);

module.exports = router;
