const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const Orders = require("../models/order");
const multer = require("multer");
let path = require("path");
const fs = require("fs");

const payment = (req, res) => {
  const { token, amount } = req.body;

  // To avoid duplication for payments
  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
          },
          { idempotencyKey }
        )
        .then((response) => {
          console.log(response.id);
          res.status(200).json(response);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

const order = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(403).json(errors);
  }

  try {
    let data = req.body;
    let buffer = "";
    let base64 = "";
    let extension = "";
    let name = "";
    await data.items.forEach((element) => {
      base64 = element.img.split("base64,")[1];
      extension = element.img.split(";")[0].split("/")[1];
      buffer = Buffer.from(base64, "base64");
      name = uuidv4() + "-" + Date.now() + "." + extension;
      fs.writeFileSync("public/" + name, buffer);
      element.img = name;
    });
    const order = new Orders(data);
    order
      .save()
      .then((order) => {
        res.status(200).json(order);
      })
      .catch((err) => {
        res.status(403).json(err);
      });
  } catch (e) {
    console.log(e);
    res.status(403).json(e);
  }
};

module.exports = { payment, order };
