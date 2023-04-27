<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent"  @cancel="onCancel" @save="onSave" @closeModal="closeModal">
    <component :is="modalComponent"></component>
    <!-- <ImportPeople @cancel="onCancel" @save="onSave" />   -->
  </ModalWindow>
  <div class="main settings">
    <div class="header">
      <div class="button-group">
        <button v-for="(scr, index) in screens" :key="index" @click="changePage(scr)">{{ scr }}</button>
      </div>
      <div class="option-group">
        <button @click="openModal('ImportPeople')">Import</button>
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
import ImportPeople from '@/components/import/ImportPeople.vue';
export default {
  components: {
    ModalWindow,
    Users,
    Companies,
    ImportPeople
  },
  data() {
    return {
      modalComponent: null,
      isModalVisible: false,
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
    onSave() {
      this.isModalVisible = false;
    },
    onCancel() {
      this.isModalVisible = false;
    },
    changePage(page) {
      console.log(page)
      this.screen = page;
      this.$router.replace({ path: this.$route.path, query: { q : page } })
    }
  },
 /*  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    onSave() {
      this.isModalVisible = false;
    },
    onCancel() {
      this.isModalVisible = false;
    },
  }, */
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
