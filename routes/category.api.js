const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");
const authMiddleware = require("../middlewares/authentication");

// Get all recipes in the specific category
router.get("/:category", categoryController.getSingleCategory);

// Create a new category
router.post("/", categoryController.createCategory);

// GET all categories
router.get("/", categoryController.getAllCategories);

// DELETE single category
router.delete("/:categoryId", categoryController.deleteCategory);

// PUT single category
router.put("/:categoryId", categoryController.updateCategory);

module.exports = router;
