<template>
  <MainNav />
  <FilterPanel />
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MainNav from "@/components/layout/MainNav.vue";
import FilterPanel from "./components/leads/FilterPanel.vue";

export default {
  components: {
    MainNav,
    FilterPanel,
},
  name: "App",
  data() {
    return {
      loaded: false,
    };
  },
};
</script>

<style lang="sass">
@import "/src/styles/styles.sass"

</style>