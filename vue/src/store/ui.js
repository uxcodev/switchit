export default {
  state() {
    return {
      isOpen: false,
      counter: 0,
      loading: false,
    };
  },
  mutations: {
    setMenu(state, payload) {
      state.isOpen = payload.val
    },
  },
  actions: {
    openMenu(context) {
      context.commit('setMenu', { val: true });
    },
    closeMenu(context) {
      context.commit('setMenu', { val: false });
    },
    toggleMenu(context) {
      context.commit('setMenu', { val: !this.getters.isOpen })
    },
  },
  getters: {
    isOpen(state) {
      return state.isOpen;
    },
  }
}