<template>
  <div class="main">
    <div class="container white">
      <h2 v-if="isAdmin">{{ isEditing ? 'Edit company' : 'Create company' }}</h2>
      <h2 v-else>Request access to Switchit</h2>
      <div v-if="loading">
        <LoaderAni />
      </div>
      <form v-else @submit.prevent="submitForm" class="switchit-form sm">
        <div class="group" v-if="isAdmin">
          <label for="email">Created by (email address)</label>
          <input v-model="form.company.createdby" type="text" id="first_name" class="input lg" />
        </div>
        <div class="group" v-if="isAdmin">
          <label for="admin">Select a company admin</label>
          <select name="admin" class="select" v-model="selectedAdmin" v-on:change="selectAdmin">
            <option disabled value="">Select a user</option>
            <option value="">None</option>
            <option v-for="user in users" :key="user._id" :value="user._id">{{ user.first_name }} {{ user.last_name }}</option>
          </select>
        </div>
        <div class="group" v-if="!isAdmin">
          <label for="firstName">Requested by</label>
          <div class="inline">
            <input disabled v-model="user.email" placeholder="" type="text" id="email" class="input lg mr3" />
          </div>
        </div>
        <div class="group" v-if="!isAdmin">
          <label for="firstName">Your name</label>
          <div class="inline">
            <input v-model="user.first_name" placeholder="First name" type="text" id="first_name" class="input lg mr3" />
            <input v-model="user.last_name" placeholder="Last name" type="text" id="last_name" class="input lg" />
          </div>
        </div>
        <div class="group">
          <label for="company">Company name</label>
          <input v-model="form.company.name" placeholder="" type="text" id="company" class="input lg" />
        </div>
        <div class="group" v-if="isAdmin">
          <label for="website">Company email</label>
          <input v-model="form.company.contact_email" placeholder="" type="text" id="company_email" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company website</label>
          <input v-model="form.company.website" placeholder="" type="text" id="website" class="input lg" />
        </div>
        <div class="group">
          <label for="website">{{ isAdmin ? "Countries the company is active in" : "Countries you are active in" }}</label>
          <Multiselect v-model="form.company.countries" mode="tags" @select="countrySelected" :searchable="true" :close-on-select="false" :options="country_options" />
        </div>
        <div class="group">

          <label for="">{{ isAdmin ? "Markets the company serves" : "Markets you are interested in serving" }}</label>

          <div class="checkbox-group">
            <label v-for="(category, key) in form.company.access" :key="key" class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="category.status" :id="category.name" />{{ $t(key) }}
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

export default {
  components: {
    Multiselect,
    LoaderAni,
  },
  // props: ['isAdmin'],
  data() {

    return {
      isAdmin: this.$store.getters.isAdmin,
      // isAdmin: false,
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
        company: {
          name: ``,
          // name: `test company ${Math.floor(Math.random() * (11111 - 99999))}`,
          website: "",
          countries: [],
          status: "pending",
          createdby: this.$auth0.user._value.email,
          contact_email: '',
          access: {},
          roles: [],
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
      ]
    }
  },
  watch: {
    selectedAdmin(val) {
      console.log('watch', val)
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

        console.log('submitForm')
        let response

        // Node API
/* 
        if (this.isAdmin) {
          if (this.isEditing) {
            response = await this.$api_node.updateCompany(this.id, this.form)
          } else {
            response = await this.$api_node.createCompany(this.form)
          }
          if (response.ok) {
            this.$router.push({ path: '/operations', query: { q: 'Companies' } })
          }
        }
        else {
          let fields = {
            ...this.form,
            user: this.user
          }
          response = await this.$api_node.signupCompany(fields)
          fields = {
            ...this.user
          }
          console.log('updateUser fields: ', fields)
          // response = await this.$api_node.updateUser(fields)
        }
 */
        // **** Switchit Official API ****

        let body = {
          name: this.form.company.name,
          homepage: this.form.company.website,
          description: "Lorem ipsum dolor sit amet",
        }
        response = await this.$switchit.createCompany(body)
         

        console.log(response)
      } catch (error) {
        this.$toast_error.show(error)
      }
    },
    async countrySelected() {
      // TEMP for testing
      console.log('countrySelected', this.form.company.countries)
    }
  },
  async created() {
    try {
      console.log('createCompany created');
      console.log('createCompany active user', this.activeUser);
      // check if editing
      this.id = this.$route.query.id
      this.isEditing = this.id ? true : false;

      // populate the countries dropdown
      let countries = await this.$api_node.getCountries()
      let country_options = countries.map(country => ({
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
        this.form.company.createdby = this.$auth0.user._value.email;
        this.user.first_name = this.$auth0.user._value.given_name;
        this.user.last_name = this.$auth0.user._value.family_name;
        this.form.company.contact_email = this.$auth0.user._value.email;
        this.form.company.status = 'pending';
        this.form.company.roles.push({ role: 'owner', user: this.activeUser._id }); 
        this.user._id = this.activeUser?._id;
      }

      for (const prop in this.categories) {
        if (Object.hasOwnProperty.call(this.categories, prop)) {
          this.form.company.access[prop] = { status: false };
        }
      }


    } catch (error) {
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