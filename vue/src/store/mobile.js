export default {
  state() {
    return {
      isMobile: false,
    };
  },
  mutations: {
    isMobile(state, payload) {
      state.isMobile = payload
    }
  },
  actions: {
    isMobile({ commit }) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileRegex = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
      const isMobile = isMobileRegex.test(userAgent);
      console.log('isMobile:', isMobile)
      commit('isMobile', isMobile)
    },
  },
  getters: {
    isMobile(state) {
      return state.isMobile;
    }
  }
}