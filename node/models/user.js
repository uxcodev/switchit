const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  email: { type: String, required: false },
  status: { type: String, required: false },
  admin: { type: Boolean, required: false },
  roles: [{
    company: { type: ObjectId, ref: "Company", required: false },
    role: { type: String, required: false },
  }],
  access: {
    mortgage: {
      status: { type: Boolean, required: false },
      title: { type: String, required: false }
    },
    insurance: {
      status: { type: Boolean, required: false },
      title: { type: String, required: false }
    },
    banking: {
      status: { type: Boolean, required: false },
      title: { type: String, required: false }
    },
    broadband: {
      status: { type: Boolean, required: false },
      title: { type: String, required: false }
    },
    mobile: {
      status: { type: Boolean, required: false },
      title: { type: String, required: false }
    },

    utilities: {
      status: { type: Boolean, required: false },
      title: { type: String, required: false }
    },

    auto: {
      status: { type: Boolean, required: false },
      title: { type: String, required: false }
    },
  },
}
);

module.exports = mongoose.model('user', userSchema)
