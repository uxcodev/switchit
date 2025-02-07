import store from '@/store/index.js';
import { loading } from '@/store/index.js';
import { authGuard } from "@auth0/auth0-vue";
import { createRouter, createWebHistory } from 'vue-router'

import UsersPage from '@/pages/setting/UsersPage.vue';
import SettingLayout from '@/components/layout/SettingLayout.vue';

function apiGuard(to, from, next) {
  next();
}

const routes = [
  {
    path: '/',
    name: "home",
    // beforeEnter: authGuard,
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
    component: () => import('@/pages/testing/OpportunitiesDashboard_RunDataUpdate.vue')
  },
  {
    path: '/operations',
    name: "operations",
    // beforeEnter: authGuard,
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
    component: SettingLayout,
    children: [
      {
        path: 'users',
        component: UsersPage
      }
    ]
  },
  {
    path: '/profile',
    name: "profile",
    meta: { public: true },
    component: () => import('@/components/auth/AuthProfile.vue')
  },

  {
    path: '/businesspartner',
    name: "businesspartner",
    beforeEnter: authGuard,
    component: () => import('@/pages/onboarding/EditBusinessPartner.vue')
  },
  {
    path: '/businesspartner/:id',
    name: "edit_businesspartner",
    beforeEnter: authGuard,
    component: () => import('@/pages/onboarding/EditBusinessPartner.vue')
  },
  {
    path: '/offers',
    name: "offers",
    beforeEnter: authGuard,
    component: () => import('@/pages/OffersDashboard.vue')
  },
  {
    path: '/users',
    name: "users",
    beforeEnter: authGuard,
    component: () => import('@/pages/UserManagement.vue')
  },
  {
    path: '/offer/:id',
    name: "offer",
    beforeEnter: authGuard,
    component: () => import('@/pages/OfferEditor.vue')
  },
  {
    path: '/offer',
    name: "create_offer_",
    beforeEnter: authGuard,
    component: () => import('@/pages/OfferEditor.vue')
  },
  {
    path: '/campaign/:id',
    name: "edit_campaign",
    beforeEnter: authGuard,
    component: () => import('@/pages/OfferEditor.vue')
  },
  {
    path: '/campaign',
    name: "create_campaign",
    beforeEnter: authGuard,
    component: () => import('@/pages/OfferEditor.vue')
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
  const activeBusinessPartner = await store.dispatch('fetchAndSetActiveBusinessPartner');
  // console.log('activeBusinessPartner', activeBusinessPartner);
  if (to.matched.some(record => record.meta.public)) {
    return next();
  }

  let isAdmin = to.query.isAdmin;
  if (isAdmin) {
    return next();
  }

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

router.beforeEach((to, from, next) => {
  loading.value = true; // set loading to true before each navigation
  next();
});


router.afterEach(() => {
  loading.value = false; // set loading to false after navigation is complete
});

export default router;
