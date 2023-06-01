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
  if (!token) {
    console.log('no token found')
    token = await this.$auth0.getAccessTokenSilently();
    console.log('token', token)
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

  async createCompany(body) {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/v1/companies";
      const response = await _axios.post(url, body);
      console.log('response', response)
      response.data.ok = response?.statusText === "OK"

      // if (response.status === 401) {
      //   localStorage.removeItem('access_token');
      //   window.location.href = "/login";
      // }
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async editCompany(id, body) {
    // if (id) {
    //   console.log('id: ', id)
    //   return
    // }
    try {
      let url = `https://switchitapi.azurewebsites.net/api/v1/companys/${id}`;
      const response = await _axios.put(url, body);
      // console.log('response', response)
      // response.data.ok = response?.statusText === "OK"

      return response.status;
    } catch (err) {
      console.error(err);
    }
  },

  async getCompanies() {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/v1/companies";
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getFullCompanies() {
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

  async getCompany(id) {
    try {
      let url = `https://switchitapi.azurewebsites.net/api/v1/companys/${id}`;
      let response = await _axios.get(url)
      console.log(response)
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getFullCompany(id) {
    try {

      let includeCompanyDomains = true;
      let includeCompanyCountrys = true;
      let includeCompanyIbans = true;
      let includeCompanyServiceTypes = true;
      let includeCompanyPsd2Handles = true;

      let url = `https://switchitapi.azurewebsites.net/api/v1/companys/${id}?includeCompanyDomains=${includeCompanyDomains}&includeCompanyCountrys=${includeCompanyCountrys}&includeCompanyIbans=${includeCompanyIbans}&includeCompanyServiceTypes=${includeCompanyServiceTypes}&includeCompanyPsd2Handles=${includeCompanyPsd2Handles}`;

      let response = await _axios.get(url)
      console.log(response)
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getServiceTypes() {
    try {
      return (await _axios.get("https://switchitapi.azurewebsites.net/api/v1/servicetypes")).data;
    } catch (err) {
      console.error(err);
    }
  },

  async addServicesToCompany(serviceTypes) {
    try {
      let url = "https://switchitapi.azurewebsites.net/api/v1/companyservicetypes";
      const response = await _axios.post(url, serviceTypes);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}