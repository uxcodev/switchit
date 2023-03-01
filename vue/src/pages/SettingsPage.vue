<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main settings">
    <div class="container">
      <h2>Settings</h2>
      <div class="ph_content mt10">

      </div>
    </div>
    <keep-alive>
      <component :is="screen"></component>
    </keep-alive>
  </div>
</template>

<script>


import ModalWindow from '@/components/ui/ModalWindow.vue';

export default {
  components: {
    ModalWindow,

  },

  data() {
    return {
      modalComponent: null,
      screen: 'SettingsServices',
    }
  },
  watch: {
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
  mounted() {
  }
};
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"

.container
  width: 900px

.ph_content
  width: 100%
  height: 100vh
  background: #eee
  border-radius: 10px
h3
  margin-block-end: 0
// .settings
//   padding: 40px

.screen
  padding: 140px

</style>