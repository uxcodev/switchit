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
const plugin = {
  install() {
    app.config.globalProperties.$api_node = api
  }
}
app.use(plugin)

/* use Vuex store */

import store from '@/store/index.js'

app.use(store)

/* set up router */

import { createRouter, createWebHistory } from 'vue-router'

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
console.log('isMobile', store.getters.isMobile)

/* use Router */

import { authGuard } from "@auth0/auth0-vue";

// const isAuth = async () => {
//   if (!auth0.isAuthenticated) {
//     console.log('!isAuthenticated')
//     auth0.loginWithRedirect({
//       appState: {
//         target: window.location.href,
//       },
//     });
//     return false
//   }

//   console.log('isAuthenticated')
// }

const routes = [
  {
    path: '/dashboard',
    name: "dashboard",
    beforeEnter: authGuard,
    component: () => import('@/pages/OpportunitiesDashboard.vue')
  },
  {
    path: '/dashboard_data',
    name: "dashboard_data",
    beforeEnter: authGuard,
    component: () => import('@/pages/OpportunitiesDashboardData.vue')
  },
  {
    path: '/operations',
    name: "operations",
    beforeEnter: authGuard,
    component: () => import('@/pages/OperationsDashboard.vue')
  },
  {
    path: '/settings',
    name: "settings",
    beforeEnter: authGuard,
    component: () => import('@/pages/SettingsPage.vue')
  },
  {
    path: '/',
    name: "start",
    beforeEnter: authGuard,
    component: () => import('@/pages/StarterPage.vue')
  },
  {
    path: '/onboarding',
    name: "onboarding",
    beforeEnter: authGuard,
    component: () => import('@/pages/onboarding/CompanyOnboarding.vue')
  },
  {
    path: '/createcompany',
    name: "createcompany",
    beforeEnter: authGuard,
    component: () => import('@/pages/onboarding/CreateCompany.vue')
  },
  {
    path: '/create_offer',
    name: "create_offer",
    props: true,
    beforeEnter: authGuard,
    component: () => import('@/pages/CreateOffer.vue')
  },
  {
    path: '/offers',
    name: "offers",
    beforeEnter: authGuard,
    component: () => import('@/pages/OffersDashboard.vue')
  },
  {
    path: '/signup_success',
    name: "signup_success",
    beforeEnter: authGuard,
    component: () => import('@/pages/onboarding/CompanyOnboardingSuccess.vue')
  },
  {
    path: '/api',
    name: "api_testing",
    beforeEnter: authGuard,
    component: () => import('@/pages/testing/ApiTesting.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
// create a global route guard that gets called before each route change
router.beforeEach(async (to, from, next) => {
  // dispatch the action here
  if (to.name !== 'onboarding' && to.name !== 'dashboard') { // avoid looping
    await store.dispatch('initializeAuth');
  }
  next();
})

app.use(router)

/* use Auth0 */

// import { createAuth0 } from '@auth0/auth0-vue';


// const auth0 = createAuth0({
//   domain: process.env.VUE_APP_AUTH0_DOMAIN,
//   clientId: process.env.VUE_APP_AUTH0_CLIENTID,
//   authorizationParams: {
//     audience: process.env.VUE_APP_AUTH0_AUDIENCE,
//     redirect_uri: window.location.origin
//   },
//   // cacheLocation: 'localstorage',
//   // useRefreshTokens: true,
//   // audience: process.env.VUE_APP_AUTH0_AUDIENCE,
//   // responseType: 'token id_token',
//   // scope: 'openid profile'
// })
import auth0 from '@/helpers/auth0.js';
app.use(auth0);


app.mount('#app')

