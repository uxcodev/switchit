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
/*       let access_token = localStorage.getItem('access_token')
      let decoded = access_token ? jwtDecode(access_token) : null
      let expiration = 1 // 1 hour

      // check if token is expired

      if (access_token) {
        console.log('token exists')
        let now = Math.floor(Date.now() / expiration);
        let exp = decoded.exp;
        let iat = decoded.iat;
        if (now > exp || (now - iat) > expiration) {
          console.log('token expired')
          access_token = null;
          localStorage.removeItem('access_token');
        } else {
          console.log('token not expired')
        }
      }

      // if there's no token, get one from Auth0

      if (!access_token) {
        access_token = await this.$auth0.getAccessTokenSilently()
        localStorage.setItem('access_token', access_token)
        console.log('new token created: ', access_token)
      }

      // access_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh6azJsY0ZuVmZuWlZXVFc5X21KVSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xbmx1YXA2aC5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDI1MDcxMDA0MDc5ODk4NzkzMDkiLCJhdWQiOlsiaHR0cHM6Ly9zd2l0Y2hpdC5haS9hcGkiLCJodHRwczovL2Rldi1xbmx1YXA2aC5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA4NDY5MTIzLCJleHAiOjE3MTEwNjExMjMsImF6cCI6IldmSkRRMXRDdVgySjRaTVhncW1lR0R3anJPSGtFN3JtIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbInN1cGVyYWRtaW4iXX0.VGqeO6cfYeKB8BsOdfBi9JE4jyYlzzMNgLXWq8abPJj3FubNkN2s2E_QsjRjetYsDicNBkHN5OFRERgcCvPwfaCFFTBRnUXpScVkEVppzq1bZXJO4gejoDZhDyevrge9wPkuaqcgdRA18OS9dE2c37cYGECbnDWXR3Bd6WI0NHECuo1xc7KlohR-R1u58naw5TP3b6EXYsDzIVT3JYOYLLbKAE7Sy1A2wZRiu-VF5HN7ttcCJiVJR-U7UXLRSesL_W0RroTPvUufQQnaYBhCxvVq9P8J4dNdYga-2kiVTtnq6PCE40Y0aKuijcL5TauWKV_jeYVh0MVRmdqrIPIGZw'
      console.log('decoded token: ', decoded)
      // get permissions from access token, and set access to services
 */
      // delete token from localStorage

      let access_token = await this.$auth0.getAccessTokenSilently()
      localStorage.setItem('access_token', access_token)
      let isAdminEmail = this.auth0User.email.includes('@switchit.ai')
    
      let permissions = (jwtDecode(access_token)).permissions;
      if (permissions.includes('superadmin') || isAdminEmail) {
        this.$store.dispatch('isAdmin', true)
        console.log('is Admin')
      }

      
      let access = []
      await permissions.forEach(item => {
        if (item.includes('lm_')) access.push(item.replace('lm_', ''))
      })

      this.$store.dispatch('setAccess', access)

      // find user in our database with the email address from Auth0

      let email = this.auth0User.email
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
        // console.log('TEMP: creating new user: ', fields)
        user = await this.$api_node.createUser(fields)
      }

      // get active user from vuex
      let activeUser = this.$store.getters.activeUser
      if (!activeUser) {
        this.$store.dispatch('setActiveUser', user)
        // console.log('user stored in vuex:', user)
      }
    }
  },
  watch: {
    async auth0User() {
      this.initUser()
    }
  },
  async mounted() {
    setTimeout(() => {
      if (loading && !this.user) {
        this.initUser()
      }
    }, 1000)

  }
};
</script>

<style lang="sass">
@import "/src/styles/styles.sass"

</style>