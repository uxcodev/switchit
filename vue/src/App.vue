<template>
  <MainNav />
  <FilterPanel v-if="loaded" />
  <div id="app">
    <router-view v-if="loaded"></router-view>
    <!-- <div class="main">
                              Waiting for authorization...
                            </div> -->
  </div>
</template>

<script>
import MainNav from "@/components/layout/MainNav.vue";
// import api from "@/api/switchit";
import jwt_decode from "jwt-decode";
import FilterPanel from "./components/leads/FilterPanel.vue";

export default {
  components: {
    MainNav,
    FilterPanel,
  },
  name: "App",
  data() {
    return {
      loaded: false,
      auth0User: this.$auth0.user,
      user: () => { this.$store.getters.user }
    };
  },
  watch: {
    async auth0User(auth0User) {
      if (auth0User) {
        let access_token = await localStorage.getItem('access_token')

        if (!access_token) {
          access_token = await this.$auth0.getAccessTokenSilently()
          console.log('generated new token:', access_token)
          localStorage.setItem('access_token', access_token)
        }

        setTimeout(() => {
          let acc_token = localStorage.getItem('access_token')
          console.log('access_token', acc_token)
        }, 1000);
        // *** ID TOKEN ***

        // create token on backend from logged in email
        // this also checks switchit db for a user, and
        // returns the user info in the token

        let token = await this.$api.createToken(auth0User.email)

        // get the user info from the returned token and
        // save it in VueX

        let decodedToken = await jwt_decode(token)
        await this.$store.dispatch('setUser', decodedToken.user)

        // if there is no user in the switchit db, push 
        // to onboarding

        // // console.log('decodedToken.user')
        // // console.log(decodedToken.user)

        if (decodedToken.user === null) {
          this.$router.push({ path: '/onboarding' })
          return
        }

        let status = decodedToken.user.status
        if (status) {
          if (status === 'new' || status === 'pending') {
            this.$router.push({ path: '/onboarding' })
          }
        }

        // if the user is admin, save to VueX

        if (decodedToken.user && decodedToken.user.admin) {
          this.$store.dispatch('isAdmin', decodedToken.user.admin)
          this.$store.dispatch('setAccess', decodedToken.user.access)
          // this.$store.dispatch('createServices', decodedToken.user.access)
        }
      }
      this.loaded = true
    }
  },
  async mounted() {
    // *** ACCESS TOKEN ***

    let access_token = await localStorage.getItem('access_token')

    if (!access_token) {
      console.log('getting new token')
      access_token = await this.$auth0.getAccessTokenSilently()
      localStorage.setItem('access_token', access_token)
    }
    // console.log('access_token ', access_token)
  }
};
</script>

<style lang="sass">
@import "/src/styles/styles.sass"

</style>