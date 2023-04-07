const Lead = require("../models/lead");
const queries = require('../util/queries')

exports.getLeads = async (req, res, next) => {
  let filters = req.query.filters
  filters = queries.parseFilters(req.query.filter)
  filters = queries.valuesToNumbers(filters)

  let skip = req.query.skip || 0;
  let limit = req.query.limit || 0;
  let ids = req.query.ids
  let projection = ids === 'true' ? { _id: 1 } : {}
  // console.log('ids:', ids)
  console.log('projection:', projection)
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
  // let leads = await Lead.find(query).limit(limit).skip(skip)
  // let leads
  // if (ids === 'true') {
  //   leads = await Lead.find(query, '_id').limit(limit).skip(skip);
  // } else {
  //   leads = await Lead.find(query).limit(limit).skip(skip);
  // }
  // let projection = { _id: 1 }
  let leads = await Lead.find(query, projection).limit(limit).skip(skip)

  if (ids === 'true') {
    leads = leads.map((lead) => lead._id);
  }
  // console.log(filters)
  // console.log(query)
  // console.log(count)
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

function getRandom(min, max, decimals = 0) {
  const factor = Math.pow(10, decimals);
  min *= factor;
  max *= factor;
  const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
  return randomValue / factor;
}

function getRandomMultiple(min, max, multiple) {
  const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
  return Math.floor(randomValue / multiple) * multiple;
}
exports.updateLeads = async (req, res, next) => {

  try {
    const leads = await Lead.find({});

    for (const lead of leads) {
      const mortgageData = {
        "rate": getRandom(1.6, 3.9, 2),
        "rate_type": Math.random() < 0.5 ? "Fixed" : "Variable",
        "one_time_cost": getRandomMultiple(0, 1500, 1),
        "monthly_cost": getRandomMultiple(600, 5000, 1),
        "downpayment": getRandomMultiple(5, 25, 5)
      };

      const insuranceData = {
        "premium": getRandomMultiple(50, 1000, 1),
        "injury_liability": getRandomMultiple(100000, 500000, 100000),
        "property_liability": getRandomMultiple(100000, 1000000, 100000),
        "collision_deductible": [0, 250, 500, 1000][Math.floor(Math.random() * 4)],
        "comprehensive_deductible": [0, 250, 500, 1000][Math.floor(Math.random() * 4)]
      };

      lead.access.mortgage.data = mortgageData;
      lead.access.insurance.data = insuranceData;
      await lead.save();
    }

    console.log('Leads updated successfully');
    res.status(200).json({ msg: 'Leads updated successfully' });
  } catch (err) {
    console.error('Error updating leads:', err);
    res.status(500).json({ error: 'Error updating leads' });
  }
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