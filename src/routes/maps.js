const express = require("express");
const { check } = require("express-validator");
const { getMap, postMap } = require("../controllers/mapsController");
const auth = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/", getMap);
router.post(
  "/",
  [
    check("name", "Please enter valid map").isIn([
      "citymap", "starmap", "coordinates",
    ]),
    check("price", "Please enter valid price").isNumeric(),
    check("config", "Please enter valid config for poster").isObject(),
  ],
  auth,
  postMap
);

module.exports = router;
