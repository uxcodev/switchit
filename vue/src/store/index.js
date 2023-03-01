import { createStore } from 'vuex';
// import VueCookies from 'vue-cookies'
import switchit from './switchit'
import menu from './menu'

const store = createStore({
  modules: {
    menu: menu,
    switchit: switchit
  },
});

export default store;