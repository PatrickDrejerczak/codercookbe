const utilsHelper = require("../helpers/utils.helper");
const User = require("../models/Users");
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    let user = await User.create({
      email,
      password,
      name,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Created new user successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;