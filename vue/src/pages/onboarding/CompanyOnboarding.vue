<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <CreateCompany></CreateCompany>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import CreateCompany from './CreateCompany.vue';

export default {
  components: {
    ModalWindow,
    CreateCompany
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
    this.status = user?.status || 'new';

    if (this.status === 'pending') {
      // this.$router.push({ path: '/signup_success' });
    } else if (user?.status === "active") {
    //   this.$router.push({ path: '/dashboard' });
    } else {
      console.log('new user');
    }
  }
}
</script>

<style lang="sass" scoped>

</style>