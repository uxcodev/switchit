<template>
  <div :class="['sidebar', isOpen ? '' : 'sidebar-hidden']">
    <div @click="closeModal" class="close material-symbols-outlined">
      close
    </div>
    <div class="sidebar-content">
      <section>
        <h1>Filter opportunities</h1>
        <div class="checkboxes">
          <div v-for="(category, key) in preferences" :key="key" class="checkbox">
            <label class="checkbox-label">
              <input v-show="false" v-model="category.selected" type="checkbox" :id="category" />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                <span class="checkbox-icon material-symbols-outlined">{{ category.icon }}
                </span>
                {{ capitalize(key) }}
              </span>
            </label>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h2>User preferences</h2>
          <p>Select options below to show only users with those preferences</p>
        </div>
      </section>
      <div v-for="(filter, key) in preferences" :key="key">
        <section v-if="preferences[key].selected">
          <h1>{{ capitalize(key) }}</h1>
          <div v-for="preference in preferences[key].preferences" :key="preference" class="preference">
            <label>{{ preference.label }}</label>
            <div>
              <Slider v-model="preference.values" :min="0" :max="10" showTooltip="drag" @change="applyFilters()" tooltipPosition="bottom" class="slider" />
              <div class="legend">
                <span>
                  Not important
                </span>
                <span>
                  Very important
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@vueform/slider'

export default {
  name: "TheSidebar",
  components: {
    Slider,
  },
  data() {
    return {
      isDisabled: true,
      preferences: {},
      categories: this.$store.getters.categories,
    }
  },
  computed: {
    // filters() {
    //   return this.$store.getters.filters
    // },
    // categories() {
    //   return this.$store.getters.categories
    // },
    isOpen() {
      return this.$store.getters.isOpen;
    },

  },
  created() {
    // get categories from store
    const categories = this.$store.getters.categories;
    console.log(categories)
    // get list of preferences for each category. For prototype, these will be
    // the same for every category, but this will likely change soon
    // const prefs = this.$store.getters.preferences;

    const preferences = {};
    for (let category in categories) {
      preferences[category] = {
        selected: false,
        icon: categories[category].icon,
        // preferences: prefs
        preferences: {
          price: { label: "Importance of cheapest price", values: [0, 10] },
          service: { label: "Importance of best service", values: [0, 10] },
          features: { label: "Importance of lots of features", values: [0, 10] },
        }
      };
    }

    this.categories = categories;
    this.preferences = preferences;
  },
  methods: {
    closeModal() {
      this.$router.push({ path: '/dashboard' })
      this.$store.dispatch('closeMenu')
    },
    capitalize: (s) => {
      return s ? s[0].toUpperCase() + s.slice(1) : ""
    },
    async applyFilters() {

      const preferences = this.preferences
      const filters = {}
      console.log('this.preferences')
      console.log(this.preferences)
      console.log('this.categories')
      console.log(this.categories)
      for (const category in preferences) {
        if (preferences[category].selected) {
          const prefs = preferences[category].preferences
          filters[`${category}_price_min`] = prefs.price.values[0]
          filters[`${category}_price_max`] = prefs.price.values[1]
          filters[`${category}_service_min`] = prefs.service.values[0]
          filters[`${category}_service_max`] = prefs.service.values[1]
          filters[`${category}_features_min`] = prefs.features.values[0]
          filters[`${category}_features_max`] = prefs.features.values[1]
        }
      }
      await this.$store.dispatch('setFilters', filters)


    }
  }
};
</script>

<style lang="sass" scoped>
@import "/src/styles/styles.sass"


// TRANSITIONS
$transition-sidebar: .2s ease-in-out

.material-symbols-outlined
  font-variation-settings: "FILL" 0, "wght" 100, "GRAD" 0, "opsz" 40

h1
  margin: 0 0 10px 0  
  font-size: 1.8em
  color: inherit
h2
  font-size: 1.4em
  margin: 0
  color: inherit
p
  margin: 0
  color: rgba(255, 255, 255, .5)

section
  display: flex
  flex-direction: column
  gap: 20px  
  color: inherit
p
  line-height: 120%
  margin-top: 6px
.preference
  display: flex
  flex-direction: column
  gap: 6px
  label
    margin-bottom: 10px  
    font-size: 1.1em
  .legend
    margin-top: 4px
    font-size: .8em
    opacity: .5
    display: flex
    justify-content: space-between
  .slider
    margin-bottom: 4px // https://github.com/vueform/slider#multiple-slider
    
.sidebar
  position: fixed
  top: 0
  right: -20px
  opacity: 1
  visibility: visible
  width: 520px
  max-width: 95%
  height: 100%
  transition: $transition-sidebar
  box-shadow: rgba(0, 0, 0, 0.1) -10px 0 10px
  z-index: 99
  padding: 40px 60px 40px 40px
  background-color: $panel-dark
  color: rgba(255, 255, 255, .8)
  overflow-y: scroll
  
  label
    color: inherit
  .close
    cursor: pointer
    position: fixed
    top: 20px
    right: 20px

  &-hidden
    transform: translateX(300px)
    opacity: 0
    visibility: hidden

  &-content
    display: flex
    flex-direction: column
    flex-basis: auto
    flex-wrap: nowrap
    padding: 30px
    gap: 40px

    ul
      li, a, div
        color: inherit
        margin: 8px 0
        list-style: none
        text-decoration: none
        cursor: pointer

      .active
        color: #03D0BF

    select
      color: inherit
      font-size: inherit
      font-weight: inherit
      text-transform: uppercase
      padding: 2px 4px

  .checkboxes
    display: flex
    flex-direction: column
    gap: 20px
    .checkbox
      &-text
        display: flex
        align-items: center
        gap: 10px
      &-icon
        color: $primary
        font-size: 2em
      .checkmark
        color: $primary
        transform: scale(0.75)
      
      
</style>
