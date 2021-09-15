const utilsHelper = require("../helpers/utils.helper");
const Category = require("../models/Categories");
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

categoryController.createCategory = async (req, res, next) => {
  try {
    let { name } = req.body;

    let categories = await Category.create({
      name,
    });
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
