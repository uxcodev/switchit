const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const offerSchema = new Schema({
  data: {
    mortgage: { type: Object, required: false },
    insurance: { type: Object, required: false },
    banking: { type: Object, required: false },
    broadband: { type: Object, required: false },
    mobile: { type: Object, required: false },
    utilities: { type: Object, required: false },
    auto: { type: Object, required: false },
  },
  users: [{
    userId: { type: ObjectId, ref: "User", required: false },
    leadId: { type: ObjectId, ref: "Lead", required: false },
  }
  ],
}
);



module.exports = mongoose.model('offer', offerSchema)
