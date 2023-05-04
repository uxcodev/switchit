<template>
  <div :class="['sidebar', isOpen ? '' : 'sidebar-hidden']">
    <div @click="closeModal" class="close material-symbols-outlined">
      close
    </div>
    <div class="sidebar-content">

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

            <div class="filters" v-for="(fields, dataType) in categoryData" :key="dataType">
              <div>
                <h2 class="mt5 mb1">{{ $t(dataType) }}</h2>
                <p>{{ $t(`select_options_below_${dataType}`) }}</p>
              </div>
              <div class="filter" v-for="(filter, key) in fields" :key="key" :class="dataType === 'preference_data' ? 'slider' : ''">
                <filter-component v-if="resetCategory !== category" :filter-data="filter" :dataType="dataType" :filter-key="key" :category="category" @filter-changed="applyFilter" />
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

export default {
  name: "TheSidebar",
  components: {
    // Slider,
  },
  data() {
    return {
      isDisabled: true,
      selectedCategories: [],
      resetCategory: null,
      filteredServices: this.$store.getters.services,
      filterObj: {},
      visibleFilters: {},
    }
  },
  computed: {
    isOpen() {
      return this.$store.getters.isOpen;
    },
    services() {
      return this.$store.getters.services;
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
    filtersObj: {
      handler(filters) {
        // check filters keys to see if any of them match selectedCategories. 
        console.log('filters: ', filters)
      },
      deep: true,
    },
  },
  methods: {
    closeModal() {
      this.$router.push({ path: '/dashboard' })
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


    applyFilter({ category, key, value, dataType, filterType }) {
      let empty = this.isValueEmpty(value)

      if (!empty) {
        // console.log('value: ', value)
        this.filterObj[category] ??= {};
        this.filterObj[category][dataType] ??= {};
        this.filterObj[category][dataType][key] ??= {};
        this.filterObj[category][dataType][key].value = value;
        this.filterObj[category][dataType][key].type = filterType;
        // console.log(dataType, 'this.filterObj', this.filterObj)
      } else {
        // console.log('delete:', category, dataType, key)
        // console.log(this.filterObj[category])
        // console.log(this.filterObj[category][dataType])
        // console.log(this.filterObj[category][dataType][key])

        delete this.filterObj[category][dataType][key];

        // Remove parent keys if they are empty
        if (Object.keys(this.filterObj[category][dataType]).length === 0) {
          delete this.filterObj[category][dataType];
        }
        if (Object.keys(this.filterObj[category]).length === 0) {
          delete this.filterObj[category];
        }
      }

      this.saveFilters();
    },
    saveFilters() {
      this.$store.dispatch('setFilters', this.filterObj)
      this.$store.dispatch('filtersChanged')
      setTimeout(() => {
        let filters = this.$store.getters.filters
        console.log('filters', filters)
      }, 1000)
    }
  },
};
</script>


