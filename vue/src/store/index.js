import { createStore } from 'vuex';
// import VueCookies from 'vue-cookies'
import switchit from './switchit'
import filters from './filters'
import menu from './menu'

const store = createStore({
  modules: {
    menu: menu,
    switchit: switchit,
    filters: filters
  },
});

export default store;