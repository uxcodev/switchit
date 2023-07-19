import { createStore } from 'vuex';
// import VueCookies from 'vue-cookies'
import auth from './auth'
import filters from './filters'
import import_sheet from './import_sheet'
import import_ from './import'
import mobile from './mobile'
import menu from './menu'

const store = createStore({
  modules: {
    menu: menu,
    auth: auth,
    filters: filters,
    import: import_,
    import_sheet: import_sheet,
    mobile: mobile,
  },
});

export default store;