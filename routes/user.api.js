const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authMiddleware = require("../middlewares/authentication");

// Get current user
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);

// Update user
router.put("/me", authMiddleware.loginRequired, userController.updateProfile);

// Get all user
router.get("/", userController.getAllUser);

// PUT single user
router.put("/:userId", userController.updateProfile);

// DELETE single user
router.delete("/:userId", userController.deleteUser);

module.exports = router;
