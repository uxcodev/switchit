<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div class="container">
      <!-- <FilterGroup /> -->
      <section>
        <button @click="createOffer" class="right">Submit offer</button>
        <h1>Create offer</h1>
        <div class="ph_boxes stats">
          <!-- <div v-for="i in 3" :key='i'><span :class='i'></span></div> -->
          <div class="card stats-rating">
            <div class="card-top">
              <div v-if='leads.length === 1' class="stats-title">
                User ID: {{ lead.userId }}
              </div>
              <div v-else class="stats-title">
                Users selected: {{  leads.length }}
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

      <section class="offer-group-general">
        <h1>Offer details</h1>
        <div class="cards_lg  switchit-form">
          <div class="card_lg white offer-group">
            <div class="offer-group-item">
              <label>Offer name</label>
              <div class="offer-group-input_group wide">
                <input v-model="offer_obj.offer_details.name" class="input" />
              </div>
              </div>
            <div class="offer-group-item">
              <label>Start date</label>
              <div class="offer-group-input_group wide">
                <input v-model="offer_obj.offer_details.start_date" class="input" />
              </div>
            </div>
            <div class="offer-group-item">
              <label>Expiry date</label>
              <div class="offer-group-input_group wide">
                <input v-model="offer_obj.offer_details.expiry_date" class="input" />
              </div>
            </div>
            <div class="offer-group-item">
              <label>Term</label>
              <div class="offer-group-input_group wide">
                <input v-model="offer_obj.offer_details.term" class="input" />
              </div>
            </div>
          </div>
          <div class="card_lg white offer-group">
            <div class="offer-group-item h100">
              <label>Details</label>
              <div class="offer-group-input_group xwide h100">
                <textarea v-model="offer_obj.offer_details.details" class="textarea h100"></textarea>
              </div>
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
                  <div class="symbol">%</div>
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
                  <input v-model="offer_obj.offer.mortgage.rate" class="input" />
                  <div class="symbol">%</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Rate type</label>
                <div class="offer-group-input_group">
                  <select v-model="offer_obj.offer.mortgage.rate_type" class="select">
                    <option>Fixed</option>
                    <option>Variable</option>
                  </select>
                  <div class="symbol"></div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>One-time cost</label>
                <div class="offer-group-input_group">
                  <input v-model="offer_obj.offer.mortgage.one_time_cost" class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Monthly cost</label>
                <div class="offer-group-input_group">
                  <input v-model="offer_obj.offer.mortgage.monthly_cost" class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Downpayment</label>
                <div class="offer-group-input_group">
                  <input v-model="offer_obj.offer.mortgage.downpayment" class="input" />
                  <div class="symbol">%</div>
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
                  <input v-model="offer_obj.offer.insurance.premium" class="input" />
                  <div class="symbol">%</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Body injury liability</label>
                <div class="offer-group-input_group">
                  <input v-model="offer_obj.offer.insurance.injury_liability" class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Property liability</label>
                <div class="offer-group-input_group">
                  <input v-model="offer_obj.offer.insurance.property_liability" class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Collision deductible</label>
                <div class="offer-group-input_group">
                  <input v-model="offer_obj.offer.insurance.collision_deductible" class="input" />
                  <div class="symbol">€</div>
                </div>
              </div>
              <div class="offer-group-item">
                <label>Comprehensive deductible</label>
                <div class="offer-group-input_group">
                  <input v-model="offer_obj.offer.insurance.comprehensive_deductible" class="input" />
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
import format_data from '@/helpers/format_data'

export default {
  components: {
    ModalWindow,

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
      offer_obj: {
        offer_details: {
          name: "My offer",
          status: "new",
          start_date: "01/01/24",
          expiry_date: "01/01/25",
          term: "1 year",
          details: "Get a free donut",
        },
        criteria: this.$store.getters.filters,
        offer: {
          mortgage: {
            rate: 3.45,
            rate_type: "Fixed",
            one_time_cost: 0,
            monthly_cost: 1117,
            downpayment: 25,
          },
          insurance: {
            premium: 150,
            injury_liability: 300000,
            property_liability: 100000,
            collision_deductible: 1000,
            comprehensive_deductible: 500
          },
          banking: {},
          broadband: {},
          mobile: {},
          utilities:{},
          auto: {},
       }
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
    async createOffer() {
      // console.log('createOffer:', this.offer_obj)
      let leads = this.leads || [this.lead._id]
      let response = await this.$api.createOffer(this.offer_obj, leads)
      // console.log("response:",response)
      if (response?.ok) {
        this.$router.push({ path: '/offers' })
      }
    }
  },
  async mounted() {
    
    this.leads = await this.$store.getters.selectedLeads || [this.$route.query.lead]
    // console.log('leads:', this.leads)
    if (this.leads.length === 1) {
      let id = this.leads[0]
      this.lead = await this.$api.getLead(id)
    } else {
      // console.log('bulk offers not fully supported yet')
    }
    // console.log('this.lead', this.lead)
    // console.log('this.leads', this.leads)
    setTimeout(async () => {
      let filters = this.offer_obj.criteria
      // filters = await format_data.formatOfferCriteria(filters)
      console.log('format_data', format_data)
      console.log('filters:', filters)
    }, 500)
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/styles.sass"
section
  position: relative

  .right
    position: absolute 
    top: 0px
    right: 0px

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
    gap:20px

  &-input_group
    display: flex
    justify-content: space-between
    align-items: center
    gap: 10px
    width: 120px
    input,
    select,
    textarea
      width:100%
    .symbol
      width: 20px
    
    &.wide
      width: 180px  
    &.xwide
      width: 100%   
      height: 100%  
.h100
  height: 100%
  </style>
