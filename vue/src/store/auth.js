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
      await context.dispatch('fetchAndSetActiveBusinessPartner');
      return
    },
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
          let email = state.activeUser?.email;
          let user = activeBusinessPartner.users.find(user => user.email === email);
          activeBusinessPartner.activeUser = user;

          // set serviceAccessCode based on user's serviceType code

          let serviceTypes = state.serviceTypes
          let access = user?.serviceType;

          if (!serviceTypes?.length) {
            serviceTypes = await switchit.getServiceTypes()
          }
          dispatch('setServiceTypes', { serviceTypes: serviceTypes, access: access })
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
    setServiceTypes(context, body) {

      // add 'access' property to each serviceType object

      if (body.access) {
        let access = bitwiseDecode(body.access)
        body.serviceTypes.forEach(service => {
          service.access = access.includes(service.serviceType)
        })
      }

      // add 'icon' property to each serviceType object
      const iconMapping = {
        'mobile': 'smartphone',
        'broadband': 'language',
        'electricity': 'lightbulb',
        'mortgage': 'house',
        'homeinsurance': 'verified_user',
        'carinsurance': 'directions_car',
        'medicalinsurance': 'health_and_safety',
        'pension': 'account_balance'
      };

      body.serviceTypes.forEach(service => {

        // add icon
        const serviceType = service.serviceTypeString.toLowerCase();
        service.icon = iconMapping[serviceType] || 'info';

        // add 'selected' property to each serviceType object
        service.selected = false;
      });

      // remove 'MedicalInsurance' as this is not available now
      body.serviceTypes = body.serviceTypes.filter(service => service.serviceTypeString !== 'MedicalInsurance');

      context.commit('setServiceTypes', body.serviceTypes);
    },
    setServiceTypeSelection(context, serviceType, selected) {
      const serviceTypes = context.state.serviceTypes;
      const service = serviceTypes.find(service => service.serviceType === serviceType);
      if (service) {
        service.selected = selected;
      }
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
    activeBusinessPartner(state) {
      return state.activeBusinessPartner;
    },
    serviceAccessCode(state) {
      return state.serviceAccessCode;
    },
    serviceTypes: state => state.serviceTypes,
    serviceTypeName: (state) => (id) => {
      const service = state.serviceTypes.find((service) => service.serviceType === id);
      return service ? service.serviceTypeString : 'Unknown';
    },
    serviceTypeCode: (state) => (name) => {
      const service = state.serviceTypes.find((service) => service.serviceTypeString.toLowerCase() === name.toLowerCase());
      return service ? service.serviceType : 1;
    },
  }
}