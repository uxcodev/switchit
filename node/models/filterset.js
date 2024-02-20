const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const filtersetSchema = new Schema({
  filtersetName: { type: String, required: false },
  filters: { type: Object, required: false },
  companyId: { type: ObjectId, ref: 'Company', required: false },
  businessPartnerId: { type: String, required: false },
  createdBy: { type: ObjectId, ref: 'User', required: false },
  created: { type: Date, required: false, default: Date.now },
  updated: { type: Date, required: false, default: Date.now },
}
);

module.exports = mongoose.model('Filterset', filtersetSchema)
