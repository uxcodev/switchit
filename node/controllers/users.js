const User = require("../models/user");
const Company = require("../models/company");
// const jwt = require('jsonwebtoken')

exports.getUser = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  res.status(200).json(user)
};

exports.getActiveUser = async (req, res, next) => {
  let user = await User.findOne({ email: req.query.email })
  res.status(200).json(user)
};

exports.getUsers = async (req, res, next) => {
  let users = await User.find().populate('roles.company');
  res.status(200).json(users)
}


exports.getUserByEmail = async (req, res, next) => {
  let user = await User.findOne({ email: req.query.email })
  res.status(200).json(user)
}

exports.createUser = (req, res, next) => {
  let userFields = req.body.fields;
  let profileObj = {}
  for (const [key, value] of Object.entries(userFields)) {
    // // console.log(`${key}: ${value}`)
    profileObj[key] = value
  }
  const user = new User(profileObj)
  user.save()
  res.status(200).json(user)

};

exports.updateUser = async (req, res, next) => {
  let userFields = req.body.fields;
  let user = await User.findById(req.body.id)

  for (const [key, value] of Object.entries(userFields)) {
    // console.log(key + ": " + value)
    user[key] = value
  }
  user.save();

  res.status(200).json({ message: "posted" })
};

exports.deleteUser = async (req, res, next) => {
  let userId = req.query.id
  let user = await User.findById(userId)
  for (const role of user.roles) {
    const companyId = role.company.toString();
    // console.log(companyId);
    let response = await Company.findOneAndUpdate(
      { _id: companyId, 'roles.user': userId },
      { $pull: { roles: { user: userId } } },
      { new: true }
    )
    console.log(response)
    // Handle company object id
  }
  let response = await User.deleteOne({ _id: userId })

  res.status(200).json({ message: response })
};