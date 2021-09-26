const express = require("express");
const categoryController = require("../controller/category.controller");
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
router.get("/match/:id", recipeController.match);

// Get recipes by category
router.get("/category/:name", categoryController.getRecipeByCategory);

module.exports = router;
