const Offer = require("../models/offer");
// const queries = require('../util/queries')

exports.createOffer = (req, res, next) => {
  /* 
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
     */
  let offerObj = req.body.offer
  // console.log('createOffer', offerObj)
  offerObj.users = []
  let leads = req.body.leads
  const statuses = ['won', 'lost', 'pending'];

  // // console.log('leads', leads)
  for (let lead of leads) {
    offerObj.users.push({
      leadId: lead,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      reason: null,
      viewed: false
    })
  }
  console.log('offerObj: ', offerObj)
  const offer = new Offer(offerObj)
  offer.save()
  res.status(200).json(offer)
}

exports.getOffers = async (req, res, next) => {
  let offers = await Offer.find()
  offers.forEach(offer => {
    const statusTotals = {
      won: 0,
      lost: 0,
      pending: 0,
    };

    offer.users.forEach(user => {
      if (statusTotals.hasOwnProperty(user.status)) {
        statusTotals[user.status]++;
      }
    });

    offer.set('stats', statusTotals, { strict: false });
  });
  res.status(200).json(offers)
}