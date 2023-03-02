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

</style>

<style lang="scss">
.material-symbols-rounded {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>