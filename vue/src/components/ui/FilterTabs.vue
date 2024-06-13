<template>

  <div class="filter-group">
    <div class="filter" :class="all ? 'active' : ''" @click="changeFilters('all')"><span>All</span></div>
    <div v-for="(service, index) in filteredServiceTypes" :key="index" class="filter" @click="changeFilters(service)" :class="service.selected ? 'active' : ''">
      <span class="icon material-symbols-outlined"> {{ service.icon }}</span>
      <span class="text">{{ $t(service.serviceTypeString) }}</span>
    </div>
  </div>
</template>

<script>



export default {
  props: {
    resources: Array,
  },
  emits: ['applyFilterTabs', 'applyFilterTabsServices'],
  data() {
    return {
      all: true,
      categories: this.$store.getters.categories,
      serviceTypes: this.$store.getters.serviceTypes,
    };
  },
  // a computed property called filteredCategories that is a copy of categories but with 'general' property removed
  computed: {
    filters() {
      return this.$store.getters.filters
    },
    filteredServiceTypes() {
      return this.serviceTypes.filter(service => service.access && service.serviceTypeString !== 'General' && service.serviceTypeString !== 'Unknown')
    },
    filteredCategories() {
      const { ...filteredCategories } = this.categories;
      let activeBusinessPartner = this.$store.getters.activeBusinessPartner;
      console.log('activeBusinessPartner', activeBusinessPartner)
      let serviceTypes = activeBusinessPartner.serviceTypes;
      console.log('filteredCategories serviceTypes', serviceTypes)
      /*
      serviceTypes is an array of numbers, e.g.
       [
    1,
    2,
    4,
    8,
    16,
    32
]

      only keep the properties in filteredCategories where the property 'code' is in the serviceTypes array
      */
      for (let cat in filteredCategories) {
        if (!serviceTypes?.includes(filteredCategories[cat].code)) {
          delete filteredCategories[cat];
        }
      }


      delete filteredCategories.General;
      return filteredCategories;
    },



  },
  // if filters changes, update tabs


  watch: {
    filters: {
      handler(newVal) {
        this.filteredServiceTypes.forEach(service => {
          if (newVal[service.serviceTypeString]) {
            service.selected = true
          } else {
            service.selected = false
          }
        })

      },
      deep: true,
    },
    filtersChanged() {
      this.offer_obj.filters = this.$store.getters.filters
    },
  },
  methods: {
    select(resource_id) {
      this.selected = resource_id;
      // // console.log(resource_id);
    },

    changeFilters(service) {
      console.log('changeFilters', service, this.services)
      if (service === 'all') {
        this.all = true
        this.services = []
        this.filteredServiceTypes.forEach(service => {
          service.selected = false
        })
      } else {
        service.selected = !service.selected
        this.all = false
        this.services = this.filteredServiceTypes.filter(service => service.selected)
      }

      // change filters in store
      let filters = {}
      this.filteredServiceTypes.forEach(service => {
        if (service.selected) {
          filters[service.serviceTypeString] = true
        }
      })
      this.$store.commit('setFilters', filters)

      this.$emit('applyFilterTabsServices', this.services)
    }
  },
  mounted() {
    console.log('this.filteredServiceTypes()', this.filteredServiceTypes)
    // get filters from store

    // for each key in filters, set the corresponding serviceType.selected to true
    for (let key in this.filters) {
      this.filteredServiceTypes.forEach(service => {
        if (service.serviceTypeString === key) {
          service.selected = true
        }
      })
    }
    console.log('filters', this.filters)
    for (let cat in this.categories) {
      this.categories[cat].status = false
    }
  }
};
</script>

<style lang="scss">
.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    min-width: 50px;
    padding: 6px 12px;
    font-size: 13px;
    border: 0;
    border-radius: 36px;
    color: white;
    background-color: #B0BEC5;
    transition: background-color 0.2s;
    cursor: pointer;

    .icon {
      font-size: 16px // width: 10px;
    }

    &:hover {
      background-color: #9dacb3;
    }

    &.active {
      background-color: #546E7A;
    }

    &.selected {
      background-color: #546E7A;
      color: white;
    }
  }
}
</style>
