const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const offerSchema = new Schema({
  offer_details: { type: Object, required: false },
  criteria: { type: Object, required: false },
  offer: { type: Object, required: false },
  users: [{
    userId: { type: ObjectId, ref: "User", required: false },
    leadId: { type: ObjectId, ref: "Lead", required: false },
    status: { type: String, required: false },
    reason: { type: String, required: false },
    viewed: { type: Boolean, required: false },
  }
  ],
}
);

module.exports = mongoose.model('Offer', offerSchema)
