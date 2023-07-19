if (module.hot) {
  module.hot.accept()
  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear()
  })
}

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

/* make api available throughout app */

import api from "@/api/api";
import switchit from "@/api/switchit";
const plugin = {
  install() {
    app.config.globalProperties.$api_node = api
    app.config.globalProperties.$switchit = switchit
  }
}
app.use(plugin)

/* use Vuex store */

import store from '@/store/index.js'
app.use(store)

/* import plugins and custom components */

import FilterComponent from '@/plugins/FilterComponent.vue';
app.component('filter-component', FilterComponent);

import ToastPlugin from '@/plugins/toast';
app.use(ToastPlugin);

import locale from '@/plugins/locale'
app.use(locale)

import forms from '@/plugins/forms'
app.use(forms)


import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
let options = {
  defaultCountry: store.getters.country,
  preferredCountries: ["DK", "CA"]
}
app.use(VueTelInput, options);

// use i18n

import i18n from './i18n';
app.use(i18n)

// use dayjs

import dayjsPlugin from './plugins/dayjs';
app.use(dayjsPlugin);

// check if mobile
store.dispatch('isMobile')

/* use Router */

import router from "./router";
app.use(router)

/* use Auth0 */

import auth0 from '@/helpers/auth0.js';
app.use(auth0);


app.mount('#app')

