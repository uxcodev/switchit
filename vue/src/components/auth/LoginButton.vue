<template>
  <button @click="login">Log in</button>
</template>


<script>

export default {
  methods: {
    login() {
      let response = this.$auth0.loginWithRedirect({
        appState: {
          target: "/",
        },
      });
      console.log(response)
    }
  }
};
</script>

<style lang="sass" scoped>
</style>