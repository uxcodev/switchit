<template>
  <div class="main">
    <div class="container white">
      <h2>{{ $route.query.id ? businessPartnerBody.name : 'Your company' }}</h2>
      <div v-if="!loaded">
        <LoaderAni />
      </div>

      <form v-else-if="isAdmin" @submit.prevent="submitForm" class="switchit-form med">
        <!-- inputs for creating business partner -->
        <div class="highlight disabled">
          <div class="checkbox-group">
            <label class="checkbox-label">Company is approved
              <input disabled type="checkbox" id="isApproved" name="isApproved" v-model="businessPartnerBody.isApproved">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="group">
          <label for="company">Company name</label>
          <input v-model="businessPartnerBody.name" placeholder="" type="text" id="company" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company email</label>
          <input v-model="businessPartnerBody.email" placeholder="" type="text" id="company_email" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company VAT number</label>
          <input v-model="businessPartnerBody.vatNumber" placeholder="" type="text" id="vat_number" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company website</label>
          <input v-model="businessPartnerBody.domain" placeholder="" type="text" id="domain" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company address</label>
          <input v-model="businessPartnerBody.address" placeholder="" type="text" id="address" class="input lg" />
        </div>
        <div class="group">
          <label for="country">Company country</label>
          <Multiselect v-model="businessPartnerBody.countryCode" mode="single" :searchable="true" :close-on-select="false" :options="country_options" />
        </div>
        <div class="group">
          <label for="countries">Countries the company is active in</label>
          <Multiselect v-model="businessPartnerBody.countriesOfOperation" mode="tags" @select="countrySelected" :searchable="true" :close-on-select="false" :options="country_options" />
        </div>

        <!-- {{ businessPartnerBody.serviceTypes }} -->

        <div class="group">
          <label for="markets">Markets the company serves</label>
          <div class="checkbox-group">

            <label v-for="(service, index) in serviceTypes" :key="index" :class="service.serviceType === 1 ? 'hide' : ''" class="checkbox-label">
              <input :disabled="!isAdmin" class="checkbox" type="checkbox" :checked="isServiceSelected(service.serviceType)" :id="service.serviceTypeString" @change="toggleServiceSelection(service.serviceType)" />{{ $t(service.serviceTypeString) }}
              <span class="checkmark"></span>

            </label>
          </div>
        </div>

        <!-- <div class='help' v-if="$store.getters.isAdmin">{{ businessPartnerBody.serviceTypes }}</div> -->
        <button class="icon">Submit</button>

        <div v-if="errors.length" class="msg_error">{{ errors[0] }}</div>
      </form>

      <!-- If not admin, show all fields as plain text -->

      <div v-else  class="switchit-form med">
        <div class="highlight info">
          Please contact us if you need to edit company details, or request access to additional markets.
        </div>

        <div class="group disabled">
            <label class="checkbox-label">Company is approved
            <input disabled type="checkbox" id="isApproved" name="isApproved" v-model="businessPartnerBody.isApproved">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="group">
          <label for="company">Company name</label>
          <div>{{ businessPartnerBody.name }}</div>
        </div>
        <div class="group">
          <label for="website">Company email</label>
          <div>{{ businessPartnerBody.email }}</div>
        </div>
        <div class="group">
          <label for="website">Company VAT number</label>
          <div>{{ businessPartnerBody.vatNumber }}</div>
        </div>
        <div class="group">
          <label for="website">Company website</label>
          <div>{{ businessPartnerBody.domain }}</div>
        </div>
        <div class="group">
          <label for="website">Company address</label>
          <div>{{ businessPartnerBody.address }}</div>
        </div>
        <div class="group">
          <label for="country">Company country</label>
          <div>{{ lookupCountryFromCode(businessPartnerBody.countryCode) }}</div>
        </div>

        <div class="group">
          <label for="countries">Countries the company is active in</label>
          <div class="tags">
            <span v-for="(country, index) in businessPartnerBody.countriesOfOperation" :key="index" class="tag">{{ lookupCountryFromCode(country) }}</span>
          </div>
        </div>

        <div class="group">
          <label for="markets">Markets the company serves</label>
          <div class="tags">
            <span v-for="(service, index) in serviceTypes" :key="index" class="tag" :class="service.serviceType === 1 || !isServiceSelected(service.serviceType) ? 'hide' : ''">{{  $t(service.serviceTypeString) }}</span>
          </div>
        </div>

        <!-- <div class="group">
          <label for="markets">Markets the company serves</label>
          <div class="checkbox-group">
            <label v-for="(service, index) in serviceTypes" :key="index" :class="service.serviceType === 1 ? 'hide' : ''" class="checkbox-label">
              <input :disabled="!isAdmin" class="checkbox" type="checkbox" :checked="isServiceSelected(service.serviceType)" :id="service.serviceTypeString" @change="toggleServiceSelection(service.serviceType)" />{{ $t(service.serviceTypeString) }}
              <span class="checkmark"></span>
            </label>
          </div>
        </div> -->
        </div>
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

      businessPartnerBody: {
        name: '',
        domain: '',
        vatNumber: '',
        address: '',
        email: '',
        countriesOfOperation: [],
        isApproved: false,
        countryCode: '',
        serviceTypes: [] //[1]
      },
      originalBusinessPartnerBody: {},
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
      // console.log('countrySelected', this.form.businessPartner.countriesOfOperation)
    },
    lookupCountryFromCode(code) {
      return this.country_options.find(country => country.value === code)?.label;
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
      this.businessPartnerBody.serviceTypes.sort((a, b) => a - b);
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
        const { id } = this.fullBusinessPartner;
        const newBp = this.businessPartnerBody;
        const originalBp = this.originalBusinessPartnerBody;
        const changesRequested = {};

        console.log('id:', id);
        console.log('body:', newBp);
        console.log('original:', originalBp);

        for (const key in newBp) {
          if (newBp[key] !== originalBp[key]) {
            const newValues = newBp[key].filter(value => !originalBp[key].includes(value));
            const removedValues = originalBp[key].filter(value => !newBp[key].includes(value));

            if (newValues.length || removedValues.length) {
              changesRequested[key] = {
                ...(newValues.length && { added: newValues }),
                ...(removedValues.length && { removed: removedValues })
              };
            }
          }
        }
        console.log('changesRequested:', changesRequested);

        let body = {
          ...newBp,
          changesRequested
        };
        console.log('body:', body);

        // *** TEMP ***
        // this.isAdmin = false

        if (this.isAdmin) {
          let response = await this.$switchit.editBusinessPartner(id, body)
          console.log(response)
          if (response) {
            // this.$router.push({ path: '/operations', query: { q: 'Companies' } })
            this.$toast_success.show('Saved successfully')
          } 
        } else {
          // let response = await this.$switchit.requestBusinessPartnerChanges(id, body)
          let response = null
          console.log(response)
          if (response) {
            this.$toast_success.show('Request sent successfully')
          } else {
            this.$toast_warn.show('Requesting changes to access not available yet.')
          
          }
        }
        
      } catch (error) {
        this.$toast_error.show(error);
      }
    }


  },
  async created() {
    try {
      // the url looks like this: http://localhost:44393/businesspartner/a5ae8b6a-418e-47f2-b7e1-a729a48e37cb?id=a5ae8b6a-418e-47f2-b7e1-a729a48e37cb
      // 'id' is everything after businesspartner/. Save this'

      if (this.$route.params.id) {
        // if id provided, look it up
        this.fullBusinessPartner = await this.$switchit.getBusinessPartner(this.$route.params.id);
      } else {
        // otherwise, it's the user's own profile
        this.fullBusinessPartner = this.$store.getters.activeBusinessPartner;
      }

      // if editing, populate the form
      if (this.fullBusinessPartner) {
        this.businessPartnerBody = {
          name: this.fullBusinessPartner.name,
          domain: this.fullBusinessPartner.domain,
          vatNumber: this.fullBusinessPartner.vatNumber,
          address: this.fullBusinessPartner.address,
          email: this.fullBusinessPartner.email,
          countryCode: this.fullBusinessPartner.countryCode,
          countriesOfOperation: this.fullBusinessPartner.countries.map(country => country.countryCode),
          serviceTypes: bitwiseDecode(this.fullBusinessPartner.users[0]?.serviceType),
          isApproved: this.fullBusinessPartner.isApproved
        };

        // clone to originalBusinessPartnerBody for comparison
        this.originalBusinessPartnerBody = { ...this.businessPartnerBody };

        // Fetch service types and filter them
        this.serviceTypes = await this.$switchit.getServiceTypes();
        this.businessPartnerBody.serviceTypes = this.businessPartnerBody.serviceTypes.filter(
          item => item <= this.serviceTypes[this.serviceTypes.length - 1].serviceType
        );
  
        console.log('Filtered serviceTypes: ', this.businessPartnerBody.serviceTypes);
      }

      // Populate the countries dropdown
      const countryCodes = await this.$switchit.getCountries();
      this.country_options = countryCodes.map(country => ({
        label: country.name,
        value: country.code
      }));

      this.componentKey++;
    } catch (error) {
      this.$toast_error.show(error);
    }
  },

  async mounted() {
    try {



      this.loaded = true;
    } catch (error) {
      this.$toast_error.show(error);
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
  
.hide
  display: none !important

.checkbox-group
  flex-direction: row
  flex-wrap: wrap
  width:400px
  label
    width:160px


</style>