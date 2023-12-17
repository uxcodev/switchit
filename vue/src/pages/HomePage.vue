<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <!-- <h2>This is an empty page</h2> -->
    <!-- redirecting to dashboard... -->

  </div>
</template>

<script>

// plugins & scripts

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
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
  },
  mounted() {
    // redirect to /dashboard
    this.$router.push('/dashboard');
  }
}
</script>

<style lang="sass">
</style>