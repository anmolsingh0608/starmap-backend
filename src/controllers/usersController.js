const User = require("../models/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = (req, res) => {
  res.send("hi");
};

const postUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors);
  } else {
    const body = req.body;

    //hash
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(body.password, salt);

    const user = new User({
      name: body.name,
      email: body.email,
      password: hashPassword,
      role: body.role,
    });

    user.save().then(() => {
      res.status(200).json({ user });
    });
  }
};

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors);
  } else {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
      if (user !== null) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            const token = jwt.sign(
              { userId: user.id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            res.status(200).json({
              success: true,
              data: {
                token: token,
                email: user.email,
                name: user.name,
                role: user.role,
              },
            });
          } else {
            res.status(403).json({
              success: false,
              message: "Incorrect email or password",
            });
          }
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Incorrect email or password",
        });
      }
    });
  }
};

module.exports = {
  getUser,
  postUser,
  login,
};
