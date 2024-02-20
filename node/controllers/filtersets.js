const Filterset = require("../models/filterset");
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

exports.getFiltersetsByUserId = async (req, res, next) => {
  let userId = req.params.userId
  let businessPartnerId = req.params.businessPartnerId
  let filtersets = await Filterset.find({ businessPartnerId: businessPartnerId, createdBy: userId })
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