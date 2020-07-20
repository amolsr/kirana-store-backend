const User = require("../models/User");

exports.addUser = (req, res, next) => {
  const { name, mobile, email, password } = req.body;
  User.create({
    name: name.toUpperCase().trim(),
    mobile: mobile,
    email: email.toLowerCase().trim(),
    password: password,
  })
    .then((user) => {
      res.results.push("User Created");
      req.userId = user._id;
      next();
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error });
    });
};

exports.getUser = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const { id } = req.params;
  const { name } = req.query;
  const options = {};
  if (name) {
    options.name = name;
  }
  if (id) {
    options._id = id;
  }
  if (page && limit) {
    const results = {};
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (endIndex < (await User.find(options).countDocuments())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    User.find(options)
      .skip((page - 1) * limit)
      .limit(limit)
      .then((result) => {
        if (result) {
          results.results = result;
          res.status(200).json(results);
        } else {
          res.status(404).json({ success: false, results: "No User Found" });
        }
      });
  } else {
    User.findOne(options)
      .then((result) => {
        if (result) {
          req.user = result;
          next();
        } else {
          res.status(404).json({ success: false, result: "Not Found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false });
      });
  }
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, mobile, email } = req.body;
  let fields = {};
  if (name) {
    fields.name = name.toUpperCase();
  }
  if (mobile) {
    fields.mobile = mobile;
  }
  if (email) {
    fields.email = email.toLowerCase();
  }
  User.updateOne(
    {
      _id: id,
    },
    {
      $set: fields,
    }
  )
    .then((result) => {
      if (result.nModified > 0) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.sendStatus(304);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
      });
    });
};

exports.updatePassword = (req, res) => {
  const { oldPassword, mobile, newPassword } = req.body;
  const { id } = req.params;
  User.findOne({ mobile: mobile, _id: id }).then((user) => {
    if (user) {
      user.comparePassword(oldPassword, function (err, isMatch) {
        if (isMatch && !err) {
          User.updateOne({ _id: id }, { $set: { password: newPassword } })
            .then((result) => {
              if (result.nModified > 0) {
                res.status(200).json({
                  success: true,
                });
              } else {
                res.status(422).json({
                  success: false,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                success: false,
              });
            });
        } else {
          res.status(409).json({ success: false, error: "Password Not Match" });
        }
      });
    } else {
      res.status(404).json({ success: false, error: "User Not Found." });
    }
  });
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  });
};
