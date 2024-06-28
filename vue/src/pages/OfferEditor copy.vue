<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent" @cancel="closeModal" @handleFile="handleFile"></component>
  </ModalWindow>

  <div class="main" v-if="loaded">
    <div class="container">
      <section v-if="offerType === 'offer'">
        <h1>{{ mode }} offer for {{ householdIds.length }} lead{{ householdIds.length > 1 ? 's' : '' }}</h1>
        <div class="right form_actions">
          <!-- <span class="link" @click="openFilters">{{ filterCount }} filters applied</span> -->
          {{ filterCount }} filters applied
          <button @click="cancel">Cancel</button>
          <button v-if="mode === 'Edit'" @click="updateOffer" :disabled="!changed">Update offer</button>
          <button v-else @click="createOffer" :disabled="!changed">Submit offer</button>
        </div>
        <div v-if="uploadedOffers.length || offer_obj.uploads?.length" class="highlight mb5">
          The document{{ uploadedOffers.length > 1 ? 's' : '' }} you uploaded will be visible to the selected lead{{ householdIds.length > 1 ? 's' : '' }}.
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
              <div v-if='householdIds.length === 1' class="stats-title">
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
                Users selected: {{ householdIds.length }}
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

                <input v-else :ref="service + '_' + key" :placeholder="field.placeholder" v-model="offer_obj.offer[service][key]" class="input"  />
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
import bitwise from '@/helpers/bitwiseEncode.js'

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
      relevantServices: [],
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
          // term: { value: '', type: 'String' },
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
            commitment_period: { value: null, type: 'String', placeholder: 'ie - 1 year', suffix: '', required: false },
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
            commitment_period: { value: null, type: 'String', placeholder: 'ie - 1 year', suffix: '', required: false },

          },
          Electricity: {
            kwh_rate: { value: null, type: 'Number', suffix: '€' },
            commitment_period: { value: null, type: 'String', placeholder: 'ie - 1 year', suffix: '', required: false },

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
            commitment_period: { value: null, type: 'String', placeholder: 'ie - 1 year', suffix: '', required: false },

          },
          HomeInsurance: {
            premium: { value: null, type: 'Number', suffix: '€' },
            injury_liability: { value: null, type: 'Number', suffix: '€' },
            property_liability: { value: null, type: 'Number', suffix: '€' },
            comprehensive_deductible: { value: null, type: 'Number', suffix: '€' },
            fire_protection: { value: null, type: 'Boolean' },
            water_damage_protection: { value: null, type: 'Boolean' },
            storm_damage_protection: { value: null, type: 'Boolean' },
            commitment_period: { value: null, type: 'String', placeholder: 'ie - 1 year', suffix: '', required: false },

          },
          Broadband: {
            total_due: { value: null, type: 'Number', suffix: 'Mbps' },
            plan_data_speed: { value: null, type: 'Number', suffix: 'Mbps' },
            plan_data_gb: { value: null, type: 'Number', suffix: 'GB' },
            commitment_period: { value: null, type: 'String', placeholder: 'ie - 1 year', suffix: '', required: false },

          },
          MedicalInsurance: {
            total_due: { value: null, type: 'Number', suffix: '€' },
            commitment_period: { value: null, type: 'String', placeholder: 'ie - 1 year', suffix: '', required: false },

          },
          Pension: {
            commitment_period: { value: null, type: 'String', placeholder: 'ie - 1 year', suffix: '', required: false },
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
      this.requiredFieldsCheck()
    },
    requiredFieldsCheck() {
      // loop through each service, console.log it
      let inputRef
      console.log('this.$refs', this.$refs)
      for (let service in this.offer_obj.offer) {
        inputRef = this.$refs[service + '_commitment_period'];

        if(inputRef) {
          inputRef.required = false
        }
        // inputRef.value = 'test'; // Set the required property to true
        
      }

      // loop through uploadedOffers, for each service, console log it
      for (let upload of this.uploadedOffers) {
        console.log('offer', upload.service)
        inputRef = this.$refs[upload.service + '_commitment_period'];
        let inputValue = this.offer_obj.offer[upload.service].commitment_period
        if (!inputValue) {
          this.$toast_success.show('Please enter a commitment period for ' + this.$t(upload.service))
        }
        // inputRef.value = '1 year'
      }
      // let requiredFields = Object.entries(this.offer_template.offer[this.uploadingToService])
      //   .filter(([key, value]) => value.required)
      //   .map(([key, value]) => key)
      // let missingFields = requiredFields.filter(field => !this.offer_obj.offer[this.uploadingToService][field])
      // if (missingFields.length) {
      //   this.$toast_error.show({ message: `Please fill in the required fields: ${missingFields.join(', ')}` })
      // }
    },
    closeModal() {
      this.modalComponent = null
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

      // validate that there is a commitment_period for each service that has an upload

      if (this.uploadedOffers.length) {
          for (let offer of this.uploadedOffers) {
            // check if there is a commitment_period for the service
            if (!this.offer_obj.offer[offer.service].commitment_period) {
              this.$toast_error.show({message: 'Please enter a commitment period for ' + this.$t(offer.service)})
              return
            }
          }
        }

      // check for all services in offer_obj.offer that have values. If the service has a value, add it to haveValues array

      let serviceTypeArray = []
      let hasValue = false
      for (let category in this.offer_obj.offer) {
        for (let key in this.offer_obj.offer[category]) {
          if (this.offer_obj.offer[category][key]) {
            hasValue = true
          }
        }
        if (hasValue) {
          let serviceType = this.$store.getters.serviceTypeCode(category)
          serviceTypeArray.push(serviceType)
        }
        hasValue = false
      }

      // create a combined serviceType based on all services that have values

      let serviceTypeCombo = bitwise.bitwiseEncode(serviceTypeArray);
      console.log('serviceTypeArray', serviceTypeArray)
      console.log('serviceTypeCombo', serviceTypeCombo)

      // post the offer, and return the id

      let body = {
        "householdIds": this.householdIds,
        "businessPartnerId": this.$store.getters.activeBusinessPartner.id,
        "title": this.offer_obj.offer_details.name,
        "comment": this.offer_obj.offer_details.details,
        "offerStatusType": 0,
        "offerServiceType": serviceTypeCombo,
        "startDate": this.offer_obj.offer_details.start_date,
        "endDate": this.offer_obj.offer_details.expiry_date
      }

      let response = await this.$switchit.createOffer(body)
      let postedOfferIds = response.ids

      // handle posting of uploads and services to the posted offer

      for (let postedOfferId of postedOfferIds) {

        // check for uploads, and upload each file to the offer

        if (this.uploadedOffers.length) {
          for (let offer of this.uploadedOffers) {
            // check if there is a commitment_period for the service
            
            await this.$switchit.uploadOffer(postedOfferId, offer.formData)
          }
        }

        // post each service

        for (let service in this.offer_obj.offer) {

          // check if there is a value in each service

          let serviceHasValue
          for (let key in this.offer_obj.offer[service]) {
            if (this.offer_obj.offer[service][key]) {
              serviceHasValue = true
            }
          }

          // if there is a value, post the service

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
              "serviceType": serviceType,
              "serviceFields": JSON.stringify(filteredServiceFields),
              "comment": "string",
              "offerId": postedOfferId
            }
            body = JSON.stringify(body)
            await this.$switchit.createOfferService(body)
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
    async buildOfferForm() {
      this.offer_obj.offer_details ??= {};
      this.offer_obj.filters ??= this.$store.getters.filters;

      Object.keys(this.offer_template.offer_details).forEach(key => {
        this.offer_obj.offer_details[key] ??= this.offer_template.offer_details[key].value;
      });

      this.offer_obj.offer ??= {};
      Object.keys(this.offer_template.offer).forEach(category => {
        this.offer_obj.offer[category] ??= {};
        Object.keys(this.offer_template.offer[category]).forEach(key => {
          this.offer_obj.offer[category][key] ??= this.offer_template.offer[category][key].value;
        });
      });

      Object.assign(this.offer_obj.offer_details, {
        start_date: this.$dayjs().format('YYYY-MM-DD'),
        name: 'Test offer ' + new Date().toISOString().split('T')[0],
        expiry_date: this.$dayjs().add(30, 'day').format('YYYY-MM-DD'),
        details: 'Details for ' + this.offer_obj.offer_details.name
        // term: '12 months'
      });
    },
    async loadOffer(id) {
      const offer = (await this.$switchit.getOffer(id)).model;
      console.log('getOffer response', offer);

      Object.assign(this.offer_obj.offer_details, {
        name: offer.title,
        start_date: this.$dayjs(offer.startDate).format('YYYY-MM-DD'),
        expiry_date: this.$dayjs(offer.endDate).format('YYYY-MM-DD'),
        details: offer.comment,
        term: ''
      });

      this.offer_obj.uploads = offer.offerOfferuploadsModels;
      let leadId = offer.householdId;
      this.householdIds = [leadId];

      // console.log('load offer', offer);
      // offer.offerOfferServicesModels.forEach(service => {
      //   const serviceFields = JSON.parse(service.serviceFields);
      //   Object.assign(this.offer_obj.offer, serviceFields);
      // });
      offer.offerOfferServicesModels.forEach(service => {
        let serviceTypeString = this.$store.getters.serviceTypeName(service.serviceType);
        console.log('serviceType code', serviceTypeString)
        const serviceFields = JSON.parse(service.serviceFields);
        Object.assign(this.offer_obj.offer[serviceTypeString], serviceFields);
      });
    }
  },
  async mounted() {


    console.log('test')


    const { path, params } = this.$route;
    const type = path.includes('campaign') ? 'campaign' : path.includes('offer') ? 'offer' : null;
    this.mode = params.id ? 'Edit' : 'Create';
    this.offerType = type;
    this.id = params.id;

    this.buildOfferForm();


    this.changed = false;
    this.loaded = true;

    if (params.id) {
      this.loadOffer(params.id);
    }

    // let leadId = query?.lead;
    let leadId
    console.log('mounted leadId', leadId);
    // if (!leadId) {
    // this.householdIds = await this.$loadSessionValue('offer_selectedLeads') || [];
    this.householdIds = this.$store.getters.selectedLeads;
    console.log('selectedLeads from vuex', this.householdIds);
    if (this.householdIds.length === 1) {
      leadId = this.householdIds[0];
    }
    // }

    if (leadId) {
      const all_leads = await this.$switchit.getLeads({ take: 999, skip: 0, filterData: '' });
      console.log('mounted all_leads', all_leads);
      this.lead = all_leads.find(lead => lead.id === leadId);
      this.householdIds = [leadId];

      if (this.lead) {
        this.lead.documents = (await this.$switchit.getPensionUploads(leadId)).model || [];

        Object.keys(this.lead.relevantServices).forEach(category => {
          if (!this.lead.relevantServices[category]) {
            delete this.serviceAccess[category];
          }
        });
      }
    }

    this.serviceAccess = this.serviceTypes.reduce((obj, service) => {
      if (service.access) {
        obj[service.serviceTypeString] = service;
      }
      return obj;
    }, {});

    Object.keys(this.offer_template.offer).forEach(category => {
      const serviceType = this.serviceTypes.find(service => service.serviceTypeString === category);
      if (!serviceType?.access) {
        delete this.offer_template.offer[category];
      }
    });

    if (!this.householdIds?.length) {
      this.$toast_error.show({ message: 'No leads selected' });
      return;
    }

    if (!this.householdIds?.length && this.offer_obj.users?.length) {
      this.householdIds = this.offer_obj.users.map(user => user.leadId);
    }

    console.log('mounted lead', this.lead);
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
