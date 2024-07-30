<template>
  <div class="h-screen flex flex-col">
    <MainNav />

    <FilterDrawer v-if="!loading && activeBusinessPartner && serviceTypes" />
    <InsightsPanel v-if="!loading" />
    <LoaderAniOverlay v-if="loading" />

    <div v-if="!loading" class="flex flex-grow h-0 w-screen bg-shade-f1">
      <SideBar class="flex-shrink-0" />

      <div class="flex-grow w-0 h-full overflow-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { loading } from '@/store/index.js';
import MainNav from "@/components/layout/MainNav.vue";
import FilterDrawer from "@/components/leads/FilterDrawer.vue";
import { jwtDecode } from "jwt-decode";
import LoaderAniOverlay from "@/components/ui/LoaderAniOverlay.vue";
import InsightsPanel from "@/components/leads/InsightsPanel.vue";
import SideBar from '@/components/layout/SideBar.vue';

export default {
  components: {
    SideBar,
    InsightsPanel,
    MainNav,
    FilterDrawer,
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
      return this.activeUser ? this.$store.getters.activeBusinessPartner : null
    },
    serviceTypes() {
      return this.$store.getters.serviceTypes
    }
  },
  methods: {
    async initUser() {

      let access_token = await this.$auth0.getAccessTokenSilently()
      localStorage.setItem('access_token', access_token)
      let isAdminEmail = this.auth0User.email.includes('@switchit.ai')

      let permissions = (jwtDecode(access_token)).permissions || [];
      if (permissions.includes('superadmin') || isAdminEmail) {
        this.$store.dispatch('isAdmin', true)
      }

      // find activeUser in our database with the email address from Auth0
      // check Node for active user (used for saving filters and settings)

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
        activeUser = await this.$api_node.createUser(fields)
      }

      // always set activeUser in vuex to catch changes
      this.$store.dispatch('setActiveUser', activeUser)

    }
  },
  watch: {
    async auth0User() {
      await this.initUser()
      // console.log('watch initUser complete')
    }
  },
  async mounted() {
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
@import "/src/styles/index"
</style>
