<template>
  <MainNav />
  <FilterPanel v-if="loaded" />
  <div id="app">
    <LoaderAniOverlay v-if="!loaded" />
    <router-view v-else></router-view>
  </div>
</template>

<script>
import MainNav from "@/components/layout/MainNav.vue";
// import api from "@/api/switchit";
import FilterPanel from "./components/leads/FilterPanel.vue";
import jwtDecode from "jwt-decode";
import LoaderAniOverlay from "./components/ui/LoaderAniOverlay.vue";
// import switchit from "./api/switchit";

export default {
  components: {
    MainNav,
    FilterPanel,
    LoaderAniOverlay
},
  name: "App",
  data() {
    return {
      loaded: false,
      // isLoading: this.$auth0.isLoading,
      auth0User: this.$auth0.user,
      // user: () => { this.$store.getters.user }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    // auth0User() {
    //   return this.$auth0.user
    // }
  },
  methods: {
    async initUser() {
      
      // check if there is an access token in local storage

      let access_token = localStorage.getItem('access_token')

      // check if token is expired

      if (access_token) {
        let decoded = jwtDecode(access_token)
        let now = new Date()
        let exp = new Date(decoded.exp * 1000)
        if (now > exp) {
          access_token = null
          localStorage.removeItem('access_token')
        }
      }

      // if there's no token, get one from Auth0
      
      if (!access_token) {
        access_token = await this.$auth0.getAccessTokenSilently()
        localStorage.setItem('access_token', access_token)
      }

      // get permissions from access token, and set access to services

      let permissions = (jwtDecode(access_token)).permissions;
      if (permissions.includes('superadmin')) {
        this.$store.dispatch('isAdmin', true)
      }

      let access = []
      await permissions.forEach(item => {
        if (item.includes('lm_')) access.push(item.replace('lm_', ''))
      })

      this.$store.dispatch('setAccess', access)

      // find user in our database with the email address from Auth0

      let email =  this.auth0User.email // || 'nto@switchit.ai'  // TEMP 
      let user = await this.$api_node.getActiveUser(email)

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

      // save active user to vuex

      this.$store.dispatch('setActiveUser', user)

      // redirect to onboarding or dashboard depending on user status

      let status = user?.status || null
      if (!status || status === 'new' || status === 'pending') {
        this.$router.push({ path: '/onboarding' })
      } 
      this.loaded = true
    }
  },
  watch: {
    async auth0User() {
      this.initUser()
    }
  },
  async mounted() {

    // setTimeout(()=> {
    //   this.initUser()
    // }, 1000)

  }
};
</script>

<style lang="sass">
@import "/src/styles/styles.sass"

</style>