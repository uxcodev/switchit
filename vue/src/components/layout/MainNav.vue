<template>
  <div class="navbar">
    <SwitchitIcon @click="$router.push({ path: '/' })" class="logo" :width="40" :height="40" color="#03D0BF" />
    <div class="nav">
      <router-link to="/dashboard" v-if="isActive" :class="{ icon: true, active: $route.name === 'dashboard' }"><span class="material-symbols-outlined">dashboard</span></router-link>
      <router-link to="/operations" v-if="isAdmin" :class="{ icon: true, active: $route.name === 'operations' }"><span class="material-symbols-outlined">group</span></router-link>
      <router-link to="/settings" v-if="isActive" :class="{ icon: true, active: $route.name === '' }"><span class="material-symbols-outlined">settings</span></router-link>
      <LanguagePicker class="icon"/>
<LoginButton v-if="!isAuthenticated"></LoginButton>
      <LogoutButton v-else></LogoutButton>
    </div>
  </div>
</template>

<script>
import SwitchitIcon from "@/components/assets/SwitchitIcon.vue";
import LoginButton from "../auth/LoginButton.vue";
import LogoutButton from "../auth/LogoutButton.vue";
import LanguagePicker from "../ui/LanguagePicker.vue";

export default {
  components: { SwitchitIcon, LoginButton, LogoutButton, LanguagePicker },
  data() {
    return {
      isDisabled: true,
      isAuthenticated: this.$auth0.isAuthenticated,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    isActive() {
      return this.$store.getters.user ? this.$store.getters.user.status === 'active' : false
    }
  },
  methods: {
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
    overflow: hidden
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
