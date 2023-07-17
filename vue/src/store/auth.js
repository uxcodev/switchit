import jwtDecode from 'jwt-decode'
import api from '@/api/api'
import auth0 from '@/helpers/auth0.js';

export default {
  state() {
    return {
      isAdmin: false,
      activeUser: null,
      selectedLeads: null
    };
  },
  mutations: {
    isAdmin(state, payload) {
      state.isAdmin = payload.val
    },
    setActiveUser(state, payload) {
      state.activeUser = payload.val
    },
    setSelectedLeads(state, payload) {
      state.selectedLeads = payload.val
    }
  },
  actions: {
    async initializeAuth({ commit, dispatch }) {
      let access_token = localStorage.getItem('access_token')

      if (!access_token) {
        access_token = await auth0.getAccessTokenSilently()
        localStorage.setItem('access_token', access_token)
      }

      let permissions = await (jwtDecode(access_token)).permissions;
      if (permissions.includes('superadmin')) {
        commit('isAdmin', true)
      }

      let access = []
      await permissions.forEach(item => {
        if (item.includes('lm_')) access.push(item.replace('lm_', ''))
      })
      console.log('vuex access', access)
      dispatch('setAccess', access)

      console.log('auth0.user', auth0.user)
      let email = auth0.user.email
      console.log('vuex email', email)
      let user = await api.getActiveUser(email)
      // let status = user.status

      commit('setActiveUser', user)
    },
    isAdmin(context, val) {
      context.commit('isAdmin', { val: val });
    },
    setActiveUser(context, activeUser) {
      context.commit('setActiveUser', { val: activeUser });
    },
    setSelectedLeads(context, selectedLeads) {
      context.commit('setSelectedLeads', { val: selectedLeads });
    },
  },
  getters: {
    isAdmin(state) {
      return state.isAdmin;
    },
    activeUser(state) {
      return state.activeUser;
    },
    selectedLeads(state) {
      return state.selectedLeads;
    },
  }
}