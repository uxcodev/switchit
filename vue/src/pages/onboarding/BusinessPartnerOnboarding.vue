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
    let user = this.$store.getters.activeUser;
    console.log('onboarding user', user);

    let businessPartner = this.$store.getters.activeBusinessPartner;
    console.log('onboarding businessPartner', businessPartner);

    if (businessPartner) {
      console.log('business partner found')
      if (businessPartner.isApproved) {
        console.log('business partner is approved')
        this.$router.push({ path: '/dashboard' });
      } else {
        console.log('business partner is not approved')
        this.$router.push({ path: '/signup_success' });
      }
    } else {
      console.log('no business partner found')
    }
    // this.status = user?.status || 'new';

    // if (this.status === 'pending') {
    //   this.$router.push({ path: '/signup_success' });
    // } else if (user?.status === "active") {
    // //   this.$router.push({ path: '/dashboard' });
    // } else {
    //   console.log('new user');
    // }
  }
}
</script>

<style lang="sass" scoped>

</style>