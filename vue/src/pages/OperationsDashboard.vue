<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent"  @cancel="closeModal" @save="onSave" @closeModal="closeModal">
    <component :is="modalComponent" :props="componentProps" @closeModal="closeModal" @save="onSave"></component>
  </ModalWindow>
  <div v-if="isAdmin" class="main settings">
    <div class="header">
      <!-- Add button to change between pages -->
      <div v-if="screens.length > 1" class="button-group">
        <button v-for="(scr, index) in screens" :key="index" @click="changePage(scr)">{{ scr }}</button>
      </div>
      <div></div>
      <div class="option-group">
        <button @click="openModal('CreateCompany')">+ Add company</button>
        <button @click="openModal('ImportCompanies')">Import</button>
      </div>
    </div>
      <component :key="componentKey" v-if="$auth0.isAuthenticated.value" @openModal="openModal" :is="screen"></component>
  </div>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import Users from './OperationsUserTable.vue';
import BusinessPartners from './OperationsBusinessPartnerTable.vue';
import Companies from './OperationsCompanyTable.vue';
import ImportCompanies from '@/components/import/ImportCompaniesFromSheet.vue';
import CreateCompany from '@/components/admin/CreateCompany.vue';
import EditBusinessPartner from './onboarding/EditBusinessPartner.vue';

export default {
  components: {
    ModalWindow,
    Users,
    Companies,
    BusinessPartners,
    ImportCompanies,
    EditBusinessPartner,
    CreateCompany
  },
  data() {
    return {
      modalComponent: null,
      isModalVisible: false,
      // screens: ['Companies', 'Users', 'BusinessPartners'],
      screens: ['Companies', 'BusinessPartners'],
      screen: null,
      componentKey: 0,
      isAdmin: this.$store.getters.isAdmin,
    }
  },
  methods: {
    closeModal() {
      this.modalComponent = null
    },
    openModal(component, props) {
      this.componentProps = props
      this.modalComponent = component
    },
    onSave() {
      this.isModalVisible = false;
      this.componentKey++
      this.modalComponent = null
    },
    onCancel() {
      this.isModalVisible = false;
      this.modalComponent = null

    },
    changePage(page) {
      this.screen = page;
      this.$router.replace({ path: this.$route.path, query: { q : page } })
    }
  },
  async mounted() {
    setTimeout(() => {
      let domain = this.$auth0.user.value.email.split('@')[1]
      if (domain === 'switchit.ai' && this.$route.query.isAdmin) {
        this.$store.commit('setIsAdmin', true)
      }
      this.isAdmin = this.$store.getters.isAdmin

      if (!this.isAdmin) {
      // this.$router.push({ path: '/dashboard' })
      this.$toast_error.show({ message: 'You are not authorized to view this page' })
    }
    }, 2000)

    let query = this.$route.query.q
    this.screen = query || this.screens[0]
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"

.header
  display: flex
  justify-content: space-between
  width: 100%
  max-width: 900px
  .button-group
    display: flex
    gap: 10px
  .option-group
    display: flex
    gap: 10px
</style>
