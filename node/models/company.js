const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: false },
  website: { type: String, required: false },
  contact_email: { type: String, required: false },
  countries: { type: Array, required: false },
  createdby: { type: String, required: false },
  status: { type: String, required: false },
  roles: [{
    user: { type: ObjectId, ref: 'User', required: false },
    role: { type: String, required: false },
  }],
  access: { type: Object, required: false },
  // access: {
  //   mortgage: {
  //     status: { type: Boolean, required: false },
  //     title: { type: String, required: false }
  //   },
  //   insurance: {
  //     status: { type: Boolean, required: false },
  //     title: { type: String, required: false }
  //   },
  //   banking: {
  //     status: { type: Boolean, required: false },
  //     title: { type: String, required: false }
  //   },
  //   broadband: {
  //     status: { type: Boolean, required: false },
  //     title: { type: String, required: false }
  //   },
  //   mobile: {
  //     status: { type: Boolean, required: false },
  //     title: { type: String, required: false }
  //   },
  //   utilities: {
  //     status: { type: Boolean, required: false },
  //     title: { type: String, required: false }
  //   },
  //   auto: {
  //     status: { type: Boolean, required: false },
  //     title: { type: String, required: false }
  //   },
  // },
}
);

module.exports = mongoose.model('Company', companySchema)
