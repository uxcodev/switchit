// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const leadSchema = new Schema({
  userId: { type: String, required: false },
  match: { type: Number, required: false },
  value: { type: Number, required: false },
  access: {
    mortgage: {
      status: { type: Boolean, required: false },
      preferences: { type: Object, required: false },
      data: { type: Object, required: false }
    },
    insurance: {
      status: { type: Boolean, required: false },
      preferences: { type: Object, required: false },
      data: { type: Object, required: false }
    },
    banking: {
      status: { type: Boolean, required: false },
      preferences: { type: Object, required: false },
      data: { type: Object, required: false }
    },
    broadband: {
      status: { type: Boolean, required: false },
      preferences: { type: Object, required: false },
      data: { type: Object, required: false }
    },
    mobile: {
      status: { type: Boolean, required: false },
      preferences: { type: Object, required: false },
      data: { type: Object, required: false }
    },
    utilities: {
      status: { type: Boolean, required: false },
      preferences: { type: Object, required: false },
      data: { type: Object, required: false }
    },
    auto: {
      status: { type: Boolean, required: false },
      preferences: { type: Object, required: false },
      data: { type: Object, required: false }
    },
  },
}
);

module.exports = mongoose.model('lead', leadSchema)
