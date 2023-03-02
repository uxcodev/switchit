<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main settings">
    <keep-alive>
      <component v-if="$auth0.isAuthenticated.value" :is="screen"></component>
    </keep-alive>
  </div>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import UserTable from './UserTable.vue';

export default {
  components: {
    ModalWindow,
    UserTable,
  },
  data() {
    return {
      modalComponent: null,
      screen: 'UserTable',
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
    }
  },
  async mounted() {
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"
</style>