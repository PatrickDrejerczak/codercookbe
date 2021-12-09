const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const authController = {};

authController.register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    let user = await Users.findOne({ email });
    if (user) return next(new Error("401 - Email already exits"));
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await Users.create({
      name,
      email,
      password,
    });

    utilsHelper.sendResponse(
      res,
      200,
      true,
      user,
      null,
      "Register successfully"
    );
  } catch (err) {
    next(err);
  }
};

authController.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ email });
    if (!user) return next(new Error("401 - Email not exists"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("401 - Wrong password"));

    const accessToken = await user.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Login success"
    );
  } catch (error) {
    next(error);
  }
};

authController.loginWithFacebook = async (req, res, next) => {
  try {
    const { email, name } = req.user;
    let user = await Users.findOne({ email });
    if (!user) return;
    user = await Users.create({
      name,
      email,
    });

    const accessToken = await user.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Login success"
    );
  } catch (error) {
    next(error);
  }
};

authController.loginWithGoogle = async (req, res, next) => {
  try {
    const email = req.user.emails[0].value;
    let user = await Users.findOne({ email });
    if (!user)
      user = await Users.create({
        email,
      });

    const accessToken = await user.generateToken();
    return utilsHelpers.sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Login success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
