<template>
  <!-- <div class="main"> -->
  <!-- <div class="container white"> -->
  <div>
    <div class="white">
      <h2>{{ isEditing ? 'Edit company' : 'Create company' }}</h2>

      <div v-if="loading">
        <LoaderAni />
      </div>
      <form v-else @submit.prevent="submitForm" class="switchit-form sm">
        <div class="group" v-if="!isAdmin">
          <label for="email">Created by</label>
          <div class="inline">
            <input v-model="user.email" placeholder="email" type="text" id="email" class="input lg mr3" />
          </div>
        </div>
        <div class="group">
          <label for="company">Company name</label>
          <input v-model="form.company.name" placeholder="" type="text" id="company" class="input lg" />
        </div>
        <div class="group">
          <label for="company">Company homepage</label>
          <input v-model="form.company.homepage" @blur="copyDomain" placeholder="" type="text" id="company" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company domains and emails</label>
          <div class="help">Separate by commas (example.com, email@example.com)</div>
          <!-- <input v-model="form.company.domains" placeholder="" type="text" id="website" class="input fullwidth" /> -->
          <TagInput class="input fullwidth" v-model="form.company.domains" :key="componentKey" />
        </div>
        <div class="group">
          <label for="website">{{ "Countries the company is active in" }}</label>
          <Multiselect v-model="form.company.countryCodes" mode="tags" @select="countrySelected" :searchable="true" :close-on-select="false" :options="country_options" />
        </div>
        <div class="group">

          <label for="">{{ isAdmin ? "Markets the company serves" : "Markets you are interested in serving" }}</label>
          <div class="checkbox-group">
            <label v-for="(category, key) in categories" :key="key" class="checkbox-label">
              <input class="checkbox" type="checkbox" :checked="isCategorySelected(category.code)" :id="category.name" @change="toggleCategorySelection(category.code)" />{{ $t(key) }}
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <button class="">Submit</button>
        <div class="button__cancel" @click="closeModal">Cancel</div>
        <div v-if="errors.length" class="msg_error">{{ errors[0] }}</div>
      </form>
    </div>
  </div>
</template>
<script>

import Multiselect from '@vueform/multiselect'
import LoaderAni from '@/components/ui/LoaderAni.vue'
import bitwiseDecode from '@/helpers/bitwise'
import TagInput from '@/components/ui/TagInput.vue'

export default {
  components: {
    Multiselect,
    LoaderAni,
    TagInput
  },
  props: ["props"],
  data() {
    return {
      isAdmin: this.$store.getters.isAdmin,
      loaded: false,
      loading: false,
      status: null,
      isEditing: false,
      companyId: null,
      modalComponent: null,
      componentKey: 0,
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
        company: {
          name: ``,
          description: ``,
          information: `Created by ${this.$auth0.user._value.email}`,
          domains: [],
          domains_arr: [],
          homepage: ``,
          countryCodes: [],
          serviceTypes: [],
          roles: []
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
    selectedAdmin(val) {
      if (this.isEditing) {
        // look in this.form.company.roles for a result where role === 'ownner', and change 'user' to val
        const owner = this.form.company.roles.find(role => role.role === 'owner')
        if (owner) {
          owner.user = val
        } else {
          return false
        }
      } else {
        this.form.company.roles.push({ role: 'owner', user: val })
      }
      // this.form.company.roles[0].user = val
    }
  },
  methods: {
    async countrySelected() {
    },
    copyDomain() {


  // // Check if there's already an exact match of the homepage in the domains array
  const isHomepageInDomains = this.form.company.domains.includes(this.form.company.homepage);

  if (isHomepageInDomains) {
    // move it to first place in the domains array
    const index = this.form.company.domains.indexOf(this.form.company.homepage);
    this.form.company.domains.splice(index, 1);
    this.form.company.domains.unshift(this.form.company.homepage);

  } else {
    // if not, add it as the first item in the domains array
    this.form.company.domains.unshift(this.form.company.homepage);
  }
},

    isCategorySelected(code) {
      return this.form.company.serviceTypes?.includes(code);
      // return [0, 1, 2, 4, 8].includes(code)
    },

    toggleCategorySelection(code) {
      if (this.isCategorySelected(code)) {
        const index = this.form.company.serviceTypes.indexOf(code);
        this.form.company.serviceTypes.splice(index, 1);
      } else {
        this.form.company.serviceTypes.push(code);
      }
    },
    validateForm() {
      this.errors = [];
      if (!this.form.company.name) this.errors.push(this.$t('errors.companyNameRequired'));
      if (!this.form.company.contact_email || !this.validateEmail(this.form.company.contact_email)) this.errors.push(this.$t('errors.invalidEmail'));
      // Add other validations here...
    },
    validateEmail(email) {
      // disable eslint on the next line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      return re.test(String(email).toLowerCase());
    },

    closeModal() {
      this.$emit('closeModal')
    },
    openModal(component) {
      this.modalComponent = component
    },
    changePage(page) {
      this.screen = page
    },

    async submitForm() {
      console.log(this.form.company)
      try {
        if (this.form.company.homepage) {
          this.copyDomain()
        }
        // let array = this.form.company.domains.split(',').map(item => item.trim())
        // this.form.company.domains = array
        // let body = this.form.company
        let body = {
          name: this.form.company.name,
          homepage: this.form.company.homepage,
          description: this.form.company.description,
          information: this.form.company.information,
          domains: this.form.company.domains,
          countryCodes: this.form.company.countryCodes,
          serviceTypes: this.form.company.serviceTypes
        }
        if (this.isEditing) {
          await this.$switchit.editCompany(this.companyId, body)
        } else {
          await this.$switchit.createCompany(body)
        }
        this.$emit('save')

      } catch (error) {
        this.$toast_error.show(error)
      }
    },

  },
  async created() {
    try {

      if (this.props?.companyId) {
        this.isEditing = true
        this.companyId = this.props?.companyId
        let company = (await this.$switchit.getFullCompany(this.companyId)).model
        company.serviceTypes = bitwiseDecode(company.serviceType - 1)
        // company.domains = company.companyCompanyDomainsModels.map(item => item.domain).join(', ');
        company.domains = company.companyCompanyDomainsModels.map(item => item.domain)
        // company.countryCodes = company.companyCompanyCountrysModels.map(item => item.code)
        company.countryCodes = company.companyCompanyCountrysModels.map(item => item.countryCode);
        console.log('company.domains', company.domains)
        delete company.serviceType
        delete company.companyCompanyCountrysModels
        delete company.companyCompanyDomainsModels
        this.form.company = company
        this.componentKey++
      }


      // populate the countries dropdown
      let countryCodes = await this.$switchit.getCountries()
      let country_options = countryCodes.map(country => ({
        label: country.name,
        value: country.code
      }));

      this.country_options.push(...country_options)

      // populate the users and company differently depending on whether admin, and whether editing

      // if (this.isAdmin) {



    } catch (error) {
      console.log('error: ', error)
      this.$toast_error.show(error)
    }
  },

  async mounted() {
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

  
.fullwidth
  width: 100%
  max-width: 100% !important
  
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