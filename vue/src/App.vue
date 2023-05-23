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
import FilterPanel from "./components/leads/FilterPanel.vue";
import jwtDecode from "jwt-decode";

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

  async mounted() {

      let access_token = await localStorage.getItem('access_token')
      
      if (!access_token) {
        access_token = await this.$auth0.getAccessTokenSilently()
        localStorage.setItem('access_token', access_token)
      }
      console.log('decoded token', jwtDecode(access_token))
      let permissions = (jwtDecode(access_token)).permissions;
      console.log('permissions', permissions)

      // if permissions array includes 'superadmin', set setAdmin to true
      if (permissions.includes('superadmin')) {
        this.$store.dispatch('isAdmin', true)
        console.log('is superadmin')
      }

      let access = []
      permissions.forEach(item => {
        if (item.includes('lm_')) access.push(item.replace('lm_', ''))
      })
      console.log('permissions', access)
      this.$store.dispatch('setAccess', access)
      this.loaded = true

  }
};
</script>

<style lang="sass">
@import "/src/styles/styles.sass"

</style>