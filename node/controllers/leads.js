const Lead = require("../models/lead");

exports.getLeads = async (req, res, next) => {
  let filters = req.query.filter ? parseFilters(req.query.filter) : {}
  console.log(filters)
  let skip = req.query.skip
  console.log(skip)
  let limit = req.query.limit
  console.log(limit)
  let count = await Lead.countDocuments()
  let leads = await Lead.find().limit(limit).skip(skip)
  res.status(200).json({ leads: leads, count: count })
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