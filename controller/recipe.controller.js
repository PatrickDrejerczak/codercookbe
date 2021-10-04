const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const utilsHelper = require("../helpers/utils.helper");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipes");
const recipeController = {};
const User = require("../models/Users");

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
  //match at least 1 ingredient
  try {
    let inputArr = req.body.inputArr;

    const queryFormat = inputArr.map((id) => {
      return {
        "ingredients.ingredient": id,
      };
    });

    const result = await Recipe.find({
      $or: queryFormat,
    });

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

recipeController.addFavorite = catchAsync(async (req, res, next) => {
  const recipeId = req.params.recipeId;
  const userId = req.userId;
  console.log("userid", userId);
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      $push: { favorites: recipeId },
    },
    {
      new: true,
    }
  );

  if (!user)
    return next(
      new AppError(
        400,
        "User not found or User not authorized",
        "Add Favorite Error"
      )
    );
  return sendResponse(res, 200, true, user, null, "Update successful");
});

recipeController.searchRecipe = catchAsync(async (req, res, next) => {
  const search = req.query.search;
  if (search === "") {
    return sendResponse(res, 200, true, [], null, "Search successful");
  }
  const recipes = await Recipe.find({
    name: { $regex: new RegExp(search, "i") },
  });
  return sendResponse(res, 200, true, recipes, null, "Search successful");
});

module.exports = recipeController;
