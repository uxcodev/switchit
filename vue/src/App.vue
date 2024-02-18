<template>
  <MainNav />
  <FilterPanel v-if="!loading && activeBusinessPartner" />
  <div class="mt-10" id="app">
    <LoaderAniOverlay v-if="loading" />
    <router-view></router-view>
  </div>
</template>

<script>
import { loading } from '@/store/index.js';
import MainNav from "@/components/layout/MainNav.vue";
import FilterPanel from "@/components/leads/FilterPanel.vue";
import jwtDecode from "jwt-decode";
import LoaderAniOverlay from "@/components/ui/LoaderAniOverlay.vue";

export default {
  components: {
    MainNav,
    FilterPanel,
    LoaderAniOverlay
  },
  name: "App",
  data() {
    return {
      loading,
      auth0User: this.$auth0.user,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    activeBusinessPartner() {
      return this.$store.getters.activeBusinessPartner || null
    },
  },
  methods: {
    async initUser() {
      let access_token = localStorage.getItem('access_token')
      let decoded = access_token ? jwtDecode(access_token) : null
      let expiration = 3600

      // check if token is expired

      if (access_token) {
        let now = Math.floor(Date.now() / expiration);
        let exp = decoded.exp;
        let iat = decoded.iat;
        if (now > exp || (now - iat) > expiration) {
          access_token = null;
          localStorage.removeItem('access_token');
        }
      }

      // if there's no token, get one from Auth0

      if (!access_token) {
        access_token = await this.$auth0.getAccessTokenSilently()
        localStorage.setItem('access_token', access_token)
      }

      console.log('decoded token: ', decoded)
      // get permissions from access token, and set access to services

      let permissions = (jwtDecode(access_token)).permissions;
      if (permissions.includes('superadmin')) {
        this.$store.dispatch('isAdmin', true)
      }

      // console.log('permissions: ', permissions)
      let access = []
      await permissions.forEach(item => {
        if (item.includes('lm_')) access.push(item.replace('lm_', ''))
      })

      this.$store.dispatch('setAccess', access)

      // find user in our database with the email address from Auth0

      let email = this.auth0User.email
      let user = await this.$api_node.getActiveUser(email)

      // console.log('auth0 user: ', this.auth0User)

      // if there is no user, create one

      if (!user) {
        let fields = {
          email: this.auth0User.email,
          first_name: this.auth0User.given_name,
          last_name: this.auth0User.family_name,
          status: 'new',
          auth0_id: this.auth0User.sub
        }
        user = await this.$api_node.createUser(fields)
      }

      // get active user from vuex
      let activeUser = this.$store.getters.activeUser
      if (!activeUser) {
        this.$store.dispatch('setActiveUser', user)
        // console.log('user stored in vuex:', user)
      }

      /* 

      // redirect to onboarding or dashboard depending on user status
      this.$store.dispatch('setActiveBusinessPartner',null)
      let myBusinessPartners = await this.$switchit.getMyBusinessPartners()
      console.log('myBusinessPartners: ', myBusinessPartners)

      // TEMPORARILY OVERRIDE TO SIMULATE NEW SIGN UP
      // myBusinessPartners = []

      // use redirects if not admin
      if (!isAdmin) {
        if (myBusinessPartners.length) {
          let activeBusinessPartner = await this.$switchit.getBusinessPartner(myBusinessPartners[0].id)
          this.$store.dispatch('setActiveBusinessPartner',activeBusinessPartner)
          console.log('activeBusinessPartner: ', this.$store.getters.activeBusinessPartner)
          if (activeBusinessPartner.isApproved) {
            console.log('business partner is approved')
            this.$router.push({ path: '/dashboard' });
          } else {
            console.log('business partner is not approved')
            this.$router.push({ path: '/signup_success' });
          }
        } else {
          this.$router.push({ path: '/onboarding' })
        }
        this.loaded = true
      } else {
        this.loaded = true
      }
       */

      // let status = user?.status || null
      // if (!status || status === 'new' || status === 'pending') {
      //   this.$router.push({ path: '/onboarding' })
      // } 

      // this.loading = false

    }
  },
  watch: {
    async auth0User() {
      this.initUser()
    }
  },
  async mounted() {
    setTimeout(() => {
      if (loading) {
        this.initUser()
      }
    }, 1000)

  }
};
</script>

<style lang="sass">
@import "/src/styles/styles.sass"

</style>