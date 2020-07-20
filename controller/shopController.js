const Shop = require("../models/Shop");

exports.addShop = (req, res) => {
  const {
    userId,
    shopName,
    gstNumber,
    addressLine,
    pincode,
    city,
    range,
  } = req.body;
  Shop.create({
    shopName: shopName.toUpperCase().trim(),
    owner: userId,
    gstNumber: gstNumber.trim(),
    addressLine: addressLine,
    pincode: pincode,
    city: city,
    range: range,
  })
    .then((shop) => {
      res.results.push("Shop Created");
      next();
    })
    .catch((err) => {
      res.status(500).json({ success: false, errors: err });
    });
};
