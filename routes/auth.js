var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");
var shopController = require("../controller/shopController");
var utilController = require("../controller/utilController");

router.post("/register/user", userController.addUser);

router.post("/register/shop", shopController.addShop);

module.exports = router;
