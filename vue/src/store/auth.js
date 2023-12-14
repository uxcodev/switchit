import jwtDecode from 'jwt-decode'
import api from '@/api/api'
import auth0 from '@/helpers/auth0.js';

export default {
  state() {
    return {
      isAdmin: false,
      activeUser: null,
      activeBusinessPartner: null,
      selectedLeads: null,
      activeCompany: null,
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
    },
    setActiveCompany(state, payload) {
      state.activeCompany = payload.val
    },
    setActiveBusinessPartner(state, payload) {
      state.activeBusinessPartner = payload.val
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
      dispatch('setAccess', access)
      let email = auth0.user.email
      let user = await api.getActiveUser(email)
      commit('setActiveUser', user)
    },
    isAdmin(context, val) {
      context.commit('isAdmin', { val: val });
    },
    async setActiveUser(context, activeUser) {
      context.commit('setActiveUser', { val: activeUser });
      if (activeUser.roles.length === 0 || !activeUser.roles) return
      let company = await api.getCompanyById(activeUser.roles[0].company)
      context.commit('setActiveCompany', { val: company });
    },
    setSelectedLeads(context, selectedLeads) {
      context.commit('setSelectedLeads', { val: selectedLeads });
    },
    setActiveBusinessPartner(context, activeBusinessPartner) {
      context.commit('setActiveBusinessPartner', { val: activeBusinessPartner });
    }
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
    activeCompany(state) {
      return state.activeCompany;
    },
    activeBusinessPartner(state) {
      return state.activeBusinessPartner;
    }
  }
}