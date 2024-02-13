const express = require("express");
const { body, validationResult } = require("express-validator");
const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  login,
  createUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

// Validation middleware for checking if errors occurred during validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
};

router.post(
  "/createuser",
  [
    body("username", "Username should contain at least 5 characters").isLength({
      min: 5,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("contact", "Contact should be a number").optional().isInt(),
    body("password", "Password should contain at least 5 characters").isLength({
      min: 5,
    }),
    body("org_code", "Organization code is required").isLength({ min: 1 }),
  ],
  validate,
  createUser
);

router.post(
  "/login",
  [
    body("username", "Username cannot be blank").exists(),
    body("password", "Password cannot be blank").exists(),
  ],
  validate,
  login
);

router.post(
  "/forgotpassword",
  [body("email", "Enter a valid email").isEmail()],
  validate,
  forgotPassword
);

router.post(
  "/resetpassword",
  [
    body(
      "newPassword",
      "Password should contain at least 5 characters"
    ).isLength({ min: 5 }),
  ],
  validate,
  resetPassword
);

module.exports = router;
