<template>
  <div :class="['sidebar', isOpen ? '' : 'sidebar-hidden']">
    <div @click="closeModal" class="close material-symbols-outlined">
      close
    </div>
    <div class="sidebar-content">
      <form @submit.prevent="saveFiltersAsCampaign" class="switchit-form sm">
        <div class="group">
          <label for="campaignName">Campaign name</label>
          <div class="inline">
            <input v-model="campaignName" placeholder="" type="text" id="campaignName" class="input lg mr3" />
          </div>
        </div>
        <button class="btn btn-primary">Save as campaign</button>
      </form>

      <div v-if="campaigns.length">
        <div v-for="(campaign, index) in campaigns" :key="index" class="campaign">
          <div class="campaign-list_item">
            <div class="campaign-name" @click="loadFilters(campaign.filters)">{{ campaign.campaignName || 'untitled' }}</div>
            <!-- material symbol trash icon -->
            <div class="material-symbols-outlined" @click="deleteCampain(campaign._id)">delete</div>
          </div>

          <!-- <div class="campaign-filters">
            <div v-for="(filter, key) in campaign.filters" :key="key" class="campaign-filter">
              <div class="campaign-filter-name">{{ $t(key) }}</div>
              <div class="campaign-filter-value">{{ filter.value }}</div>
            </div>
          </div> -->
        </div>
      </div>
      <!-- Checkboxes for categories -->

      <section>
        <div>
          <h1>{{ $t('filter_opportunities') }}</h1>
          <p>{{ $t('only_checked_categories') }}</p>
        </div>
        <div class="checkboxes">
          <div v-for="(categoryData, category) in this.services" :key="category" class="checkbox">
            <label class="checkbox-label">
              <input v-model="selectedCategories" type="checkbox" @change="onCheckboxChange" :value="category" />
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
                <filter-component v-if="resetCategory !== category" :current-value="getFilterValue(category, dataType, key)" :filter-data="filter" :dataType="dataType" :filter-key="key"  :category="category" @filter-changed="applyFilter" />
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
      campaignName: '',
      campaigns: [],
      componentKey: 0,
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
      this.saveFilters();
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

    async saveFiltersAsCampaign() {
      let campaign = {
        campaignName: this.campaignName,
        companyId: this.$store.getters.activeCompany._id,
        createdBy: this.$store.getters.activeUser._id,
        filters: this.filterObj,
      }
      await api.saveFiltersAsCampaign(campaign)
      this.getCampaigns()
    },

    async getCampaigns() {
      this.campaigns = await api.getCampaigns()
    },

    async deleteCampain(id) {
      await api.deleteCampaign(id)
      this.getCampaigns()
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
        this.filterObj = filters ? {...filters} : { ...this.filters };  // using spread operator for immutability

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
    this.getCampaigns()
  },
};
</script>

<style lang="sass" scoped>
.campaign
  &-list_item
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 0.1rem
    padding: 0.1rem
    .campaign-name
      font-size: .8rem
      cursor: pointer
    .material-symbols-outlined
      font-size: .9rem
      cursor: pointer
      &:hover
        color: #ff0000
</style>

