<template>
  <div class="navbar">
    <SwitchitIcon @click="refreshPage()" class="logo" :width="40" :height="40" color="#03D0BF" />
    <!-- <div title="clear store button" @click="refreshPage()" ><span class="material-symbols-outlined">refresh</span></div> -->
    <div class="nav">
      <router-link title="dashboard" to="/dashboard" v-if="isApproved" :class="{ icon: true, active: $route.name === 'dashboard' }"><span class="material-symbols-outlined">dashboard</span></router-link>
      <router-link v-if="isApproved" title="offers" to="/offers" :class="{ icon: true, active: $route.name === 'offers' }"><span class="material-symbols-outlined">request_page</span></router-link>
      <router-link v-if="isApproved && isAdmin" title="operations" to="/operations" :class="{ icon: true, active: $route.name === 'operations' }"><span class="material-symbols-outlined">location_city</span></router-link>
      <!-- add link to clear vuex store -->
      <!-- <div v-if="isAdmin" class="icon button" @click="createFakeData" ><span class="material-symbols-outlined">input_circle</span></div> -->
      <!-- <router-link title="settings" to="/settings" v-if="isApproved" :class="{ icon: true, active: $route.name === '' }"><span class="material-symbols-outlined">settings</span></router-link> -->
      <LanguagePicker title="change language" class="icon" />
      <AvatarDropdown v-if="$auth0?.isAuthenticated" />
      <LoginButton v-else></LoginButton>
    </div>
  </div>
</template>

<script>
import SwitchitIcon from "@/components/assets/SwitchitIcon.vue";
import LoginButton from "../auth/LoginButton.vue";
import AvatarDropdown from "../auth/AvatarDropdown.vue";
// import LogoutButton from "../auth/LogoutButton.vue";
import LanguagePicker from "../ui/LanguagePicker.vue";


export default {
  components: { SwitchitIcon, LoginButton, LanguagePicker, AvatarDropdown },
  data() {
    return {
      isDisabled: true,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    isApproved() {
      return this.$store.getters.activeBusinessPartner?.isApproved
      // return true
    }
  },
  methods: {
    async refreshPage() {
      await this.$store.dispatch('clearStore');
      this.$router.push({ path: '/' })
    },
  },
  mounted() {

  },
};
</script>

<style lang="sass" scoped>
$transition-sidebar: 0

@import "/src/styles/variables.sass"
.main
  left: 0
  top: 80px
.navbar
  position: fixed
  display: flex
  // flex-direction: column
  flex-direction: row
  justify-content: flex-end
  opacity: 1
  visibility: visible
  // width: 80px
  // height: 100%
  width: 100%
  height: 80px !important
  transition: $transition-sidebar
  box-shadow: rgba(0, 0, 0, 0.1) -10px 0 10px
  z-index: 99
  padding: 20px
  background-color: $darker
  height:100%
  gap:20px

  .nav
    flex-grow:1
    display: flex
    // flex-direction: column
    flex-direction: row
    justify-content: flex-end
    gap: 20px
    // overflow: hidden
    flex-grow: 1

    .spacer
      height: 40px
      // flex-grow: 1

  .icon
    color: white
    font-weight: 700
    // font-size: 30px
    color: $icon-dark
    width: 40px
    height: 40px
    text-decoration: none
    padding: 6px
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center

    &.active
      color: $icon-light

.navbar-resources
  display: flex
  gap:20px
  flex-direction: column
  align-items: center




  select
    color: #333
    font-size: inherit
    font-weight: inherit
    text-transform: uppercase
    padding: 2px 4px

@media only screen and (max-width: 767px)
  .navbar
    width: 100%
    height: 60px
    flex-direction: row
    align-items: center
    justify-content: space-evenly
    top: none
    bottom: 0px
    .logo
      display: none
    .nav
      flex-direction: row
      align-items: center
      justify-content: space-evenly
      .spacer
        display: none
    &-footer
      width:100%
      flex-direction: row
      align-items: center

  .navbar-resources
    gap:10px
    flex-direction: row
    flex-grow:1
    align-items: center
    justify-content: space-evenly

</style>
