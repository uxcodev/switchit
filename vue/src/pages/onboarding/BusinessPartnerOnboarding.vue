<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <CreateBusinessPartner></CreateBusinessPartner>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import CreateBusinessPartner from './CreateBusinessPartner.vue';

export default {
  components: {
    ModalWindow,
    CreateBusinessPartner
  },
  data() {

    return {
      status: null,
      modalComponent: null,
    }
  },
  computed: {
    user() {
      return this.$store.getters.activeUser
    }
  },
  watch: {
    user(user) {
      this.status = user.status
      if (user.status === "active") {
        // this.$router.push({ path: '/dashboard' })
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
  },
  async mounted() {
    // let user = this.$store.getters.activeUser;
    // console.log('onboarding user', user);

    // let businessPartner = this.$store.getters.activeBusinessPartner;
    // console.log('onboarding businessPartner', businessPartner);
  }
}
</script>

<style lang="sass" scoped>

</style>