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
      
      // check if there is an access token in local storage. If not, get one from Auth0

      let access_token = await localStorage.getItem('access_token')

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

      console.log('auth0User', this.auth0User)
      let email =  this.auth0User.email
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
        console.log('fields', fields)
        user = await this.$api_node.createUser(fields)
      }

      // save active user to vuex

      this.$store.dispatch('setActiveUser', user)
      console.log('getActiveUser', this.$store.getters.activeUser)

      // redirect to onboarding or dashboard depending on user status

      let status = user?.status || null
      if (!status || status === 'new' || status === 'pending') {
        this.$router.push({ path: '/onboarding' })
      } 
      console.log('user', user, status)
      this.loaded = true
    }
  },
  watch: {
    async auth0User() {
      console.log('user changed')
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