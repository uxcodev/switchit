import store from '@/store/index.js'
import axios from 'axios';

const _axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    accept: "application/json",
  },
});

_axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('switchit_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default {

  async whateverApiCall(method, path) {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/v1/" + path;

      const response = await _axios({
        method: method,
        url: url,
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  },



  async getPsd2Institutions() {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/v1/psd2Institutions";
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async createToken(email) {
    try {
      // create JWT token in backend
      let body = {
        email: email
      };

      // let url = apiUrl + "/users/create-token";
      const response = await _axios.post("/users/create-token", body);
      const data = response.data;

      // save the token in local storage
      localStorage.setItem('switchit_token', data.token);
      return data.token;
    } catch (err) {
      console.error(err);
    }
  },


  async getUsers() {
    try {
      const response = await _axios.get('/users/get-users');
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async updateLeads() {
    try {
      const response = await _axios.put('/leads/update-leads');
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async createOffer(offer, leads) {
    try {
      // console.log('createOffer', leads)
      const body = { offer: offer, leads: leads }
      const response = await _axios.post('/offers/create-offer', body);
      return response;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async getOffers() {
    try {
      const response = await _axios.get(`/offers/get-offers`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async getLeads(query) {
    console.log('api getLeads query:', query)
    console.log('api getLeads preferences:', store.getters.preferences)
    let limit = query.limit || 0
    let skip = query.skip || 0
    let ids = query.ids || false
    console.log('ids', ids)
    let filters = Object.keys(query.filters).length ? query.filters : store.getters.filters;

    let filterString = '';
    for (let filter in filters) {
      filterString += `&filter=${filter}:${filters[filter]}`;
    }

    try {
      const response = await _axios.get(`/leads/get-leads?limit=${limit}&skip=${skip}${filterString}&ids=${ids}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async getLead(id) {
    try {
      const response = await _axios.get(`/leads/get-lead?id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true
  },

  async createLeads(leads) {
    try {
      const body = {
        leads: leads,
      };

      const response = await _axios.post('/leads/create-leads', body);
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async updateUser(id, fields) {
    try {
      const body = {
        id: id,
        fields: fields,
      };

      const response = await _axios.put('/users/update-user', body);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async deleteUser(id) {
    try {
      const response = await _axios.delete(`/users/delete-user?id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async signupCompany(fields) {
    try {
      const body = {
        fields: fields,
      };

      const response = await _axios.post('/companies/signup-company', body);
      const data = response.data;
      data.ok = response.ok;
      return data;
    } catch (err) {
      console.error(err);
    }
  }

}