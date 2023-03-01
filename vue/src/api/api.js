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

    // console.log(`getUsers token: ${token}`)
    console.log(query.limit)
    console.log(query.skip)
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
        `${url}/leads/get-leads?limit=${query.limit}&skip=${query.skip}`,
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
      return data;
    } catch (err) {
      console.error(err);
    }
  },

}