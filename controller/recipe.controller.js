const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
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
  try {
    let inputArr = req.body.inputArr;
    inputArr = inputArr.map((input) => mongoose.Types.ObjectId(input));
    const recipes = await Recipe.find().lean();
    const recipeArr = recipes.map((recipe) =>
      recipe.ingredients.map((r) => r.ingredient)
    );
    const result = recipeArr.filter((recipe) => {
      for (let i = 0; i < recipe.length; i++) {
        inputArr.includes(recipe[i]);
        console.log(recipe[i]);
        return true;
      }
    });
    // const result = await Recipe.find({
    //   ingredients: { $elemMatch: { ingredient: "614357dbeb773818af470c43" } },
    // });

    console.log(result);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      result,
      null,
      "Get match successfully."
    );
  } catch (err) {
    next(err);
  }
};

recipeController.getSingleRecipe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id).populate({
      path: "ingredients",
      populate: { path: "ingredient" },
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
  let {
    name,
    categoryId,
    ingredients,
    description,
    urlToImage,
    isFeatured,
    rating,
    cookingInstruction,
  } = req.body;
  const userId = req.userId;

  try {
    let recipes = await Recipe.create({
      name,
      userId,
      categoryId,
      ingredients,
      description,
      urlToImage,
      isFeatured,
      rating,
      cookingInstruction,
    });
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

recipeController.getRecipeByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const recipes = await Recipe.find({ userId: userId });
    console.log(recipes);
    console.log(userId);

    if (!recipes) return next(new Error("401 - Recipes not found."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipes },
      null,
      "Get recipes by category successfully."
    );
  } catch (error) {
    next(error);
  }
};

recipeController.updateRecipe = catchAsync(async (req, res, next) => {
  const recipeId = req.params.recipeId;
  const content = req.body;

  const recipe = await Recipe.findOneAndUpdate({ _id: recipeId }, content, {
    new: true,
  });
  if (!recipe)
    return next(
      new AppError(
        400,
        "Recipe not found or User not authorized",
        "Update Recipe Error"
      )
    );
  return sendResponse(res, 200, true, recipe, null, "Update successful");
});

recipeController.deleteRecipe = catchAsync(async (req, res, next) => {
  const recipeId = req.params.recipeId;

  const recipe = await Recipe.findOneAndDelete({
    _id: recipeId,
  });
  if (!recipe)
    return next(
      new AppError(
        400,
        "Recipe not found or User not authorized",
        "Delete Recipe Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete successful");
});

module.exports = recipeController;
