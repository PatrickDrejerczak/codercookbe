const mongoose = require("mongoose");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const utilsHelper = require("../helpers/utils.helper");
const Category = require("../models/Categories");
const Recipe = require("../models/Recipes");

const categoryController = {};

categoryController.getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.body;
    let categories = await Category.findOne({ id });
    if (!categories) return next(new Error("401 - Category not found."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { categories },
      null,
      "Get single category successfully."
    );
  } catch (error) {
    next(error);
  }
};

categoryController.getAllCategories = async (req, res, next) => {
  try {
    let categories = await Category.find({});
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { categories },
      null,
      "Get all categories successfully."
    );
  } catch (error) {
    next(error);
  }
};

categoryController.getRecipeByCategory = async (req, res, next) => {
  try {
    let { limit } = req.query;
    limit = parseInt(limit) || 4;
    const name = req.params.name.toLowerCase();
    const category = await Category.findOne({ name });

    let recipes = await Recipe.find({
      categoryId: category._id,
    }).limit(limit);

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

categoryController.createCategory = async (req, res, next) => {
  try {
    let { name } = req.body;

    let category = await Category.findOne({ name });
    if (!category) {
      categories = await Category.create({
        name,
      });
    } else {
      return next(new Error("401 - Category already exist."));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { categories },
      null,
      "Created new category successfully."
    );
  } catch (error) {
    next(error);
  }
};

categoryController.deleteCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const category = await Category.findOneAndDelete({
    _id: categoryId,
  });
  if (!category)
    return next(
      new AppError(
        400,
        "Category not found or User not authorized",
        "Delete Category Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete successful");
});

categoryController.updateCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const content = req.body;
  console.log(content);

  const category = await Category.findOneAndUpdate(
    { _id: categoryId },
    content,
    { new: true }
  );
  if (!category)
    return next(
      new AppError(
        400,
        "Category not found or User not authorized",
        "Update Category Error"
      )
    );
  return sendResponse(res, 200, true, category, null, "Update successful");
});

module.exports = categoryController;
