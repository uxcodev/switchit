<template>
  <!-- <div v-if="access" class="access_icons">
    <span v-for="(value, key) in categories" :key="key" :class="access[key]?.status ? 'active' : ''" class="material-symbols-outlined">{{ value.icon }}
    </span>
  </div> -->

  <div v-if="serviceTypes" class="access_icons">

    <!-- <span v-for="(value, key) in categories" :key="key" :class="access[key]?.status ? 'active' : ''" class="material-symbols-outlined">{{ value.icon }} -->
    <!-- // if  value.code is in the 'serviceTypes array, class should be 'active' -->
    <span v-for="(value, key) in categories" :key="key" :class="serviceTypes.includes(value.code) ? 'active' : ''" class="material-symbols-outlined">{{ value.icon }}
    </span>

    <!-- 
<span :class="access.mortgage?.status ? 'active' : ''" class="material-symbols-outlined">house</span>
<span :class="access.home_insurance?.status ? 'active' : ''" class="material-symbols-outlined">verified_user</span>
<span :class="access.broadband?.status ? 'active' : ''" class="material-symbols-outlined">language</span>
<span :class="access.mobile?.status ? 'active' : ''" class="material-symbols-outlined">smartphone</span>
<span :class="access.energy?.status ? 'active' : ''" class="material-symbols-outlined">lightbulb</span>
<span :class="access.car_insurance?.status ? 'active' : ''" class="material-symbols-outlined">directions_car</span> 
-->

  </div>

</template>


<script>

import bitwiseDecode from '@/helpers/bitwise'
export default {
  props: {
    access: Object,
    serviceType: Number
  },
  data() {
    return {
      // categories: this.$store.getters.categories || []
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories || {}
    },
    serviceTypes() {
      return bitwiseDecode(this.serviceType)
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
