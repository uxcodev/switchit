import store from '@/store/index.js'

export default {

  async whateverApiCall(method, path) {

    try {
      const options = {
        method: method,
        headers: {
          accept: "application/json",
          // authorization: `Bearer ${token}`,
        },
      };

      let url = "https://switchitapi.azurewebsites.net/api/v1/"
      const response = await fetch(
        `${url}${path}`,
        options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },


  async getPsd2Institutions() {
    // let token = localStorage.getItem('switchit_token');
    // console.log(`getUsers token: ${token}`)

    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          // authorization: `Bearer ${token}`,
        },
      };

      let url = "https://switchitapi.azurewebsites.net/api/v1/"
      const response = await fetch(
        `${url}/psd2Institutions`,
        options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },


  async createToken(email) {

    try {

      // create JWT token in backend

      let body = {
        email: email
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }

      let url = process.env.VUE_APP_API_URL
      const response = await fetch(
        `${url}/users/create-token`,
        options
      )
      const data = await response.json();

      // save the token in local storage

      localStorage.setItem('switchit_token', data.token)
      return data.token;

    } catch (err) {
      console.error(err);
    }
  },

  async getUsers() {
    let token = localStorage.getItem('switchit_token');

    // console.log(`getUsers token: ${token}`)

    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      let url = process.env.VUE_APP_API_URL
      const response = await fetch(
        `${url}/users/get-users`,
        options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
    return true
  },

  async getLeads(query) {
    let token = localStorage.getItem('switchit_token');
    console.log('query:')
    console.log(query)
    // console.log(query.limit)
    console.log(query.filters)
    console.log(store.getters.filters)
    // console.log(query.skip)

    let filters = Object.keys(query.filters).length ? query.filters : store.getters.filters //query.filters //
    console.log('filters')
    console.log(filters)
    let filterString = '';
    for (let filter in filters) {
      filterString += `&filter=${filter}:${filters[filter]}`;
    }
    // console.log('filterString');
    // console.log(filterString);
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      let url = process.env.VUE_APP_API_URL
      const response = await fetch(
        `${url}/leads/get-leads?limit=${query.limit}&skip=${query.skip}${filterString}`,
        options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
    return true
  },
  async getFilteredLeads(query) {
    let token = localStorage.getItem('switchit_token');
    // console.log('query:')
    // console.log(query)
    // console.log(`getUsers token: ${token}`)
    console.log(query.limit)
    console.log(query.filters)
    console.log(query.skip)

    try {
      let filters = {
        Mortgage: {
          price: 8,
          features: 7,
          service: 3,
        },
        Insurance: {
          price: 8,
          features: 7,
          service: 3,
        },
        Banking: {
          price: 8,
          features: 7,
          service: 3,
        },
      }
      let body = {
        filters: filters,
        limit: query.limit,
        skip: query.skip
      }
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      };

      let url = process.env.VUE_APP_API_URL
      const response = await fetch(
        `${url}/leads/get-filtered-leads`,
        options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
    return true
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