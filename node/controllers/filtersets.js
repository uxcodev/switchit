const Filterset = require("../models/filterset");
const User = require("../models/user");
// const queries = require('../util/queries')

exports.createFilterset = (req, res, next) => {
  console.log(req.body.fields)
  let filtersetObj = req.body.fields
  const filterset = new Filterset(filtersetObj)
  filterset.save()
  res.status(200).json(filterset)
}

exports.getFiltersets = async (req, res, next) => {
  let filtersets = await Filterset.find()
  res.status(200).json(filtersets)
}

exports.getFiltersetsByBusinessPartnerId = async (req, res, next) => {
  let id = req.params.id
  let filtersets = await Filterset.find({ businessPartnerId: id })
  res.status(200).json(filtersets)
}

exports.getFiltersetsByUserEmail = async (req, res, next) => {
  let email = req.params.email
  let businessPartnerId = req.params.businessPartnerId
  // let creator = req.params.creator
  let filtersets = await Filterset.find({ businessPartnerId: businessPartnerId, creator: email })
  res.status(200).json(filtersets)
}

exports.updateFilterset = async (req, res, next) => {
  let id = req.body.fields._id
  let filterset = await Filterset.findByIdAndUpdate(id, req.body.fields, { new: true })
  res.status(200).json(filterset)
}

exports.deleteFilterset = async (req, res, next) => {
  let id = req.query.id
  let filterset = await Filterset.findByIdAndDelete(id)
  res.status(200).json(filterset)
}

exports.addEmailToAllFiltersets = async (req, res, next) => {

  const filtersets = await Filterset.find();

  for (let filterset of filtersets) {
    const userId = filterset.createdBy;
    const user = await User.findById(userId);

    if (user) {
      filterset.creator = user.email;
      await filterset.save();
    } else {
      console.log("user not found:", userId);
    }
  }
  let updated_filtersets = await Filterset.find()
  res.status(200).json(updated_filtersets)
}