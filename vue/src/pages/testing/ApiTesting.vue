<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <h2>API Testing</h2>
    <h3>Business Partners</h3>
    <div class="buttons">

      <button @click="getBusinessPartners()">getBusinessPartners</button>
      <button @click="createBusinessPartner()">createBusinessPartner</button>
      <button @click="editBusinessPartner('f95521bc...')">editBusinessPartner</button>
      <button @click="deleteBusinessPartner('f95521bc...')">deleteBusinessPartner</button>
 
    </div>
    <h3>Companies</h3>
    <div class="buttons">
      <button @click="createCompany()">createCompany</button>
      <button @click="editCompany('585c5dec-5df8-4894-9976-8bf36baf5967')">editCompany</button>
      <button @click="getCompanies()">getCompanies</button>
      <button @click="getFullCompanies()">getFullCompanies</button>
      <button @click="getCompany('585c5dec-5df8-4894-9976-8bf36baf5967')">getCompany</button>
      <button @click="getFullCompany('585c5dec-5df8-4894-9976-8bf36baf5967')">getFullCompany</button>
    </div>
    <h3>Misc</h3>
    <div class="buttons">
      <button @click="call('GET', 'countrydialcodes')">Country Dial Codes</button>
      <button @click="getServiceTypes()">getServiceTypes</button>
      <button @click="addServicesToCompany()">addServicesToCompany</button>
    </div>
    <pre>{{ result }}</pre>
    <div class="table" >
      <div v-for="(company, index) in companies" :key="index">
        <div class="item">
          <!-- <div class="row"  @click="$router.push({ path: '/createcompany', query: { id: company._id } })"> -->
          <div class="row">
            <div class="field-group">
              <div class="field b">
                {{ company.name }}
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
      </div>
      <div v-for="(businessPartner, index) in businessPartners" :key="index">
        <div class="item">
          <!-- <div class="row"  @click="$router.push({ path: '/createbusinessPartner', query: { id: businessPartner._id } })"> -->
          <div class="row">
            <div class="field-group">
              <div class="field b">
                {{ businessPartner.name }}
              </div>
              <div class="field light">
                websites:
                {{ businessPartner.website }}
              </div>
              <div class="field light">
                {{ businessPartner.contact_email }}
              </div>
              <div class="field light" v>
                admin:
                <!-- <span class="role" v-for="role in businessPartner.roles" :key="role">
                  {{ role.user?.email }}
                </span> -->
              </div>
              <div class="field light company">
                markets:
                <span class="country" v-for="country in businessPartner.countries" :key="country">
                  {{ country?.name || country }}
                </span>
              </div>

            </div>
            <!-- <IconsCategoryAccess :access="businessPartner.access"/> -->

          </div>
          <div class='status_wrapper' :class="businessPartner.status">
            <!-- <div :class="['dot', businessPartner.status]"></div> -->
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// plugins & scripts

// import api from '@/api/api';

// components 
import ModalWindow from '@/components/ui/ModalWindow.vue';


export default {
  components: {
    ModalWindow
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
      companies: [],
      businessPartners: [],
      serviceTypes: [],
      user: this.$auth0.user,
    };
  },
  methods: {
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

    async getBusinessPartners() {
      this.businessPartners = (await this.$switchit.getBusinessPartners()).model
      console.log('this.businessPartners: ', this.businessPartners)
    },
    async createBusinessPartner() {

      let body = {
        name: 'test3',
        domain: 'test2.com',
        vatNumber: '2345431',
        address: '23452341 Main St',
        email: 'test@test2.com',
        countriesOfOperation: ['NO'],
        countryCode: 'NO',
        serviceTypes: [1]
      }
      console.log('body: ', body)
      let response = await this.$switchit.createBusinessPartner(body)
      console.log('response: ', response)
    },
    async editBusinessPartner(id) {
      let info = `Created by ${this.user.email}`
      console.log('info: ', info)
      let body = {
        name: "ACME Bacon Inc.",
        description: "Lorem ipsum dolor sit amet",
        information: info,
        homepage: "example.com" ,
        domains: ["example.co"],
        countryCodes: ["DA", "DE", "NO", "SE", "US"],
        serviceTypes: [1, 2, 4, 8, 16]
      }
      console.log('body: ', body)
      let response = await this.$switchit.editBusinessPartner(id, body)
      console.log('response: ', response)
    },
    async deleteBusinessPartner(id) {
      console.log('deleting: ', id)
      let response = await this.$switchit.deleteBusinessPartner(id)
      console.log('response: ', response)
    },

    //*** COMPANIES ***/

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
        homepage: "example.com" ,
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
  },
  async mounted() {
  }
}
</script>



<style lang="sass" scoped>
@import "/src/styles/variables.sass"
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