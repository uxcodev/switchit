
import { authGuard } from "@auth0/auth0-vue";
import { createRouter, createWebHistory } from 'vue-router'

function apiGuard(to, from, next) {
  next();
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
    path: '/',
    name: "home",
    beforeEnter: authGuard,
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/onboarding',
    name: "onboarding",
    beforeEnter: authGuard,
    // component: () => import('@/pages/onboarding/CompanyOnboarding.vue')
    component: () => import('@/pages/onboarding/BusinessPartnerOnboarding.vue')
  },
  {
    path: '/company',
    name: "company",
    beforeEnter: authGuard,
    // component: () => import('@/pages/onboarding/CompanyOnboarding.vue')
    component: () => import('@/pages/onboarding/EditBusinessPartner.vue')
  },
  {
    path: '/createcompanynode',
    name: "createcompanynode",
    // beforeEnter: isAuth,
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
    path: '/signup_success',
    name: "signup_success",
    beforeEnter: authGuard,
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
export default router;