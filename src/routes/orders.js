const express = require("express");
const auth = require("../middleware/jwtAuth");
const router = express.Router();
const { getAll, getById } = require("../controllers/OrdersController");
const roleCheck = require("../middleware/roleCheck");

router.get("/", [auth, roleCheck], getAll);
router.get("/:id", [auth, roleCheck], getById);

module.exports = router;
