const { validationResult } = require("express-validator");

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};

exports.sendResult = (req, res) => {
  var { results } = req;
  if (results) {
    res.status(200).json({ success: true, result: results });
  } else {
    res.status(404).json({ success: false, result: "No Result Found" });
  }
};
