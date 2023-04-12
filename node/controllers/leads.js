const Lead = require("../models/lead");
const queries = require('../util/queries')

exports.getLeads = async (req, res, next) => {
  let body = req.body.filters
  let skip = req.body.skip || 0;
  let limit = req.body.limit || 0;
  let ids = req.body.ids


  // create the mongodb query

  let query = { '$or': [] };
  let hasTrueStatus = false;

  for (const category in body) {
    if (body[category].status) {

      // return results that have any of the selected categories set to true
      query.$or.push({ [`access.${category}.status`]: true });
      hasTrueStatus = true;
    }

    // reformat the query for monbodb
    for (const preference in body[category].preferences) {
      const min = body[category].preferences[preference].values[0];
      const max = body[category].preferences[preference].values[1];

      query[`access.${category}.preferences.${preference}`] = {
        $gte: min,
        $lte: max,
      };
    }
  }

  if (!hasTrueStatus) {
    for (const category in body) {
      query.$or.push({ [`access.${category}.status`]: true });
    }
  }

  // only return _id if ids is set to true
  let projection = ids ? { _id: 1 } : {}
  let leads = await Lead.find(query, projection).limit(limit).skip(skip)
  let count = await Lead.countDocuments(query)

  // if returning ids, get the _id values out of each object to return an array of values
  if (ids === true) {
    console.log(ids)
    leads = leads.map((lead) => lead._id);
  }

  res.status(200).json({ leads: leads, count: count })
}


exports.getLead = async (req, res, next) => {
  // console.log(`req: ${req}`)
  let lead = await Lead.findById(req.query.id)
  res.status(200).json(lead)
}


// exports.createLead = (req, res, next) => {
//   let leadFields = req.body.fields;
//   let profileObj = {}
//   for (const [key, value] of Object.entries(leadFields)) {
//     // // console.log(`${key}: ${value}`)
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
      // // console.log(`${key}: ${value}`)
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

    // console.log('Leads updated successfully');
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
//     // console.log(key + ": " + value)
//     lead[key] = value
//   }
//   lead.save();

//   res.status(200).json({ message: "posted" })
// };

// exports.deleteLead = async (req, res, next) => {
//   let response = await Lead.deleteOne({ _id: req.query.id })
//   res.status(200).json({ message: response })
// };