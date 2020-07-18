var mongoose = require("mongoose");

var ServiceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    // items: {
    //   type: mongoose.Types.ObjectId,
    //   rel: "User",
    // },
  },
  { timestamps: true }
);

ServiceSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Service", ServiceSchema, "service");
