// import { filter } from "core-js/core/array";

// this will be replaced with data from the backend
const service_data = {
  general: {
    identifying_data: {
      first_name: { type: String, required: false, filter_type: "string" },
      last_name: { type: String, required: false, filter_type: "string" },
      address: { type: String, required: false, filter_type: "string" },
      postal_code: { type: String, required: false, filter_type: "string" },
      country: { type: String, required: false, filter_type: "string" },
      customer_number: { type: String, required: false, filter_type: "string" },
      dob: { type: String, required: false, filter_type: "string" },
      household_members: { type: Number, required: false, filter_type: "range_number" },
      phone: { type: Number, required: false, filter_type: "identifier_number" },
    }
  },
  mobile: {
    interaction_data: {
      invoice_debit_amount: { type: Number, required: false, filter_type: "range_amount" },
      invoice_debit_date: { type: String, required: false, filter_type: "date" },
      phone_number: { type: Number, required: false, filter_type: "identifier_number" },
      invoice_period: {
        from: { type: String, required: false, filter_type: "string" },
        to: { type: String, required: false, filter_type: "string" }, filter_type: "range_date"
      },
      plan_talk_minutes: { type: Number, required: false, filter_type: "range_number" },
      plan_data_speed: { type: Number, required: false, filter_type: "range_number" },
      plan_data_gb: { type: Number, required: false, filter_type: "range_number" },
      plan_teleservice: { type: String, required: false, filter_type: "string" },
      phone_installment: { type: String, required: false, filter_type: "string" },
      equipment_installment: { type: String, required: false, filter_type: "string" }
    },
    preference_data: {
      price: {
        label: "Importance of cheapest price",
        filter_type: "range_slider",
        range: [0, 10]
      },
      service: {
        label: "Importance of best service",
        filter_type: "range_slider",
        range: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        filter_type: "range_slider",
        range: [0, 10]
      }
    }
  },
  mortgage: {
    interaction_data: {
      loan_number: { type: Number, required: false, filter_type: "identifier_number" },
      loan_details: { type: String, required: false, filter_type: "string" },
      principal_amount: { type: Number, required: false, filter_type: "range_amount" },
      interest_rate: { type: Number, required: false, filter_type: "range_amount", range: [0, 10] },
      mortgage_contribution: { type: Number, required: false, filter_type: "range_amount" },
      interest_paid: { type: Number, required: false, filter_type: "range_amount" },
      installment_paid: { type: Number, required: false, filter_type: "range_amount" },
      debit_amount: { type: Number, required: false, filter_type: "range_amount" },
      debit_date: { type: String, required: false, filter_type: "date" },
      terms_remaining: { type: String, required: false, filter_type: "string", range: [0, 50] },
    },
    preference_data: {
      price: {
        label: "Importance of cheapest price",
        filter_type: "range_slider",
        range: [0, 10]
      },
      service: {
        label: "Importance of best service",
        filter_type: "range_slider",
        range: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        filter_type: "range_slider",
        range: [0, 10]
      }
    }
  },
  energy: {
    interaction_data: {
      debit_amount: { type: Number, required: false, filter_type: "range_amount" },
      debit_date: { type: String, required: false, filter_type: "date" },
      kwh_amount: { type: Number, required: false, filter_type: "range_amount" },
      fees_amount: { type: Number, required: false, filter_type: "range_amount" },
      taxes_amount: { type: Number, required: false, filter_type: "range_amount" },
      additional_services: { type: String, required: false, filter_type: "string" },
      prepaid_amount: { type: Number, required: false, filter_type: "range_amount" },
    },
    preference_data: {
      price: {
        label: "Importance of cheapest price",
        filter_type: "range_slider",
        range: [0, 10]
      },
      service: {
        label: "Importance of best service",
        filter_type: "range_slider",
        range: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        filter_type: "range_slider",
        range: [0, 10]
      }
    }
  },
  car_insurance: {
    interaction_data: {
      debit_amount: { type: Number, required: false, filter_type: "range_amount" },
      debit_date: { type: String, required: false, filter_type: "date" },
      valid_from: { type: String, required: false, filter_type: "string" },
      number_plate: { type: String, required: false, filter_type: "string" },
      vehicle: {
        make: { type: String, required: false, filter_type: "string" },
        model: { type: String, required: false, filter_type: "string" },
        fuel: { type: String, required: false, filter_type: "string" },
        speedometer: { type: String, required: false, filter_type: "string" }
      },
      additional_services: { type: Object, required: false },
      own_risk_amount: { type: Number, required: false, filter_type: "range_amount" },
    },
    preference_data: {
      price: {
        label: "Importance of cheapest price",
        filter_type: "range_slider",
        range: [0, 10]
      },
      service: {
        label: "Importance of best service",
        filter_type: "range_slider",
        range: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        filter_type: "range_slider",
        range: [0, 10]
      }
    }
  },
  home_insurance: {
    interaction_data: {
      debit_amount: { type: Number, required: false, filter_type: "range_amount" },
      debit_date: { type: String, required: false, filter_type: "date" },
      valid_from: { type: String, required: false, filter_type: "string" },
      address: { type: String, required: false, filter_type: "string" },
      own_risk_amount: { type: Number, required: false, filter_type: "range_amount" },
      add_ons: { type: Object, required: false, filter_type: "object" },
      alarm_discount: { type: Boolean, required: false, filter_type: "boolean" },
    },
    preference_data: {
      price: {
        label: "Importance of cheapest price",
        filter_type: "range_slider",
        range: [0, 10]
      },
      service: {
        label: "Importance of best service",
        filter_type: "range_slider",
        range: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        filter_type: "range_slider",
        range: [0, 10]
      }
    }
  },
  broadband: {
    interaction_data: {
      debit_amount: { type: Number, required: false, filter_type: "range_amount" },
      debit_date: { type: String, required: false, filter_type: "date" },
      plan_data_speed: { type: Number, required: false, filter_type: "range_number" },
      plan_data_gb: { type: Number, required: false, filter_type: "range_number" },
    },
    preference_data: {
      price: {
        label: "Importance of cheapest price",
        filter_type: "range_slider",
        range: [0, 10]
      },
      service: {
        label: "Importance of best service",
        filter_type: "range_slider",
        range: [0, 10]
      },
      features: {
        label: "Importance of lots of features",
        filter_type: "range_slider",
        range: [0, 10]
      }
    }
  },
}

// I'd like to not have to hard code this, but is there somewhere this could be stored in backend?
const categories = {
  mobile: {
    selected: false,
    icon: "smartphone",
    code: 2
  },
  mortgage: {
    selected: false,
    icon: "house",
    code: 16
  },
  energy: {
    selected: false,
    icon: "lightbulb",
    code: 8
  },
  car_insurance: {
    selected: false,
    icon: "directions_car",
    code: 32
  },
  home_insurance: {
    selected: false,
    icon: "verified_user",
    code: 64
  },
  broadband: {
    selected: false,
    icon: "language",
    code: 4
  },
  // banking: {
  //   selected: false,
  //   icon: "credit_card",
  // },
}

/*  

// Here's how these look in the database (as of June 1):

const serviceTypes = [
  {
    "serviceType": 1,
    "serviceTypeString": "Unknown"
  },
  {
    "serviceType": 2,
    "serviceTypeString": "Mobile"
  },
  {
    "serviceType": 4,
    "serviceTypeString": "Broadband"
  },
  {
    "serviceType": 8,
    "serviceTypeString": "Electricity"
  },
  {
    "serviceType": 16,
    "serviceTypeString": "Mortgage"
  },
  {
    "serviceType": 32,
    "serviceTypeString": "HomeInsurance"
  },
  {
    "serviceType": 64,
    "serviceTypeString": "CarInsurance"
  },
  {
    "serviceType": 128,
    "serviceTypeString": "MedicalInsurance"
  },
  {
    "serviceType": 256,
    "serviceTypeString": "TravelInsurance"
  },
  {
    "serviceType": 512,
    "serviceTypeString": "PetInsurance"
  }
] 
*/

/*



HOW THIS WORKS (needs updating)
 
1. Services get loaded from api in App.vue, and saved in store as 'services' (temporarily 'service_data' variable)
2. When a user sets a filter, it gets saved in the 'filters' object in the store
3. 'setFilteredServices' merges the services and filters. Anything in 'filters' overwrites the same key in 'services'.
4. 'filtersChanged' toggles value of filters, which triggers a watcher in the opportunities dashboard to reload the loads.
5. to reset filters, call setFilteredServices with an empty filters object
 
*/

export default {
  state() {
    return {
      categories: categories,
      services: service_data,
      filters: {},
      filteredServices: service_data, // update with { ...service_data, ...filters },
      filtersChanged: false
    };
  },
  mutations: {
    setServices(state, payload) {
      state.services = payload.val
    },
    setFilters(state, payload) {
      state.filters = payload.val
    },
    setFilteredServices(state, payload) {
      state.filteredServices = payload.val
    },
    filtersChanged(state, payload) {
      state.filtersChanged = payload.val
    },
    setCategories(state, payload) {
      state.categories = payload.val
    },
  },
  actions: {
    // createServices(context, access) {
    //   console.log('access', access)
    //   const combined_object = {};
    //   Object.keys(interaction_data).forEach(key => {
    //     if (access[key]?.status === true || key === 'general') {
    //       combined_object[key] = {
    //         // preference_data: { ...preference_data[key] },
    //         // interaction_data: { ...interaction_data[key] }
    //         // combined_object[key] = {
    //         ...interaction_data[key],
    //         ...preference_data[key]
    //         // };
    //       }
    //     }
    //   });
    //   context.commit('setServices', { val: combined_object });
    //   context.commit('setFilters', { val: combined_object });
    // },
    setFilters(context, filters) {
      context.commit('setFilters', { val: filters });
    },
    setFilteredServices(context, filters) {
      let services = context.state.services;
      let filteredServices = { ...services, ...filters };
      context.commit('setFilteredServices', { val: filteredServices });
    },
    filtersChanged(context) {
      context.commit('filtersChanged', { val: !context.getters.filtersChanged });
    },
    setCategories(context, categories) {
      context.commit('setCategories', { val: categories });
    },
    setAccess(context, access) {

      let categories = context.getters.categories;
      const filteredCategories = Object.assign({}, categories);
      console.log('filteredCategories', filteredCategories)
      // for each item in 'access', if there is a matching key in 'categories', set that key's status to true
      access.forEach(category => {
        filteredCategories[category] = {
          ...categories[category],
          selected: true
        };
      })

      // for (const category in categories) {
      //   if (access[category].status === true) {
      //     filteredCategories[category] = {
      //       ...access[category],
      //       ...categories[category]
      //     };
      //   }
      // }
      console.log('filteredCategories', filteredCategories)
      context.commit('setFilters', { val: filteredCategories });
      context.commit('setCategories', { val: filteredCategories });
      console.log('setAccess finished')
    },
  },
  getters: {
    filters(state) {
      return state.filters;
    },
    filtersChanged(state) {
      return state.filtersChanged;
    },
    filteredServices(state) {
      return state.filteredServices;
    },
    categories(state) {
      return state.categories;
    },
    preferences(state) {
      return state.preferences;
    },
    services(state) {
      return state.services;
    }
  }
}