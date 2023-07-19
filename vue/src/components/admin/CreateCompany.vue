<template>
  <!-- <div class="main"> -->
    <!-- <div class="container white"> -->
      <div> 
        <div class="white">
          <h2 >{{ isEditing ? 'Edit company' : 'Create company'}}</h2>

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
              <label for="website">Company website</label>
              <input v-model="form.company.homepage" placeholder="" type="text" id="website" class="input lg" />
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
        <div v-if="status === 'pending'" class="main clip" v-show="!isAdmin">
          <div class="container clip">
            <div class="ph_content">
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
          information:  `Created by ${this.$auth0.user._value.email}`,
          homepage: ``,
          domains: [],
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

      try {
        let body = this.form.company
        body.domains = [body.homepage]
        console.log('body: ', body)
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
        company.serviceTypes = bitwiseDecode(company.serviceType -1)
        company.countryCodes = company.companyCompanyCountrysModels.map(item => item.countryCode);
        console.log('country codes: ', company.countryCodes)
        delete company.serviceType 
        this.form.company = company 
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
.button__cancel
  width: 100%
  display: flex
  padding: 16px
  justify-content: center
  // disable text selection
  user-select: none
  -webkit-user-select: none
  
  
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