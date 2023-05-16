<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <h2>API Testing</h2>
    <div class="buttons">
      <button @click="call('GET', 'countrydialcodes')">Country Dial Codes</button>
      <button @click="createCompany()">createCompany</button>
      <button @click="getCompanies()">getCompanies</button>
      <button @click="getCompany('f781193d-dfcd-4fcd-b5cc-4cb9a32a056f')">getCompany</button>
    </div>
  </div>
</template>

<script>

// plugins & scripts

import api from '@/api/api';

// components 
import ModalWindow from '@/components/ui/ModalWindow.vue';


export default {
  components: {
    ModalWindow
  },
  provide() {
    return {
      closeModal: () => { this.modalComponent = null },
    }
  },
  data() {
    return {
      modalComponent: null,
    };
  },
  methods: {
    async call(method, path) {
      let response = await api.whateverApiCall(method, path)
      console.log(response)
    },
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
    async createCompany() {
      let body = {
        name: "Test company",
        homepage: "example.com",
        description: "Lorem ipsum dolor sit amet",
      }
      let response = await this.$api.switchit_createCompany(body)
      console.log('response: ', response)
    },
    async getCompanies() {
      let response = await this.$api.switchit_getCompanies()
      console.log('response: ', response)
    },
    async getCompany(id) {
      let response = await this.$api.switchit_getCompany(id)
      console.log('response: ', response)
    }
},
  async mounted() {
  }
}
</script>

<style lang="sass">

.buttons
  display: flex
  flex-direction: column
  gap: 1rem
</style>