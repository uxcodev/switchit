// import { inject } from '@vue/runtime-core';
import store from '@/store/index.js';
// import auth0 from '@/helpers/auth0.js';
// import node_api from '@/api/api.js';
import { authGuard } from "@auth0/auth0-vue";
import { createRouter, createWebHistory } from 'vue-router'

function apiGuard(to, from, next) {
  next();
}

const routes = [
  {
    path: '/',
    name: "home",
    beforeEnter: authGuard,
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/public',
    name: "public",
    meta: { public: true },
    component: () => import('@/pages/HomePage.vue')
  },

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
    path: '/importedsheet',
    name: "importedsheet",
    beforeEnter: authGuard,
    component: () => import('@/pages/ImportedSheet.vue')
  },
  {
    path: '/settings',
    name: "settings",
    beforeEnter: authGuard,
    component: () => import('@/pages/SettingsPage.vue')
  },
  {
    path: '/profile',
    name: "profile",
    beforeEnter: authGuard,
    component: () => import('@/components/auth/AuthProfile.vue')
  },

  {
    path: '/company',
    name: "company",
    beforeEnter: authGuard,
    component: () => import('@/pages/onboarding/EditBusinessPartner.vue')
  },
  {
    path: '/createcompanynode',
    name: "createcompanynode",
    beforeEnter: authGuard,
    component: () => import('@/pages/onboarding/CreateCompany_Node.vue')
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
    path: '/offer/:id',
    name: "offer",
    beforeEnter: authGuard,
    component: () => import('@/pages/OfferPage.vue')
  },
  {
    path: '/offer',
    name: "create_offer_",
    beforeEnter: authGuard,
    component: () => import('@/pages/OfferPage.vue')
  },
  {
    path: '/campaign/:id',
    name: "edit_campaign",
    beforeEnter: authGuard,
    component: () => import('@/pages/OfferPage.vue')
  },
  {
    path: '/campaign',
    name: "create_campaign",
    beforeEnter: authGuard,
    component: () => import('@/pages/OfferPage.vue')
  },
  {
    path: '/onboarding',
    name: "onboarding",
    beforeEnter: authGuard,
    meta: { onlyIfNoBusinessPartner: true },
    component: () => import('@/pages/onboarding/BusinessPartnerOnboarding.vue')
  },
  {
    path: '/signup_success',
    name: "signup_success",
    beforeEnter: authGuard,
    meta: { onlyIfNotApproved: true },
    component: () => import('@/pages/onboarding/CompanyOnboardingSuccess.vue')
  },
  {
    path: '/api',
    name: "api_testing",
    beforeEnter: apiGuard,
    component: () => import('@/pages/testing/ApiTesting.vue')
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.public)) {
    return next();
  }

  let isAdmin = to.query.isAdmin;
  if (isAdmin) {
    return next();
  }

  const activeBusinessPartner = await store.dispatch('fetchAndSetActiveBusinessPartner');
  console.log('activeBusinessPartner:', activeBusinessPartner)
  if (!activeBusinessPartner && to.path !== '/onboarding') {
    return next('/onboarding');
  }

  if (activeBusinessPartner && !activeBusinessPartner.isApproved && to.path !== '/signup_success') {
    return next('/signup_success');
  }

  if (activeBusinessPartner && activeBusinessPartner.isApproved && (to.path === '/' || to.path === '/onboarding' || to.path === '/signup_success')) {
    return next('/dashboard');
  }

  return next();
});



export default router;