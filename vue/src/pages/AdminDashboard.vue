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
.main
  display: flex
  justify-content: center

  background: #F5F5F5
  min-height: 100vh
  padding: 100px 40px
  top: 80px
@import "/src/styles/variables.sass"
</style>