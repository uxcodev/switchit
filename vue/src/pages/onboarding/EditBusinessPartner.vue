<template>
  <div class="main">
    <div class="container white">
      <h2>Your company</h2>
      <div v-if="!loaded">
        <LoaderAni />
      </div>
     
      <form v-else @submit.prevent="submitForm" class="switchit-form sm">
          <!-- inputs for creating business partner -->
          <div class="group">
            <label for="company">Company name</label>
            <input v-model="form.businessPartner.name" placeholder="" type="text" id="company" class="input lg" />
          </div>
          <div class="group">
            <label for="website">Company email</label>
            <input v-model="form.businessPartner.email" placeholder="" type="text" id="company_email" class="input lg" />
          </div>
          <div class="group">
            <label for="website">Company VAT number</label>
            <input v-model="form.businessPartner.vatNumber" placeholder="" type="text" id="vat_number" class="input lg" />
          </div>
          <div class="group">
            <label for="website">Company website</label>
            <input v-model="form.businessPartner.domain" placeholder="" type="text" id="domain" class="input lg" />
          </div>
          <div class="group">
            <label for="website">Company address</label>
            <input v-model="form.businessPartner.address" placeholder="" type="text" id="address" class="input lg" />
          </div>
          <div class="group">
            <label for="country">Company country</label>
            <Multiselect v-model="form.businessPartner.countryCode" mode="single" :searchable="true" :close-on-select="false" :options="country_options" />
          </div>
          <div class="group">
            <label for="countries">Countries the company is active in</label>
            <Multiselect v-model="form.businessPartner.countriesOfOperation" mode="tags" @select="countrySelected" :searchable="true" :close-on-select="false" :options="country_options" />  
          </div>
          <div class="group">
            <label for="markets">Markets the company serves</label>
            <div class="checkbox-group">
              <label v-for="(category, key) in categories" :key="key" class="checkbox-label">
                <input class="checkbox" type="checkbox" :checked="isCategorySelected(category.code)" :id="category.name" @change="toggleCategorySelection(category.code)" />{{ $t(key) }}
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <button class="icon">Submit</button>

        <div v-if="errors.length" class="msg_error">{{ errors[0] }}</div>
      </form>
    </div>
  </div>
  <div v-if="status === 'pending'" class="main clip" v-show="!isAdmin">
    <div class="container clip">
      <div class="pageheader__content">
        <div class="cards lg">
          <div class="banner_lg">
            <h1>
              Your account is pending approval.
            </h1>
            <p>Once your account is approved, your opportunities will appear in the dashboard below. In the meantime, you can start learning how to get the most out of your SwitchIt account.</p>
            <button>Get more out of SwitchIt</button>
          </div>
        </div>
      </div>
      <div>
        <img class="img_placeholder mt6" src="@/images/switchit_onboarding_placeholder.svg" />
      </div>

    </div>
  </div>
</template>
<script>

import Multiselect from '@vueform/multiselect'
import LoaderAni from '@/components/ui/LoaderAni.vue'
import bitwiseDecode from '@/helpers/bitwise'

export default {
  components: {
    Multiselect,
    LoaderAni,
  },
  data() {

    return {
      isAdmin: this.$store.getters.isAdmin,
      loaded: false,
      loading: false,
      status: null,
      isEditing: false,
      modalComponent: null,
      screen: 'UserTable',
      categories: this.$store.getters.categories,
      activeUser: this.$store.getters.activeUser,
      user: {
        first_name: "",
        last_name: "",
        email: this.$auth0.user._value.email,
        admin: false,
        status: "pending",
        access: {},
        _id: null
      },
      form: {

       businessPartner: {
        name: ``,
        domain: "",
        vatNumber: "",
        address: "",
        email: "",
        countryCode: "",
        countriesOfOperation: [],
        serviceTypes: []
      },
      },
      selectedAdmin: null,
      users: [],
      errors: [],
      country_options: [
        { label: "Denmark", value: "DK" },
        { label: "Sweden", value: "SE" },
        { label: "Norway", value: "NO" },
        { label: "Germany", value: "DE" },
        { label: "United States", value: "US" },
      ],
      serviceTypes: [],
      selectedCategories: [],
    }
  },
  watch: {
   
  },
  methods: {
    async countrySelected() {
      // TEMP for testing
      console.log('countrySelected', this.form.businessPartner.countriesOfOperation)
    },
    isCategorySelected(code) {
      return this.form.businessPartner.serviceTypes.includes(code);
    },

    toggleCategorySelection(code) {
      if (this.isCategorySelected(code)) {
        const index = this.form.businessPartner.serviceTypes.indexOf(code);
        this.form.businessPartner.serviceTypes.splice(index, 1);
      } else {
        this.form.businessPartner.serviceTypes.push(code);
      }
      console.log('this.form.businessPartner.serviceTypes: ', this.form.businessPartner.serviceTypes)
    },
    validateForm() {
      this.errors = [];
      if (!this.form.businessPartner.name) this.errors.push(this.$t('errors.companyNameRequired'));
      // Add other validations here...
    },
    validateEmail(email) {
      // disable eslint on the next line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      return re.test(String(email).toLowerCase());
    },

    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
    changePage(page) {
      this.screen = page
    },
    async submitForm() {

      try {
        // let body = this.form.company
        // let response = await this.$switchit.createCompany(body)
        let body = {
        // name: this.businessPartnerBody.name,
        // domain: this.businessPartnerBody.domain,
        // vatNumber: this.businessPartnerBody.vatNumber,
        // address: this.businessPartnerBody.address,
        // email: this.businessPartnerBody.email,
        // countryCode: this.businessPartnerBody.countryCode,
        name: this.form.businessPartner.name,
        domain: this.form.businessPartner.domain,
        vatNumber: this.form.businessPartner.vatNumber,
        address: this.form.businessPartner.address,
        email: this.form.businessPartner.email,
        countryCode: this.form.businessPartner.countryCode,
        countriesOfOperation: this.form.businessPartner.countriesOfOperation,
        serviceTypes: this.form.businessPartner.serviceTypes
        }
        // countriesOfOperation: this.businessPartnerBody.countriesOfOperation,
        // serviceTypes: this.businessPartnerBody.serviceTypes
        // countriesOfOperation: ['DK', 'NO'],
        // serviceTypes: [1]
      
        // let body = this.form.businessPartner
        let id = this.form.businessPartner.id
        // let response = await this.$switchit.createBusinessPartner(body)
        console.log('id: ', id)
        console.log('body: ', body)
        let response = await this.$switchit.editBusinessPartner(id, body)
        console.log(response)
          // if (response.ok) {
          //   this.$router.push({ path: '/operations', query: { q: 'Companies' } })
          // }
      } catch (error) {
        this.$toast_error.show(error)
      }
    },
    
  },
  async created() {
    try {
      // check if editing
      this.id = this.$route.query.id
      this.isEditing = this.id ? true : false;

      // populate the countries dropdown
      let countryCodes = await this.$switchit.getCountries()
      let country_options = countryCodes.map(country => ({
        label: country.name,
        value: country.code
      }));

      this.country_options.push(...country_options)

      // populate the users and company differently depending on whether admin, and whether editing

      if (this.isAdmin) {
        this.users = this.isAdmin ? await this.$api_node.getUsers() : null
        let company = this.isEditing ? await this.$api_node.getCompanyById(this.id) : null
        this.form.company = company || this.form.company;
        this.selectedAdmin = company?.roles[0]?.user || null;
      } else {
        this.user.first_name = this.$auth0.user._value.given_name;
        this.user.last_name = this.$auth0.user._value.family_name;
        this.user._id = this.activeUser?._id;
      }
    } catch (error) {
      console.log('error: ', error)
      this.$toast_error.show(error)
    }
  },

  async mounted() {
    // populate BusinessPartner form with dummy data
    // this.form.businessPartner.name = 'Test Company'
    // this.form.businessPartner.domain = 'testcompany.com'
    // this.form.businessPartner.vatNumber = '12345678'
    // this.form.businessPartner.address = 'Test Address'
    // this.form.businessPartner.email = 'test@test.com'
    // this.form.businessPartner.countryCode = 'DK'
    // this.form.businessPartner.countriesOfOperation = ['DK', 'SE']
    // this.form.businessPartner.serviceTypes = [1, 2]

    this.form.businessPartner = this.$store.getters.activeBusinessPartner
    let serviceType = this.form.businessPartner.users[0].serviceType // TEMP
    this.form.businessPartner.serviceTypes = bitwiseDecode(serviceType)
    this.form.businessPartner.countriesOfOperation = this.form.businessPartner.countries.map(country => country.countryCode)
    console.log('this.form.businessPartner: ', this.form.businessPartner)
    try {
      this.loaded = true
    } catch (error) {
      this.$toast_error.show(error)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"
@import "/src/styles/mixins.sass"
@import "@vueform/multiselect/themes/default.css"
.img_placeholder
  width: 100%
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  background-color: #fafafa
  min-height: 100vh
  padding: 120px 20px 60px 20px
  top: 80px
  &.clip
    max-height: 100vh
    overflow: hidden

.back-button
  width: 100%
  button
    padding: 4px 8px

.container.white
  background-color: white
  padding: 50px
  border-radius: 10px
  @include shadow()

  .group
    input:not(.reset)
      max-width: none


.checkbox-group
  flex-direction: row
  flex-wrap: wrap
  width:400px
  label
    width:160px
pre
  color: black

</style>