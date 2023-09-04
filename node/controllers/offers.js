const Offer = require("../models/offer");
// const queries = require('../util/queries')

function formatLeadsForOffers(leads) {
  const statuses = ['won', 'lost', 'pending'];
  let users = []

  for (let lead of leads) {
    users.push({
      leadId: lead,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      reason: null,
      viewed: false
    })
  }


  return users;

}
exports.createOffer = (req, res, next) => {
  let offerObj = req.body.offer
  let leads = req.body.leads
  offerObj.users = formatLeadsForOffers(leads)

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

exports.getOffer = async (req, res, next) => {
  console.log('getOffer', req.params.id)
  let id = req.params.id
  let offer = await Offer.findById(id)
  res.status(200).json(offer)
}

exports.updateOffer = async (req, res, next) => {
  try {
    let offer = await Offer.findById(req.params.id)
    // console.log('updateOffer: ', offer)
    let offerObj = req.body.offer
    console.log('offerObj: ', offerObj)
    let leads = req.body.leads
    offerObj.users = formatLeadsForOffers(leads)
    for (const [key, value] of Object.entries(offerObj)) {
      offer[key] = value
    }
    offer.save();
    res.status(200).json({ message: "posted" })
  } catch (error) {
    console.log(error)
  }
};

exports.deleteOffer = async (req, res, next) => {
  let id = req.query.id
  let offer = await Offer.findByIdAndDelete(id)
  res.status(200).json(offer)
}