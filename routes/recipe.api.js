const express = require("express");
const categoryController = require("../controller/category.controller");
const router = express.Router();
const recipeController = require("../controller/recipe.controller");
const authMiddleware = require("../middlewares/authentication");

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Delete a recipe
// router.delete("/:id", recipeController.deleteRecipe);

// What´s in your fridge? function
// => Match ingredient
router.get("/match", recipeController.match);

// Get specific recipe
router.get("/:id", recipeController.getSingleRecipe);

// Create a new recipe
router.post("/", authMiddleware.loginRequired, recipeController.createRecipe);

// Get recipes by category
router.get("/category/:name", categoryController.getRecipeByCategory);

// Get recipes by user ID
router.get("/user/:userId", recipeController.getRecipeByUserId);

// DELETE single category
router.delete("/:recipeId", recipeController.deleteRecipe);

// PUT single category
router.put("/:recipeId", recipeController.updateRecipe);

module.exports = router;
