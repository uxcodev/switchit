<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div class="container white">
      <h2>{{ edit ? 'Edit company' : 'Create company' }}</h2>
      <form @submit.prevent class="switchit-form sm">
        <!-- <h3>{{ service.name }}</h3> -->

        <div class="group">
          <label for="email">Created by (email address)</label>
          <input v-model="form.company.createdby" type="text" id="first_name" class="input lg" />
        </div>
        <div>
          <div class="group">
            <label for="admin">Select a company admin</label>
            <select name="admin" class="select" v-model="selectedAdmin" v-on:change="selectAdmin">
              <option disabled value="">Select a user</option>
              <option v-for="user in users" :key="user._id" :value="user._id">{{ user.first_name }} {{ user.last_name }}</option>
            </select>
          </div>
        </div>
        <div class="group">
          <label for="company">Company name</label>
          <input v-model="form.company.name" placeholder="" type="text" id="company" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Company website</label>
          <input v-model="form.company.website" placeholder="" type="text" id="website" class="input lg" />
        </div>
        <div class="group">
          <label for="website">Countries the company is active in</label>
          <Multiselect v-model="form.company.countries" mode="tags" :searchable="true" :close-on-select="false" :options="country_list" />
        </div>
        <div class="group">

          <label for="">Markets the company serves</label>


          <div class="checkbox-group">
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="form.company.access.mortgage.status" id="mortgage" />Mortgage
              <span class="checkmark"></span>
            </label>
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="form.company.access.mobile.status" id="mobile" />Mobile
              <span class="checkmark"></span>
            </label>
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="form.company.access.utilities.status" id="energy" />Energy
              <span class="checkmark"></span>
            </label>
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="form.company.access.insurance.status" id="insurance" />Insurance
              <span class="checkmark"></span>
            </label>
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="form.company.access.broadband.status" id="broadband" />Broadband
              <span class="checkmark"></span>
            </label>
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="form.company.access.auto.status" id="auto" />Auto
              <span class="checkmark"></span>
            </label>
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="form.company.access.banking.status" id="banking" />Banking
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <button class="icon" @click="submitForm">Submit</button>
        <div v-if="errors.length" class="msg_error">{{ errors[0] }}</div>
      </form>
    </div>
  </div>
  <div v-if="status === 'pending'" class="main clip">
    <div class="container clip">
      <!-- <h2>Settings</h2>  -->
      <div class="ph_content">
        <div class="cards_lg">
          <!-- <div v-for="i in 2" :key='i'><span :class='i'></span></div> -->
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
    <!-- <h3>{{ user.status }}</h3> -->
    <!-- <div>
      <pre>
        <code>
        {{ user }}
      </code>
      </pre>
    </div> -->
    <!-- <keep-alive>
      <component v-if="$auth0.isAuthenticated.value" :is="screen"></component>
    </keep-alive> -->
  </div>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import Multiselect from '@vueform/multiselect'
import CompanyOnboardingSuccess from './CompanyOnboardingSuccess.vue';
// import api from "@/api/switchit";

export default {
  components: {
    ModalWindow,
    Multiselect,
    CompanyOnboardingSuccess
  },
  data() {

    return {
      status: null,
      edit: false,
      modalComponent: null,
      screen: 'UserTable',
      form: {
        company: {
          name: `test company ${Math.floor(Math.random() * (11111 - 99999))}`,
          website: "uxco.co",
          countries: ["Denmark",],
          status: "pending",
          createdby: this.$auth0.user._value.email,
          access: {
            mortgage: { status: false },
            mobile: { status: false },
            utilities: { status: false },
            insurance: { status: false },
            broadband: { status: false },
            auto: { status: false },
            banking: { status: false },
          },
          roles: [{role: "owner", user: null, _id: null}],
        },
      },
      selectedAdmin: null,
      users: [],
      errors: [],
      country_list: ["Denmark", "Germany", "Norway", "Sweden", "United States"]
    }
  },
  watch: { 
    selectedAdmin(val) {
      console.log('watch', val)
      this.form.company.roles[0].user = val
    }

  },
  methods: {
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
      let response
      if (this.edit) {
        response = await this.$api.updateCompany(this.id, this.form)
      } else {
        response = await this.$api.createCompany(this.form)
      }
      console.log(response)
      if (response.ok) {
        // console.log(`response:`)
        this.status = "pending"
        this.$router.push({ path: '/operations', query: { q: 'Companies' } })
      } else {
        this.errors.push(response.message)
        setTimeout(() => { this.errors = [] }, 3000)
      }
    }
  },
  async mounted() {
    this.id = this.$route.query.id
    this.edit = this.id ? true : false

    if (this.edit) {
      let company = await this.$api.getCompanyById(this.id)
      console.log(company)
      this.form.company = company
      this.selectedAdmin = company.roles[0].user
    }
    console.log('edit', this.edit)
    this.users = await this.$api.getUsers()
    console.log('this.users: ', this.users)
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