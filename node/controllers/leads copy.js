const Lead = require("../models/lead_temp");
const queries = require('../util/queries')

exports.getLeads = async (req, res, next) => {
  const filters = req.body.filters || {};
  const skip = req.body.skip || 0;
  const limit = req.body.limit || 0;
  const ids = req.body.ids;

  const query = {};

  for (const category in filters) {
    if (!Object.keys(filters[category]).length) continue;

    for (const dataType in filters[category]) {
      const filterObj = filters[category][dataType];

      for (const filterName in filterObj) {
        const filterValue = filterObj[filterName];
        let min, max;

        if (filterValue.type === 'range_amount' || filterValue.type === 'range_slider') {
          [min, max] = filterValue.value;
        } else if (filterValue.type === 'identifier_number' || filterValue.type === 'string') {
          min = filterValue.value;
        } else if (filterValue.type === 'date') {
          min = filterValue.value[0];
          max = filterValue.value[1];
        } else if (filterValue.type === 'range_date') {
          const { from, to } = filterValue.value;
          if (from) {
            min = from[0];
          }
          if (to) {
            max = to.slice(-1)[0];
          }
        }

        const dataFilter = {};
        if (dataType === 'string') {
          if (min) {
            dataFilter[`data.${category}.${dataType}.${filterName}`] = {
              $regex: new RegExp(min, 'i')
            };
          }
        } else if (dataType === 'number') {
          if (min) {
            dataFilter[`data.${category}.${dataType}.${filterName}`] = {
              $gte: min,
            };
          }
          if (max) {
            dataFilter[`data.${category}.${dataType}.${filterName}`] = {
              ...dataFilter[`data.${category}.${dataType}.${filterName}`],
              $lte: max,
            };
          }
        } else if (dataType === 'date') {
          if (min || max) {
            dataFilter[`data.${category}.${dataType}.${filterName}`] = {};
          }
          if (min) {
            dataFilter[`data.${category}.${dataType}.${filterName}`]['$gte'] = min;
          }
          if (max) {
            dataFilter[`data.${category}.${dataType}.${filterName}`]['$lte'] = max;
          }
        } else if (dataType === 'daterange') {
          if (min || max) {
            dataFilter[`data.${category}.${dataType}.${filterName}`] = {};
          }
          if (min) {
            dataFilter[`data.${category}.${dataType}.${filterName}`]['$gte'] = min[0];
            dataFilter[`data.${category}.${dataType}.${filterName}`]['$lte'] = min[1];
          }
          if (max) {
            dataFilter[`data.${category}.${dataType}.${filterName}`]['$gte'] = max[0];
            dataFilter[`data.${category}.${dataType}.${filterName}`]['$lte'] = max[1];
          }
        }

        if (Object.keys(dataFilter).length) {
          query[`$and`] = query[`$and`] || [];
          query[`$and`].push(dataFilter);
        }
      }
    }
  }

  const projection = ids ? { _id: 1 } : {};
  const leads = await Lead.find(query, projection).limit(limit).skip(skip);
  const count = await Lead.countDocuments(query);

  if (ids) {
    res.status(200).json({ leads: leads.map((lead) => lead._id), count: count });
  } else {
    res.status(200).json({ leads: leads, count: count });
  }

  console.log('query:', JSON.stringify(query));
};



// console.log('query:', JSON.stringify(query));
// console.log('leads:',);







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