<template>
  <button @click="login">Log in</button>
</template>


<script>

// Options API
export default {
  methods: {
    login() {
      let response = this.$auth0.loginWithRedirect({
        appState: {
          target: "/",
        },
      });
      // console.log('login response..')
      console.log(response)
    }
  }
};
</script>

<style lang="sass" scoped>
</style>