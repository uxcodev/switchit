<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent" @handleFile="handleFile"></component>
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
          <button v-if="mode === 'Edit'" @click="updateOffer" :disabled="!changed">Update offer</button>
          <button v-else @click="createOffer" :disabled="!changed">Submit offer</button>
        </div>
        <div v-if="uploadedOffers.length || offer_obj.uploads" class="highlight mb5">
          The document{{ uploadedOffers.length > 1 ? 's' : '' }} you uploaded will be visible to the selected lead{{ leads.length > 1 ? 's' : '' }}.
          <div class="file_list" v-for="offer in uploadedOffers" :key="offer.service">
            <span class="material-symbols-outlined icon">description</span>
            <span>{{ offer.file.name }}</span>
            <!-- delete button with trash icon -->
            <span class="material-symbols-outlined icon_delete button" @click="uploadedOffers.splice(uploadedOffers.indexOf(offer), 1)">close</span>
          </div>
          <div class="file_list" v-for="upload in offer_obj.uploads" :key="upload.id">
            <span class="material-symbols-outlined icon">description</span>
            <span>{{ upload.originalFileName }}</span>
            <!-- delete button with trash icon -->
            <span class="material-symbols-outlined icon_delete button" @click="$toast_warn.show('Updating offers is not supported yet')">close</span>
          </div>
        </div>
        <div v-if='lead?.value' class="pageheader__boxes stats">
          <!-- <div v-for="i in 3" :key='i'><span :class='i'></span></div> -->
          <div class="card stats-rating">
            <div class="card-top">
              <div v-if='leads.length === 1' class="stats-title">
                <div>Lead ID: {{ lead.userId }}</div>
                <div>Location: {{ lead.householdPartialAddress }}</div>
                <div>Postal Code: {{ lead.postalCode }}</div>
                <!-- show link to download documents -->
                <div v-if="lead.documents?.length" class="mt5">
                  {{ lead.documents?.length }} document{{ lead.documents?.length > 1 ? 's' : '' }} available for download
                  <div class="document" v-for="(document, key) in lead.documents" :key="key">
                    <div class="button" @click="downloadDocument(document.id)" target="_blank"><span class="material-symbols-outlined">description</span>{{ document.filename }}</div>
                  </div>
                </div>
              </div>
              <div v-else class="stats-title">
                Users selected: {{ leads.length }}
              </div>
            </div>
            <div class="card-bottom">
              <!-- Read reviews → -->
            </div>
          </div>
          <div class="card stats-deal-size">
            <div class="stats-title">
              <div>
                Monthly value
              </div>
            </div>
            <div class="stats-deal-size-number">
              {{ lead?.value }}€
            </div>
            <div class="stats-title">
              <div>
                Annual value
              </div>
            </div>
            <div class="stats-deal-size-number">
              {{ lead?.value * 12 }}€
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
          <button v-if="mode === 'Edit'" @click="updateCampaign" :disabled="!changed">Update campaign</button>
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
                <div class="offer-group-input_group">
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


        <section class="mt5" v-for="(value, service) in serviceAccess" :key="service">

        <h1>{{ $t(service) }}</h1>
        <div class="right form_actions">
          <button @click="openUploadModal('ImportOffer', service)">Upload offer</button>
        </div>
        <div class="cards lg switchit-form">

          <div class="card lg white offer-group">
            <div class="offer-group-item">
              <div> </div>
              <div class="fixed">
                Current plan
              </div>
              <div class="fixed">
                Your offer
              </div>
            </div>
            {{ service.serviceTypeString }}
            <div class="offer-group-item" v-for="(field, key) in offer_template.offer[service]" :key='key'>

              <!-- left column -->
              <label>{{ $t(key) }}</label>

              <!-- center column -->
              <div class="fixed current_offer_detail">
                <div v-if="lead?.data[service]?.interaction_data[key]">{{ field.prefix }} {{ lead.data[service].interaction_data[key] }} {{ field.suffix }}</div>
                <div v-else>N/A</div>
              </div>

              <!-- right column -->
              <div class="offer-group-input_group fixed">
                <div v-if="field.prefix" class="symbol">{{ field.prefix }}</div>
                <select v-if="field.type === 'dropdown'" v-model="offer_obj.offer[service][key]" class="select">
                  <option v-for="(option, key) in field.options" :key="key">{{ option.label }}</option>
                </select>
                <label v-else-if="field.type === 'Boolean'" class="checkbox-label">
                  <input class="checkbox" type="checkbox" v-model="offer_obj.offer[service][key]" :id="key" />Included
                  <span class="checkmark transparent"></span>
                </label>
   
                <input v-else v-model="offer_obj.offer[service][key]" class="input" />
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
import ImportOffer from '@/components/import/ImportOffer.vue';

export default {
  components: {
    ModalWindow,
    ImportOffer
    // FilterTabs
  },

  data() {
    return {
      modalComponent: null,
      screen: 'UserTable',
      selectAll: false,
      categoryAccess: this.$store.getters.categories,
      serviceAccessCode: this.$store.getters.serviceAccessCode,
      serviceAccess: {},
      serviceTypes: this.$store.getters.serviceTypes,
      uploadingToService: null,
      leads: [],
      lead: null,
      changed: false,
      loaded: false,
      uploadedOffers: [],
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
        // filters: this.$store.getters.filters,
        offer: {
          Mobile: {
            call_minutes: { value: null, type: 'Number', suffix: 'mins' },
            data_limit: { value: null, type: 'Number', suffix: 'GB' },
            internet_speed: { value: null, type: 'Number', suffix: 'Mbps' },
            extra_services: { value: null, type: 'String' },
            total_due: { value: null, type: 'Number', suffix: '€' },
            device_payment: { value: null, type: 'Number', suffix: '€' },
            accessory_payment: { value: null, type: 'Number', suffix: '€' },
          },
          Mortgage: {
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
          Electricity: {
            kwh_rate: { value: null, type: 'Number', suffix: '€' },
          },
          CarInsurance: {
            premium: { value: null, type: 'Number', suffix: '€' },
            injury_liability: { value: null, type: 'Number', suffix: '€' },
            property_liability: { value: null, type: 'Number', suffix: '€' },
            collision_deductible: { value: null, type: 'Number', suffix: '€' },
            comprehensive_deductible: { value: null, type: 'Number', suffix: '€' },
            glass_damage: { value: null, type: 'Boolean' },
            theft_protection: { value: null, type: 'Boolean' },
            roadside_assistance: { value: null, type: 'Boolean' },
          },
          HomeInsurance: {
            premium: { value: null, type: 'Number', suffix: '€' },
            injury_liability: { value: null, type: 'Number', suffix: '€' },
            property_liability: { value: null, type: 'Number', suffix: '€' },
            comprehensive_deductible: { value: null, type: 'Number', suffix: '€' },
            fire_protection: { value: null, type: 'Boolean' },
            water_damage_protection: { value: null, type: 'Boolean' },
            storm_damage_protection: { value: null, type: 'Boolean' },
          },
          Broadband: {
            total_due: { value: null, type: 'Number', suffix: 'Mbps' },
            plan_data_speed: { value: null, type: 'Number', suffix: 'Mbps' },
            plan_data_gb: { value: null, type: 'Number', suffix: 'GB' },
          },
          MedicalInsurance: {
            total_due: { value: null, type: 'Number', suffix: '€' },
          },

          Pension: {

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
    filteredCategoryAccess() {
      return Object.entries(this.categoryAccess)
        .filter(([category]) => category !== 'general')
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
      this.$router.push({ path: '/offers' })

    },

    openUploadModal(component, service) {
      this.modalComponent = component
      this.uploadingToService = service
    },
    handleFile(file) {
      this.modalComponent = null
      this.uploadedOffers.push({ file: file, formData: file.formData, service: this.uploadingToService })

    },
    closeModal() {
      this.modalComponent = null
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
      this.offer_obj.businessPartnerId = this.$store.getters.activeBusinessPartner.id
      this.offer_obj.createdBy = this.$store.getters.activeUser._id
      this.offer_obj.creator = this.$auth0.user._value.email
    },

    async createOffer() {
      let body = {
        "householdIds": this.leads,
        "businessPartnerId": this.$store.getters.activeBusinessPartner.id,
        "title": this.offer_obj.offer_details.name,
        "comment": this.offer_obj.offer_details.details,
        "offerStatusType": 0,
        "offerServiceType": this.leads[0]?.serviceType || this.lead.serviceType,
        "startDate": this.offer_obj.offer_details.start_date,
        "endDate": this.offer_obj.offer_details.expiry_date
      }

      console.log('createOffer body', body)
      // if (body.householdIds.length) {return}

      // *** TEMP - Remove next 2 lines ***
      let response = await this.$switchit.createOffer(body)

      if (!response) {
        return
      }
  

      let lastOfferIds = response.ids

      for (let lastOfferId of lastOfferIds) {

        if (this.uploadedOffers.length) {
          for (let offer of this.uploadedOffers) {
            console.log('uploading offer', offer.formData, lastOfferId)
            await this.$switchit.uploadOffer(lastOfferId, offer.formData)
          }
        }


        for (let service in this.offer_obj.offer) {
          let serviceHasValue
          for (let key in this.offer_obj.offer[service]) {
            if (this.offer_obj.offer[service][key]) {
              serviceHasValue = true
            }
          }
          if (serviceHasValue) {
            let serviceType = this.$store.getters.serviceTypeCode(service)
  
            let filteredServiceFields = {}
            for (let key in this.offer_obj.offer[service]) {
              if (this.offer_obj.offer[service][key]) {
                filteredServiceFields[key] = this.offer_obj.offer[service][key]
              }
            }

            let body = {
              "enrollmentDate": this.offer_obj.offer_details.start_date,
              "bindingPeriodEnd": this.offer_obj.offer_details.expiry_date,
              "amount": this.offer_obj.offer[service].amount,
              "currencyType": 1,
              "serviceType:": serviceType,
              "serviceFields": JSON.stringify(filteredServiceFields),
              "comment": "string",
              "offerId": lastOfferId
            }
            body = JSON.stringify(body)
            console.log('body', body)
            console.log('UNCOMMENT NEXT LINE')
            let response = await this.$switchit.createOfferService(body)
            console.log('createOfferService ' + service + ' response', response)
          }
        }
        this.$router.push({ path: '/offers' })
      }
    },
    async updateOffer() {
      let response = await this.$switchit.updateOffer(this.id, this.offer_obj)
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
    async downloadDocument(id) {
      const fileBlob = await this.$switchit.getUploadedFile(id)
      const fileURL = URL.createObjectURL(fileBlob);
      window.open(fileURL);
    },
  },
  async mounted() {

    // console.log('OfferEditor mounted')
    // console.log('categoryAccess', this.categoryAccess)
    // console.log('serviceAccessCode', this.serviceAccessCode)
    // console.log('serviceTypes', this.serviceTypes)

    this.serviceAccess = this.serviceTypes.reduce((obj, service) => {
      if (service.access) {
        obj[service.serviceTypeString] = service
      }
      return obj
    }, {})

    console.log('serviceAccess', this.serviceAccess)
    for (let category in this.offer_template.offer) {
      let serviceType = this.serviceTypes.find(service => service.serviceTypeString === category)
      if (!serviceType?.access) {
        delete this.offer_template.offer[category]
      }
    }

    let path = this.$route.path
    let params = this.$route.params
    let type = path.includes('campaign') ? 'campaign' : path.includes('offer') ? 'offer' : null
    this.mode = params.id ? 'Edit' : 'Create'
    this.offerType = type
    this.id = params.id

    this.offer_obj.offer_details ??= {}
    this.offer_obj.filters ??= this.$store.getters.filters
    
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

    this.offer_obj.offer_details.start_date = this.$dayjs().format('YYYY-MM-DD')
    this.offer_obj.offer_details.name = 'Test offer ' + new Date().toISOString().split('T')[0]
    this.offer_obj.offer_details.expiry_date = this.$dayjs().add(30, 'day').format('YYYY-MM-DD')
    this.offer_obj.offer_details.details = 'Details for ' + this.offer_obj.offer_details.name
    this.offer_obj.offer_details.term = '12 months'

    this.changed = false
    this.loaded = true


    // if there is an id param, it's a real offer, so populate with offer details

    let leadId = this.$route.query?.lead

    if (params.id) {
      let offer = (await this.$switchit.getOffer(params.id)).model
      console.log('getOffer response', offer)
      this.offer_obj.offer_details.name = offer.title
      this.offer_obj.offer_details.start_date = this.$dayjs(offer.startDate).format('YYYY-MM-DD')
      this.offer_obj.offer_details.expiry_date = this.$dayjs(offer.endDate).format('YYYY-MM-DD')
      this.offer_obj.offer_details.details = offer.comment
      this.offer_obj.offer_details.term = ''
      this.offer_obj.uploads = offer.offerOfferuploadsModels
      
      for (let service of offer.offerOfferServicesModels) {

        let serviceType = service.serviceType
        let serviceTypeName = this.$store.getters.serviceTypeName(serviceType)
        let serviceFields = JSON.parse(service.serviceFields)

        for (let serviceField in serviceFields) {
          this.offer_obj.offer[serviceTypeName][serviceField] = serviceFields[serviceField]
        }


        console.log('serviceTypeName', serviceTypeName)
      }

      leadId = offer.householdId
      this.leads = [leadId]
      console.log('leadId', leadId)

      let offerServices = offer.offerOfferServicesModels
      console.log('offerServices', offerServices)
      for (let offerService of offerServices) {
        let serviceType = offerService.serviceType
        let serviceFields = JSON.parse(offerService.serviceFields)
        console.log('serviceType', serviceType)
        console.log('serviceFields', serviceFields)
        this.offer_obj.offer[serviceType] = serviceFields
        let serviceTypeName = this.$store.getters.serviceTypeName(serviceType)

        console.log('serviceTypeName', serviceTypeName)
      }
    }

    // if a lead id is provided in the query, use that lead
    if (!leadId) {
      // if leads are saved in the session, use that lead
      this.leads = await this.$loadSessionValue('offer_selectedLeads') || [];
      // if only one lead, save it to leadId
      if (this.leads.length === 1) {
        leadId = this.leads[0]
      }
    }

    if (leadId) {

      console.log('there is a lead id')
      // NOTE: Currently, there is no 'getLead' method in the switchit api, 
      // so we have to get all leads and find the one we need

      let all_leads = await this.$switchit.getLeads({
        take: 999, 
        skip: 0,
        filterData: ''
      })
      this.lead = all_leads.find(lead => lead.id === leadId)
      this.leads = [leadId]
     
      if(this.lead) {
        this.lead.documents = (await this.$switchit.getPensionUploads(leadId)).model || []
        console.log('documents', this.lead.documents)
      }
    }
    if (!this.leads?.length) {
      this.$toast_error.show({ message: 'No leads selected' })
      return
    }
    if (!this.leads?.length) {
      if (this.offer_obj.users?.length) {
        this.leads = this.offer_obj.users.map(user => user.leadId)
      } else {
        // this.$router.push({ path: '/offers' })
      }
    }

    /* Auto populate with dummy data */

    // check for documents

  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/styles.sass"
@import "/src/styles/variables.sass"

.highlight
  display: flex
  flex-direction: column
  border: 1px solid rgba($ui-active, .2)
  border-radius: 5px
  background-color: rgba($ui-active, .05)
  padding: 10px  
  gap: 10px

.file_list
  display: flex
  align-items: center
  gap: 10px
  .icon_delete
    font-size: 1em
    cursor: pointer
    color: white
    background-color: $dark
    border-radius: 50%
    padding: 2px
    &:hover
      background-color: $red
.document
  display: flex
  // align-items: center
  gap: 0px
  padding: 10px 0
  div
    display: flex
    align-items: center
    gap: 6px
    color: $dark
    text-decoration: none
    cursor: pointer
    &:hover
      color: $primary

.container
  padding-bottom: 100px
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
  &-item
    display: grid
    grid-template-columns: 1fr auto auto
    grid-gap: 10px
    height: 50px
    .fixed
      width: 180px
      max-width: 30vw
    label
      wrap: nowrap
      height: 50px
      display: flex
      align-items: center

    .title
      font-weight: bold
      font-size: 1.2em
  
  &-input_group
    display: flex
    justify-content: space-between
    align-items: center
    gap: 10px
    // width: 180px

    input,
    select,
    textarea
      width:100%
    .symbol
      width: 20px
    
    &.xwide
      width: 100%   
      height: 100%  
  .current_offer_detail
    display: flex
    flex-wrap: wrap
    align-items: center
    height: 50px
    width: 180px
    div 
      width: 100%
      display: flex
      align-content: center
      flex-wrap: wrap
      height: 40px
      padding: 0 10px
      color: #999
      // background: #f5f5f5

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
