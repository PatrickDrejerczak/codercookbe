const utilsHelper = require("../helpers/utils.helper");
const User = require("../models/Users");
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    let userEmail = await User.findOne({ email });
    if (!userEmail) {
      user = await User.create({
        name,
        email,
        password,
      });
    } else {
      return next(new Error("401 - Email already in use."));
    }
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
