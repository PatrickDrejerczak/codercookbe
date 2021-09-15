const express = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const router = express.Router();
const passport = require("passport");

/**
 * @route POST auth/register
 * @description User can register with email and password
 * @access Public
 */
router.post("/register", userController.createUser);

/**
 * @route POST auth/login
 * @description User can login with email and password
 * @access Public
 */
router.post("/login", authController.loginWithEmail);

// login with google //
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile email"] })
);

router.get(
  "/googleOK",
  passport.authenticate("google"),
  authController.loginWithGoogle
);

// Login with Facebook //

router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebookOK",
  passport.authenticate("facebook"),
  authController.loginWithFacebook
);

module.exports = router;
