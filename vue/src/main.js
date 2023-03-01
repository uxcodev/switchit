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

/* use Router */

import { authGuard } from "@auth0/auth0-vue";

const isAuth = async () => {
  if (!auth0.isAuthenticated) {
    console.log("not authenticated")
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
    component: () => import('@/pages/UserDashboard.vue')
  },
  {
    path: '/admin',
    name: "admin",
    beforeEnter: isAuth,
    component: () => import('@/pages/AdminDashboard.vue')
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
    component: () => import('@/pages//onboarding/CompanyOnboarding.vue')
  },
  {
    path: '/offer',
    name: "offer",
    beforeEnter: isAuth,
    component: () => import('@/pages/CreateOffer.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

app.use(router)
app.mount('#app')

