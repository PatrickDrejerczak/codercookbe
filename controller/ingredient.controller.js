const utilsHelper = require("../helpers/utils.helper");
const Ingredient = require("../models/Ingredients");
const ingredientController = {};

ingredientController.createIngredient = async (req, res, next) => {
  try {
    let { name, type } = req.body;

    let ingredients = await Ingredient.findOne({ name });
    if (!ingredients) return;
    ingredients = await Ingredient.create({
      name,
      type,
    });

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

module.exports = ingredientController;
