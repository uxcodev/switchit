<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <h2>API Testing</h2>
    <h3>Business Partners</h3>
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.id" :class="{ active: currentTab === tab.id }" @click="changeTab(tab.id)">
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-content mb10">

      <div v-if="currentTab == 'google'">
        <h3>Google Maps</h3>
        <AddressAutocomplete :init_address="null" @updateAddress="updateAddress" />
      </div>

      <form class="switchit-form sm" v-if="currentTab == 'edit' || currentTab == 'create'" @submit.prevent="submitBusinessPartner()">
        <div class="group" v-if="currentTab == 'edit'">
          <label for="name">id</label>
          <input type="text" id="id" name="id" v-model="businessPartnerId">
        </div>
        <div class="group">
          <label for="name">name</label>
          <input type="text" id="name" name="name" v-model="businessPartnerBody.name">
        </div>
        <div class="group">
          <label for="domain">domain</label>
          <input type="text" id="domain" name="domain" v-model="businessPartnerBody.domain">
        </div>
        <div class="group">
          <label for="vatNumber">vatNumber</label>
          <input type="text" id="vatNumber" name="vatNumber" v-model="businessPartnerBody.vatNumber">
        </div>
        <div class="group">
          <label for="address">address</label>
          <input type="text" id="address" name="address" v-model="businessPartnerBody.address">
        </div>
        <div class="group">
          <label for="email">email</label>
          <input type="text" id="email" name="email" v-model="businessPartnerBody.email">
        </div>
        <div class="group">
          <label for="countryCode">countryCode</label>
          <input type="text" id="countryCode" name="countryCode" v-model="businessPartnerBody.countryCode">
        </div>
        <!-- <div class="group"> -->
        <!-- <label for="countriesOfOperation">countriesOfOperation</label> -->
        <!-- <input type="text" id="countriesOfOperation" name="countriesOfOperation" v-model="businessPartnerBody.countriesOfOperation">
           -->
        <!-- <div class="help">Separate by commas (DK, NO)</div> -->
        <!-- <TagInput class="input fullwidth" v-model="businessPartnerBody.countriesOfOperation" :key="componentKey" /> -->
        <!-- </div> -->
        <div class="group">
          <label for="countries">countriesOfOperation</label>
          <Multiselect id="countries" v-model="businessPartnerBody.countriesOfOperation" mode="tags" :searchable="true" :close-on-select="false" :options="country_options" :key="componentKey" />
        </div>
        <!-- <div class="group">
          <label for="serviceTypes">serviceTypes</label>
          <TagInput :isNumber="true" class="input fullwidth" v-model="businessPartnerBody.serviceTypes" :key="componentKey" />
        </div>-->
        {{ businessPartnerBody.serviceTypes }}

        <div class="group">
          <label for="markets">serviceTypes</label>
          <div class="checkbox-group">
            <!-- <label v-for="(category, key) in categories" :key="key" class="checkbox-label">
              <input class="checkbox" type="checkbox" :checked="isCategorySelected(category.code)" :id="category.name" @change="toggleCategorySelection(category.code)" />{{ $t(key) }}
              <span class="checkmark"></span>
            </label> -->
            <label v-for="(service, index) in serviceTypes" :key="index" class="checkbox-label">
              <input class="checkbox" type="checkbox" :checked="isServiceSelected(service.serviceType)" :id="service.serviceTypeString" @change="toggleServiceSelection(service.serviceType)" />{{ $t(service.serviceTypeString) }}
              <span class="checkmark"></span>
              <!-- <input class="checkbox" type="checkbox" />{{ $t(service.serviceTypeString) }}
              <span class="checkmark"></span> -->
              <!-- {{  service }} -->
            </label>
            <!-- {{ serviceTypes }} -->
          </div>
        </div>

        <div class="checkbox-group">
          <label class="checkbox-label">isApproved
            <input type="checkbox" id="isApproved" name="isApproved" v-model="businessPartnerBody.isApproved">
            <span class="checkmark"></span>
          </label>
        </div>

        <button>Submit</button>
      </form>
      <div v-if="currentTab == 'get'" class="table">
        <!-- add check box for toggling active business partners -->
        <div class="item">
          <div class="row">
            <div class="field-group">
              <div class="field b" @click="activeBusinessPartnersToggle = !activeBusinessPartnersToggle">
                {{ activeBusinessPartnersToggle ? 'Active' : 'All' }} business partners
              </div>
            </div>
          </div>
        </div>

        <div v-for="(businessPartner, index) in businessPartners" :key="index">
          <div class="item">
            <!-- <div class="row"  @click="$router.push({ path: '/createbusinessPartner', query: { id: businessPartner._id } })"> -->
            <div class="row">
              <div class="field-group">
                <div class="field b link" @click="viewBusinessPartner(businessPartner.id)">
                  {{ businessPartner.name }}
                </div>
                <div class="field light xl">
                  {{ businessPartner.id }}
                </div>
                <div class="field light xl">
                  email:
                  {{ businessPartner.email }}
                </div>
                <div class="field light">
                  domain:
                  {{ businessPartner.domain }}
                </div>
                <div class="field light">
                  {{ businessPartner.contact_email }}
                </div>
                <div class="field light company">
                  country:
                  <span class="country">
                    {{ businessPartner.countryCode }}
                  </span>
                </div>
              </div>

            </div>
            <div class='status_wrapper' :class="businessPartner.status">
              <select name="status" class="select status" v-model="businessPartner.isApproved" @change="changeStatus(businessPartner)">
                <option :value="false">Not approved</option>
                <option :value="true">Approved</option>
              </select>
            </div>
            <div class="option" @click="deleteBusinessPartner(businessPartner.id)">
              <span class="material-symbols-outlined">Delete</span>
            </div>
            <div class="option" @click="triggerEditBP(businessPartner.id)">
              <span class="material-symbols-outlined">Edit</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentTab == 'view'" class="table">
        <div class="item">
          <!-- <div class="row"  @click="$router.push({ path: '/createbusinessPartner', query: { id: businessPartner._id } })"> -->
          <div class="row">
            <div class="field-group">
              <div class="field b link" @click="viewBusinessPartner(businessPartner.id)">
                {{ businessPartner.name }}
              </div>
              <div class="field light xl">
                {{ businessPartner.id }}
              </div>
              <div class="field light xl">
                email:
                {{ businessPartner.email }}
              </div>
              <div class="field light">
                domain:
                {{ businessPartner.domain }}
              </div>
              <div class="field light">
                {{ businessPartner.contact_email }}
              </div>
              <div class="field light company">
                country:
                <span class="country">
                  {{ businessPartner.countryCode }}
                </span>
              </div>
              <div class="field light company">
                serviceTypes:
                <span class="country">
                  {{ businessPartner.serviceTypes }}
                </span>
              </div>

            </div>
            <div class='status_wrapper' :class="businessPartner.status">
              <select name="status" class="select status" v-model="businessPartner.status" @change="changeStatus(businessPartner)">
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="active">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div class="option" @click="deleteBusinessPartner(businessPartner.id)">
              <span class="material-symbols-outlined">Delete</span>
            </div>
            <div class="option" @click="triggerEditBP(businessPartner.id)">
              <span class="material-symbols-outlined">Edit</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentTab == 'other'">
        <h3>Companies</h3>
        <div class="buttons">
          <button @click="createCompany()">createCompany</button>
          <button @click="importCompanies()">importCompanies</button>
          <button @click="editCompany('585c5dec-5df8-4894-9976-8bf36baf5967')">editCompany</button>
          <button @click="getCompanies()">getCompanies</button>
          <button @click="getFullCompanies()">getFullCompanies</button>
          <button @click="getCompany('585c5dec-5df8-4894-9976-8bf36baf5967')">getCompany</button>
          <button @click="getFullCompany('585c5dec-5df8-4894-9976-8bf36baf5967')">getFullCompany</button>
          <button @click="getUploads()">getUploads</button>
          <!-- <button @click="getPensionUploads('25bf9156-b5f0-4c16-8ec9-a776354bb6a6')">getPensionUploads</button> -->
          <!-- <button @click="getHouseholdUploads('25bf9156-b5f0-4c16-8ec9-a776354bb6a6')">getHouseholdUploads</button> -->
          <button @click="getPensionUploads('25bf9156-b5f0-4c16-8ec9-a776354bb6a6')">getPensionUploads</button>
          <!-- <button @click="getUploadedFile('84d7c5b9-fa6d-4431-a367-f4576bff9173')">getUploadedFile</button> -->
        </div>
        <h3>Misc</h3>
        <div class="buttons">
          <button @click="getCountries()">Country Dial Codes</button>
          <!-- <button @click="call('GET', 'countrydialcodes')">Country Dial Codes</button> -->
          <button @click="getServiceTypes()">getServiceTypes</button>
          <button @click="addServicesToCompany()">addServicesToCompany</button>
          <button @click="getLeads()">getLeads</button>
          <button @click="createLead()">createLead</button>
          <button @click="addEmailToAllFiltersets()">addEmailToAllFiltersets</button>

        </div>
        <pre>{{ result }}</pre>
        <div v-for="(item, index) in countries" :key="index">
          {{ item.name + ', ' + item.code }}
        </div>
        <div class="link" v-for="(item, index) in pensionUploads" :key="index">
          <span class="link" @click="getUploadedFile(item.id)"> {{ item.filename }}</span> <span class="help"> {{ item.id }} </span>
        </div>
        <!-- <pre>{{ countries }}</pre> -->
        <div class="table">
          <div v-for="(company, index) in companies" :key="index">
            <div class="item">
              <!-- <div class="row"  @click="$router.push({ path: '/createcompany', query: { id: company._id } })"> -->
              <div class="row">
                <div class="field-group">
                  <div class="field b">
                    {{ company.name }}
                  </div>
                  <div class="field light">
                    id:
                    {{ company.id }}
                  </div>
                  <div class="field light">
                    websites:
                    {{ company.website }}
                  </div>
                  <div class="field light">
                    {{ company.contact_email }}
                  </div>
                  <div class="field light" v>
                    admin:
                    <!-- <span class="role" v-for="role in company.roles" :key="role">
                  {{ role.user?.email }}
                </span> -->
                  </div>
                  <div class="field light company">
                    markets:
                    <span class="country" v-for="country in company.countries" :key="country">
                      {{ country?.name || country }}
                    </span>
                  </div>
                </div>
                <!-- <IconsCategoryAccess :access="company.access"/> -->
              </div>
              <div class='status_wrapper' :class="company.status">
                <!-- <div :class="['dot', company.status]"></div> -->
                <select name="status" class="select status" v-model="company.status" @change="changeStatus(company)">
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="active">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div class="option" @click="deleteCompany(company.id)">
                <span class="material-symbols-outlined">Delete</span>
              </div>
            </div>
            <pre>
          {{ lead }}
        </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// plugins & scripts

// import api from '@/api/api';

// const api = instance.appContext.config.globalProperties.$api_node;

import api from '@/api/api';
// components 
import ModalWindow from '@/components/ui/ModalWindow.vue';
import TagInput from '@/components/ui/TagInput.vue'
import AddressAutocomplete from '@/components/ui/AddressAutocomplete.vue';
import bitwiseDecode from '@/helpers/bitwise'
import Multiselect from '@vueform/multiselect/src/Multiselect';

export default {
  components: {
    AddressAutocomplete,
    ModalWindow,
    TagInput,
    Multiselect
  },
  provide() {
    return {
      closeModal: () => { this.modalComponent = null },
    }
  },
  data() {
    return {
      result: null,
      modalComponent: null,
      categories: this.$store.getters.categories,
      companies: [],
      businessPartners: [],
      businessPartner: null,
      activeBusinessPartnersToggle: true,
      serviceTypes: [],
      pensionUploads: [],
      leads: [],
      lead: null,
      newLead: null,
      user: this.$auth0.user,
      countries: [],
      businessPartnerId: "57eb0b57-31a4-47b2-ad37-27f57fb6fdb3",
      fullBusinessPartner: null,
      country_options: [
        { label: "Denmark", value: "DK" },
        { label: "Sweden", value: "SE" },
        { label: "Norway", value: "NO" },
        { label: "Germany", value: "DE" },
        { label: "United States", value: "US" },
      ],
      businessPartnerBody: {
        name: 'test4',
        domain: 'test4.com',
        vatNumber: '23454314',
        address: '234523414 Main St',
        email: 'nto@switchit.ai',
        countriesOfOperation: ['DK', 'NO'],
        isApproved: false,
        countryCode: 'DK',
        serviceTypes: [] //[1]
      },
      tabs: [
        { id: 'google', label: 'google' },
        { id: 'get', label: 'getBusinessPartners' },
        { id: 'view', label: 'viewBusinessPartner' },
        { id: 'create', label: 'createBusinessPartner' },
        { id: 'edit', label: 'editBusinessPartner' },
        { id: 'other', label: 'other' },
      ],
      currentTab: 'get',
      componentKey: 0
    };
  },
  watch: {
    activeBusinessPartnersToggle: {
      handler: function () {
        this.getBusinessPartners()
      },
      deep: true
    }
  },
  computed: {
    currentContent() {
      return this.tabs.find(tab => tab.id === this.currentTab).content;
    }
  },
  methods: {
    isCategorySelected(code) {
      return this.businessPartnerBody.serviceTypes.includes(code);
    },
    toggleCategorySelection(code) {
      if (this.isCategorySelected(code)) {
        const index = this.businessPartnerBody.serviceTypes.indexOf(code);
        this.businessPartnerBody.serviceTypes.splice(index, 1);
      } else {
        this.businessPartnerBody.serviceTypes.push(code);
      }
    },
    isServiceSelected(code) {
      return this.businessPartnerBody.serviceTypes.includes(code);
    },
    toggleServiceSelection(code) {
      if (this.isServiceSelected(code)) {
        const index = this.businessPartnerBody.serviceTypes.indexOf(code);
        this.businessPartnerBody.serviceTypes.splice(index, 1);
      } else {
        this.businessPartnerBody.serviceTypes.push(code);
      }
    },
    async updateAddress(place) {
      console.log('place: ', place)
    },
    async triggerEditBP(id) {
      // console.log('edit triggered: ', id)
      this.businessPartnerId = id
      this.currentTab = 'edit'
      // this.businessPartnerBody = this.businessPartners.find(bp => bp.id === id)
      this.fullBusinessPartner = await this.$switchit.getBusinessPartner(id)
      this.businessPartnerBody.name = this.fullBusinessPartner.name
      this.businessPartnerBody.domain = this.fullBusinessPartner.domain
      this.businessPartnerBody.vatNumber = this.fullBusinessPartner.vatNumber
      this.businessPartnerBody.address = this.fullBusinessPartner.address
      this.businessPartnerBody.email = this.fullBusinessPartner.email
      this.businessPartnerBody.countryCode = this.fullBusinessPartner.countryCode
      let countries = this.fullBusinessPartner.countries
      // for each country, get the 'countryCode' and push it to the countriesOfOperation array

      this.businessPartnerBody.countriesOfOperation = countries.map(country => country.countryCode)
      let serviceType = this.fullBusinessPartner.users[0]?.serviceType
      console.log('serviceType: ', serviceType)
      this.businessPartnerBody.serviceTypes = bitwiseDecode(serviceType)
      console.log('this.businessPartnerBody.serviceTypes: ', this.businessPartnerBody.serviceTypes)
      // this.businessPartnerBody.serviceTypes = this.fullBusinessPartner.users[0].serviceType
      this.businessPartnerBody.isApproved = this.fullBusinessPartner.isApproved

      console.log('fullBusinessPartner: ', this.fullBusinessPartner)
      console.log('businessPartnerBody: ', this.businessPartnerBody)

      this.serviceTypes = await this.$switchit.getServiceTypes()
      // remove any item in this.businessPartnerBody.serviceTypes that is larger than the greates value in this.serviceTypes
      this.businessPartnerBody.serviceTypes = this.businessPartnerBody.serviceTypes.filter(item => item <= this.serviceTypes[this.serviceTypes.length - 1].serviceType)
      console.log('removed values larger that greatest value in serviceType array: ', this.serviceTypes)
      this.componentKey++
    },
    changeStatus(businessPartner) {
      console.log('businessPartner: ', businessPartner)
      this.$switchit.editBusinessPartner(businessPartner.id, businessPartner)
    },
    changeTab(tabId) {
      this.currentTab = tabId;
      if (tabId === 'get') {
        this.getBusinessPartners()
      }
    },
    async call(method, path) {
      let response = await this.$switchit.whateverApiCall(method, path)
      console.log(response)
    },
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },

    //*** BUSINESS PARTNERS ***/
    async viewBusinessPartner(id) {
      this.businessPartnerId = id
      await this.getBusinessPartner(id)
      this.changeTab('view')
    },
    async getBusinessPartner(id) {
      this.businessPartner = await this.$switchit.getBusinessPartner(id)
      // this.businessPartner.roles = this.businessPartner.businessPartnerBusinessPartnerRoleBusinessPartnerUserCollectionModels
      console.log('this.businessPartner: ', this.businessPartner)
      return
    },
    async getBusinessPartners() {
      if (this.activeBusinessPartnersToggle) {
        this.businessPartners = await this.$switchit.getMyBusinessPartners()
      } else {
        this.businessPartners = await this.$switchit.getBusinessPartners()
      }
      // this.businessPartners = (await this.$switchit.getBusinessPartners()).model
      console.log('this.businessPartners: ', this.businessPartners)
    },
    async createBusinessPartner() {
      let body = {
        name: this.businessPartnerBody.name,
        domain: this.businessPartnerBody.domain,
        vatNumber: this.businessPartnerBody.vatNumber,
        address: this.businessPartnerBody.address,
        email: this.businessPartnerBody.email,
        countryCode: this.businessPartnerBody.countryCode,
        countriesOfOperation: this.businessPartnerBody.countriesOfOperation,
        serviceTypes: this.businessPartnerBody.serviceTypes,
        isApproved: this.businessPartnerBody.isApproved
      }
      let response = await this.$switchit.createBusinessPartner(body)
      console.log('response: ', response)
      this.changeTab('get')
    },
    async editBusinessPartner(id) {
      let response = await this.$switchit.editBusinessPartner(id, this.businessPartnerBody)
      console.log('response: ', response)
      this.changeTab('get')
    },
    async deleteBusinessPartner(id) {
      let response = await this.$switchit.deleteBusinessPartner(id)
      console.log('response: ', response)
      this.getBusinessPartners()
    },
    async getLeads() {

      let response = await api.getLeads({
        filters: null
      });
      this.leads = await response.leads

      this.lead = this.leads[0]
      console.log('this.leads: ', this.leads)


    },
    async getLead() {
      let household = await this.$switchit.getHouseholds()
      household = household.model[0]
      console.log('household: ', household)

      this.lead = await api.getLead('645523adf94c6954738ddae9')
      let serviceFields = this.lead.data
      console.log('serviceFields: ', serviceFields)
      delete serviceFields.general

      // serviceFields = JSON.stringify(serviceFields);

      let newLead = {
        "householdId": household.id,
        "householdPartialAddress": household.postalCode,
        "serviceType": 1,
        "amount": 0,
        "currencyType": 1,
        "serviceFields": { "key": "value" }
      }
      console.log('newLead: ', newLead)
      this.newLead = newLead
    },
    async createLead() {
      if (!this.newLead) {
        this.$toast_error.show('Hit "Get Lead" first to populate newLead object.')
        return
      }
      let response = await this.$switchit.createLead(this.newLead)
      console.log('response: ', response)
    },
    submitBusinessPartner() {
      if (this.currentTab === 'create') {
        this.createBusinessPartner()
      } else if (this.currentTab === 'edit') {
        this.editBusinessPartner(this.businessPartnerId)
      } else if (this.currentTab === 'delete') {
        this.deleteBusinessPartner(this.businessPartnerId)
      }
    },


    async importCompanies() {

      let body = [
        {
          "name": "Imported Company 1",
          "homepage": "test.com",
          "domains": [
            "test.com"
          ],
          "countryCodes": [
            "SE", "NO"
          ],
          "description": "Lorem ipsum (optional)",
          "information": "Created by xyz (optional)",
          "serviceTypes": [
            2, 4, 16
          ]
        },
        {
          "name": "Imported Company 2",
          "homepage": "example.com",
          "domains": [
            "example.com"
          ],
          "countryCodes": [
            "DK", "DE"
          ],
          "description": "Lorem ipsum (optional)",
          "information": "Created by xyz (optional)",
          "serviceTypes": [
            2, 8
          ]
        }
      ]
      console.log('body: ', body)
      let response = await this.$switchit.importCompanies(body)
      console.log('response: ', response)
    },

    //*** COMPANIES ***/
    async deleteCompany(id) {
      console.log('deleting: ', id)
      // 62274fac-36b6-4e03-a652-0ef0e69e88f7
      let response = await this.$switchit.deleteCompany(id)
      console.log('response: ', response)
    },

    async createCompany() {
      let info = `Created by ${this.user.email}`
      console.log('info: ', info)
      let body = {
        name: "ACME Bacon Inc 2.",
        description: "Lorem ipsum dolor sit amet",
        information: info,
        homepage: "example2.com",
        domains: ["example2.co"],
        countryCodes: ["NO", "SE"],
        serviceTypes: [1, 2, 4, 8, 16]
      }
      console.log('body: ', body)
      let response = await this.$switchit.createCompany(body)
      console.log('response: ', response)
    },
    async editCompany(id) {
      let info = `Created by ${this.user.email}`
      console.log('info: ', info)
      let body = {
        name: "ACME Bacon Inc 2.",
        description: "Lorem ipsum dolor sit amet",
        information: info,
        homepage: "example.com",
        domains: ["example.co"],
        countryCodes: ["NO", "SE"],
        serviceTypes: [1, 2, 4, 8, 16]
      }
      console.log('body: ', body)
      let response = await this.$switchit.editCompany(id, body)
      console.log('response: ', response)
    },


    async getCompanies() {
      this.companies = (await this.$switchit.getCompanies()).model
      console.log('this.companies: ', this.companies)
    },
    async getFullCompanies() {
      this.companies = (await this.$switchit.getFullCompanies()).model
      console.log('this.companies: ', this.companies)
    },
    async getPensionUploads(householdId) {
      let response = await this.$switchit.getPensionUploads(householdId)
      this.pensionUploads = response.model
      console.log('response: ', response)
    },
    async getHouseholdUploads(householdId) {
      let response = await this.$switchit.getHouseholdUploads(householdId)
      this.pensionUploads = response.model
      console.log('response: ', response)
    },
    async getUploads() {
      let response = await this.$switchit.getUploads()
      this.pensionUploads = response.model
      console.log('response: ', response)
    },
    async getUploadedFile(id) {
      // let response = await this.$switchit.getUploadedFile(id)
      // console.log('response: ', response)

      const fileBlob = await this.$switchit.getUploadedFile(id)
      const fileURL = URL.createObjectURL(fileBlob);
      window.open(fileURL);
    },
    async getCompany(id) {
      let company = (await this.$switchit.getCompany(id)).model
      console.log('company: ', company)
    },
    async getServiceTypesFromValue(combinedValue) {
      combinedValue--
      const serviceTypes = [];
      let serviceTypesResponse = await this.getServiceTypes()
      serviceTypesResponse.forEach((type) => {
        if ((combinedValue & type.serviceType) !== 0) {
          serviceTypes.push(type);
        }
      });

      console.log(serviceTypes);
      return serviceTypes;
    },
    async getFullCompany(id) {
      let company = (await this.$switchit.getFullCompany(id)).model
      company.serviceTypes = await this.getServiceTypesFromValue(company.serviceType)
      this.companies.push(company)
      console.log('response: ', company)
    },
    async getServiceTypes() {
      this.serviceTypes = await this.$switchit.getServiceTypes()
      console.log('this.serviceTypes: ', this.serviceTypes)
      this.result = this.serviceTypes
      return this.result
    },
    async addServicesToCompany() {
      let companyId = "7e9a03e7-d428-4921-98fc-17e6d1f98886"
      let body =
      {
        "serviceType": 8,
        "companyId": companyId
      }

      let response = await this.$switchit.addServicesToCompany(body)
      console.log('response: ', response)
    },

    // misc

    async getCountries() {
      this.countries = await this.$switchit.getCountries()
      console.log('countries ', this.countries)

    },
    async addEmailToAllFiltersets() {
      let response = await this.$api_node.addEmailToAllFiltersets()
      console.log('response: ', response)
    }
  },
  async mounted() {
    // get 'tab' from route query
    if (this.$route.query.tab) {
      this.currentTab = this.$route.query.tab
    }
    this.getBusinessPartners()
    this.getLead()
  }
}
</script>



<style lang="sass" scoped>
@import "/src/styles/variables.sass"

// styles for tabs

.tabs 
  display: flex
  margin-bottom: 20px

  button 
    padding: 10px 20px
    margin-right: 5px
    border: none
    cursor: pointer
    transition: background-color 0.2s
    background-color: #2c3e50
    &:hover 
      // make background a bit lighter
      background-color: lighten(#2c3e50, 10%)

    &.active 
      background-color: lighten(#2c3e50, 20%)

.tab-content 
  border: 1px solid #ccc
  padding: 20px
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1)



.buttons
  width: 100%
  display: flex
  flex-wrap: wrap
  // flex-direction: column
  gap: 1rem

h3
  margin-block-end: 0

.main
  justify-content: flex-start
  align-items: flex-start
.content
  width: 100%  
  display: flex
  flex-direction: column
  align-items: flex-start
  // align-content: center
  // justify-content: center
  max-width: 900px
.table_header
  display: flex
  width: 100% 
  border-radius: 6px
  background-color: #546E7A
  padding: 6px 10px
  gap:10px
  margin-bottom: 10px
  border-radius: 4px
  cursor: pointer
  flex-grow:1
  color: #eee
  font-size: .7rem
  .row
    width:100%
    display: flex
    justify-content: space-between
    .field 
      padding: 0 10px
      width: 180px
      opacity: .6
      &.xl
        width: 350px
      &.status
        width: 95px
  .option
    width: 50px
    padding: 10px 16px
    height:100%
    cursor: pointer
    border-radius: 0 6px 6px 0
    font-size: 1.5em
    color: blue
.table
  // background: #fff
  border-radius: 6px
  display: flex
  flex-direction: column
  gap: 10px
  width: 100%
  max-width: 900px
  .item
    background: #fff
    gap:10px
    justify-content: space-between
    align-items: center
    display: flex
    // background: #fafafa 
    border-radius: 4px
    cursor: pointer
    .row
      display: flex
      flex-direction: field
      align-items: center
      justify-content: space-between
      gap: 20px
      padding: 10px
      flex-grow:1
      &:hover
        background: #fcfcfc
      .field-group
        display: flex
        flex-direction: column
        gap: 0px
        padding: 4px 10px
        .field
          padding: 0
          &.xl
            width: 300px
      .field
        padding: 10px
        width: 180px
        &.b
          font-weight:600
        &.light
          color: #999
      .access_icons
        display: flex
        gap: 6px
        span
          font-size:1.5em
          opacity: .1
          color: #00BB8E
        span.active
          opacity: 1   
    .option
      width: 50px
      padding: 10px 16px
      height:100%
      cursor: pointer
      border-radius: 0 6px 6px 0
      font-size: 1.5em
      color: #999
      &:hover
        background: #eee
 
  .status_wrapper
    position: relative
    &:before
      position: absolute
      z-index:1
      content: ''
      padding: 0
      top: 6px
      left: 6px
      width: 10px
      height: 10px
      border-radius: 10px
      background-color: grey

    &.new:before
      background-color: white

    &.pending:before
      background-color: orange

    &.approved:before
      background-color: #00BFA5

    &.rejected:before
      background-color: red      

    .status
      outline: none
      z-index: 0
      position: relative
      display: flex
      width: 95px
      height: auto
      border: 0
      background-color: #eee
      border-radius:50px
      padding: 2px 16px 2px 20px
      font-size: .7rem
      background-size: 20px

.company
  display: flex
  gap: 4px      
  &-name
    cursor: pointer
    color: #0088ff
.country
  display: flex
  flex-direction: row
  gap: 4px
</style>