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
    service,
  } = req.body;
  Shop.create({
    shopName: shopName.toUpperCase().trim(),
    owner: userId,
    gstNumber: gstNumber.trim(),
    addressLine: addressLine,
    pincode: pincode,
    city: city,
    range: range,
    service: service,
  })
    .then((shop) => {
      res.status(200).json({ success: true, result: shop });
    })
    .catch((err) => {
      console.log(err);
      if (err && err.code === 11000)
        return res.status(409).json({ success: false, error: "Shop Exist" });
      else res.status(500).json({ success: false, errors: err });
    });
};
