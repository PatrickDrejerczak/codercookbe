var express = require("express");
var router = express.Router();

const recipeApi = require("./recipe.api");
router.use("/recipe", recipeApi);

const categoryApi = require("./category.api");
router.use("/category", categoryApi);

const authApi = require("./auth.api");
router.use("/auth", authApi);

const unitApi = require("./unit.api");
router.use("/unit", unitApi);

const ingredientApi = require("./ingredient.api");
router.use("/ingredient", ingredientApi);

module.exports = router;
