<template>
  <div v-if="isLoading" class="loading">Loading ...</div>
  <div v-else class="main">

    <div class="container white">
      <h2>User Profile</h2>
      <!-- <button v-if="!isAuthenticated" @click="login" class="login-button">Log in</button>
      <button v-else @click="logout" class="logout-button">Log out</button> -->
      <div v-if="isAuthenticated" class="profile-details">
        <img :src="user.picture" alt="User profile picture" class="profile-picture">
        <h3>{{ user.name }}</h3>

        <p v-if="user.given_name"><strong>Name:</strong> {{ user.given_name }} {{ user.family_name }}</p>
        <p v-else><strong>Name:</strong><i> Name not provided</i></p>
        <!-- <p><strong>Nickname:</strong> {{ user.nickname }}</p> -->
        <!-- <p><strong>Email:</strong> {{ user.email }}</p> -->
        <!-- add user.email, with a verified checkmark (using material symbols) if 'email_verified' is true -->
        <p><strong>Email:</strong> {{ user.email }} <span v-if="user.email_verified" class="material-symbols-rounded check">check_circle</span></p>
        <!-- <p><strong>Updated at: </strong> {{ user.updated_at }}</p> -->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: true,
    };
  },
  async mounted() {
    this.isAuthenticated = await this.$auth0.isAuthenticated;
    this.user = this.$auth0.user;
    this.isLoading = false;
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({ returnTo: window.location.origin });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"
@import "/src/styles/mixins.sass"
@import "@vueform/multiselect/themes/default.css"
.img_placeholder
  width: 100%

.check
  color: green
  font-size: 1.2em
  position: relative
  top: 3px

.hide
  display: none  !important
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  background-color: #fafafa
  min-height: 100vh
  padding: 120px 20px 60px 20px
  top: 80px
  &.clip
    max-height: 100vh
    overflow: hidden

.back-button
  width: 100%
  button
    padding: 4px 8px

.container.white
  background-color: white
  padding: 50px
  border-radius: 10px
  @include shadow()

  .group
    input:not(.reset)
      max-width: none

.highlight  
  border: 1px solid rgba($ui-active, .2)
  border-radius: 5px
  background-color: rgba($ui-active, .05)
  &.disabled 
    background-color: #eee 
    border: 1px solid #ddd
    .checkmark::after 
      background-color: #ccc !important

  &::disabled
    background-color: #eee !important

.checkbox-group
  flex-direction: row
  flex-wrap: wrap
  width:400px
  label
    width:160px
pre
  color: black

</style>