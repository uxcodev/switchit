import store from '@/store/index.js'
import axios from 'axios';

const _axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

_axios.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token')
  if (!token) {
    token = await this.$auth0.getAccessTokenSilently();
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

_axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    console.log('401 error')
  }
  return Promise.reject(error);
});

export default {

  // Switchit API calls


  // TESTING 

  // async whateverApiCall(method, path) {
  //   try {
  //     let url = "https://switchitapi.azurewebsites.net/api/" + path;

  //     const response = await _axios({
  //       method: method,
  //       url: url,
  //     });
  //     response.data.ok = response?.statusText === "OK"
  //     return response.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  // Temporary Node API calls

  // async getCountries() {
  //   try {
  //     let url = "https://switchitapi.azurewebsites.net/api/countrydialcodes";
  //     const response = await _axios.get(url);
  //     response.data.ok = response?.statusText === "OK"
  //     return response.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  // async getPsd2Institutions() {
  //   try {
  //     let url = "https://switchitapi.azurewebsites.net/api/v1/psd2Institutions";
  //     const response = await _axios.get(url);
  //     response.data.ok = response?.statusText === "OK"
  //     return response.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  async createToken(email) {
    try {
      // create JWT token in backend
      let body = {
        email: email
      };

      // let url = apiUrl + "/users/create-token";
      const response = (await _axios.post("/users/create-token", body)).data;
      const switchit_token = response.token;

      // save the token in local storage
      localStorage.setItem('switchit_token', switchit_token);
      return switchit_token;
    } catch (err) {
      console.error(err);
    }
  },


  async getActiveUser(email) {  //getUser
    try {
      const user = (await _axios.get(`/users/get-active-user?email=${email}`)).data;
      store.dispatch('setActiveUser', user)
      return user;
    } catch (err) {
      console.error(err);
    }
  },

  async getUsers() {
    try {
      const response = await _axios.get('/users/get-users');
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },
  async getCompanies() {
    try {
      const response = await _axios.get('/companies/get-companies');
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async updateLeads() {
    try {
      const response = await _axios.put('/leads/update-leads');
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async createOffer(offer, leads) {
    try {
      const body = { offer: offer, leads: leads }
      const response = await _axios.post('/offers/create-offer', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },
  async updateOffer(offer, leads) {
    try {
      let id = offer._id
      const body = { offer: offer, leads: leads }
      const response = await _axios.put(`/offers/offer/${id}`, body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async getOffers() {
    try {
      const response = await _axios.get(`/offers/offers`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async getOffer(id) {
    try {
      const response = await _axios.get(`/offers/offer/${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async deleteOffer(id) {
    try {
      const response = await _axios.delete(`/offers/offer?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async getLeads(body) {
    try {
      // console.log('api.getLeads body', body)
      const response = await _axios.post('/leads/get-leads', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
      throw err
    }
    // return true;
  },

  async getLead(id) {
    try {
      const response = await _axios.get(`/leads/get-lead?id=${id}`);
      response.data.ok = response?.statusText === "OK"
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
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async createUser(fields) {
    try {
      const body = {
        fields: fields,
      };

      const response = await _axios.post('/users/create-user', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async updateUser(id, fields) {
    try {
      const body = {
        id: id,
        fields: fields,
      };

      const response = await _axios.put('/users/update-user', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async deleteUser(id) {
    try {
      const response = await _axios.delete(`/users/delete-user?id=${id}`);
      response.data.ok = response?.statusText === "OK"
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
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async createCompany(fields) {
    try {
      const body = {
        fields: fields,
      };
      const response = await _axios.post('/companies/create-company', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getCompanyById(id) {
    try {
      const response = await _axios.get(`/companies/company?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },


  async updateCompany(id, fields) {
    try {
      const body = {
        id: id,
        fields: fields,
      };
      // delete id key from fields
      console.log('updateCompany:', body.fields)
      delete body.fields.company._id

      const response = await _axios.put('/companies/update-company', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },


  async deleteCompany(id) {
    try {
      const response = await _axios.delete(`/companies/delete-company?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async saveFiltersAsCampaign(fields) {
    try {
      const body = {
        fields: fields,
      };
      const response = await _axios.post('/campaigns/campaign', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);

    }
  },

  async getCampaigns() {
    try {
      const response = await _axios.get('/campaigns/campaigns');
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);

    }
  },

  async deleteCampaign(id) {
    try {
      const response = await _axios.delete(`/campaigns/campaign?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);

    }
  }

}