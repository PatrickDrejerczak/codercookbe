const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
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

ingredientController.updateIngredient = catchAsync(async (req, res, next) => {
  const ingredientId = req.params.ingredientId;
  const content = req.body;

  const ingredient = await Ingredient.findOneAndUpdate(
    { _id: ingredientId },
    content,
    { new: true }
  );
  if (!ingredient)
    return next(
      new AppError(
        400,
        "Ingredient not found or User not authorized",
        "Update Ingredient Error"
      )
    );
  return sendResponse(res, 200, true, ingredient, null, "Update successful");
});

ingredientController.deleteIngredient = catchAsync(async (req, res, next) => {
  const ingredientId = req.params.ingredientId;

  const ingredient = await Ingredient.findOneAndDelete({
    _id: ingredientId,
  });
  if (!ingredient)
    return next(
      new AppError(
        400,
        "Ingredient not found or User not authorized",
        "Delete Ingredient Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete successful");
});

module.exports = ingredientController;
