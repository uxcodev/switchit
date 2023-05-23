// import store from '@/store/index.js'
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
  // if (!token) {
  //   console.log('no token found')
  //   token = await this.$auth0.getAccessTokenSilently();
  //   console.log('token', token)
  // }

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
    // localStorage.removeItem('access_token');
    // window.location.href = "/login";
    // reload window
    // console.log('token has been removed')
    // window.location.reload();
  }
  return Promise.reject(error);
});



export default {



  // Switchit API calls

  async switchit_createCompany(body) {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/v1/companys";
      const response = await _axios.post(url, body);
      response.data.ok = response?.statusText === "OK"

      if (response.status === 401) {
        localStorage.removeItem('access_token');
        window.location.href = "/login";
      }
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async switchit_getCompanies() {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/v1/companies";
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async switchit_getFullCompanies() {
    try {
      let includeCompanyDomains = true;
      let includeCompanyCountrys = true;
      let includeCompanyIbans = true;
      let includeCompanyServiceTypes = true;
      let includeCompanyPsd2Handles = true;

      let url = `https://switchitapi.azurewebsites.net/api/v1/companies?includeCompanyDomains=${includeCompanyDomains}&includeCompanyCountrys=${includeCompanyCountrys}&includeCompanyIbans=${includeCompanyIbans}&includeCompanyServiceTypes=${includeCompanyServiceTypes}&includeCompanyPsd2Handles=${includeCompanyPsd2Handles}`;
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async switchit_getCompany(id) {
    try {
      let url = `https://switchitapi.azurewebsites.net/api/v1/companys/${id}`;
      let response = await _axios.get(url)
      console.log(response)
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async switchit_getFullCompany(id) {
    try {

      let includeCompanyDomains = true;
      let includeCompanyCountrys = true;
      let includeCompanyIbans = true;
      let includeCompanyServiceTypes = true;
      let includeCompanyPsd2Handles = true;

      let url = `https://switchitapi.azurewebsites.net/api/v1/companys/${id}?includeCompanyDomains=${includeCompanyDomains}&includeCompanyCountrys=${includeCompanyCountrys}&includeCompanyIbans=${includeCompanyIbans}&includeCompanyServiceTypes=${includeCompanyServiceTypes}&includeCompanyPsd2Handles=${includeCompanyPsd2Handles}`;

      // let url = `https://switchitapi.azurewebsites.net/api/v1/companys/${id}`;
      let response = await _axios.get(url)
      console.log(response)
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },


  // TESTING 

  async whateverApiCall(method, path) {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/" + path;

      const response = await _axios({
        method: method,
        url: url,
      });
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  // Temporary Node API calls

  async getCountries() {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/countrydialcodes";
      const response = await _axios.get(url);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  async getPsd2Institutions() {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/v1/psd2Institutions";
      const response = await _axios.get(url);
      response.data.ok = response?.statusText === "OK"
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
      const response = (await _axios.post("/users/create-token", body)).data;
      const switchit_token = response.token;

      // save the token in local storage
      localStorage.setItem('switchit_token', switchit_token);
      return switchit_token;
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
      console.log('createOffer', leads)
      const body = { offer: offer, leads: leads }
      const response = await _axios.post('/offers/create-offer', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async getOffers() {
    try {
      const response = await _axios.get(`/offers/get-offers`);
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
      const response = await _axios.get(`/companies/get-company-by-id?id=${id}`);
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

}