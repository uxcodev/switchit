<template>
  <!-- <div v-if="access" class="access_icons">
    <span v-for="(value, key) in categories" :key="key" :class="access[key]?.status ? 'active' : ''" class="material-symbols-outlined">{{ value.icon }}
    </span>
  </div> -->

  <div class="access_icons">
    <div>
    </div>
    <span v-for="(service, index) in filteredServiceTypes" :key="index" :class="relevantServices[service.serviceTypeString] ? 'active' : ''" class="material-symbols-outlined">{{ service.icon }}
      </span>
  </div>

</template>


<script>

import bitwiseDecode from '@/helpers/bitwise'
export default {
  props: {
    access: Object,
    serviceType: Number,
    relevantServices: Object
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
    serviceTypeCodes() {
      return bitwiseDecode(this.serviceType)
    },
    serviceTypes() {
      return this.$store.getters.serviceTypes
    },
    filteredServiceTypes() {
      // remove serviceType with serviceTypeString 'General' and 'Unknown'
      return this.serviceTypes.filter(service => service.serviceTypeString !== 'General' && service.serviceTypeString !== 'Unknown')
    },

  },


  methods: {
  },
  mounted() {
    console.log('relevantServices', this.relevantServices)
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
