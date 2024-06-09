// import { filter } from "core-js/core/array";

// this will be replaced with data from the backend
const service_data = {
  general: {
    identifying_data: {
      // first_name: { type: String, required: false, filter_type: "string" },
      // last_name: { type: String, required: false, filter_type: "string" },
      // address: { type: String, required: false, filter_type: "string" },
      // postal_code: { type: String, required: false, filter_type: "string" },
      // geo_location: { type: Number, required: false, filter_type: "range_number" },
      // country: { type: String, required: false, filter_type: "country" },
      // date_of_birth: { type: String, required: false, filter_type: "date" },
      geo_location: { type: String, required: false, filter_type: "coordinates" },
      // customer_number: { type: String, required: false, filter_type: "string" },
      number_of_adults_in_household: { type: Number, required: false, filter_type: "range_number" },
      number_of_children_in_household: { type: Number, required: false, filter_type: "range_number" },
      // phone_number_masked: { type: Number, required: false, filter_type: "identifier_number" },
    },
    preference_data: {
      /*  fields are:
      - Saving money importance?
      - Quality over cost?
      - Eco-friendliness priority?
      - Customer service value?
      - Need for plan flexibility?
      - Latest tech importance?
      - Bundling services preference?
      - Fixed rate preference?
      */
      saving_money_importance: {
        label: "Saving money importance?",
        filter_type: "range_slider",
        range: [0, 10]
      },
      quality_over_cost: {
        label: "Quality over cost?",
        filter_type: "range_slider",
        range: [0, 10]
      },
      eco_friendliness_priority: {
        label: "Eco-friendliness priority?",
        filter_type: "range_slider",
        range: [0, 10]
      },
      customer_service_value: {
        label: "Customer service value?",
        filter_type: "range_slider",
        range: [0, 10]
      },
      need_for_plan_flexibility: {
        label: "Need for plan flexibility?",
        filter_type: "range_slider",
        range: [0, 10]
      },
      latest_tech_importance: {
        label: "Latest tech importance?",
        filter_type: "range_slider",
        range: [0, 10]
      },
      bundling_services_preference: {
        label: "Bundling services preference?",
        filter_type: "range_slider",
        range: [0, 10]
      },
      fixed_rate_preference: {
        label: "Fixed rate preference?",
        filter_type: "range_slider",
        range: [0, 10]
      }
    }
  },
  mobile: {
    interaction_data: {
      /*    invoice_total_due: { type: Number, required: false, filter_type: "range_amount" },
         invoice_debit_date: { type: String, required: false, filter_type: "date" },
         // phone_number: { type: Number, required: false, filter_type: "identifier_number" },
         phone_number: { type: String, required: false, filter_type: "string" },
         invoice_period: {
           from: { type: String, required: false, filter_type: "string" },
           to: { type: String, required: false, filter_type: "string" }, filter_type: "range_date"
         },
         plan_talk_minutes: { type: Number, required: false, filter_type: "range_number" },
         plan_data_speed: { type: Number, required: false, filter_type: "range_number" },
         plan_data_gb: { type: Number, required: false, filter_type: "range_number" },
         plan_teleservice: { type: String, required: false, filter_type: "string" },
         phone_installment: { type: Number, required: false, filter_type: "range_number" },
         equipment_installment: { type: Number, required: false, filter_type: "range_number" }, */
      total_due: { type: Number, required: false, filter_type: "range_amount" },
      payment_date: { type: String, required: false, filter_type: "date" },
      mobile_number: { type: String, required: false, filter_type: "string" },
      call_minutes: { type: Number, required: false, filter_type: "range_number" },
      internet_speed: { type: Number, required: false, filter_type: "range_number" },
      data_limit: { type: Number, required: false, filter_type: "range_number" },
      extra_services: { type: String, required: false, filter_type: "string" },
      device_payment: { type: Number, required: false, filter_type: "range_number" },
      accessory_payment: { type: Number, required: false, filter_type: "range_number" },
      service_provider_name: { type: String, required: false, filter_type: "string" },

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
      /* 
      loan_number: { type: Number, required: false, filter_type: "identifier_number" },
      loan_details: { type: String, required: false, filter_type: "string" },
      principal_amount: { type: Number, required: false, filter_type: "range_amount" },
      interest_rate: { type: Number, required: false, filter_type: "range_amount", range: [0, 10] },
      mortgage_contribution: { type: Number, required: false, filter_type: "range_amount" },
      interest_paid: { type: Number, required: false, filter_type: "range_amount" },
      installment_paid: { type: Number, required: false, filter_type: "range_amount" },
      total_due: { type: Number, required: false, filter_type: "range_amount" },
      debit_date: { type: String, required: false, filter_type: "date" },
      terms_remaining: { type: String, required: false, filter_type: "string", range: [0, 50] },
        */
      loan_id: { type: String, required: false, filter_type: "string" },
      total_due: { type: Number, required: false, filter_type: "range_amount" },
      due_date: { type: String, required: false, filter_type: "date" },
      balance: { type: Number, required: false, filter_type: "range_number" },
      interest_rate: { type: Number, required: false, filter_type: "range_number" },
      term: { type: String, required: false, filter_type: "string" },
      type: { type: String, required: false, filter_type: "string" },
      escrow: { type: Number, required: false, filter_type: "range_number" },
      contract_start_date: { type: String, required: false, filter_type: "date" },
      payment_history: { type: String, required: false, filter_type: "string" },
      contact_info: { type: String, required: false, filter_type: "string" },
      service_provider_name: { type: String, required: false, filter_type: "string" },
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
      total_paid: { type: Number, required: false, filter_type: "range_amount" },
      energy_usage_total: { type: Number, required: false, filter_type: "range_amount" },
      current_kwh_rate: { type: Number, required: false, filter_type: "range_amount" },
      taxes_fees: { type: Number, required: false, filter_type: "range_amount" },
      discounts: { type: String, required: false, filter_type: "string" },
      additional_services: { type: String, required: false, filter_type: "string" },
      green_energy: { type: Boolean, required: false, filter_type: "boolean" },
      contract_start: { type: String, required: false, filter_type: "date" },
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
      /*       total_due: { type: Number, required: false, filter_type: "range_amount" },
            debit_date: { type: String, required: false, filter_type: "date" },
            valid_from: { type: String, required: false, filter_type: "date" },
            number_plate: { type: String, required: false, filter_type: "string" },
            vehicle: {
              make: { type: String, required: false, filter_type: "string" },
              model: { type: String, required: false, filter_type: "string" },
              fuel: { type: String, required: false, filter_type: "string" },
              speedometer: { type: String, required: false, filter_type: "string" }
            },
            additional_services: { type: Object, required: false },
            own_risk_amount: { type: Number, required: false, filter_type: "range_amount" }, */
      policy_number: { type: String, required: false, filter_type: "string" },
      coverage_type: { type: String, required: false, filter_type: "string" },
      monthly_premium: { type: Number, required: false, filter_type: "range_number" },
      due_date: { type: String, required: false, filter_type: "date" },
      policy_start_date: { type: String, required: false, filter_type: "date" },
      policy_end_date: { type: String, required: false, filter_type: "date" },
      deductible: { type: Number, required: false, filter_type: "range_number" },
      covered_vehicles: { type: String, required: false, filter_type: "string" },
      drivers_listed: { type: String, required: false, filter_type: "string" },
      contact_info: { type: String, required: false, filter_type: "string" },
      service_provider_name: { type: String, required: false, filter_type: "string" },
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
      /*       total_due: { type: Number, required: false, filter_type: "range_amount" },
            debit_date: { type: String, required: false, filter_type: "date" },
            valid_from: { type: String, required: false, filter_type: "string" },
            address: { type: String, required: false, filter_type: "string" },
            own_risk_amount: { type: Number, required: false, filter_type: "range_amount" },
            add_ons: { type: Object, required: false, filter_type: "object" },
            alarm_discount: { type: Boolean, required: false, filter_type: "boolean" }, */
      policy_number: { type: String, required: false, filter_type: "string" },
      insurance_type: { type: String, required: false, filter_type: "string" },
      premium_due: { type: Number, required: false, filter_type: "range_number" },
      next_payment_date: { type: String, required: false, filter_type: "date" },
      coverage_start_date: { type: String, required: false, filter_type: "date" },
      renewal_date: { type: String, required: false, filter_type: "date" },
      coverage_amount: { type: Number, required: false, filter_type: "range_number" },
      deductible: { type: Number, required: false, filter_type: "range_number" },
      covered_perils: { type: String, required: false, filter_type: "string" },
      contact_for_claims: { type: String, required: false, filter_type: "string" },
      service_provider_name: { type: String, required: false, filter_type: "string" },
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
  banking: {
    interaction_data: {
      invoice_number: { type: String, required: false, filter_type: "string" },
      loan_number: { type: String, required: false, filter_type: "string" },
      loan_details: { type: String, required: false, filter_type: "string" },
      principal_amount: { type: Number, required: false, filter_type: "range_number" },
      interest_rate: { type: Number, required: false, filter_type: "range_number" },
      interest_paid: { type: Number, required: false, filter_type: "range_number" },
      installment_paid: { type: Number, required: false, filter_type: "range_number" },
      total_amount_debited: { type: Number, required: false, filter_type: "range_number" },
      date_amount_debited: { type: String, required: false, filter_type: "date" },
      remaining_terms: { type: String, required: false, filter_type: "string" },
      deposit_account_number: { type: String, required: false, filter_type: "string" },
      service_provider_name: { type: String, required: false, filter_type: "string" },
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
      bill_id: { type: String, required: false, filter_type: "string" },
      total_due: { type: Number, required: false, filter_type: "range_amount" },
      due_date: { type: String, required: false, filter_type: "date" },
      service_period: { type: String, required: false, filter_type: "string" },
      broadband_speed: { type: Number, required: false, filter_type: "range_number" },
      data_cap: { type: Number, required: false, filter_type: "range_number" },
      monthly_charge: { type: Number, required: false, filter_type: "range_number" },
      equipment_rental: { type: Number, required: false, filter_type: "range_number" },
      additional_fees: { type: Number, required: false, filter_type: "range_number" },
      service_provider_name: { type: String, required: false, filter_type: "string" },
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
  general: {
    selected: false,
    icon: "info",
    // code: 1
  },
  unknown: {
    selected: false,
    icon: "question_mark",
    code: 1
  },
  mobile: {
    selected: false,
    icon: "smartphone",
    code: 2
  },
  broadband: {
    selected: false,
    icon: "language",
    code: 4
  },
  energy: {
    selected: false,
    icon: "lightbulb",
    code: 8
  },
  mortgage: {
    selected: false,
    icon: "house",
    code: 16
  },
  home_insurance: {
    selected: false,
    icon: "verified_user",
    code: 32
  },
  car_insurance: {
    selected: false,
    icon: "directions_car",
    code: 64
  },
  medical_insurance: {
    selected: false,
    icon: "health_and_safety",
    code: 128
  },
  pension: {
    selected: false,
    icon: "account_balance",
    code: 256
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
      filtersChanged: false,
      filtersChangedExternally: false,
    };
  },
  mutations: {
    setServices(state, val) {
      state.services = val
    },
    setFilters(state, val) {
      state.filters = val
    },
    setFilteredServices(state, val) {
      state.filteredServices = val
    },
    filtersChanged(state, val) {
      state.filtersChanged = val
    },
    filtersChangedExternally(state, val) {
      state.filtersChangedExternally = val
    },
    setCategories(state, val) {
      state.categories = val
    },
  },
  actions: {
    setFilters(context, filters) {
      context.commit('setFilters', filters);
    },
    setFilteredServices(context, filters) {
      let services = context.state.services;
      let filteredServices = { ...services, ...filters };
      context.commit('setFilteredServices', filteredServices);
    },
    filtersChanged(context) {
      context.commit('filtersChanged', !context.getters.filtersChanged);
    },
    filtersChangedExternally(context) {
      context.commit('filtersChangedExternally', !context.state.filtersChangedExternally);
    },
    setCategories(context, categories) {
      context.commit('setCategories', categories);
    },
    setAccess(context, access) {

      let categories = context.getters.categories;
      const filteredCategories = Object.assign({}, categories);

      access.forEach(category => {
        filteredCategories[category] = {
          ...categories[category],
          selected: true
        };
      })
      context.commit('setCategories', filteredCategories);
    },
  },
  getters: {
    filters: state => state.filters,
    filtersChanged: state => state.filtersChanged,
    filtersChangedExternally: state => state.filtersChangedExternally,
    filteredServices: state => state.filteredServices,
    fullCategories: state => state.categories,
    categories: state => {
      let categoriesCopy = { ...state.categories };
      delete categoriesCopy.unknown;
      delete categoriesCopy.general;
      return categoriesCopy;
    },
    preferences: state => state.preferences,
    services: state => state.services,
  }
}