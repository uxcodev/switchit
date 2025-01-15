import axios from 'axios'

export default {
  state() {
    return {
      companies: [],
      importCompaniesUrl: ''
    };
  },
  mutations: {
    setCompanies(state, payload) {
      state.companies = payload.val;
    },
    setImportCompaniesUrl(state, url) {
      state.importCompaniesUrl = url;
    }
  },
  actions: {
    async getData({ dispatch, commit }) {
      try {
        let sheet_id = '1uHwFPlBanjQKaSlNqCbzSumpK7ty9nhKav1pH84IPiI'
        let sheet_companies = 'companies'
        let api_key = `AIzaSyB-QWQyXX_jyHuLE191SUrLP2b013_MuQ8`
        let url_companies = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${sheet_companies}?alt=json&key=${api_key}`

        let response = (await axios.get(url_companies)).data.values

        console.log('response array', response)
        await dispatch('convertCompanyData', response);
        await commit('setImportCompaniesUrl', `https://docs.google.com/spreadsheets/d/${sheet_id}/edit#gid=0`);
        return
      } catch (error) {
        console.error(error);
      }
    },
    async convertCompanyData({ commit }, sourceData) {
      const [keys, ...values] = sourceData;
      const arr_companies = values.map((row) => {
        const obj = {};
        keys.forEach((key, index) => {
          const value = row[index];
          if (key.startsWith("$")) {
            const newKey = key.substring(1); // Remove the "$" character
            obj[newKey] = value?.split(",").map((item) => item.trim()) || [];
          } else if (key.startsWith("#")) {
            const newKey = key.substring(1); // Remove the "#" character
            obj[newKey] = value?.split(",").map((item) => parseFloat(item.trim())) || [];
          } else {
            obj[key] = value
          }
        });
        return obj;
      });

      const filteredCompanies = arr_companies.map((company) => {
        const filteredCompany = {};
        for (const key in company) {
          if (!key.startsWith("_")) {
            filteredCompany[key] = company[key];
          }
        }
        return filteredCompany;
      });

      commit("setCompanies", { val: filteredCompanies });
      return filteredCompanies;
    }
    ,


    setCompanies(context, companies) {
      context.commit('setCompanies', { val: companies });
    },

  },
  getters: {
    companies(state) {
      return state.companies;
    },
    importCompaniesUrl(state) {
      return state.importCompaniesUrl;
    }
  }
}