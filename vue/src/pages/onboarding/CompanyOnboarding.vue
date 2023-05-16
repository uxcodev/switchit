<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <CompanyOnboardingBackup v-if="version === 1"></CompanyOnboardingBackup>
  <CreateCompany v-if="version === 2"></CreateCompany>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import CompanyOnboardingSuccess from './CompanyOnboardingSuccess.vue';
import CompanyOnboardingBackup from './CompanyOnboardingBackup.vue';
import CreateCompany from './CreateCompany.vue';
// import api from "@/api/switchit";

export default {
  components: {
    ModalWindow,
    CompanyOnboardingSuccess,
    CompanyOnboardingBackup,
    CreateCompany
  },
  data() {

    return {
      version: 2,
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
          website: "example.com",
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
        },
      },
      errors: [],
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
      if (user.status === "active") {
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
      if (response.ok) {
        // console.log(`response:`)
        console.log(response)
        this.status = "pending"
        // this.$router.push({ path: '/signup_success' })
      } else {
        this.errors.push(response.message)
        setTimeout(() => { this.errors = [] }, 3000)
      }
    }
  },
  async mounted() {
    setTimeout(() => {
      let user = this.$store.getters.user
      this.status = user ? user.status || 'new' : 'new'
      // this.status = user.status
      if (this.status === 'pending') {
        // this.$router.push({ path: '/signup_success' })
      }
    }, 500)
    // setTimeout(() => {
    //   let user = this.$store.getters.user
    //   this.status = user.status
    //   // // console.log(user)
    //   // // console.log(user.status)
    //   // // console.log(this.$auth0.user._value.email)
    //   if (user.status === "active") {
    //     this.$router.push({ path: '/dashboard' })
    //   }
    //   // this.user = this.$store.getters.user
    // }, 1000)
  }
}
</script>

<style lang="sass" scoped>

</style>