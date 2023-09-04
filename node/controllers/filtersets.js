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

exports.deleteFilterset = async (req, res, next) => {
  let id = req.query.id
  let filterset = await Filterset.findByIdAndDelete(id)
  res.status(200).json(filterset)
}