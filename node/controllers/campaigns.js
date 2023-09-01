const Campaign = require("../models/campaign");
// const queries = require('../util/queries')

exports.createCampaign = (req, res, next) => {

  console.log(req.body.fields)
  let campaignObj = req.body.fields
  const campaign = new Campaign(campaignObj)
  campaign.save()
  res.status(200).json(campaign)
}

exports.getCampaigns = async (req, res, next) => {
  let campaigns = await Campaign.find()
  res.status(200).json(campaigns)
}

exports.getCampaign = async (req, res, next) => {
  let id = req.params.id
  let campaign = await Campaign.findById(id)
  res.status(200).json(campaign)
}

exports.deleteCampaign = async (req, res, next) => {
  let id = req.query.id
  let campaign = await Campaign.findByIdAndDelete(id)
  res.status(200).json(campaign)
}

exports.updateCampaign = async (req, res, next) => {

  try {
    let campaign = await Campaign.findById(req.params.id)
    let campaignObj = req.body.campaign
    for (const [key, value] of Object.entries(campaignObj)) {
      campaign[key] = value
    }
    console.log(campaign)
    campaign.save();
    res.status(200).json({ message: "posted" })
  } catch (error) {
    console.log(error)
  }
};