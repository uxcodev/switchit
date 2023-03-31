import store from '@/store/index.js'
import axios from 'axios';

const _axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    accept: "application/json",
  },
});

const token = localStorage.getItem('switchit_token');
if (token) {
  _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


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

      let url = process.env.VUE_APP_API_URL + "/users/create-token";
      const response = await _axios.post(url, body);
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

  async getLeads(query) {
    let filters = Object.keys(query.filters).length ? query.filters : store.getters.filters;

    let filterString = '';
    for (let filter in filters) {
      filterString += `&filter=${filter}:${filters[filter]}`;
    }

    try {
      const response = await _axios.get(`/leads/get-leads?limit=${query.limit}&skip=${query.skip}${filterString}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return true;
  },

  async getLead(id) {
    let token = localStorage.getItem('switchit_token');
    console.log(id)
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      let url = process.env.VUE_APP_API_URL
      const response = await fetch(
        `${url}/leads/get-lead?id=${id}`,
        options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
    return true
  },

  async createLeads(leads) {
    let token = localStorage.getItem('switchit_token');

    // console.log(`getUsers token: ${token}`)

    try {
      let body = {
        leads: leads
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      }

      let url = process.env.VUE_APP_API_URL
      const response = await fetch(
        `${url}/leads/create-leads`,
        options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
    return true
  },

  async updateUser(id, fields) {
    try {
      let token = localStorage.getItem('switchit_token');
      let body = {
        id: id,
        fields: fields
      }
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      }

      let url = process.env.VUE_APP_API_URL
      const response = await fetch(
        `${url}/users/update-user`,
        options
      )
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  async deleteUser(id) {

    try {
      let token = localStorage.getItem('switchit_token')
      let options = {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "content-type": "application/*+json",
          authorization: `Bearer ${token}`,
        },
      }

      let url = process.env.VUE_APP_API_URL
      let response = await fetch(
        `${url}/users/delete-user?id=${id}`, options
      );
      let data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },

  async signupCompany(fields) {
    try {
      let token = localStorage.getItem('switchit_token');

      console.log('fields')
      console.log(fields)

      let body = {
        fields: fields
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      }

      let url = process.env.VUE_APP_API_URL
      const response = await fetch(
        `${url}/companies/signup-company`,
        options
      )
      const data = await response.json();
      data.ok = response.ok
      return data;
    } catch (err) {
      console.error(err);
    }
  },

}