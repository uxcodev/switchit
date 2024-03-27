import store from '@/store/index.js'
import axios from 'axios';
import auth0 from '@/helpers/auth0.js'
import jwtDecode from 'jwt-decode'

const _axios = axios.create({
  baseURL: process.env.VUE_APP_NODE_URL,
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
  if (error?.response?.status === 401) {
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
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async getActiveUser(email) {  //getUser
    try {
      const user = (await _axios.get(`/users/get-active-user?email=${email}`))?.data;
      store.dispatch('setActiveUser', user)
      return user;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async getUsers() {
    try {
      const response = await _axios.get('/users/get-users');
      if (response.status === 200) {
        response.data.ok = true;
        return response.data;
      } else {
        console.error('Unexpected status code:', response.status);
        return { error: 'Unexpected status code' };
      }
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },
  async getCompanies() {
    try {
      const response = await _axios.get('/companies/get-companies');
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async updateLeads() {
    try {
      const response = await _axios.put('/leads/update-leads');
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.error.response?.data?.error || err
      console.error(err);
      return error
    }
  },

  async createOffer(offer, leads) {
    try {
      const body = { offer: offer, leads: leads }
      const response = await _axios.post('/offers/create-offer', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },
  async updateOffer(offer, leads) {
    try {
      let id = offer._id
      const body = { offer: offer, leads: leads }
      const response = await _axios.put(`/offers/offer/${id}`, body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async getOffers() {
    try {
      const response = await _axios.get(`/offers/offers`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async getOffer(id) {
    try {
      const response = await _axios.get(`/offers/offer/${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async deleteOffer(id) {
    try {
      const response = await _axios.delete(`/offers/offer?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
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
  },

  async getLead(id) {
    try {
      const response = await _axios.get(`/leads/get-lead?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
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
      let error = err.response?.data?.error || err
      throw error
    }
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
      let error = err.response?.data?.error || err
      throw error
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
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async deleteUser(id) {
    try {
      const response = await _axios.delete(`/users/delete-user?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
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
      let error = err.response?.data?.error || err
      throw error
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
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async getCompanyById(id) {
    try {
      const response = await _axios.get(`/companies/company?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
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
      let error = err.response?.data?.error || err
      throw error
    }
  },


  async deleteCompany(id) {
    try {
      const response = await _axios.delete(`/companies/delete-company?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },


  async createCampaign(fields) {
    try {
      const body = {
        fields: fields,
      };
      const response = await _axios.post('/campaigns/campaign', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },

  async updateCampaign(id, campaign) {
    try {
      console.log('updateCampaign:', id, campaign)
      const body = {
        campaign: campaign,
      };
      const response = await _axios.put(`/campaigns/campaign/${id}`, body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },
  /* 
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
    */

  async getCampaigns(companyId) {
    try {
      const response = await _axios.get('/campaigns/campaigns?companyId=' + companyId);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);

    }
  },


  async getCampaign(id) {
    try {
      const response = await _axios.get(`/campaigns/campaign/${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },


  async deleteCampaign(id) {
    try {
      const response = await _axios.delete(`/campaigns/campaign?id=${id}`);
      console.log('response', response)
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      console.error(err);

    }
  },


  async createFilterset(fields) {
    try {
      const body = {
        fields: fields,
      };
      const response = await _axios.post('/filtersets/filterset', body);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },
  // async getFiltersets(companyId) {
  //   try {
  //     const response = await _axios.get('/filtersets/filtersets?companyId=' + companyId);
  //     response.data.ok = response?.statusText === "OK"
  //     return response.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
  async getAllFiltersets() {
    // for super admin only
    try {
      const response = await _axios.get('/filtersets/filtersets');
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },
  async getFiltersetsByBusinessPartnerId(businessPartnerId) {
    try {
      const response = await _axios.get(`/filtersets/businesspartner/${businessPartnerId}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },
  async getFiltersetsByUserEmail(businessPartnerId, email) {
    try {
      const response = await _axios.get(`/filtersets/${businessPartnerId}/${email}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },
  async deleteFilterset(id) {
    try {
      const response = await _axios.delete(`/filtersets/filterset?id=${id}`);
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },

  /* utilities */

  async addEmailToAllFiltersets() {
    try {
      const response = await _axios.get('/filtersets/addEmailToAllFiltersets');
      response.data.ok = response?.statusText === "OK"
      return response.data;
    } catch (err) {
      let error = err.response?.data?.error || err
      throw error
    }
  },
}