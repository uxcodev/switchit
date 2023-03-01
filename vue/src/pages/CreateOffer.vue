<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div class="container">
      <!-- <FilterGroup /> -->
      <section>
        <h1>Create offer</h1>
        <div class="ph_boxes stats">
          <!-- <div v-for="i in 3" :key='i'><span :class='i'></span></div> -->
          <div class="card stats-rating">
            <div class="card-top">
              <div class="stats-title">
                User ID: {{ lead.userId }}
              </div>
            </div>
            <div class="card-bottom">
              <!-- Read reviews → -->
            </div>
          </div>
          <div class="card stats-deals-won">
            <div class="stats-title">
              Average spending
            </div>
            <!-- <ChartDealsWon /> -->
          </div>
          <div class="card stats-deal-size">
            <div class="stats-title">
              <div>
                Monthly value
              </div>
            </div>
            <div class="stats-deal-size-number">
              {{ lead.value }}€
            </div>
            <div class="stats-title">
              <div>
                Annual value
              </div>
            </div>
            <div class="stats-deal-size-number">
              {{ lead.value * 12 }}€
            </div>
          </div>
        </div>
      </section>
      <div class="cards_lg">
        <!-- <div v-for="i in 2" :key='i'><span :class='i'></span></div> -->
        <div class="card_lg white">
        </div>
        <div class="card_lg white">

        </div>
      </div>
      <pre> {{ lead }}</pre>
    </div>
  </div>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import FilterGroup from '../components/ui/FilterGroup.vue';
import ChartDealsWon from '../components/ui/ChartDealsWon.vue';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip)


export default {
  components: {
    ModalWindow,
    FilterGroup,
    ChartDealsWon,
    Doughnut
  },
  watch: {
    selectAll(val) {
      for (let lead of this.leads) {
        lead.selected = val
      }
    },
    leads: {
      deep: true,
      handler() {
        // this.pg.pageCount = Math.ceil(this.leads.length / this.pg.limit)
        // console.log(this.leads.length)
        // console.log(this.pg.limit)
        // console.log('this.pageCount')
        // console.log(this.pg.pageCount)
        let checked = false
        let unchecked = false
        for (let lead of this.leads) {
          checked = lead.selected ? true : checked
          unchecked = !lead.selected ? true : unchecked
        }
        if (checked && !unchecked) { this.selectAll = true }
        if (unchecked && !checked) { this.selectAll = false }
        if (unchecked && checked) { console.log('partial') }

        // if (checked) { selectAll = true }
        // console.log('it was clicked')
      }
    },
    'pg.currentPage': {
      deep: true,
      async handler(page) {
        // let page = this.pg.currentPage
        let limit = this.pg.limit
        let skip = page * limit
        let response = await this.$api.getLeads({ limit: limit, skip: skip })
        this.leads = response.leads
        // this.pg.pageCount = Math.ceil(response.count / limit)
      }
    },
  },
  data() {
    return {
      modalComponent: null,
      screen: 'UserTable',
      selectAll: false,
      leads: [],
      lead: {
        value: null
      },
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
      return this.$store.getters.user
    },
    // pageCount() {
    //   let number = Math.ceil(this.leads.length / this.pg.limit);
    //   return number
    // }
  },
  methods: {
  },
  async mounted() {
    console.log('CreateOffer leads:')
    let leads = await this.$store.getters.selectedLeads
    // console.log(leads)
    if (leads.length === 1) {
      let id = leads[0]
      this.lead = await this.$api.getLead(id)
      console.log(`response: `)
      console.log(this.lead)
    }
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
  width:900px
  max-width:100%
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
        
  .cards_lg
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 16px
  .card_lg
    display: flex
    flex-direction: column
    flex:1
    gap: 16px
    min-height: 200px   
    border-radius: 10px
    padding: 20px
    padding: 20px
    // color: white
    background: white
    
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
  &-rows
    background-color: white
    border-radius:10px
  &-row 
    // flex: 1
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    border-radius: 10px
   
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
      width: 50px
      display: flex
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

</style>

<style lang="scss">
.material-symbols-rounded {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>