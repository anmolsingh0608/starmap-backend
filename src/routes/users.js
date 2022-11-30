const express = require("express");
const router = express.Router();
const { getUser, postUser, login } = require("../controllers/usersController");
const { check, validationResult } = require("express-validator");
const User = require("../models/users");

router.get("/", getUser);

router.post(
  "/",
  [
    check("email", "Please enter valid email")
      .isEmail()
      .trim()
      .normalizeEmail()
      .custom(async (email) => {
        const existing = User.find({ email: email });
        if ((await existing).length > 0) {
          return Promise.reject("E-mail already in use");
        }
      }),
    check("name", "Name is required").exists().isAlphanumeric(),
    check("password", "Please enter valid password")
      .isAlphanumeric()
      .isLength({ min: 8 }),
    // check("role", "Please enter role").isIn(["admin", "user"])
  ],
  postUser
);

router.post(
  "/admin/login",
  [
    check("email", "Please enter valid email").isEmail(),
    check("password", "Please enter valid password")
      .isLength({ min: 8 })
      .isAlphanumeric(),
  ],
  login
);

module.exports = router;
