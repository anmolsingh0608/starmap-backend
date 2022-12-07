const express = require("express");
const router = express.Router();
const { getUser, postUser, login, checkToken, adminLogin } = require("../controllers/usersController");
const { check, validationResult } = require("express-validator");
const User = require("../models/users");
const auth = require("../middleware/jwtAuth");
const roleCheck = require("../middleware/roleCheck");

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
  adminLogin
);

router.post(
  "/login",
  [
    check("email", "Please enter valid email").isEmail(),
    check("password", "Please enter valid password")
      .isLength({ min: 8 })
      .isAlphanumeric(),
  ],
  login
);

router.get('/admin', [auth, roleCheck], checkToken);

module.exports = router;
