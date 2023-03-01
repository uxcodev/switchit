<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div v-if="status === 'new'" class="container">
      <h2>Request access to Switchit</h2>
      <form @submit.prevent class="switchit-form sm">
        <!-- <h3>{{ service.name }}</h3> -->
        <div class="group">
          <label for="firstName">Your name</label>
          <div class="inline">
            <input v-model="form.user.first_name" placeholder="First name" type="text" id="first_name" class="input lg mr3" />
            <input v-model="form.user.last_name" placeholder="Last name" type="text" id="last_name" class="input lg" />
          </div>
        </div>
        <div class="group">
          <label for="email">Your email</label>
          <input v-model="form.user.email" type="text" id="first_name" disabled class="input lg" />
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
          <label for="website">Countries you are active in</label>
          <Multiselect v-model="form.company.countries" mode="tags" :searchable="true" :close-on-select="false" :options="country_list" />
        </div>
        <div class="group">

          <label for="">Markets you are interested in serving</label>


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
        <button class="icon" @click="submitForm">Submit request</button>
      </form>
    </div>

    <div v-if="status === 'pending'">
      <h2>Thank you for your application</h2>
      <div>We will get back to you soon.</div>
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
      modalComponent: null,
      screen: 'UserTable',
      form: {
        user: {
          first_name: "Nick",
          last_name: "Todd",
          email: this.$auth0.user._value.email,
          admin: false,
          status: "pending",
          access: {}
        },
        company: {
          name: "UXCO",
          website: "uxco.co",
          countries: ["Denmark",],
          status: "pending",
          access: {
            mortgage: { status: false },
            mobile: { status: false },
            utilities: { status: false },
            insurance: { status: false },
            broadband: { status: false },
            auto: { status: false },
            banking: { status: false },
          },
        }
      },
      country_list: ["Denmark", "Germany", "Norway", "Sweden", "United States"]
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
    user(user) {
      this.status = user.status
      if (user.status === "approved") {
        this.$router.push({ path: '/dashboard' })
      }
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
      this.form.user.access = this.form.company.access
      let response = await this.$api.signupCompany(this.form)
      console.log(response)
      if (response.name) {
        this.status = "pending"
      }
    }
  },
  async mounted() {
    setTimeout(() => {
      let user = this.$store.getters.user
      this.status = user ? user.status || 'new' : 'new'
      // this.status = user.status
    }, 500)
    // setTimeout(() => {
    //   let user = this.$store.getters.user
    //   this.status = user.status
    //   // console.log(user)
    //   // console.log(user.status)
    //   // console.log(this.$auth0.user._value.email)
    //   if (user.status === "approved") {
    //     this.$router.push({ path: '/dashboard' })
    //   }
    //   // this.user = this.$store.getters.user
    // }, 1000)
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"
@import "/src/styles/mixins.sass"
@import "@vueform/multiselect/themes/default.css"
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  background-color: #fafafa
  min-height: 100vh
  padding: 120px 20px 60px 20px
  top: 80px

.container
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