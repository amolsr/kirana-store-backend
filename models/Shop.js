var mongoose = require("mongoose");

var ShopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      rel: "User",
    },
    gstNumber: {
      type: Number,
      unique: true,
    },
    addressLine: {
      type: String,
    },
    pincode: {
      type: String,
    },
    city: {
      type: String,
    },
    range: {
      type: Number,
    },
    service: {
      type: mongoose.Types.ObjectId,
      rel: "Service",
    },
  },
  { timestamps: true }
);

ShopSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Shop", ShopSchema, "shop");
