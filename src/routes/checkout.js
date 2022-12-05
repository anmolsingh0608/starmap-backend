const express = require("express");
const { payment, order } = require("../controllers/checkoutController");
const { check } = require("express-validator");
const auth = require("../middleware/jwtAuth");

const router = express.Router();

router.post("/pay", auth, payment);
router.post(
  "/order",
  [
    check("firstName", "First name is required"),
    check("lastName", "Last name is required"),
    check("email", "Email is required").isEmail(),
    check("address", "Address is required"),
    check("country", "Country is required"),
    check("region", "Region is required"),
    check("zip", "Zip code is required").isNumeric(),
    check("stripe_transaction_id", "Transaction id is required"),
    check("items", "Items are required").isArray(),
  ],
  auth,
  order
);

module.exports = router;
