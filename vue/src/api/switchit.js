// import store from '@/store/index.js'
import axios from 'axios';
import auth0 from '@/helpers/auth0.js';
import jwtDecode from 'jwt-decode';

const _axios = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

_axios.interceptors.request.use(async (config) => {

  let token = localStorage.getItem('access_token')
  let token_expiration = 600 // 10 minutes

  if (token) {
    const decoded = jwtDecode(token); // Assuming you have a jwtDecode function
    const now = Date.now() / 1000; // Convert to seconds
    const isTokenExpired = now > decoded.exp || (now - decoded.iat) > (token_expiration * 3600);

    if (isTokenExpired) {
      token = await auth0.getAccessTokenSilently();
      localStorage.setItem('access_token', token);
    }
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

  async whateverApiCall(method, path) {
    try {
      let url = "/api/" + path;

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


  //*** BUSINESS PARTNERS ***/


  async getBusinessPartners() {
    try {
      let url = "/api/v1/businesspartners?includeBusinessPartnerCountrys=true";
      const response = await _axios.get(url);
      return response?.data?.model;
    } catch (err) {
      console.error(err);
    }
  },

  async getBusinessPartner(id) {
    try {
      let url = `/api/v1/businesspartners/${id}?includeBusinessPartnerRoles=true&includeBusinessPartnerCountrys=true&includeBusinessPartnerRoleBusinessPartnerUsers=true`;
      const response = await _axios.get(url);
      let bp = response.data.model
      bp.roles = bp.businessPartnerBusinessPartnerRolesModels
      bp.countries = bp.businessPartnerBusinessPartnerCountrysModels
      bp.users = bp.businessPartnerBusinessPartnerRoleBusinessPartnerUserCollectionModels
      delete bp.businessPartnerBusinessPartnerCountrysModels
      delete bp.businessPartnerBusinessPartnerRolesModels
      delete bp.businessPartnerBusinessPartnerRoleBusinessPartnerUserCollectionModels
      return response?.data?.model;
    } catch (err) {
      console.error(err);
    }
  },


  async getMyBusinessPartners() {
    try {
      let url = "/api/v1/mybusinesspartners?includeBusinessPartnerCountrys=true";
      const response = await _axios.get(url);
      // console.log('getMyBusinessPartners response', response)
      return response?.data?.model;
    } catch (err) {
      console.error(err);
    }
  },


  async createBusinessPartner(body) {
    try {
      let url = "/api/v1/businesspartners";
      const response = await _axios.post(url, body);
      return response;
    } catch (err) {
      let response = err.response?.data?.issues[0]?.messages[0] || err
      response = response === "ALREADY_EXISTS" ? "Business Partner already exists" : err.response
      if (!response) {
        response = "Error creating Business Partner"
      }
      return response
    }
  },

  async editBusinessPartner(id, body) {
    try {
      let url = `/api/v1/businesspartners/${id}`;
      const response = await _axios.put(url, body);
      if (response.status > 199 && response.status < 300) {
        response.statusText = "OK"
        return response;
      } else {
        throw new Error("ERROR_PROCESSING_REQUEST")
      }
    } catch (err) {
      console.error("editBusinessPartner:", err);
      let error = err?.response?.data?.issues[0]?.messages[0] || err
      return { error: error }
    }
  },

  async deleteBusinessPartner(id) {
    try {
      let url = `/api/v1/businesspartners/${id}`;
      const response = await _axios.delete(url);
      response.data.ok = response?.statusText === "OK"
      return response?.data;
    } catch (err) {
      console.error(err);
      let error = err.response?.data?.issues[0]?.messages[0] || err
      return { error: error }
    }
  },


  //*** COMPANIES ***/

  async createCompany(body) {
    try {
      let url = "/api/v1/companies";
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
  async importCompanies(body) {
    try {
      let url = "/api/v1/companies/import";
      const response = await _axios.post(url, body);
      console.log('response', response)
      response.data.ok = response?.statusText === "OK"
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
      let url = `/api/v1/companys/${id}`;
      const response = await _axios.put(url, body);
      // console.log('response', response)
      // response.data.ok = response?.statusText === "OK"

      return response.status;
    } catch (err) {
      console.error(err);
    }
  },

  async deleteCompany(id) {
    try {
      let url = `/api/v1/companies/${id}`;
      const response = await _axios.delete(url);
      console.log('deleteCompany response', response)
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },


  async getCompanies() {
    try {
      let url = "/api/v1/companies";
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

      let url = `/api/v1/companies?includeCompanyDomains=${includeCompanyDomains}&includeCompanyCountrys=${includeCompanyCountrys}&includeCompanyIbans=${includeCompanyIbans}&includeCompanyServiceTypes=${includeCompanyServiceTypes}&includeCompanyPsd2Handles=${includeCompanyPsd2Handles}`;
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getCompany(id) {
    try {
      let url = `/api/v1/companys/${id}`;
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

      let url = `/api/v1/companys/${id}?includeCompanyDomains=${includeCompanyDomains}&includeCompanyCountrys=${includeCompanyCountrys}&includeCompanyIbans=${includeCompanyIbans}&includeCompanyServiceTypes=${includeCompanyServiceTypes}&includeCompanyPsd2Handles=${includeCompanyPsd2Handles}`;

      let response = await _axios.get(url)
      console.log(response)
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getServiceTypes() {
    try {
      return (await _axios.get("/api/v1/servicetypes")).data;
    } catch (err) {
      console.error(err);
    }
  },

  async addServicesToCompany(serviceTypes) {
    try {
      let url = "/api/v1/companyservicetypes";
      const response = await _axios.post(url, serviceTypes);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  // *** MISCELLANEOUS ***/

  async getCountries() {
    try {
      let url = "/api/countrydialcodes";
      const response = await _axios.get(url);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getHouseholds() {
    try {
      let url = "/api/v1/households";
      const response = await _axios.get(url);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  async getPsd2Institutions() {
    try {
      let url = "/api/v1/psd2Institutions";
      const response = await _axios.get(url);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  // *** LEADS ***/

  async getLeads() {
    try {
      let url = "/api/v1/leads";
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getLead(id) {
    try {
      let url = `/api/v1/leads/${id}`;
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async createLead(body) {
    try {
      body = JSON.stringify(body);
      console.log('body', body)
      let url = "/api/v1/leads";
      const response = await _axios.post(url, body);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}