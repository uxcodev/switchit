const User = require("../models/user");
const Company = require("../models/company");

exports.getUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getActiveUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.query.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    let users = await User.find() //.populate('roles.company');
    console.log('get users response', users)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

exports.getUserByEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.query.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

exports.createUser = async (req, res, next) => {
  try {
    let userFields = req.body.fields;
    let profileObj = {}
    for (const [key, value] of Object.entries(userFields)) {
      profileObj[key] = value
    }
    const user = new User(profileObj)
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let userFields = req.body.fields;
    let user = await User.findById(req.body.id)
    for (const [key, value] of Object.entries(userFields)) {
      user[key] = value
    }
    await user.save();
    res.status(200).json({ message: "posted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let userId = req.query.id
    let user = await User.findById(userId)
    for (const role of user.roles) {
      const companyId = role.company.toString();
      await Company.findOneAndUpdate(
        { _id: companyId, 'roles.user': userId },
        { $pull: { roles: { user: userId } } },
        { new: true }
      )
    }
    let response = await User.deleteOne({ _id: userId })
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
