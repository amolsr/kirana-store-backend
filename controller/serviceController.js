const Service = require("../models/Service");

exports.addService = (req, res) => {
  const { type } = req.body;
  Service.create({
    type: type.toUpperCase().trim(),
  })
    .then((service) => {
      res.results.push("Service Created");
      req.serviceId = service._id;
      next();
    })
    .catch((err) => {
      res.status(500).json({ success: false, errors: err });
    });
};
