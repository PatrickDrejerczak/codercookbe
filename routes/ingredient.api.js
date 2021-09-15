const express = require("express");
const router = express.Router();
const ingredientController = require("../controller/ingredient.controller");

// Create a new ingredient
router.post("/", ingredientController.createIngredient);

module.exports = router;
