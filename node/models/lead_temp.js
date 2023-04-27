// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const leadSchema = new Schema({
  userId: { type: String, required: false },
  match: { type: Number, required: false },
  value: { type: Number, required: false },
  data: { type: Object, required: false },
}
);

module.exports = mongoose.model('Lead_temp', leadSchema)
