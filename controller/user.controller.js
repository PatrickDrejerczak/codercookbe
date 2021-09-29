const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const utilsHelper = require("../helpers/utils.helper");
const User = require("../models/Users");
const userController = {};

userController.getCurrentUser = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  console.log(user);
  console.log(userId);
  // if (!user)
  //   return next(new AppError(400, "User not found", "Get Current User Error"));
  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get current user successful"
  );
});

userController.updateProfile = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const allows = ["name", "password", "avatarUrl"];
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError(404, "Account not found", "Update Profile Error"));
  }

  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });
  await user.save();
  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Update Profile successfully"
  );
});

userController.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findOneAndDelete({
    _id: userId,
  });
  if (!user)
    return next(
      new AppError(
        400,
        "User not found or User not authorized",
        "Delete User Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete successful");
});

userController.getAllUser = async (req, res, next) => {
  try {
    let user = await User.find({});
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Get all user successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
