<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main settings">
    <div class="header">
      <div class="button-group">
        <button v-for="(scr, index) in screens" :key="index" @click="changePage(scr)">{{ scr }}</button>
      </div>
    </div>
    <keep-alive>
      <component :key="screen" v-if="$auth0.isAuthenticated.value" :is="screen"></component>
    </keep-alive>
  </div>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import Users from './OperationsUserTable.vue';
import Companies from './OperationsCompanyTable.vue';

export default {
  components: {
    ModalWindow,
    Users,
    Companies,
  },
  data() {
    return {
      modalComponent: null,
      screens: ['Users', 'Companies'],
      screen: null,
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
      console.log(page)
      this.screen = page;
      this.$router.replace({ path: this.$route.path, query: { q : page } })
    }
  },
  async mounted() {
    let query = this.$route.query.q
    console.log('query: ', query)

    this.screen = query || this.screens[0]
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"

.header
  display: flex
  justify-content: flex-start  
  width: 100%
  max-width: 900px
  .button-group
    display: flex
    gap: 10px
    
</style>
