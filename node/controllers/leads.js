const Lead = require("../models/lead");
const queries = require('../util/queries')

exports.getLeads = async (req, res, next) => {
  const filters = req.body.filters || {};
  console.log('filters:', JSON.stringify(filters))
  const skip = req.body.skip || 0;
  const limit = req.body.limit || 0;
  const ids = req.body.ids;

  const query = {};

  for (const category in filters) {
    if (!Object.keys(filters[category]).length) continue;

    for (const dataType in filters[category]) {
      const dataFilter = {};

      for (const filter in filters[category][dataType]) {
        const { type, value } = filters[category][dataType][filter];

        if (type === 'string') {
          if (value !== '') {
            dataFilter[`data.${category}.${dataType}.${filter}`] = {
              $regex: `.*${value}.*`,
              $options: 'i',
            };
          }
        }
        else if (type === 'identifier_number') {
          if (value !== '') {
            dataFilter[`data.${category}.${dataType}.${filter}`] = {
              $regex: `.*${value}.*`,
            };
          }
        }

        else if (type === 'range_number' || type === 'range_amount' || type === 'range_slider') {
          const [min, max] = value;
          const rangeFilter = {};
          if (min !== null && min !== '') {
            rangeFilter.$gte = min;
          }
          if (max !== null && max !== '') {
            rangeFilter.$lte = max;
          }
          if (Object.keys(rangeFilter).length) {
            dataFilter[`data.${category}.${dataType}.${filter}`] = rangeFilter;
          }
        }
        else if (type === 'date') {
          const [from, to] = value;
          const dateFilter = {};
          if (from) {
            dateFilter.$gte = new Date(from);
          }
          if (to) {
            dateFilter.$lte = new Date(to)
          }
          dataFilter[`data.${category}.${dataType}.${filter}`] = dateFilter;
        }
        else if (type === 'range_date') {
          const { from: [start_from, start_to], to: [end_from, end_to] } = value;
          const startFilter = {};
          const endFilter = {};

          if (start_from) {
            startFilter.$gte = new Date(start_from);
          }
          if (start_to) {
            startFilter.$lte = new Date(start_to);
          }
          if (end_from) {
            endFilter.$gte = new Date(end_from);
          }
          if (end_to) {
            endFilter.$lte = new Date(end_to);
          }

          if (Object.keys(startFilter).length) {
            dataFilter[`data.${category}.${dataType}.${filter}.from`] = startFilter;
          }
          if (Object.keys(endFilter).length) {
            dataFilter[`data.${category}.${dataType}.${filter}.to`] = endFilter;
          }
        }

      }



      if (Object.keys(dataFilter).length) {
        query[`$and`] = query[`$and`] || [];
        query[`$and`].push(dataFilter);
      }
    }
  }

  const projection = ids ? { _id: 1 } : {};
  const leads = await Lead.find(query, projection).limit(limit).skip(skip);
  const count = await Lead.countDocuments(query);
  console.log('count:', count)
  if (ids) {
    res.status(200).json({ leads: leads.map((lead) => lead._id), count: count });
  } else {
    res.status(200).json({ leads: leads, count: count });
  }

  console.log('query:', JSON.stringify(query));
};

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


const filters = {
  filters: {
    "general": { "identifying_data": { "household_members": { "value": [1, 8], "type": "range_number" } } },
    "mobile": {
      "interaction_data": {
        "invoice_debit_amount": { "value": ["", 1000], "type": "range_amount" },
        "phone_number": { "value": 2, "type": "identifier_number" },
        "invoice_period": { "value": { "from": [null, "2013-02-05"], "to": [null, null] }, "type": "range_date" },
      },
    },
  },
};
const query = {
  "$and": [
    { "data.general.identifying_data.household_members": { "$gte": 1, "$lte": 8 } },
    { "data.mobile.interaction_data.invoice_debit_amount": { "$lte": 1000 }, "data.mobile.interaction_data.phone_number": { "$regex": ".*2.*" } },
  ],
};