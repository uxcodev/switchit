<template>
  <div :class="['sidebar', isOpen ? '' : 'sidebar-hidden']">
    <div @click="closeModal" class="close material-symbols-outlined">
      close
    </div>
    <div class="sidebar-content">
      <section>
        <h1>Filter opportunities</h1>
        <div class="checkboxes">
          <div v-for="(category, key) in categories_obj" :key="key" class="checkbox">
            <label class="checkbox-label">
              <input v-show="false" v-model="category.selected" type="checkbox" :id="category.name" />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                <span class="checkbox-icon material-symbols-outlined">{{ category.icon }}
                </span>
                {{ key }}
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
      <section v-if="categories_obj.Mortgage.selected">
        <h1>Mortgage</h1>
        <div v-for="preference in categories_obj.Mortgage.preferences" :key="preference" class="preference">
          <label>{{ preference.label }}</label>
          <div>
            <Slider v-model="preference.values" showTooltip="drag" tooltipPosition="bottom" class="slider" />
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
        <!-- <vue-slider v-model="sliderValue"></vue-slider> -->
      </section>
      <section v-if="categories_obj.Insurance.selected">
        <h1>Insurance</h1>
        <div v-for="preference in categories_obj.Insurance.preferences" :key="preference" class="preference">
          <label>{{ preference.label }}</label>
          <div>
            <Slider v-model="preference.values" showTooltip="drag" tooltipPosition="bottom" class="slider" />
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
        <!-- <vue-slider v-model="sliderValue"></vue-slider> -->
      </section>
      <section v-if="categories_obj.Banking.selected">
        <h1>Banking</h1>
        <div v-for="preference in categories_obj.Banking.preferences" :key="preference" class="preference">
          <label>{{ preference.label }}</label>
          <div>
            <Slider v-model="preference.values" showTooltip="drag" tooltipPosition="bottom" class="slider" />
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
        <!-- <vue-slider v-model="sliderValue"></vue-slider> -->
      </section>
    </div>
  </div>
</template>

<script>
import Slider from '@vueform/slider'
// import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'

export default {
  name: "TheSidebar",
  components: {
    Slider,
    // VueSlider
  },
  data() {
    return {
      isDisabled: true,
      preferences: [
        { label: "Importance of cheapest price", values: [0, 100] },
        { label: "Importance of best service", values: [0, 100] },
        { label: "Importance of lots of features", values: [0, 100] },
      ],
      categories_obj: {
        Mortgage: {
          selected: false,
          icon: 'house',
          preferences: [
            { label: "Importance of cheapest price", values: [0, 100] },
            { label: "Importance of best service", values: [0, 100] },
            { label: "Importance of lots of features", values: [0, 100] },
          ],
        },
        Insurance: {
          selected: false,
          icon: 'verified_user',
          preferences: [
            { label: "Importance of cheapest price", values: [0, 100] },
            { label: "Importance of best service", values: [0, 100] },
            { label: "Importance of lots of features", values: [0, 100] },
          ],
        },
        Banking: {
          selected: false,
          icon: 'credit_card',
          preferences: [
            { label: "Importance of cheapest price", values: [0, 100] },
            { label: "Importance of best service", values: [0, 100] },
            { label: "Importance of lots of features", values: [0, 100] },
          ],
        },
      },
      categories: [
        { name: 'Mortgage', selected: true, icon: 'house' },
        { name: 'Insurance', selected: true, icon: "verified_user" },
        { name: 'Banking', selected: true, icon: "credit_card" }
      ]
    };
  },
  computed: {
    isOpen() {
      return this.$store.getters.isOpen;
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch('closeMenu')
    }
  },
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
    // align-self: flex-end

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
      // label
      //   display: flex
      //   align-items: center
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
