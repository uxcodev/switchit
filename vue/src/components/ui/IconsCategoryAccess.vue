<template>
  <div v-if="categories" class="access_icons">

    <span v-for="(value, key) in categories" :key="key" :class="access[key]?.status ? 'active' : ''" class="material-symbols-outlined">{{ value.icon }}
    </span>

    <!-- <span :class="access.mortgage?.status ? 'active' : ''" class="material-symbols-outlined">house</span>
        <span :class="access.home_insurance?.status ? 'active' : ''" class="material-symbols-outlined">verified_user</span>
        <span :class="access.broadband?.status ? 'active' : ''" class="material-symbols-outlined">language</span>
        <span :class="access.mobile?.status ? 'active' : ''" class="material-symbols-outlined">smartphone</span>
        <span :class="access.energy?.status ? 'active' : ''" class="material-symbols-outlined">lightbulb</span>
        <span :class="access.car_insurance?.status ? 'active' : ''" class="material-symbols-outlined">directions_car</span> -->
  </div>
</template>

<script>
export default {
  props: {
    access: Object,
  },
  data() {
    return {
      // categories: this.$store.getters.categories || []
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories || {}
    }
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="sass">
.access_icons
  display: flex
  gap: 6px
  span
    font-size:1.5em
    opacity: .1
    color: #00BB8E
  span.active
    opacity: 1   
</style>
