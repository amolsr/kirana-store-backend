var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");
var shopController = require("../controller/shopController");
var serviceController = require("../controller/serviceController");
var utilController = require("../controller/utilController");

router.post(
  "/register/user",
  userController.addUser,
  utilController.sendResult
);

router.post(
  "/register/shop",
  shopController.addShop,
  utilController.sendResult
);

module.exports = router;
