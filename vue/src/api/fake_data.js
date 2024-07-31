import axios from 'axios';
import { faker } from '@faker-js/faker';

const _axios = axios.create({
  baseURL: import.meta.env.VITE_APP_NODE_URL,
  headers: {
    accept: "application/json",
  },
});

const token = localStorage.getItem('access_token');
if (token) {
  _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default {
  async getLeads() {

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomBoolean() {
      return Math.random() < 0.5;
    }

    function getPreferenceValues() {
      let prefs = {
        price: getRandomNumber(0, 10),
        service: getRandomNumber(0, 10),
        features: getRandomNumber(0, 10),
      }
      return prefs;
    }

    let array = [];
    for (let i = 0; i < 20; i++) {
      const general = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        country: faker.address.country(),
        customer_number: faker.random.alphaNumeric(10),
        dob: faker.date.past().toISOString(),
        household_members: parseInt(faker.random.numeric({ min: 1, max: 10 })),
        phone: faker.phone.number('+45########'),
      };

      const mobile = {
        invoice_total_due: parseFloat(faker.finance.amount(50, 1000, 2)),
        invoice_debit_date: faker.date.past(),
        phone_number: faker.phone.number(),
        invoice_period: {
          from: faker.date.past(),
          to: faker.date.recent(),
        },
        plan_talk_minutes: parseInt(faker.random.numeric(3)),
        plan_data_speed: parseInt(faker.random.numeric(3)),
        plan_data_gb: parseInt(faker.random.numeric(2)),
        plan_teleservice: faker.random.word(),
        phone_installment: parseFloat(faker.finance.amount(20, 1000, 2)),
        equipment_installment: parseFloat(faker.finance.amount(0, 1000, 2)),
      };

      const mortgage = {
        loan_number: getRandomNumber(100000, 999999),
        loan_details: faker.lorem.sentence(),
        principal_amount: parseFloat(faker.finance.amount(50, 1000, 2)),
        interest_rate: parseFloat(faker.finance.amount(1, 5, 1)),
        mortgage_contribution: parseFloat(faker.finance.amount(1, 5, 1)),
        interest_paid: parseFloat(faker.finance.amount(50, 1000, 2)),
        installment_paid: parseFloat(faker.finance.amount(50, 1000, 2)),
        total_due: parseFloat(faker.finance.amount(50, 1000, 2)),
        debit_date: faker.date.past(),
        terms_remaining: parseInt(faker.random.numeric(2)),
      };

      const energy = {
        total_due: parseFloat(faker.finance.amount(50, 1000, 2)),
        debit_date: faker.date.past(),
        kwh_amount: getRandomNumber(100, 1000),
        fees_amount: parseFloat(faker.finance.amount(0, 1000, 2)),
        taxes_amount: parseFloat(faker.finance.amount(0, 100, 2)),
        additional_services: faker.random.word(),
        prepaid_amount: parseFloat(faker.finance.amount(0, 1000, 2)),
      };
      const car_insurance = {
        total_due: parseFloat(faker.finance.amount(0, 1000, 2)),
        debit_date: faker.date.past(),
        valid_from: faker.date.past(),
        number_plate: faker.vehicle.vrm(),
        vehicle: {
          make: faker.vehicle.manufacturer(),
          model: faker.vehicle.model(),
          fuel: faker.vehicle.fuel(),
          speedometer: parseInt(faker.random.numeric({ min: 5000, max: 200000 })) + ' km',
        },
        additional_services: {
          glass_damage: faker.datatype.boolean(),
          theft_protection: faker.datatype.boolean(),
          roadside_assistance: faker.datatype.boolean(),
        },
        own_risk_amount: parseFloat(faker.finance.amount(0, 1000, 2)),
      };

      const broadband = {
        total_due: parseFloat(faker.finance.amount(0, 1000, 2)),
        debit_date: faker.date.past(),
        plan_data_speed: parseFloat(faker.random.numeric({ min: 50, max: 500 })),
        plan_data_gb: parseFloat(faker.random.numeric(2)),
      };

      const home_insurance = {
        total_due: parseFloat(faker.finance.amount(0, 1000, 2)),
        debit_date: faker.date.past(),
        valid_from: faker.date.past(),
        address: faker.address.streetAddress(),
        own_risk_amount: parseFloat(faker.finance.amount(0, 1000, 2)),
        add_ons: {
          fire_protection: faker.datatype.boolean(),
          water_damage_protection: faker.datatype.boolean(),
          storm_damage_protection: faker.datatype.boolean(),
        },
        alarm_discount: faker.datatype.boolean(),
      };

      let obj = {
        userId: getRandomNumber(100000, 999999),
        match: getRandomNumber(30, 99),
        value: getRandomNumber(5, 4000),
        data: {
          general: { identifying_data: general },
          mobile: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: mobile },
          mortgage: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: mortgage },
          energy: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: energy },
          car_insurance: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: car_insurance },
          home_insurance: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: home_insurance },
          broadband: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: broadband },
        }
      };
      array.push(obj);
    }

    await _axios.post('/leads/create-leads', { leads: array });
    return array;

  },


  async getServiceFields(num) {

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomBoolean() {
      return Math.random() < 0.5;
    }

    function getPreferenceValues() {
      let prefs = {
        price: getRandomNumber(0, 10),
        service: getRandomNumber(0, 10),
        features: getRandomNumber(0, 10),
      }
      return prefs;
    }

    let array = [];
    for (let i = 0; i < num; i++) {
      const general = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        country: faker.address.country(),
        customer_number: faker.random.alphaNumeric(10),
        dob: faker.date.past().toISOString(),
        household_members: parseInt(faker.random.numeric({ min: 1, max: 10 })),
        phone: faker.phone.number('+45########'),
      };

      const mobile = {
        invoice_total_due: parseFloat(faker.finance.amount(50, 1000, 2)),
        invoice_debit_date: faker.date.past(),
        phone_number: faker.phone.number(),
        invoice_period: {
          from: faker.date.past(),
          to: faker.date.recent(),
        },
        plan_talk_minutes: parseInt(faker.random.numeric(3)),
        plan_data_speed: parseInt(faker.random.numeric(3)),
        plan_data_gb: parseInt(faker.random.numeric(2)),
        plan_teleservice: faker.random.word(),
        phone_installment: parseFloat(faker.finance.amount(20, 1000, 2)),
        equipment_installment: parseFloat(faker.finance.amount(0, 1000, 2)),
      };

      const mortgage = {
        loan_number: getRandomNumber(100000, 999999),
        loan_details: faker.lorem.sentence(),
        principal_amount: parseFloat(faker.finance.amount(50, 1000, 2)),
        interest_rate: parseFloat(faker.finance.amount(1, 5, 1)),
        mortgage_contribution: parseFloat(faker.finance.amount(1, 5, 1)),
        interest_paid: parseFloat(faker.finance.amount(50, 1000, 2)),
        installment_paid: parseFloat(faker.finance.amount(50, 1000, 2)),
        total_due: parseFloat(faker.finance.amount(50, 1000, 2)),
        debit_date: faker.date.past(),
        terms_remaining: parseInt(faker.random.numeric(2)),
      };

      const energy = {
        total_due: parseFloat(faker.finance.amount(50, 1000, 2)),
        debit_date: faker.date.past(),
        kwh_amount: getRandomNumber(100, 1000),
        fees_amount: parseFloat(faker.finance.amount(0, 1000, 2)),
        taxes_amount: parseFloat(faker.finance.amount(0, 100, 2)),
        additional_services: faker.random.word(),
        prepaid_amount: parseFloat(faker.finance.amount(0, 1000, 2)),
      };
      const car_insurance = {
        total_due: parseFloat(faker.finance.amount(0, 1000, 2)),
        debit_date: faker.date.past(),
        valid_from: faker.date.past(),
        number_plate: faker.vehicle.vrm(),
        vehicle: {
          make: faker.vehicle.manufacturer(),
          model: faker.vehicle.model(),
          fuel: faker.vehicle.fuel(),
          speedometer: parseInt(faker.random.numeric({ min: 5000, max: 200000 })) + ' km',
        },
        additional_services: {
          glass_damage: faker.datatype.boolean(),
          theft_protection: faker.datatype.boolean(),
          roadside_assistance: faker.datatype.boolean(),
        },
        own_risk_amount: parseFloat(faker.finance.amount(0, 1000, 2)),
      };

      const broadband = {
        total_due: parseFloat(faker.finance.amount(0, 1000, 2)),
        debit_date: faker.date.past(),
        plan_data_speed: parseFloat(faker.random.numeric({ min: 50, max: 500 })),
        plan_data_gb: parseFloat(faker.random.numeric(2)),
      };

      const home_insurance = {
        total_due: parseFloat(faker.finance.amount(0, 1000, 2)),
        debit_date: faker.date.past(),
        valid_from: faker.date.past(),
        address: faker.address.streetAddress(),
        own_risk_amount: parseFloat(faker.finance.amount(0, 1000, 2)),
        add_ons: {
          fire_protection: faker.datatype.boolean(),
          water_damage_protection: faker.datatype.boolean(),
          storm_damage_protection: faker.datatype.boolean(),
        },
        alarm_discount: faker.datatype.boolean(),
      };

      let obj = {
        userId: getRandomNumber(100000, 999999),
        match: getRandomNumber(30, 99),
        value: getRandomNumber(5, 4000),
        data: {
          general: { identifying_data: general },
          mobile: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: mobile },
          mortgage: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: mortgage },
          energy: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: energy },
          car_insurance: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: car_insurance },
          home_insurance: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: home_insurance },
          broadband: { status: getRandomBoolean(), preference_data: getPreferenceValues(), interaction_data: broadband },
        }
      };
      array.push(obj);
    }
    // await _axios.post('/leads/create-leads', { leads: array });
    return array;
  },











  async updateLeads() {
    try {
      const response = await _axios.put('/leads/update-leads');
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

}
