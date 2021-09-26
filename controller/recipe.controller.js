const utilsHelper = require("../helpers/utils.helper");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipes");
const recipeController = {};

recipeController.getAllRecipes = async (req, res, next) => {
  try {
    let recipes = await Recipe.find({});
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipes },
      null,
      "Get all recipes successfully."
    );
  } catch (error) {
    next(error);
  }
};

recipeController.match = async (req, res, next) => {
  console.log("result", req.params);

  const result = await Recipe.find({
    ingredients: { $elemMatch: { ingredient: "614357dbeb773818af470c43" } },
  });

  console.log(result);

  utilsHelper.sendResponse(
    res,
    200,
    true,
    result,
    null,
    "Get match successfully."
  );
};

recipeController.getSingleRecipe = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const recipe = await Recipe.findOne({
      recipe: mongoose.Types.ObjectId(id),
    });
    if (!recipe) return next(new Error("401 - Recipe not found."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipe },
      null,
      "Get single recipe successfully."
    );
  } catch (error) {
    next(error);
  }
};

recipeController.createRecipe = async (req, res, next) => {
  // to create recipe
  let { name, categoryId, ingredients, userId, description } = req.body;

  if (
    !name ||
    !userId ||
    !categoryId ||
    !(ingredients.length > 0) ||
    !description
  ) {
    return next(new Error("401 - Input missing."));
  }

  try {
    let recipes = await Recipe.create({
      name,
      userId,
      categoryId,
      ingredients,
      description,
    });
    console.log(ingredients);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipes },
      null,
      "Created new recipe successfully."
    );
  } catch (error) {
    next(error);
  }
};

recipeController.updateRecipe = async (req, res, next) => {
  try {
    let recipeID = req.params.id;
    let { isSending, name, description } = req.body;
    let recipe = await Recipe.findByIdAndUpdate(
      recipeID,
      {
        $push: { ingredients: { $each: isSending } },
        name: name,
        description: description,
      },
      { new: true }
    );

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipe },
      null,
      "Updated successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = recipeController;
