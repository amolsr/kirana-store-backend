const Shop = require("../models/Shop");

exports.addShop = (req, res) => {
  const { shopName, gstNumber, addressLine, pincode, city, range } = req.body;
  Shop.create({
    shopName: shopName.toUpperCase().trim(),
    owner: req.userId,
    gstNumber: gstNumber.trim(),
    addressLine: addressLine,
    pincode: pincode,
    city: city,
    range: range,
    service: req.serviceId,
  })
    .then((shop) => {
      res.results.push("Shop Created");
      next();
    })
    .catch((err) => {
      res.status(500).json({ success: false, errors: err });
    });
};
