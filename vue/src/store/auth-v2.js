import api from '@/api/switchit.js'
import bitwiseDecode from '@/helpers/bitwise.js'
import switchit from '@/api/switchit.js'

export default {
  state() {
    return {
      isAdmin: false,
      activeUser: null,
      activeBusinessPartner: null,
      selectedLeads: null,
      activeCompany: null,
      serviceAccessCode: null
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
    },
    setserviceAccessCode(state, payload) {
      state.serviceAccessCode = payload.val
    },
    setServiceTypes(state, val) {
      state.serviceTypes = val;
    },
  },
  actions: {
    isAdmin(context, val) {
      context.commit('isAdmin', { val: val });
    },
    async setActiveUser(context, activeUser) {
      context.commit('setActiveUser', { val: activeUser });
      if (activeUser.roles.length === 0 || !activeUser.roles) return
      let company = await api.getCompanyById(activeUser.roles[0].company)
      context.commit('setActiveCompany', { val: company });
    },

    // async setActiveUser({ commit, dispatch, state }, activeUser) {
    //   activeUser = activeUser || state.activeUser;
    //   console.log('setActiveUser', activeUser)

    //   if (!state.activeBusinessPartner) {
    //     await dispatch('fetchAndSetActiveBusinessPartner')
    //   }
    //   // set access

    //   let email = activeUser?.email;
    //   let user = state.activeBusinessPartner.users.find(user => user.email === email);
    //   state.activeBusinessPartner.activeUser = user;

    //   console.log('email', email)
    //   console.log('user', user)
    //   // set serviceAccessCode based on user's serviceType code

    //   let serviceTypes = state.serviceTypes
    //   let access = user?.serviceType;

    //   if (!serviceTypes.length) {
    //     serviceTypes = await switchit.getServiceTypes()
    //   }
    //   dispatch('setServiceTypes', serviceTypes, access)
    //   commit('setserviceAccessCode', { val: access });

    //   console.log('activeBusinessPartner', state.activeBusinessPartner, state.activeCompany, state.serviceAccessCode)
    //   commit('setActiveUser', { val: activeUser });
    // },
    setSelectedLeads(context, selectedLeads) {
      context.commit('setSelectedLeads', { val: selectedLeads });
    },
    setActiveBusinessPartner(context, activeBusinessPartner) {
      context.commit('setActiveBusinessPartner', { val: activeBusinessPartner });
    },
    async fetchAndSetActiveBusinessPartner({ commit, dispatch, state }) {
      if (state.activeBusinessPartner && state.activeBusinessPartner.activeUser) {
        return state.activeBusinessPartner;
      }
      try {
        let myBusinessPartners = await api.getMyBusinessPartners();
        let activeBusinessPartner;
        if (myBusinessPartners && myBusinessPartners.length > 0) {

          // get the active business partner
          activeBusinessPartner = await api.getBusinessPartner(myBusinessPartners[0].id);


          // get logged in user in list of business partner users
          console.log('state.activeUser', state.activeUser)
          let email = state.activeUser.email;
          let user = activeBusinessPartner.users.find(user => user.email === email);
          activeBusinessPartner.activeUser = user;

          // set serviceAccessCode based on user's serviceType code

          let serviceTypes = state.serviceTypes
          let access = user?.serviceType;

          if (!serviceTypes.length) {
            serviceTypes = await switchit.getServiceTypes()
          }
          dispatch('setServiceTypes', serviceTypes, access)
          commit('setserviceAccessCode', { val: access });

          commit('setActiveBusinessPartner', { val: activeBusinessPartner });
        } else {
          commit('setActiveBusinessPartner', { val: null });
        }
        return activeBusinessPartner;
      } catch (error) {
        console.error('Error fetching business partner:', error);
        commit('setActiveBusinessPartner', { val: null });
      }
    },
    setServiceTypes(context, serviceTypes, serviceTypeAccess) {
      console.log('setServiceTypes', serviceTypes, serviceTypeAccess)
      if (serviceTypeAccess) {
        let access = bitwiseDecode(serviceTypeAccess)
        // for each item in the serviceTypes array, if the value of 'serviceType' exists in the access array, set the 'access' property to true, otherwise set it to false
        serviceTypes.forEach(service => {
          service.access = access.includes(service.serviceType)
        })
        console.log('access', access)
      }
      context.commit('setServiceTypes', serviceTypes);
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
    activeCompany(state) {
      return state.activeCompany;
    },
    activeBusinessPartner(state) {
      return state.activeBusinessPartner;
    },
    serviceAccessCode(state) {
      return state.serviceAccessCode;
    },
    serviceTypes: state => state.serviceTypes,
    serviceTypeName: (state) => (id) => {
      console.log('getters.serviceTypeName', id, state.serviceTypes)
      const service = state.serviceTypes.find((service) => service.serviceType === id);
      return service ? service.serviceTypeString : 'Unknown';
    },
    serviceTypeCode: (state) => (name) => {
      console.log('getters.serviceCode', name, state.serviceTypes)
      const service = state.serviceTypes.find((service) => service.serviceTypeString.toLowerCase() === name.toLowerCase());
      return service ? service.serviceType : 1;
    },
  }
}