<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <h2>API Testing</h2>
    <button @click="call('GET', 'countrydialcodes')">Test</button>
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
  },
  mounted() {
    // // console.log('starter page')
  }
}
</script>

<style lang="sass">
</style>