const express = require("express");
const router = express.Router();
const recipeController = require("../controller/recipe.controller");

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Get specific recipe
router.get("/:id", recipeController.getSingleRecipe);

// Create a new recipe
router.post("/", recipeController.createRecipe);

// Update a recipe
router.put("/:id", recipeController.updateRecipe);

// Delete a recipe
// router.delete("/:id", recipeController.deleteRecipe);

// What´s in your fridge? function
// => Match ingredient
// router.get("/match", recipeController.match);

module.exports = router;
