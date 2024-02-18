<template>
  <div :class="['sidebar', isOpen ? '' : 'sidebar-hidden']">
    <div @click="closeModal" class="close material-symbols-outlined">
      close
    </div>
    <div class="sidebar-content">
      <div v-if="Object.keys(filterObj).length || filtersets.length">
        <div class="inline_center button mb3" @click="toggleFilterOptions">
          <span class="material-symbols-outlined">page_info</span> Filter presets
        </div>
  
        <div v-if="showFiltersetOptions" class="pl7">
          <form @submit.prevent="createFilterset" class="switchit-form sm">
            <div v-if="Object.keys(filterObj).length"  class="group">
              <label for="filtersetName">Save this set of filters</label>
              <div class="inline_center input_button">
                <input v-model="filtersetName" placeholder="Name" type="text" id="filtersetName" class="input lg mr3" />
                <button>
                  <span class="material-symbols-outlined">Done</span>
                </button>
              </div>
            </div>
            
          </form>
  
          <div v-if="filtersets.length" class="mt3">
            <div v-for="(filterset, index) in filtersets" :key="index" class="filterset">
              <div class="filterset-list_item">
                <div class="filterset-name" @click="loadFilters(filterset.filters)">{{ filterset.filtersetName || 'untitled' }}</div>
                <!-- material symbol trash icon -->
                <div class="material-symbols-outlined" @click="deleteCampain(filterset._id)">delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      <section>
        <div>
          <h1>{{ $t('filter_opportunities') }}</h1>
          <p>{{ $t('only_checked_categories') }}</p>
        </div>
        <div class="checkboxes">
          <div v-for="(categoryData, category) in this.services" :key="category" class="checkbox">
            <label class="checkbox-label">
              <input :name="category" v-model="selectedCategories" type="checkbox" @change="onCheckboxChange" :value="category" />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                <span class="checkbox-icon material-symbols-outlined">{{ categoryData.icon }}
                </span>
                {{ $t(category) }}
              </span>
            </label>
            <div :class="filterObj[category] ? 'checkbox-link' : 'hidden'" @click="clearFilter(category)">Clear filter</div>
          </div>
        </div>
      </section>
      <button class="mt2" v-if="Object.keys(filterObj).length" @click="createCampaign">Create campaign from these filters</button>
      <section v-if="Object.keys(visibleFilters).length > 0 || selectedCategories.length > 0">
        <div v-for="(categoryData, category) in visibleFilters" :key="category">
          <h1 class="">{{ $t(category) }}</h1>

          <!-- Filters -->

          <div v-if="selectedCategories.includes(category)">

            <div class="filters" v-for="(fields, dataType, index) in categoryData" :key="index + componentKey">
              <div>
                <h2 class="mt5 mb1">{{ $t(dataType) }}</h2>
                <p>{{ $t(`select_options_below_${dataType}`) }}</p>
              </div>
              <div class="filter" v-for="(filter, key) in fields" :key="key + componentKey" :class="dataType === 'preference_data' ? 'slider' : ''">
                <filter-component v-if="resetCategory !== category" :currentValue="getFilterValue(category, dataType, key)" :filter-data="filter" :dataType="dataType" :filter-key="key" :category="category" @filter-changed="applyFilter" />
              </div>
            </div>
          </div>

        </div>
      </section>


    </div>

  </div>
</template>
<script>
// import Slider from '@vueform/slider'
import api from '@/api/api'
// import { mapState } from 'vuex'

export default {
  name: "TheSidebar",
  components: {
    // Slider,
  },
  data() {
    return {
      isDisabled: true,
      categoryAccess: this.$store.getters.categories,
      selectedCategories: [],
      resetCategory: null,
      filteredServices: this.$store.getters.services,
      filterObj: {},
      visibleFilters: {},
      filtersetName: '',
      filtersets: [],
      componentKey: 0,
      showFiltersetOptions: false,
    }
  },
  computed: {
    filters() {
      return this.$store.getters.filters
    },
    filtersChangedExternally() {
      return this.$store.getters.filtersChangedExternally
    },
    isOpen() {
      return this.$store.getters.isOpen;
    },
    services() {
      // return services from store, but only where the category is active in categoryAccess
      const services = this.$store.getters.services;
      const filteredServices = {};

      for (const [key, value] of Object.entries(services)) {
        // if (this.categoryAccess[key]?.status === true) {  // use this line instead of the next to make tab filters affect available filters in the filters panel
        if (this.categoryAccess[key]) {
          filteredServices[key] = value;
        }
      }

      return filteredServices;
    },

  },
  watch: {
    selectedCategories: {
      handler(categories) {
        this.visibleFilters = {};
        for (const category of categories) {
          this.visibleFilters[category] ??= { ...this.services[category] };
        }
      },
      deep: true,
    },
    filterObj: {
      handler(val) {
        console.log('filtersObj watched: ', val)
        console.log('filters from this.filters: ', this.filters)
        console.log('filters from store getters', this.$store.getters.filters)
        // this.loadFilters()
      },
      deep: true,
    },
    filters: {
      handler(val) {
        console.log('filters watched: ', val)
        this.filterObj = { ...val };
      },
      deep: true,
    },
    filtersChangedExternally: {
      handler(val) {
        console.log('filtersChangedExternally watched: ', val)
        this.loadFilters(this.$store.getters.filters);

      },
      deep: true,
    },

  },
  methods: {
    toggleFilterOptions() {
      this.showFiltersetOptions = !this.showFiltersetOptions
      this.getFiltersets()
    },
    closeModal() {
      // this.$router.push({ path: '/dashboard' })
      this.$store.dispatch('closeMenu')
    },
    clearFilter(category) {
      delete this.filterObj[category];
      this.resetCategory = category;
      this.$nextTick(() => {
        this.resetCategory = null;
      })
      setTimeout(() => {
        this.resetCategory = null;
      }, 0)
      this.saveFiltersToStore();
    },
    getFilterValue(category, dataType, key) {
      let value = this.filterObj[category]?.[dataType]?.[key]?.value;
      return value
    },
    isValueEmpty(val) {
      if (val === null || val === undefined) {
        return true;
      } else if (Array.isArray(val)) {
        return val.every(this.isValueEmpty);
      } else if (typeof val === 'object') {
        return Object.values(val).every(this.isValueEmpty);
      } else if (typeof val === 'string') {
        return val.trim() === '';
      } else {
        return false;
      }
    },

    async createFilterset() {
      let filterset = {
        filtersetName: this.filtersetName,
        companyId: this.$store.getters.activeCompany._id,
        createdBy: this.$store.getters.activeUser._id,
        filters: this.filterObj,
      }
      await api.createFilterset(filterset)
      setTimeout(() => {
        this.filtersetName = ''
        this.getFiltersets()
      }, 500)
    },

    async getFiltersets() {
      this.filtersets = await api.getFiltersets()
    },

    async deleteCampain(id) {
      await api.deleteFilterset(id)
      this.getFiltersets()
    },

    createCampaign() {
      this.$router.push({ path: '/campaign' })
      this.closeModal()
    },

    applyFilter({ category, key, value, dataType, filterType }) {
      let empty = this.isValueEmpty(value)

      if (!empty) {
        this.filterObj[category] ??= {};
        this.filterObj[category][dataType] ??= {};
        this.filterObj[category][dataType][key] ??= {};
        this.filterObj[category][dataType][key].value = value;
        this.filterObj[category][dataType][key].type = filterType;

      } else {

        delete this.filterObj[category][dataType][key];

        // Remove parent keys if they are empty
        if (Object.keys(this.filterObj[category][dataType]).length === 0) {
          delete this.filterObj[category][dataType];
        }
        if (Object.keys(this.filterObj[category]).length === 0) {
          delete this.filterObj[category];
        }
      }
      this.saveFiltersToStore();
    },
    saveFiltersToStore() {
      this.$store.dispatch('filtersChanged')
      this.$store.dispatch('setFilters', this.filterObj)
    },
    loadFilters(filters) {
      // if(filters || this.filters) {
      console.log('loadFilters called with filters: ', filters)
      this.filterObj = filters ? { ...filters } : { ...this.filters };  // using spread operator for immutability

      // Update the selected categories based on keys of the filterObj
      this.selectedCategories = Object.keys(this.filterObj);

      // This will ensure the visible filters are updated based on selected categories
      this.visibleFilters = {};
      for (const category of this.selectedCategories) {
        this.visibleFilters[category] = { ...this.services[category] };
      }
      this.componentKey++
      // this.saveFiltersToStore();
      // }

    },
  },
  mounted() {
    this.getFiltersets()
  },
};
</script>

<style lang="sass" scoped>
@import "/src/styles/_variables.sass"
.inline_center
  display: flex
  align-items: center
  gap: 10px
  &.input_button
    gap: 0px
    position: relative
    input
      min-width: 100%
      margin: 0
      border: 0
      padding-right: 45px
      height: 40px
      border-radius: 6px
    button
      position: absolute
      right: 0px
      height: 40px
      width: 40px
      border: 0
      border-radius: 0 6px 6px 0
      color: $white
      background-color: $green

.filterset
  color: rgba(white, .7)
  &-list_item
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 0.1rem
    padding: 0.1rem
    .filterset-name
      font-size: .8rem
      cursor: pointer
    .material-symbols-outlined
      font-size: .9rem
      cursor: pointer
      &:hover
        color: #ff0000
</style>

