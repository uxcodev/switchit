export default {

  state() {
    return {
      selectedLeads: null,
    };
  },
  mutations: {
    setSelectedLeads(state, payload) {
      console.log('setSelectedLeads', payload.val)
      state.selectedLeads = payload.val
    },
  },
  actions: {
    setSelectedLeads(context, selectedLeads) {
      context.commit('setSelectedLeads', { val: selectedLeads });
    },
  },
  getters: {
    selectedLeads(state) {
      return state.selectedLeads;
    },
  }
}

