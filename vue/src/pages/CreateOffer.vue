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
      <section>

        <h1>Mortgage</h1>
        <div class="cards_lg switchit-form">
          <!-- <div v-for="i in 2" :key='i'><span :class='i'></span></div> -->
          <div class="card_lg white offer-group">
            <div class="offer-group-header">
              <div class="offer-group-header-title">
                User's current mortgage
              </div>
              <button style="opacity:0">Upload offer</button>
            </div>
            <div class="offer-group-items" v-if="lead.value">
              <div class="offer-group-item">
                <label>Rate</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.mortgage.data.rate }}</div>
                  <div class="symbol">%</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Rate type</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.mortgage.data.rate_type }}</div>
                  <div class="symbol"></div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>One-time cost</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.mortgage.data.one_time_cost }}</div>
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Monthly cost</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.mortgage.data.monthly_cost }}</div>
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Downpayment</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.mortgage.data.downpayment }}</div>
                  <div class="symbol">€</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_lg white offer-group">
            <div class="offer-group-header">
              <div class="offer-group-header-title">
                Enter your offer below
              </div>
              <button>Upload offer</button>
            </div>

            <div class="offer-group-items">
              <div class="offer-group-item">
                <label>Rate</label>
                <div class="offer-group-input_group">
                  <input class="input" />
                  <div class="symbol">%</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Rate type</label>
                <div class="offer-group-input_group">
                  <select class="select">
                    <option>Fixed</option>
                    <option>Variable</option>
                  </select>
                  <div class="symbol"></div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>One-time cost</label>
                <div class="offer-group-input_group">
                  <input class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Monthly cost</label>
                <div class="offer-group-input_group">
                  <input class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Downpayment</label>
                <div class="offer-group-input_group">
                  <input class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>Insurance</h1>
        <div class="cards_lg switchit-form">
          <!-- <div v-for="i in 2" :key='i'><span :class='i'></span></div> -->
          <div class="card_lg white offer-group">
            <div class="offer-group-header">
              <div class="offer-group-header-title">
                User's current insurance policy
              </div>
              <button style="opacity:0">Upload offer</button>
            </div>
            <div class="offer-group-items" v-if="lead.value">
              <div class="offer-group-item">
                <label>Premium</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.insurance.data.premium }}</div>
                  <div class="symbol">%</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Body injury liability</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.insurance.data.injury_liability }}</div>
                  <div class="symbol"></div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Property liability</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.insurance.data.property_liability }}</div>
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Collision deductible</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.insurance.data.collision_deductible }}</div>
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Comprehensive deductible</label>
                <div class="offer-group-input_group">
                  <div>{{ lead.access.insurance.data.comprehensive_deductible }}</div>
                  <div class="symbol">€</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_lg white offer-group">
            <div class="offer-group-header">
              <div class="offer-group-header-title">
                Enter your offer below
              </div>
              <button>Upload offer</button>
            </div>

            <div class="offer-group-items">
              <div class="offer-group-item">
                <label>Premium</label>
                <div class="offer-group-input_group">
                  <input class="input" />
                  <div class="symbol">%</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Body injury liability</label>
                <div class="offer-group-input_group">
                  <input class="input" />

                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Property liability</label>
                <div class="offer-group-input_group">
                  <input class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Collision deductible</label>
                <div class="offer-group-input_group">
                  <input class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Comprehensive deductible</label>
                <div class="offer-group-input_group">
                  <input class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <!-- <pre> {{ lead }}</pre> -->
    </div>
  </div>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import FilterGroup from '../components/ui/FilterTabs.vue';
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
      this.lead.access.mortgage.data = {
        rate: 3.45,
        rate_type: "Fixed",
        one_time_cost: 0,
        monthly_cost: 1117,
        downpayment: 25

      }
      this.lead.access.insurance.data = {
        premium: 3.45,
        injury_liability: 300000,
        property_liability: 100000,
        collision_deductible: 1000,
        comprehensive_deductible: 500
      }
      console.log(`response: `)
      console.log(this.lead)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/styles.sass"
.offer-group
  display: flex
  flex-direction: column
  gap: 10px
  &-header
    display: flex
    justify-content: space-between
    align-items: center
  &-item
    display: flex
    justify-content: space-between
    align-items: center
    height: 50px
  &-input_group
    display: flex
    justify-content: space-between
    align-items: center
    gap: 10px
    width: 120px
    input,
    select
      width:100%
    .symbol
      width: 20px
  </style>
