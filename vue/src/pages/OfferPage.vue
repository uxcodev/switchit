<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main" v-if="loaded">
    <div class="container">
      <section v-if="offerType === 'offer'">
        <!-- <FilterGroup /> -->
        <!-- <FilterTabs @applyFilterTabs="applyFilterTabs" /> -->
        <h1>{{ mode }} offer for {{ leads.length }} lead{{ leads.length > 1 ? 's' : '' }}</h1>
        <div class="right form_actions">
          <!-- <span class="link" @click="openFilters">{{ filterCount }} filters applied</span> -->
          {{ filterCount }} filters applied
          <button @click="cancel">Cancel</button>
          <button v-if="mode==='Edit'" @click="updateOffer" :disabled="!changed">Update offer</button>
          <button v-else @click="createOffer" :disabled="!changed">Submit offer</button>
        </div>
        <div v-if='lead.value' class="pageheader__boxes stats">
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

      <section v-if="offerType === 'campaign'">
        <!-- <FilterGroup /> -->
        <!-- <FilterTabs @applyFilterTabs="applyFilterTabs" /> -->
        <h1>{{ mode }} campaign</h1>
        <div class="right form_actions">
          <span class="link" @click="openFilters">{{ filterCount }} filters applied</span>
          <button @click="cancel">Cancel</button>
          <button v-if="mode==='Edit'" @click="updateCampaign" :disabled="!changed">Update campaign</button>
          <button v-else @click="createCampaign" :disabled="!changed">Create campaign</button>
        </div>
      </section>

      <section class="offer-group-general">
        <h1>Details</h1>
        <div class="cards lg  switchit-form">
          <div class="card lg white offer-group">
            <div v-for="(value, key) in offer_obj.offer_details" :key='key'>
              <div v-if="!key.includes('details') && !key.includes('status')" class="offer-group-item">
                <label>{{ $t(key) }}</label>
                <div class="offer-group-input_group wide">
                  <input v-if="key.includes('date')" type="date" v-model="offer_obj.offer_details[key]" class="input" />
                  <input v-else v-model="offer_obj.offer_details[key]" class="input" />
                </div>
              </div>
            </div>
          </div>
          <div class="card lg white offer-group">
            <div class="offer-group-input_group xwide h100">
              <label>Details</label>
                <textarea v-model="offer_obj.offer_details.details" class="textarea h100"></textarea>
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
            <div class="offer-group-item" v-for="(field, key) in offer_template.offer[category]" :key='key'>
              <label>{{ $t(key) }}</label>
              <div class="offer-group-input_group">
                <div class="symbol">{{ field.prefix }}</div>
                <select v-if="field.type === 'dropdown'" v-model="offer_obj.offer[category][key]" class="select">
                  <option v-for="(option, key) in field.options" :key="key">{{ option.label }}</option>
                </select>
                <!-- add checkbox if field.type is Boolean -->
                <!-- <input  class="checkbox" type="checkbox" v-model="field.value" id="select_all" /> -->
                <label v-else-if="field.type === 'Boolean'" class="checkbox-label">
                  <input class="checkbox" type="checkbox" v-model="offer_obj.offer[category][key]" :id="key" />Included
                  <span class="checkmark transparent"></span>
                </label>
                <!-- <select v-else-if="field.type === 'Boolean'" v-model="field.value" class="select">
                  <option :value="null">select</option>
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select> -->
                <input v-else v-model="offer_obj.offer[category][key]" class="input" />
                <div class="symbol">{{ field.suffix }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
// import format_data from '@/helpers/format_data'
// import FilterTabs from '@/components/ui/FilterTabs.vue';

export default {
  components: {
    ModalWindow,
    // FilterTabs
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
      changed: false,
      loaded: false,
      editMode: false,
      mode: null,
      offerType: null,
      offer_obj: {},
      id: null,
      offer_template: {
        offer_details: {
          name: { value: '', type: 'String' },
          status: { value: '', type: 'String' },
          start_date: { value: null, type: 'Date' },
          expiry_date: { value: null, type: 'Date' },
          term: { value: '', type: 'String' },
          details: { value: '', type: 'String' },
        },
        filters: this.$store.getters.filters,
        offer: {
          mobile: {
            plan_talk_minutes: { value: null, type: 'Number', suffix: 'mins' },
            plan_data_gb: { value: null, type: 'Number', suffix: 'GB' },
            plan_data_speed: { value: null, type: 'Number', suffix: 'Mbps' },
            phone_installment: { value: null, type: 'Number', suffix: '€' },
            equipment_installment: { value: null, type: 'Number', suffix: '€' },
          },
          mortgage: {
            rate: { value: null, type: 'Number', suffix: '%' },
            rate_type: {
              value: null, type: 'dropdown', options: [
                { label: 'Select', value: null },
                { label: 'Fixed', value: "Fixed" },
                { label: 'Variable', value: "Variable" }
              ]
            },
            one_time_cost: { value: null, type: 'Number', suffix: '€' },
            monthly_cost: { value: null, type: 'Number', suffix: '€' },
            downpayment: { value: null, type: 'Number', suffix: '€' },
          },
          energy: {
            kwh_rate: { value: null, type: 'Number', suffix: '€' },
          },
          car_insurance: {
            premium: { value: null, type: 'Number', suffix: '€' },
            injury_liability: { value: null, type: 'Number', suffix: '€' },
            property_liability: { value: null, type: 'Number', suffix: '€' },
            collision_deductible: { value: null, type: 'Number', suffix: '€' },
            comprehensive_deductible: { value: null, type: 'Number', suffix: '€' },
            glass_damage: { value: null, type: 'Boolean' },
            theft_protection: { value: null, type: 'Boolean' },
            roadside_assistance: { value: null, type: 'Boolean' },
          },
          home_insurance: {
            premium: { value: null, type: 'Number', suffix: '€' },
            injury_liability: { value: null, type: 'Number', suffix: '€' },
            property_liability: { value: null, type: 'Number', suffix: '€' },
            comprehensive_deductible: { value: null, type: 'Number', suffix: '€' },
            fire_protection: { value: null, type: 'Boolean' },
            water_damage_protection: { value: null, type: 'Boolean' },
            storm_damage_protection: { value: null, type: 'Boolean' },
          },
          broadband: {
            debit_amount: { value: null, type: 'Number', suffix: 'Mbps' },
            plan_data_speed: { value: null, type: 'Number', suffix: 'Mbps' },
            plan_data_gb: { value: null, type: 'Number', suffix: 'GB' },
          },
          medical_insurance: {
            debit_amount: { value: null, type: 'Number', suffix: '€' },
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
        cutout: '85%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  watch: {
    offer_obj: {
      handler() {
        this.changed = true
      },
      deep: true,
    },
    filtersChanged() {
      console.log('filtersChanged', this.$store.getters.filtersChanged)
      this.offer_obj.filters = this.$store.getters.filters
    },
  },
  computed: {
    user() {
      return this.$store.getters.activeUser
    },
    filterCount() {
      return (
        this.offer_obj.filters &&
        Object.values(this.offer_obj.filters)
          .flatMap(category => Object.values(category))
          .reduce((count, obj) => count + Object.keys(obj).length, 0)
      ) ?? 0;
    },
    filtersChanged() {
      console.log('filtersChanged', this.$store.getters.filtersChanged)
      return this.$store.getters.filtersChanged
    },
  },
  methods: {
    cancel() {
      this.$router.go(-1)
      this.$router.push({ path: '/offers' })

    },
    async applyFilterTabs(categories) {
      console.log('applyFilterTabs', categories)
    },
    async openFilters() {
      await this.$store.dispatch('setFilters', this.offer_obj.filters)
      await this.$store.dispatch('filtersChangedExternally');
      this.$store.dispatch('openMenu')
    },
    async trimOfferObj() {
      for (let category in this.offer_obj.offer) {
        if (!this.offer_obj.offer[category]) {
          delete this.offer_obj.offer[category]
        } else {
          for (let key in this.offer_obj.offer[category]) {
            if (!this.offer_obj.offer[category][key]) {
              delete this.offer_obj.offer[category][key]
            }
          }
        }
      }
      // this.offer_obj.companyId = this.$store.getters.activeCompany._id,
      this.offer_obj.businessPartnerId = this.$store.getters.activeBusinessPartner.id
      this.offer_obj.createdBy = this.$store.getters.activeUser._id
    },
    async createOffer() {
      await this.trimOfferObj()
      let leads = this.leads || [this.lead._id]
      let response = await this.$api_node.createOffer(this.offer_obj, leads)
      if (response) {
        this.$router.push({ path: '/offers' })
      }
    },
    async updateOffer() {
      await this.trimOfferObj()
      let leads = this.leads || [this.lead._id]
      let response = await this.$api_node.updateOffer(this.offer_obj, leads)
      if (response) {
        this.$router.push({ path: '/offers' })
      }
    },
    async createCampaign() {
      await this.trimOfferObj()
      let response = await this.$api_node.createCampaign(this.offer_obj)
      if (response) {
        this.$router.push({ path: '/offers' })
      }
    },
    async updateCampaign() {
      await this.trimOfferObj()
      let response = await this.$api_node.updateCampaign(this.id, this.offer_obj)
      if (response) {
        this.$router.push({ path: '/offers' })
      }
    },
  },
  async mounted() {
    let path = this.$route.path
    let params = this.$route.params
    let type = path.includes('campaign') ? 'campaign' : path.includes('offer') ? 'offer' : null
    this.mode = params.id ? 'Edit' : 'Create'
    this.offerType = type
    this.id = params.id

    if (type==='offer') {
      if(params.id) {
        this.offer_obj = await this.$api_node.getOffer(params.id)
      }
    }
    if (type==='campaign') {
      if(params.id) {
        this.offer_obj = await this.$api_node.getCampaign(params.id)
      }
    }
    this.offer_obj.offer_details ??= {}
    this.offer_obj.filters ??= this.$store.getters.filters
    // for each item in offer_template.details, if it doesn't exist in offer_obj.details, add it
    for (let key in this.offer_template.offer_details) {
      this.offer_obj.offer_details[key] ??= this.offer_template.offer_details[key].value
    }
    this.offer_obj.offer ??= {}
    for (let category in this.offer_template.offer) {
      this.offer_obj.offer[category] ??= {}
      for (let key in this.offer_template.offer[category]) {
        this.offer_obj.offer[category][key] ??= this.offer_template.offer[category][key].value
      }
    }

    // get route query

    if (this.$route.query?.leadId) {
      this.leads = [this.$route.query.leadId]
    } else {
      this.leads = await this.$loadSessionValue('offer_selectedLeads') || [];
    }

    if (this.leads?.length === 1) {
      this.lead = await this.$api_node.getLead(this.leads[0])
    }
    if (!this.leads?.length) {
      if (this.offer_obj.users?.length) {
        this.leads = this.offer_obj.users.map(user => user.leadId)
      } else {
        // this.$router.push({ path: '/offers' })
      }
    }
    this.changed = false
    this.loaded = true
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

.form_actions 
  display: flex
  justify-content: center
  align-items: center
  gap: 16px
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
