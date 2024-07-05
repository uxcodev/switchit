// import store from '@/store/index.js'
import axios from 'axios';
import auth0 from '@/helpers/auth0.js';
import jwtDecode from 'jwt-decode';
import bitwiseDecode from '@/helpers/bitwise.js';

// this allows use of global variables
let toast_error = null;
export function initialize(app) {
  toast_error = app.config.globalProperties.$toast_error
}

// import fake_data from '@/api/fake_data.js'
// import node_api from '@/api/api.js'

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
  // toast_error.show({ message: "There was an error while trying to authorize your request" })
  return Promise.reject(error);
});

_axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error?.response?.status === 401) {
    console.log('401 error')
  }
  toast_error.show({ message: "There was an error processing your request" })
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
      let url = "/api/v1/businesspartners?includeBusinessPartnerCountrys=true&includeBusinessPartnerRoles=true&includeBusinessPartnerRoleBusinessPartnerUsers";
      const response = await _axios.get(url);
      let businessPartners = response?.data?.model
      console.log('getBusinessPartners response', businessPartners)
      // for each business partner
      for (let bp of businessPartners) {
        bp.countries = bp.businessPartnerBusinessPartnerCountrysModels
        bp.roles = bp.businessPartnerBusinessPartnerRolesModels
        bp.users = bp.businessPartnerBusinessPartnerRoleBusinessPartnerUserCollectionModels
        bp.serviceTypes = bitwiseDecode(bp.serviceType)
        delete bp.businessPartnerBusinessPartnerCountrysModels
        delete bp.businessPartnerBusinessPartnerRolesModels
        delete bp.businessPartnerBusinessPartnerRoleBusinessPartnerUserCollectionModels
        console.log('serviceType', bp.serviceType)
      }
      return businessPartners;
      // return response?.data?.model;
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

      // console.log('serviceType', serviceType)
      // console.log(bitwiseDecode(serviceType))      bp.serviceTypes = bitwiseDecode(serviceType)
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
      if (!body.serviceTypes.includes(1)) {
        body.serviceTypes.push(1)
        body.serviceTyps.sort((a, b) => a - b)
      }
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
      if (!body.serviceTypes.includes(1)) {
        body.serviceTypes.push(1)
        body.serviceTyps.sort((a, b) => a - b)
      }
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
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async uploadOffer(offerId, formData) {
    try {
      let url = `/api/v1/offers/${offerId}/uploadfile`;
      const response = await _axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async createOfferService(body) {
    try {
      let url = "/api/v1/offerservices";
      const response = await _axios.post(url, body);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getPensionUploads(householdId) {
    try {
      let url = `/api/v1/pension_uploads?householdId=${householdId}`;
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getHouseholdUploads(householdId) {
    try {
      let url = `/api/v1/households/${householdId}/uploads`;
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getUploads() {
    try {
      let url = "/api/v1/uploads";
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getUploadedFile(id) {
    try {
      let url = `/api/v1/uploads/${id}`;
      const response = await _axios.get(url, { responseType: 'blob' });
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
      // move Denmark, Norway, Sweden, Germany, and US to top of list
      let countries = response.data
      /*       let denmark = countries.find(country => country.name === "Denmark")
            let norway = countries.find(country => country.name === "Norway")
            let sweden = countries.find(country => country.name === "Sweden")
            let germany = countries.find(country => country.name === "Germany")
            let us = countries.find(country => country.name === "United States")
            countries = countries.filter(country => country.name !== "Denmark" && country.name !== "Norway" && country.name !== "Sweden" && country.name !== "Germany")
            countries.unshift(us)
            countries.unshift(germany)
            countries.unshift(sweden)
            countries.unshift(norway)
            countries.unshift(denmark) */
      return countries
      // return response.data;
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

  /*   async getLeads__(body) { // WITH FAKE SERVICE FIELDS
      try {
        console.log('getLeads body', body)
        let url = "/api/v1/leads";
        const response = await _axios.get(url);
        let leads = response.data.model
  
        // let serviceFields = await fake_data.getServiceFields(leads.length)
        // console.log('serviceFields', serviceFields)
        console.log('body', body)
        body.limit = leads.length
        let nodeLeads = (await node_api.getLeads(body)).leads
        console.log('nodeLeads', nodeLeads)
        console.log('leads', leads)
        let count = 0
  
        for (let lead of leads) {
  
          // lead.serviceFields = serviceFields[count].data
          lead.serviceFields = nodeLeads[count].data
          count++
          // let jsonString = lead.serviceFields
          // let cleanJsonString = jsonString
          //   .replace(/\\n/g, '')
          //   .replace(/\\/g, '')
          //   .replace(/\s/g, '')
          //   .replace(/[\u201C\u201D]/g, '"')
  
          // let validJson = JSON.parse(cleanJsonString)
          // lead.serviceFields = validJson
          lead.userId = lead.householdId // or should be lead.id ?
          lead.value = lead.amount
          lead.match = '80'
          lead.data = lead.serviceFields
  
  
          // lead.serviceFields = cleanJsonString
        }
        // if body.ids = true, return only the ids
        if (body.ids) {
          let ids = leads.map(lead => lead.id)
          console.log('ids after loop:', ids)
          return ids
        }
  
        return leads;
      } catch (err) {
        console.error(err);
      }
    }, */

  async getLeads(body) {
    let leads = []
    try {

      let query = ''
      if (body) {

        if (Object.keys(body.filterData).length === 0) {
          delete body.filterData
        } else {
          // TEMP: create a copy of each key in filterData, but with a lowercase version of the key
          // this is because the API expects lowercase keys
          // let filterData = {}
          // for (let key in body.filterData) {
          //   filterData[key.toLowerCase()] = body.filterData[key]
          // }
          // body.filterData = filterData

        }
        query = body ? Object.keys(body).map(key => {
          let value = body[key];
          if (typeof value === 'object' && value !== null) {
            value = JSON.stringify(value);
          }
          return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }).join('&') : '';
      }

      let url = "/api/v1/leads";
      const response = await _axios.get(`${url}?${query}`);
      leads = response.data.model;
      leads.totalAmount = response.data.totalAmount

      for (let lead of leads) {

        let validJson = {}

        if (lead.serviceFields) {

          let jsonString = lead.serviceFields
          let cleanJsonString = jsonString
            .replace(/\\n/g, '')
            .replace(/\\/g, '')
            .replace(/\s/g, '')
            .replace(/[\u201C\u201D]/g, '"')

          // if the entire string is enclosed in quotes, remove them
          if (cleanJsonString[0] === '"' && cleanJsonString[cleanJsonString.length - 1] === '"') {
            cleanJsonString = cleanJsonString.slice(1, -1)
          }

          validJson = JSON.parse(cleanJsonString)

        }
        lead.relevantServices = {
          Mobile: lead.isMobileRelevant,
          Broadband: lead.isBroadbandRelevant,
          Electricity: lead.isElectricityRelevant,
          Mortgage: lead.isMortgageRelevant,
          CarInsurance: lead.isCarInsuranceRelevant,
          HomeInsurance: lead.isHomeInsuranceRelevant
        }

        lead.serviceFields = validJson
        lead.userId = lead.householdId // or should be lead.id ?
        lead.value = lead.amount
        // random number between 30 and 100
        lead.match = Math.floor(Math.random() * 70) + 30
        lead.data = lead.serviceFields
      }

      // ****** TESTING!!! ******

      // // leads[0].documents = [{ type: 'invoice', url: 'https://drive.google.com/file/d/15uuKOH-W1l-8yqj9rHxr6rdZKTwiMcT3/view' }]
      // if (leads.length) { leads[0].documents = [] }
      return leads;
    }
    catch (err) {
      console.error('getLeads error:', err);
      // return { error: err }
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
      let url = "/api/v1/leads";
      const response = await _axios.post(url, body);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  /* Offers */

  async createOffer(body) {
    try {
      // body = JSON.stringify(body);
      let url = "/api/v1/offers";
      const response = await _axios.post(url, body);
      return response?.data?.model;
    } catch (err) {
      console.error(err);
    }
  },

  async getOffers(body) {
    try {
      let url = "/api/v1/offers";
      if (body?.householdId) {
        let url = "/api/v1/offers?householdId=" + body.householdId;
        const response = await _axios.get(url);
        return response?.data?.model;
      } else if (body?.businessPartnerId) {
        let url = "/api/v1/offers?businessPartnerId=" + body.businessPartnerId;
        const response = await _axios.get(url);
        return response?.data?.model;
      }
      const response = await _axios.get(url);
      return response?.data?.model;
    } catch (err) {
      console.error(err);
    }
  },

  async getOffer(id) {
    try {
      let url = `/api/v1/offers/${id}?includeOfferuploads=true&includeOfferServices=true`;
      const response = await _axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  async updateOffer(id, body) {
    try {
      console.log(id, body)
      // throw an error
      throw new Error("NOT_IMPLEMENTED")


      // let url = `/api/v1/offers/${id}/`;
      // const response = await _axios.put(url, body);
      // return response.data;
    } catch (err) {
      toast_error.show({ message: "Updating offers is not supported yet" })
      console.error(err);
    }
  }
}