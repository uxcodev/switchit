const Lead = require("../models/lead");
const queries = require('../util/queries')

exports.getLeads = async (req, res, next) => {
  let filters = req.query.filters
  filters = queries.parseFilters(req.query.filter)
  filters = queries.valuesToNumbers(filters)

  let skip = req.query.skip
  let limit = req.query.limit
  let query = { '$or': [] }

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const [category, preference] = key.split('_');
      if (!query['$or'].some(condition => condition[`access.${category}.status`])) {
        query['$or'].push({ [`access.${category}.status`]: true });
      }
      query[`access.${category}.preferences.${preference}`] = {
        $gte: filters[`${category}_${preference}_min`],
        $lte: filters[`${category}_${preference}_max`]
      };
    }
  }

  let count = await Lead.countDocuments(query)
  let leads = await Lead.find(query).limit(limit).skip(skip)
  // console.log(filters)
  console.log(query)
  console.log(count)
  res.status(200).json({ leads: leads, count: count })
}

exports.getFilteredLeads = async (req, res, next) => {
  // let filters = req.query.filters ? parseFilters(req.query.filters) : {}
  console.log(req.body)
  let filters = req.body.filters
  console.log(filters)
  let skip = req.body.skip
  console.log(skip)
  let limit = req.body.limit
  console.log(limit)
  let count = await Lead.countDocuments()
  console.log(count)
  // let leads = await Lead.find().limit(limit).skip(skip)
  // res.status(200).json({ leads: leads, count: count })
}

exports.getLead = async (req, res, next) => {
  console.log(`req: ${req}`)
  let lead = await Lead.findById(req.query.id)
  res.status(200).json(lead)
}

// exports.createLead = (req, res, next) => {
//   let leadFields = req.body.fields;
//   let profileObj = {}
//   for (const [key, value] of Object.entries(leadFields)) {
//     // console.log(`${key}: ${value}`)
//     profileObj[key] = value
//   }
//   const lead = new Lead(profileObj)
//   lead.save()
//   res.status(200).json(lead)
// };

exports.createLeads = (req, res, next) => {
  let leads = req.body.leads
  for (let lead of leads) {
    // let leadFields = req.body.fields;
    let profileObj = {}
    for (const [key, value] of Object.entries(lead)) {
      // console.log(`${key}: ${value}`)
      profileObj[key] = value
    }
    const newlead = new Lead(profileObj)
    newlead.save()
  }
  res.status(200)
}

// exports.updateLead = async (req, res, next) => {
//   let leadFields = req.body.fields;
//   let lead = await Lead.findById(req.body.id)

//   for (const [key, value] of Object.entries(leadFields)) {
//     console.log(key + ": " + value)
//     lead[key] = value
//   }
//   lead.save();

//   res.status(200).json({ message: "posted" })
// };

// exports.deleteLead = async (req, res, next) => {
//   let response = await Lead.deleteOne({ _id: req.query.id })
//   res.status(200).json({ message: response })
// };