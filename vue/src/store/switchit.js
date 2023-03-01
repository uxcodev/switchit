export default {
  state() {
    return {
      isAdmin: false,
      user: null,
      selectedLeads: null
    };
  },
  mutations: {
    isAdmin(state, payload) {
      state.isAdmin = payload.val
    },
    setUser(state, payload) {
      state.user = payload.val
    },
    setSelectedLeads(state, payload) {
      state.selectedLeads = payload.val
    }
  },
  actions: {
    isAdmin(context, val) {
      context.commit('isAdmin', { val: val });
    },
    setUser(context, user) {
      context.commit('setUser', { val: user });
    },
    setSelectedLeads(context, selectedLeads) {
      context.commit('setSelectedLeads', { val: selectedLeads });
    },
  },
  getters: {
    isAdmin(state) {
      return state.isAdmin;
    },
    user(state) {
      return state.user;
    },
    selectedLeads(state) {
      return state.selectedLeads;
    },
  }
}