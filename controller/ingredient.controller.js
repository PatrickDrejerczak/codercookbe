const utilsHelper = require("../helpers/utils.helper");
const Ingredient = require("../models/Ingredients");
const ingredientController = {};

ingredientController.createIngredient = async (req, res, next) => {
  try {
    let { name, type, unit } = req.body;

    let ingredients = await Ingredient.findOne({ name });
    if (!ingredients) {
      ingredients = await Ingredient.create({
        name,
        type,
        unit,
      });
    } else {
      return next(new Error("401 - ingredient already exist."));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { ingredients },
      null,
      "Created new unit successfully."
    );
  } catch (error) {
    next(error);
  }
};

ingredientController.getAllIngredients = async (req, res, next) => {
  try {
    let ingredients = await Ingredient.find({});
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { ingredients },
      null,
      "Get all ingredients successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = ingredientController;
