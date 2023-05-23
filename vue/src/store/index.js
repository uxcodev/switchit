import { createStore } from 'vuex';
// import VueCookies from 'vue-cookies'
import auth from './auth'
import filters from './filters'
import import_test from './import_test'
import mobile from './mobile';
import menu from './menu'

const store = createStore({
  modules: {
    menu: menu,
    auth: auth,
    filters: filters,
    import_test: import_test,
    mobile: mobile,
  },
});

export default store;