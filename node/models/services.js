const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  data: {
    general: {
      first_name: { type: String, required: false },
      last_name: { type: String, required: false },
      address: { type: String, required: false },
      postal_code: { type: String, required: false },
      country: { type: String, required: false },
      customer_number: { type: String, required: false },
      dob: { type: String, required: false },
      household_members: { type: Number, required: false },
      phone: { type: Number, required: false }
    },
    mobile: {
      invoice_debit_amount: { type: Number, required: false },
      invoice_debit_date: { type: String, required: false },
      phone_number: { type: Number, required: false },
      invoice_period: {
        from: { type: String, required: false },
        to: { type: String, required: false },
      },
      plan_talk_minutes: { type: Number, required: false },
      plan_data_speed: { type: Number, required: false },
      plan_data_gb: { type: Number, required: false },
      plan_teleservice: { type: String, required: false },
      phone_installment: { type: String, required: false },
      equipment_installment: { type: String, required: false }
    },
    mortgage: {
      loan_number: { type: Number, required: false },
      loan_details: { type: String, required: false },
      principal_amount: { type: Number, required: false },
      interest_rate: { type: Number, required: false },
      mortgage_contribution: { type: Number, required: false },
      interest_paid: { type: Number, required: false },
      installment_paid: { type: Number, required: false },
      debit_amount: { type: Number, required: false },
      debit_date: { type: String, required: false },
      terms_remaining: { type: String, required: false }
    },
    energy: {
      debit_amount: { type: Number, required: false },
      debit_date: { type: String, required: false },
      kwh_amount: { type: Number, required: false },
      fees_amount: { type: Number, required: false },
      taxes_amount: { type: Number, required: false },
      additional_services: { type: String, required: false },
      prepaid_amount: { type: Number, required: false }
    },
    car_insurance: {
      debit_amount: { type: Number, required: false },
      debit_date: { type: String, required: false },
      valid_from: { type: String, required: false },
      number_plate: { type: String, required: false },
      vehicle: {
        make: { type: String, required: false },
        model: { type: String, required: false },
        fuel: { type: String, required: false },
        speedometer: { type: String, required: false }
      },
      additional_services: { type: Object, required: false },
      own_risk_amount: { type: Number, required: false }
    },
    home_insurance: {
      debit_amount: { type: Number, required: false },
      debit_date: { type: String, required: false },
      valid_from: { type: String, required: false },
      address: { type: String, required: false },
      own_risk_amount: { type: Number, required: false },
      add_ons: { type: Object, required: false },
      alarm_discount: { type: Boolean, required: false },
    },
    broadband: {
      debit_amount: { type: Number, required: false },
      debit_date: { type: String, required: false },
      plan_data_speed: { type: Number, required: false },
      plan_data_gb: { type: Number, required: false }
    },
  },
  preferences: {
    mortgage: {
      price: {
        label: "Importance of cheapest price",
        values: [0, 10]
      },
      service: {
        label: "Importance of best service",
        values: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        values: [0, 10]
      }
    },
    insurance: {
      price: {
        label: "Importance of cheapest price",
        values: [0, 10]
      },
      service: {
        label: "Importance of best service",
        values: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        values: [0, 10]
      }
    },
    banking: {
      price: {
        label: "Importance of cheapest price",
        values: [0, 10]
      },
      service: {
        label: "Importance of best service",
        values: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        values: [0, 10]
      }
    },
    broadband: {
      price: {
        label: "Importance of cheapest price",
        values: [0, 10]
      },
      service: {
        label: "Importance of best service",
        values: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        values: [0, 10]
      }
    },
    mobile: {
      price: {
        label: "Importance of cheapest price",
        values: [0, 10]
      },
      service: {
        label: "Importance of best service",
        values: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        values: [0, 10]
      }
    },
    utilities: {
      price: {
        label: "Importance of cheapest price",
        values: [0, 10]
      },
      service: {
        label: "Importance of best service",
        values: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        values: [0, 10]
      }
    },
    auto: {
      price: {
        label: "Importance of cheapest price",
        values: [0, 10]
      },
      service: {
        label: "Importance of best service",
        values: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        values: [0, 10]
      }
    }
  }
}
);

module.exports = mongoose.model('Service', serviceSchema)
