import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

/* make api available throughout app */

import api from '@/api/api';
import switchit from '@/api/switchit';
const plugin = {
  install() {
    app.config.globalProperties.$api_node = api;
    app.config.globalProperties.$switchit = switchit;
  },
};
app.use(plugin);

/* use Vuex store */

import store from '@/store/index.js';
app.use(store);
// app.provide('store', store);

/* import plugins and custom components */

import locale from '@/plugins/locale';
app.use(locale);

import i18n from './i18n';
app.use(i18n);
export default i18n;

import FilterComponent from '@/plugins/FilterComponent.vue';
app.component('filter-component', FilterComponent);

import ToastPlugin from '@/plugins/toast';
app.use(ToastPlugin);

/* initialize switchit to allow use of global variables */
import { initialize } from './api/switchit';
initialize(app);

import forms from '@/plugins/forms';
app.use(forms);

import sessions from '@/plugins/sessions';
app.use(sessions);

import dayjsPlugin from '@/plugins/dayjs';
app.use(dayjsPlugin);

import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
let options = {
  defaultCountry: store.getters.country,
  preferredCountries: ['DK', 'CA'],
};
app.use(VueTelInput, options);

// check if mobile
store.dispatch('isMobile');

/* use Auth0 */

import auth0 from '@/helpers/auth0.js';
app.use(auth0);

/* use Router */

import router from './router';
app.use(router);

import { clickOutsideBeforeMountHook, clickOutsideUnmountedHook } from '@/directives/click-outside.js';
app.directive('click-outside', {
  beforeMount: clickOutsideBeforeMountHook,
  unmounted: clickOutsideUnmountedHook,
})

app.mount('#app');
