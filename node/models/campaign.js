const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  campaignName: { type: String, required: false },
  filters: { type: Object, required: false },
  offer: { type: Object, required: false },
  offer_details: { type: Object, required: false },
  companyId: { type: ObjectId, ref: 'Company', required: false },
  businessPartnerId: { type: String, required: false },
  createdBy: { type: ObjectId, ref: 'User', required: false },
  creator: { type: String, required: false },
  created: { type: Date, required: false, default: Date.now },
  updated: { type: Date, required: false, default: Date.now },
}
);

module.exports = mongoose.model('Campaign', campaignSchema)
