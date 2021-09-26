const mongoose = require("mongoose");
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

categoryController.getRecipeByCategory = async (req, res, next) => {
  try {
    const name = req.params.name.toLowerCase();
    const category = await Category.findOne({ name });
    let recipes = await Recipe.find({
      categoryId: category._id,
    });

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

module.exports = categoryController;
