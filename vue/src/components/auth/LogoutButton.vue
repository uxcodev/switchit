<template>
  <!-- <button @click="logout">Log out</button> -->
  <a href="#" @click="logout" class="icon">
    <span class="material-symbols-outlined">power_rounded</span>
  </a>
</template>

<script>

// Options API
export default {
  methods: {
    logout() {
      this.$auth0.logout({
        logoutParams: {
          // returnTo: window.location.origin
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"
.icon
    color: white
    font-weight: 700
    font-size: 30px
    color: $icon-dark
    width: 40px
    height: 40px
    text-decoration: none
    padding: 6px
    overflow: hidden

    &.active
      color: $icon-light
</style>