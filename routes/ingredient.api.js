const express = require("express");
const router = express.Router();
const ingredientController = require("../controller/ingredient.controller");

// Create a new ingredient
router.post("/", ingredientController.createIngredient);

// Get all ingredients
router.get("/", ingredientController.getAllIngredients);

// DELETE single ingredient
router.delete("/:ingredientId", ingredientController.deleteIngredient);

// PUT single ingredient
router.put("/:ingredientId", ingredientController.updateIngredient);

module.exports = router;
