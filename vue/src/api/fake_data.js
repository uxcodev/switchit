import axios from 'axios';

const _axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    accept: "application/json",
  },
});

const token = localStorage.getItem('switchit_token');
if (token) {
  _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default {
  getLeads() {
    // Function to generate a random number between min and max (inclusive)
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to generate a random boolean value
    function getRandomBoolean() {
      return Math.random() < 0.5;
    }


    // Function to generate preferences
    function getPreferenceValues() {
      let prefs = {
        price: getRandomNumber(0, 10),
        service: getRandomNumber(0, 10),
        features: getRandomNumber(0, 10),
      }
      return prefs;
    }

    // Function to generate a random object for the access property
    function createPreferences() {
      return {
        mortgage: { status: getRandomBoolean(), preferences: getPreferenceValues() },
        insurance: { status: getRandomBoolean(), preferences: getPreferenceValues() },
        banking: { status: getRandomBoolean(), preferences: getPreferenceValues() },
        broadband: { status: getRandomBoolean(), preferences: getPreferenceValues() },
        mobile: { status: getRandomBoolean(), preferences: getPreferenceValues() },
        utilities: { status: getRandomBoolean(), preferences: getPreferenceValues() },
        auto: { status: getRandomBoolean(), preferences: getPreferenceValues() }
      };
    }

    // Generate the array of 50 objects
    let array = [];
    for (let i = 0; i < 50; i++) {
      let obj = {
        userId: getRandomNumber(100000, 999999),
        match: getRandomNumber(30, 99),
        value: getRandomNumber(5, 4000),
        // selected: false,
        access: createPreferences()
      };
      array.push(obj);
    }

    // // console.log(array); // Print the array to the console
    return array
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
