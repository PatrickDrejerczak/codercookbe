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
  const user = await User.findById(userId).populate("favorites");
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
  const { name, email } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: userId, name, email },
    {
      new: true,
    }
  );
  if (!user)
    return next(
      new AppError(
        400,
        "User not found or User not authorized",
        "Update User Error"
      )
    );
  return sendResponse(res, 200, true, user, null, "Update successful");
});

userController.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);

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

userController.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("testbackend", userId);
    let user = await User.findOne({ _id: userId });
    if (!user) return next(new Error("401 - User not found."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Get user by ID successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
