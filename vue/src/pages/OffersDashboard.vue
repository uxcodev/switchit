<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div class="container">

      <!-- <FilterTabs @applyFilterTabs="applyFilterTabs" /> -->

      <div class="table">
        <div class="table-header">
          <div class="table-header-check">
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="selectAll" id="select_all" />
              <span class="checkmark transparent"></span>
            </label>
          </div>
          <div class="table-header-content">
            <div class="table-header-content-med">Offer name</div>
            <div class="table-header-content-sm">Start date</div>
            <div class="table-header-content-sm">Expiry</div>
            <div class="table-header-content-med">Categories</div>
            <div class="table-header-content-xs">Won</div>
            <div class="table-header-content-xs">Lost</div>
            <div class="table-header-content-xs">Pending</div>
            <div class="table-header-content-xs last"></div>
          </div>
        </div>
        <div class="table-rows">
          <div v-for="(offer, index) in offers" :key="index" class="table-row">
            <div class="table-row-check">
              <label class=" checkbox-label nolabel">
                <input v-show="false" class="checkbox" v-model="offer.selected" type="checkbox" id="select_all" />
                <span class="checkmark"></span>
              </label>

            </div>
            <div @click="console.log('openOffer()')" class="table-row-content">
              <!-- <div class="table-row-content-sm">
                <div class="donut">
                  <Doughnut class='chart' id="my-chart-id" :options="chartOptions" :data="chartData" />
                  {{ offer.match }}%
                </div>
              </div> -->
              <div class="table-row-content-med bold">
                {{ offer.offer_details.name }}
              </div>
              <div class="table-row-content-sm">
                {{ offer.offer_details.start_date }}
              </div>
              <div class="table-row-content-sm">
                {{ offer.offer_details.expiry_date }}
              </div>
              <div class="access_icons table-row-content-med wrap">
                <span v-for="(cat, key) in categories" :key="key" :class="offer.offer.hasOwnProperty(key) ? 'active' : ''" class="material-symbols-outlined">{{ categories[key] ? categories[key].icon : '' }}</span>
              </div>
              <div class="table-row-content-xs">  
                {{ offer.stats.won }}
              </div>
              <div class="table-row-content-xs">  
                {{ offer.stats.lost }}
              </div>
              <div class="table-row-content-xs">  
                {{ offer.stats.pending }}
              </div>
              <div class="table-row-content-xs last">
                <!-- <span class="material-symbols-outlined">chevron_right</span> -->
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
<!--       <div class="pagination">
        <div class="pagination-back active" @click="pg_back">
          <span class="material-symbols-outlined">chevron_left</span>
        </div>
        <div v-for="page in pg.pageCount" :key="page" @click="gotoPage(page)" :class="page === pg.currentPage ? 'active' : ''">{{ page }}</div>

        <div class="pagination-forward active" @click="pg_forward">
          <span class="material-symbols-outlined">chevron_right</span>
        </div>
      </div> -->
    </div>

</template>

<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import FilterTabs from '../components/ui/FilterTabs.vue';
import ChartDealsWon from '../components/ui/ChartDealsWon.vue';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
// import fake_data from "@/api/fake_data.js"; // uncomment to create fake data

ChartJS.register(ArcElement, Tooltip)


export default {
  components: {
    ModalWindow,
    FilterTabs,
    ChartDealsWon,
    Doughnut
  },
  watch: {
    selectAll(val) {
      for (let offer of this.offers) {
        offer.selected = val
      }
    },
    offers: {
      deep: true,
      handler() {
        let checked = false
        let unchecked = false
        for (let offer of this.offers) {
          checked = offer.selected ? true : checked
          unchecked = !offer.selected ? true : unchecked
        }
        if (checked && !unchecked) { this.selectAll = true }
        if (unchecked && !checked) { this.selectAll = false }
        // if (unchecked && checked) { // console.log('partial') }
      }
    },
    'pg.currentPage': {
      deep: true,
      async handler(page) {
        // let page = this.pg.currentPage
        let limit = this.pg.limit
        let skip = (page - 1) * limit
        let filters = this.$store.getters.filters
        let response = await this.$api_node.getOffers({ limit: limit, skip: skip, filter: filters })
        this.offers = response?.offers
        // this.pg.pageCount = Math.ceil(response.count / limit)
      }
    },
    filters: {
      deep: true,
      async handler() {
        // // console.log('filters changed')
        this.loadOffers()
      }
    }
  },
  data() {
    return {
      modalComponent: null,
      screen: 'UserTable',
      selectAll: false,
      offers: [],
      count: 0,
      chartData: {
        datasets: [
          {
            data: [77, 23]
          },
        ]
      },
      pg: {
        currentPage: 1,
        limit: 10,
        pageCount: 0
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: ['#00C6C6', '#fafafa'],
        borderWidth: 0,
        borderJoinStyle: 'round',
        borderAlign: 'inner',
        // offset: 60,
        cutout: '85%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.activeUser
    },
    filters() {
      return this.$store.getters.filters
    },
    categories() {
      return this.$store.getters.categories
    },

  },

  methods: {
    pg_back() {
      let p = this.pg.currentPage
      this.pg.currentPage = p > 1 ? p - 1 : p
    },
    pg_forward() {
      // // console.log(this.pg.pageCount)
      // // console.log(this.pg.currentPage)
      let p = this.pg.currentPage
      this.pg.currentPage = p < this.pg.pageCount ? p + 1 : p
    },
    openFilters() {
      // // console.log('openFilters')
      this.$store.dispatch('openMenu')
    },
    applyFilterTabs(categories) {
      // console.log('applyFilterTabs')
      // console.log(categories)
      this.$store.dispatch('setCategories', categories)
      this.loadOffers()
      /* 
      const filteredOffers = this.offers.filter((offer) => {
        // Get the categories' status from the offer's access object
        const categories = Object.keys(offer.access);

        // Check if the offer's access object has at least one category with a status that matches the filter
        return categories.some((category) => {
          return filters[category] && filters[category].status && offer.access[category].status;
        });
      });
      this.offers = filteredOffers
      // console.log('this.offers.length')
      // console.log(this.offers.length)
      this.pg.pageCount = Math.ceil(this.offers.length / this.pg.limit)
      */
    },
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
    changePage(page) {
      this.screen = page
    },
    gotoPage(page) {
      this.pg.currentPage = page
    },
    openOffer(id) {
      // console.log('openOffer')
      this.$store.dispatch('setSelectedOffers', [id])
      // this.$router.push({ path: `/offer`, query: { offer: id } })
    },
/*     async loadOffers() {
      // console.log('loadOffers:', this.filters, this.categories)
      let catObj = { ...this.categories }
      let filterObj = { ...this.filters }

      for (const key in filterObj) {
        if (Object.prototype.hasOwnProperty.call(filterObj, key)) {
          const category = key.split("_")[0];
          if (!catObj[category].status) {
            delete filterObj[key];
          }
        }
      }
      // console.log(filterObj)

      let response = await this.$api_node.getOffers({ limit: this.pg.limit, skip: 0, filters: filterObj })
      this.offers = response.offers
      this.pg.pageCount = Math.ceil(response.count / this.pg.limit)
    }, */
    async loadOffers() {
      let response = await this.$api_node.getOffers()
      this.offers = response
      console.log(this.offers)
    }
  },
  async mounted() {
    // console.log('OpportunitiesDashboard - filters')
    // console.log(this.$store.getters.filters)
    // console.log(this.$store.getters.categories)
    // uncomment to create fake data

    // let offers = fake_data.getOffers()
    // // console.log(offers)
    // let response = await this.$api_node.createOffers(offers)
    // console.log(response)

    // let response = await fake_data.updateOffers()
    // // console.log('updateOffers:', response)
    // // console.log('fake_data', fake_data)

    // this.loadOffers()
    this.loadOffers()
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/styles.sass"

.pagination
  display: flex
  gap: 6px
  div
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    min-width: 30px
    min-height: 30px
    border-radius: 6px
    background: #eee
    color: #aaa
    &.active
      background: $primary
      color: white

.donut
  width: 40px
  height: 40px  
  display: flex
  justify-content: center
  align-items: center
  font-size: 11px
  color: #999
  .chart
    width: 40px
    height: 40px  
    position: absolute 
h1
  color: #666
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  background-color: #f1f1f1
  min-height: 100vh
  padding: 120px 20px 60px 20px
  top: 80px
section
  display: flex
  flex-direction: column
  gap:0px
.container
  width:100%
  max-width:900px
  display: flex
  flex-direction: column
  gap: 20px

  .ph_pills
    height: 20px
    display: flex
    flex-direction: row
    // justify-content: center
    align-items: center
    gap: 6px
    .ph_pill
      flex: 0
      justify-content: center
      align-items: center
      padding: 2px 8px
      background-color: rgba(255,255,255,.3)
      color: rgba(0,0,0,.3)
      width: auto
      height: auto
      border-radius: 20px
      &.active
        background-color: rgba(255,255,255,1)
        color: #546E7A

  .table-titlebar
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center

    button
      background-color: #00C6C6
      border-radius: 25px
      color: white
      border: 0

  // .ph_boxes
  //     display: flex
  //     flex-direction: row
  //     gap: 16px
  //     div
  //       flex:1
  //       background-color: white
  //       // width: 100px
  //       height: 100px
  //       border-radius: 10px
  .stats
    display: flex
    flex-direction: row
    gap: 20px
    .card
      flex:1
      display: flex
      flex-direction: column
      justify-content: space-between
      background-color: white
      padding: 16px
      // width: 100px
      min-height: 120px
      border-radius: 10px

      &-top
        display: flex
        flex-direction: column
        gap: 4px

      &-bottom
        color: #aaa
      

      .rating
        display: flex
        align-items: center
        font-size: 20px
        color: #666
        gap: 6px
        .stars
          display: flex
          align-items: center
          color: #00C6C6
          span
            width:20px
            heith:20px
    &-title
      font-size: 1.2em
      color:#aaa
    
    &-deals-won,
    &-deal-size
      padding: 0
      justify-content: flex-start !important
      gap: 16px
      &-number
        font-size: 1.8em 
        color: #666       
        
  .cards.lg
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 16px
  .card.lg
    display: flex
    flex-direction: column
    flex:1
    gap: 16px
    min-height: 200px   
    border-radius: 10px
    padding: 20px
    padding: 20px
    color: white
    
    &.green
      background-color: #00C6C6
    &.blue
      background-color: #019CCD
    &-content
      flex: 1
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      font-size: 1.2em
      .large
        font-size: 1.8em
  .ph_header
    display: flex
    background-color: #ccc
    height: 40px
    width: 100%
    border-radius: 10px

  .ph_table
    display: flex
    background-color: #eee
    height: 400px
    width: 100%
    border-radius: 10px

.ph_boxes
  display: flex
  flex-direction: row
  gap: 6px
  .ph_box
    background-color: #eee
    width: 100px
    height: 30px
    border-radius: 20px    
.checkbox-group
  flex-direction: row
  flex-wrap: wrap
  width:400px
  label
    width:160px
pre
  color: black

.table
  display: flex
  flex-direction: column
  gap: 20px
  color: #666
  max-width: 100%
  overflow: hidden
  &-rows
    background-color: white
    border-radius:10px
  &-row 
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    cursor: pointer
    &:hover
      background: #fafafa
      transition: all .2s
  &-header
    background-color: #546E7A
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 10px
    border-radius: 10px
    color: rgba(255,255,255,0.7)

  &-header,
  &-row  
    &-check
      width: 20px
      display: flex
    &-content
      flex: 1
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 10px 0 50px 
      &-xs
        width: 20px
      &-sm
        width: 100px
      &-med
        width: 150px
      &-lg
        flex: 1
  .last
    display: flex
    justify-content: flex-end
    color: #00BB8E
  .access_icons
    display: flex
    gap: 6px
    span
      font-size:1.5em
      opacity: .1
      color: #00C6C6
    span.active
      opacity: 1  
  // .stars 
//   font-variation-settings: {
//   'FILL' 1,
//   'wght' 400,
//   'GRAD' 0,
//   'opsz' 48
//   }
  // .checkmark
  //   background-color: #00C6C6


@media only screen and (max-width: 767px)
  .table-row-content,
  .table-header-content
    &-xs
      width: 20px
    &-sm
      width: 60px
    &-med
      width: 80px
    &-lg
      flex: 1
    .last
      display: flex
      justify-content: flex-end
      color: #00BB8E
    .access_icons
      display: flex
      gap: 2px
      span
        font-size:1.5em
        opacity: .1
        color: #00C6C6
      span.active
        opacity: 1  
</style>

<style lang="scss">
.material-symbols-rounded {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>