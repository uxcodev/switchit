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
    activeUser() {
      return this.$store.getters.activeUser
    },
    activeBusinessPartner() {
      return this.$store.getters.activeBusinessPartner || null
    },
  },
  methods: {
    async initUser() {

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

      // find activeUser in our database with the email address from Auth0

      let email = this.auth0User.email
      let activeUser = await this.$api_node.getActiveUser(email)
      
      // if there is no activeUser, create one

      if (!activeUser) {
        let fields = {
          email: this.auth0User.email,
          first_name: this.auth0User.given_name,
          last_name: this.auth0User.family_name,
          auth0_id: this.auth0User.sub
        }
        // console.log('TEMP: creating new activeUser: ', fields)
        activeUser = await this.$api_node.createUser(fields)
      }

      // get active activeUser from vuex
      let store_user = this.$store.getters.activeUser
      if (!store_user) {
        this.$store.dispatch('setActiveUser', store_user)
        // console.log('activeUser stored in vuex:', activeUser)
      }
    }
  },
  watch: {
    async auth0User() {
      await this.initUser()
      console.log('watch initUser complete')
    }
  },
  async mounted() {

    /* TEMP TEST */
    let leads = await this.$switchit.getLeads()
    console.log('app.vue leads:', leads)
    
    setTimeout(async () => {
      if (!this.activeUser) {
        console.log('no activeUser found')
      }
    }, 2000)

  }
};
</script>

<style lang="sass">
@import "/src/styles/styles.sass"

</style>