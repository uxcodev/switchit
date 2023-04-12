const categories = {
  mortgage: {
    selected: false,
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


export default {
  state() {
    return {

      categories: categories,
      filters: { ...categories },
      filtersChanged: false
    };
  },
  mutations: {

    setFilters(state, payload) {
      state.filters = payload.val
    },
    filtersChanged(state, payload) {
      state.filtersChanged = payload.val
    },
    setCategories(state, payload) {
      state.categories = payload.val
    },
  },
  actions: {

    setFilters(context, filters) {
      context.commit('setFilters', { val: filters });
    },
    filtersChanged(context) {
      context.commit('filtersChanged', { val: !context.getters.filtersChanged });
    },
    setCategories(context, categories) {
      context.commit('setCategories', { val: categories });
    },
    setAccess(context, access) {

      // console.log('setAccess')

      const filteredCategories = {};

      for (const category in access) {
        if (access[category].status === true) {

          filteredCategories[category] = {
            ...access[category],
            ...categories[category]
          };
        }
      }

      context.commit('setFilters', { val: filteredCategories });
      context.commit('setCategories', { val: filteredCategories });
      // console.log('context.getters.categories')
      // console.log(context.getters.categories)
      // this.categories = filteredCategories
    },
  },
  getters: {
    filters(state) {
      return state.filters;
    },
    filtersChanged(state) {
      return state.filtersChanged;
    },
    categories(state) {
      return state.categories;
    },
    preferences(state) {
      return state.preferences;
    },
  }
}