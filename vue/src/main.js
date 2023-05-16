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
    app.config.globalProperties.$api = api
  }
}
app.use(plugin)


/* use Auth0 */

import { createAuth0 } from '@auth0/auth0-vue';


const auth0 = createAuth0({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENTID,
  authorizationParams: {
    redirect_uri: window.location.origin
  },
  cacheLocation: 'localstorage',
  // useRefreshTokens: true,
  audience: `${window.location.origin}/api/v2/`,
  responseType: 'token id_token',
  scope: 'openid profile'
})

app.use(auth0);

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

const isAuth = async () => {
  if (!auth0.isAuthenticated) {
    // console.log("not authenticated")
    auth0.loginWithRedirect({
      appState: {
        target: window.location.href,
      },
    });
    return false
  }
}

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
    beforeEnter: isAuth,
    component: () => import('@/pages/OperationsDashboard.vue')
  },
  {
    path: '/settings',
    name: "settings",
    beforeEnter: isAuth,
    component: () => import('@/pages/SettingsPage.vue')
  },
  {
    path: '/',
    name: "start",
    beforeEnter: isAuth,
    component: () => import('@/pages/StarterPage.vue')
  },
  {
    path: '/onboarding',
    name: "onboarding",
    beforeEnter: isAuth,
    component: () => import('@/pages/onboarding/CompanyOnboarding.vue')
  },
  {
    path: '/createcompany',
    name: "createcompany",
    // beforeEnter: isAuth,
    component: () => import('@/pages/onboarding/CreateCompany.vue')
  },
  {
    path: '/create_offer',
    name: "create_offer",
    props: true,
    beforeEnter: isAuth,
    component: () => import('@/pages/CreateOffer.vue')
  },
  {
    path: '/offers',
    name: "offers",
    beforeEnter: isAuth,
    component: () => import('@/pages/OffersDashboard.vue')
  },
  {
    path: '/signup_success',
    name: "signup_success",
    beforeEnter: isAuth,
    component: () => import('@/pages/onboarding/CompanyOnboardingSuccess.vue')
  },
  {
    path: '/api',
    name: "api_testing",
    beforeEnter: isAuth,
    component: () => import('@/pages/testing/ApiTesting.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

app.use(router)
app.mount('#app')

