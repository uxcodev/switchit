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
        <div v-if='lead.value' class="ph_boxes stats">
          <!-- <div v-for="i in 3" :key='i'><span :class='i'></span></div> -->
          <div class="card stats-rating">
            <div class="card-top">
              <div v-if='leads.length === 1' class="stats-title">
                User ID: {{ lead.userId }}
              </div>
              <div v-else class="stats-title">
                Users selected: {{ leads.length }}
              </div>
            </div>
            <div class="card-bottom">
              <!-- Read reviews → -->
            </div>
          </div>
          <!-- <div class="card stats-deals-won">
            <div class="stats-title">
              Average spending
            </div>
          </div> -->
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
        <div class="cards lg  switchit-form">
          <div class="card lg white offer-group">
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
          <div class="card lg white offer-group">
            <div class="offer-group-item h100">
              <label>Details</label>
              <div class="offer-group-input_group xwide h100">
                <textarea v-model="offer_obj.offer_details.details" class="textarea h100"></textarea>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section v-for="(value, category) in categoryAccess" :key="category">
        <h1>{{ $t(category) }}</h1>
        <div class="cards lg switchit-form">
          <!-- <div v-for="i in 2" :key='i'><span :class='i'></span></div> -->
          <div class="card lg white offer-group" v-if="lead.value">
            <div class="offer-group-header">
              <div class="offer-group-header-title">
                User's current {{ $t(category) }} plan
              </div>
              <button style="opacity:0">Upload offer</button>
            </div>
            <!-- <pre>category: {{ $t(category)}}</pre> -->
            <!-- look for results in lead.data where key name matches 'category' -->
  
            <!-- <pre>{{ lead.data[category].interaction_data}}</pre> -->
            <div v-for="(value, key) in lead.data[category]?.interaction_data" :key='key'>
              <div class="lead_data_obj" v-if="typeof value === 'object'">
                <label>{{ $t(key) }}</label>
                <div class="lead_data ml4" v-for="(value2, key2) in value" :key='key2'>
                  <label>{{ $t(key2) }}</label>
                <div class="value">{{ value2 }}</div>
                </div>
              </div>
              <div class="lead_data" v-else>
                <label>{{ $t(key) }}</label>
                <div class="value">{{ value }}</div>
              </div>
            </div>
          </div>
          <div class="card lg white offer-group">
            <div class="offer-group-header">
              <div class="offer-group-header-title">
                Enter your offer below
              </div>
              <button>Upload offer</button>
            </div>
            <div class="offer-group-item" v-for="(value, key) in offer_obj.offer[category]" :key='key'>
              <!-- console log the key -->
              <label>{{ $t(key) }}</label>  
              <div class="offer-group-input_group">
                <div class="symbol">{{ value.prefix }}</div>
                <select v-if="value.type === 'dropdown'" v-model="value.value" class="select">
                  <option v-for="(option, key) in value.options" :key="key">{{ option }}</option>
                </select>
                <input v-else v-model="value.value" class="input" />
                <div class="symbol">{{ value.suffix }}</div>
                <!-- if value.type is 'dropdown', add a dropdown -->
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
      categoryAccess: this.$store.getters.categories,
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
          details: "Lorem ipsum dolor sit amet",
        },
        criteria: this.$store.getters.filters,
        offer: {
          mobile: {
            plan_talk_minutes: {value: 1000, type: 'Number', suffix: 'mins'},
            plan_data_gb: {value: 10, type: 'Number', suffix: 'GB'},
            plan_data_speed: {value: 100, type: 'Number', suffix: 'Mbps'},
            phone_installment: {value: 0, type: 'Number', suffix: '€'},
            equipment_installment: {value: 0, type: 'Number', suffix: '€'},
          },
          mortgage: {
            rate: {value: 3.45, type: 'Number', suffix: '%'},
            rate_type: {value: "Fixed", type: 'dropdown', options: ['Fixed', 'Variable']},
            one_time_cost: {value: 1500, type: 'Number', suffix: '€'},
            monthly_cost: {value: 795, type: 'Number', suffix: '€'},
            downpayment: {value: 25000, type: 'Number', suffix: '€'},
          },
          energy: {
            kwh_rate: {value: 0.15, type: 'Number', suffix: '€'},
          },
          car_insurance: {
            premium: {value: 150, type: 'Number', suffix: '€'},
            injury_liability: {value: 300000, type: 'Number', suffix: '€'},
            property_liability: {value: 100000, type: 'Number', suffix: '€'},
            collision_deductible: {value: 1000, type: 'Number', suffix: '€'},
            comprehensive_deductible: {value: 500, type: 'Number', suffix: '€'},
            glass_damage: {value: true, type: 'Boolean'},
            theft_protection: {value: true, type: 'Boolean'},
            roadside_assistance: {value: true, type: 'Boolean'},
          },
          home_insurance: {
            premium: {value: 150, type: 'Number', suffix: '€'},
            injury_liability: {value: 300000, type: 'Number', suffix: '€'},
            property_liability: {value: 100000, type: 'Number', suffix: '€'},
            comprehensive_deductible: {value: 500, type: 'Number', suffix: '€'},
            fire_protection: {value: true, type: 'Boolean'},
            water_damage_protection: {value: true, type: 'Boolean'},
            storm_damage_protection: {value: true, type: 'Boolean'},
          },
          broadband: {
            debit_amount: {value: 100, type: 'Number', suffix: 'Mbps'},
            plan_data_speed: {value: 500, type: 'Number', suffix: 'Mbps'},
            plan_data_gb: {value: 200, type: 'Number', suffix: 'GB'},
          },

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
      return this.$store.getters.activeUser
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
      let response = await this.$api_node.createOffer(this.offer_obj, leads)
      console.log("response:",response)
      if (response?.ok) {
        this.$router.push({ path: '/offers' })
      }
    }
  },
  async mounted() {

    this.leads = await this.$store.getters.selectedLeads || [this.$route.query.lead]
    if (this.leads.length === 1) {
      let id = this.leads[0]
      this.lead = await this.$api_node.getLead(id)
    }
    console.log('this.lead:', this.lead)
    console.log('this.leads:', this.leads)
    setTimeout(async () => {
      let filters = this.offer_obj.criteria
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
    width: 180px
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

.lead_data
  display: flex
  justify-content: space-between
  label, .value
    width: 50%
.lead_data_obj
  flex-direction: column
  gap: 10px
  
    
.h100
  height: 100%
  </style>
