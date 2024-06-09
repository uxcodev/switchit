<!-- src/components/ModalContent.vue -->
<template>
  <div>
    <!-- <TabNavigation :tabs="tabs" v-model:activeTab="activeTab" /> -->
    <h1>Upload Offer</h1>
    <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
      <KeepAlive>
        <component :is="tab.component" @cancel="cancel" @save="save" @handleFile="handleFile"/>
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import TabNavigation from './TabNavigation.vue';
// import AddPeople from './ImportPeople_AddPeople.vue'
// import Import from './ImportPeople_Import.vue'
import Import from './ImportOffer_DragAndDrop.vue'

export default {
  components: {
    TabNavigation,
    // AddPeople,
    // Import
  },
  data() {
    return {
      activeTab: 0,
      tabs: [
        // {
        //   title: 'Add people',
        //   component: markRaw(AddPeople),
        // },
        {
          title: 'Import',
          component: markRaw(Import)
        },
        // Add more tabs as needed
      ],
    };
  },
  methods: {
    save() {
      // Perform save operation here
      this.$emit('save');
    },
    cancel() {
      // Perform save operation here
      this.$emit('cancel');
    },
    handleFile(file) {
      console.log('handleFile emitted to parent')
      this.$emit('handleFile', file);
    },
  },
};
</script>
