const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  userId: { type: Number, required: false },
  match: { type: Number, required: false },
  value: { type: Number, required: false },
  data: {
    general: {
      // first_name: { type: String, required: false },
      // last_name: { type: String, required: false },
      // address: { type: String, required: false },
      // postal_code: { type: String, required: false },
      // country: { type: String, required: false },
      // customer_number: { type: String, required: false },
      // dob: { type: Date, required: false },
      // household_members: { type: Number, required: false },
      phone: { type: String, required: false },
      identifying_data: {
        first_name: { type: String, required: false },
        last_name: { type: String, required: false },
        address: { type: String, required: false },
        postal_code: { type: String, required: false },
        country: { type: String, required: false },
        customer_number: { type: String, required: false },
        dob: { type: Date, required: false },
        household_members: { type: Number, required: false },
        phone: { type: String, required: false },
      }
    },

    mobile: {
      status: { type: Boolean, required: false },
      preference_data: {
        price: { type: Number, required: false },
        service: { type: Number, required: false },
        features: { type: Number, required: false },
      },
      interaction_data: {
        invoice_total_due: { type: Number, required: false },
        invoice_debit_date: { type: Date, required: false },
        phone_number: { type: String, required: false },
        invoice_period: {
          from: { type: Date, required: false },
          to: { type: Date, required: false },
        },
        plan_talk_minutes: { type: Number, required: false },
        plan_data_speed: { type: Number, required: false },
        plan_data_gb: { type: Number, required: false },
        plan_teleservice: { type: String, required: false },
        phone_installment: { type: Number, required: false },
        equipment_installment: { type: Number, required: false },
      },
    },
    mortgage: {
      status: { type: Boolean, required: false },
      preference_data: {
        price: { type: Number, required: false },
        service: { type: Number, required: false },
        features: { type: Number, required: false },
      },
      interaction_data: {
        loan_number: { type: Number, required: false },
        loan_details: { type: String, required: false },
        principal_amount: { type: Number, required: false },
        interest_rate: { type: Number, required: false },
        mortgage_contribution: { type: Number, required: false },
        interest_paid: { type: Number, required: false },
        installment_paid: { type: Number, required: false },
        total_due: { type: Number, required: false },
        debit_date: { type: Date, required: false },
        terms_remaining: { type: Number, required: false },
      },
    },
    energy: {
      status: { type: Boolean, required: false },
      preference_data: {
        price: { type: Number, required: false },
        service: { type: Number, required: false },
        features: { type: Number, required: false },
      },
      interaction_data: {
        total_due: { type: Number, required: false },
        debit_date: { type: Date, required: false },
        kwh_amount: { type: Number, required: false },
        fees_amount: { type: Number, required: false },
        taxes_amount: { type: Number, required: false },
        additional_services: { type: String, required: false },
        prepaid_amount: { type: Number, required: false },
      },
    },
    car_insurance: {
      status: { type: Boolean, required: false },
      preference_data: {
        price: { type: Number, required: false },
        service: { type: Number, required: false },
        features: { type: Number, required: false },
      },
      interaction_data: {
        total_due: { type: Number, required: false },
        debit_date: { type: Date, required: false },
        valid_from: { type: Date, required: false },
        number_plate: { type: String, required: false },
        vehicle: {
          make: { type: String, required: false },
          model: { type: String, required: false },
          fuel: { type: String, required: false },
          speedometer: { type: String, required: false },
        },
        glass_damage: { type: Boolean, required: false },
        theft_protection: { type: Boolean, required: false },
        roadside_assistance: { type: Boolean, required: false },
        own_risk_amount: { type: Number, required: false },
      },
    },
    home_insurance: {
      status: { type: Boolean, required: false },
      preference_data: {
        price: { type: Number, required: false },
        service: { type: Number, required: false },
        features: { type: Number, required: false },
      },
      interaction_data: {
        total_due: { type: Number, required: false },
        debit_date: { type: Date, required: false },
        valid_from: { type: Date, required: false },
        address: { type: String, required: false },
        own_risk_amount: { type: Number, required: false },
        fire_protection: { type: Boolean, required: false },
        water_damage_protection: { type: Boolean, required: false },
        storm_damage_protection: { type: Boolean, required: false },
        alarm_discount: { type: Boolean, required: false },
      },
    },
    broadband: {
      status: { type: Boolean, required: false },
      preference_data: {
        price: { type: Number, required: false },
        service: { type: Number, required: false },
        features: { type: Number, required: false },
      },
      interaction_data: {
        total_due: { type: Number, required: false },
        debit_date: { type: Date, required: false },
        plan_data_speed: { type: Number, required: false },
        plan_data_gb: { type: Number, required: false },
      },
    },
  },
}, { strict: false });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
