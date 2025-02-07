<template>
  <div class="main">
    <div class="container white">
      <h2 v-if="isAdmin">{{ isEditing ? 'Edit business partner' : 'Create business partner' }}</h2>
      <h2 v-else>Request access to Switchit</h2>
      <div v-if="!loaded">
        <LoaderAni />
      </div>
      <div v-else-if="businessPartnerExists">
        A business partner with this domain already exists. During beta, only one user per business partner is allowed. For more information, feel free to contact us through the help widget below.
      </div>
      <form v-else @submit.prevent="submitForm" class="switchit-form sm">
        <!-- inputs for creating business partner -->
        <div class="group">
          <label for="company">Company name</label>
          <input v-model="form.businessPartner.name" placeholder="" type="text" id="company" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company email</label>
          <input v-model="form.businessPartner.email" :disabled="isSwitchitUser" placeholder="" type="text" id="company_email" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company VAT number</label>
          <input v-model="form.businessPartner.vatNumber" placeholder="" type="text" id="vat_number" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company website</label>
          <!-- add 'error' class if domainMatch is false -->
          <div class="inline-flex">
            <input :class="{ error: !domainMatch }" :disabled="isSwitchitUser" v-model="form.businessPartner.domain" placeholder="" type="text" id="domain" class="input lg" />
            <div v-if="!domainMatch" class="error_msg"><span class="material-symbols-outlined">error</span> Must match domain of logged in user ({{ user.email }})</div>
            <!-- add material symbol 'error' -->
          </div>
        </div>
        <div class="group">
          <label for="address">Company address</label>
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

            <label v-for="(service, index) in serviceTypes" :key="index" :class="service.serviceType === 1 ? 'hide' : ''" class="checkbox-label">
              <input class="checkbox" type="checkbox" @click="console.log(form.businessPartner.serviceTypes)" :checked="isServiceSelected(service.serviceType)" :id="service.serviceTypeString" @change="toggleServiceSelection(service.serviceType)" />{{ $t(service.serviceTypeString) }}
              <span class="checkmark"></span>

            </label>
          </div>
        </div>
        {{ form.businessPartner.serviceTypes }}
        <button :disabled="!domainMatch" class="icon">Submit</button>

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

export default {
  components: {
    Multiselect,
    LoaderAni,
  },
  data() {
    return {
      isAdmin: this.$store.getters.isAdmin,
      loaded: false,
      status: null,
      isEditing: false,
      isSwitchitUser: false,
      modalComponent: null,
      screen: 'UserTable',
      categories: this.$store.getters.categories,
      activeUser: this.$store.getters.activeUser,
      businessPartnerExists: null,
      userEmailDomain: null,
      domainMatch: true,
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
    'form.businessPartner.domain': function (val) {
      this.domainMatch = val === this.userEmailDomain
      // override for switchit users
      if (this.userEmailDomain === 'switchit.ai') this.domainMatch = true
    }
  },
  methods: {
    async countrySelected() {
      // TEMP for testing
      console.log('countrySelected', this.form.businessPartner.countriesOfOperation)
    },

    isServiceSelected(code) {
      return this.form.businessPartner.serviceTypes.includes(code);
    },
    toggleServiceSelection(code) {
      if (this.isServiceSelected(code)) {
        const index = this.form.businessPartner.serviceTypes.indexOf(code);
        this.form.businessPartner.serviceTypes.splice(index, 1);
      } else {
        this.form.businessPartner.serviceTypes.push(code);
      }
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
        let body = this.form.businessPartner
        // if (!body.serviceTypes.includes(1)) {
        //   body.serviceTypes.push(1)
        // }
        let response = null || await this.$switchit.createBusinessPartner(body)
        if (response.statusText === 'Created') {
          let id = response.headers.location.split('/').pop()
          let activeBusinessPartner = await this.$switchit.getBusinessPartner(id)
          this.$store.dispatch('setActiveBusinessPartner', activeBusinessPartner)
          // this.$router.push({ path: '/operations', query: { q: 'Companies' } })
          this.$router.go()
        } else {
          console.log("error response:", response)
          throw new Error(response)
        }
      } catch (error) {
        console.error('I console logged an error: ', error)
        this.$toast_error.show(error)
      }
    },
  },
  async created() {
    try {
      // check if editing
      this.id = this.$route.query.id
      this.isEditing = this.id ? true : false;
      // let bp = this.$store.getters.activeBusinessPartner
      // console.log('bp', bp)
      this.isAdmin = this.$store.getters.activeBusinessPartner ? this.$store.getters.isAdmin : false

      // populate the countries dropdown
      let countryCodes = await this.$switchit.getCountries()

      if (countryCodes?.length) {

        let country_options = countryCodes.map(country => ({
          label: country.name,
          value: country.code
        }));

        this.country_options.push(...country_options)

      }

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
      console.error('error: ', error)
      this.$toast_error.show(error)
    }
  },

  async mounted() {
    try {
      this.userEmailDomain = this.$auth0.user._value.email.split('@')[1]
      
      /* If not a switchit email, check to make sure domain is unique */
      
      if (this.userEmailDomain === 'switchit.ai') {
        this.isSwitchitUser = true
        let switchitUser = this.$auth0.user._value.email.split('@')[0]
        this.form.businessPartner.domain = 'switchit.' + switchitUser
        Object.assign(this.form.businessPartner, {
          name: 'SwitchIt',
          domain: 'switchit.' + switchitUser,
          vatNumber: Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000).toString(),
          address: '123 Main St',
          email: this.$auth0.user._value.email,
          countryCode: 'DK',
          countriesOfOperation: ['DK', 'SE'],
          serviceTypes: [1, 2]
        });
        this.loaded = true
        return
      } else {
        this.form.businessPartner.domain = this.userEmailDomain
        // userEmailDomain = 'asdf.asdf'
        let businessPartners = await this.$switchit.getBusinessPartners()
        let businessPartner = await businessPartners.find(bp => bp.domain === this.userEmailDomain)
        if (businessPartner) {
          this.businessPartnerExists = true
          // this.$toast_error.show({duration: 6000, message: 'BUSINESS_PARTNER_ALREADY_EXISTS'})
        }
        this.serviceTypes = await this.$switchit.getServiceTypes();

        console.log('businessPartner', businessPartner)
        this.loaded = true
      }
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

.hide
  display: none  !important
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