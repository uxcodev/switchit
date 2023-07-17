
import { authGuard } from "@auth0/auth0-vue";
import { createRouter, createWebHistory } from 'vue-router'

function homePageGuard(to, from, next) {
  next('/dashboard');
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
    path: '/settings',
    name: "settings",
    beforeEnter: authGuard,
    component: () => import('@/pages/SettingsPage.vue')
  },
  {
    path: '/',
    name: "home",
    beforeEnter: homePageGuard,
    component: () => import('@/pages/HomePage.vue')
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
    // beforeEnter: isAuth,
    component: () => import('@/pages/onboarding/CreateCompany.vue')
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
  routes,
})
export default router;