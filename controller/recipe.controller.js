const utilsHelper = require("../helpers/utils.helper");
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
  //the user will send an array of ingredient ID <- from a dropdown list
  //create condition
  // requirement2 === ingredientInTheRecipe)

  // ["12312312","1231231","12837129ujasd"]

  // Recipe= {
  // ingredients:[
  //   {ingredient: ObjectId,
  //   ...},
  //   {ingredient: ObjectId,
  //     ...},
  //     {ingredient: ObjectId,
  //       ...}
  // ]
  // }

  console.log("result", req.params);

  // v1 match EXACTLY ALL condition in req.params

  //find all the recipe that have same with the array

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
    "Get single recipe successfully."
  );
};

recipeController.getSingleRecipe = async (req, res, next) => {
  try {
    const { id } = req.body;
    let recipes = await Recipe.findOne({ id });
    if (!recipes) return next(new Error("401 - Recipe not found."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipes },
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
    let { isSending } = req.body;
    let recipe = await Recipe.findByIdAndUpdate(recipeID, {
      isSending,
    });
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
