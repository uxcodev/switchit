const categories = {
  mortgage: {
    selected: true,
    icon: "house",
    preferences: {
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
  },
  insurance: {
    selected: false,
    icon: "verified_user",
    preferences: {
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
  },
  banking: {
    selected: false,
    icon: "credit_card",
    preferences: {
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
  },
  broadband: {
    selected: false,
    icon: "language",
    preferences: {
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
  },
  mobile: {
    selected: false,
    icon: "smartphone",
    preferences: {
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
  },
  utilities: {
    selected: false,
    icon: "lightbulb",
    preferences: {
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
  },
  auto: {
    selected: false,
    icon: "directions_car",
    preferences: {
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
  },
};

// create some dummy preferences. Later these will be replaced, and will
// need to be unique for each category
const preferences = {
  price: { label: "Importance of cheapest price", values: [0, 10] },
  service: { label: "Importance of best service", values: [0, 10] },
  features: { label: "Importance of lots of features", values: [0, 10] },
}

let filters = {}


// make a list of filters that look like this:  mortgage_price_min: 0,
// these will be sent in the query as filters
const resetFilters = (categories) => {
  let f = {}
  for (let category in categories) {
    for (let preference in preferences) {
      f[`${category}_${preference}_min`] = 0;
      f[`${category}_${preference}_max`] = 10;
    }
  }
  return f
}
filters = resetFilters(categories)

export default {
  state() {
    return {
      filters: {
        ...filters
      },
      categories: categories,
      preferences: preferences
    };
  },
  mutations: {
    setFilters(state, payload) {
      state.filters = payload.val
    },
    setCategories(state, payload) {
      state.categories = payload.val
    },
  },
  actions: {
    setFilters(context, filters) {
      if (Object.keys(filters).length === 0) {
        let categories = context.getters.categories
        filters = resetFilters(categories)
        console.log('no filters', filters)
      }
      context.commit('setFilters', { val: filters });
    },
    setCategories(context, categories) {
      context.commit('setCategories', { val: categories });
    },
    setAccess(context, access) {

      console.log('setAccess')

      const filteredCategories = {};

      for (const category in access) {
        if (access[category].status === true) {

          filteredCategories[category] = {
            ...access[category],
            ...categories[category]
          };
        }
      }

      const filters = {}

      // make a list of filters that look like this:  mortgage_price_min: 0,
      // these will be sent in the query as filters
      for (let category in filteredCategories) {
        for (let preference in preferences) {
          filters[`${category}_${preference}_min`] = 0;
          filters[`${category}_${preference}_max`] = 10;
        }
      }
      console.log(filteredCategories)
      // console.log(filters)

      context.commit('setFilters', { val: filters });
      context.commit('setCategories', { val: filteredCategories });
      console.log('context.getters.categories')
      console.log(context.getters.categories)
      // this.categories = filteredCategories
    }
  },
  getters: {
    filters(state) {
      return state.filters;
    },
    categories(state) {
      return state.categories;
    },
    preferences(state) {
      return state.preferences;
    },
  }
}