<!-- src/components/ModalContent.vue -->
<template>
  <div>
    <TabNavigation :tabs="tabs" v-model:activeTab="activeTab" />
    <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
      <KeepAlive>
        <component :is="tab.component" @cancel="cancel" @save="save" />
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import TabNavigation from './TabNavigation.vue';
import AddCompanies from './ImportCompanies_AddCompanies.vue'
import Import from './ImportCompanies_Import.vue'

export default {
  components: {
    TabNavigation,
    AddCompanies,
    Import
  },
  data() {
    return {
      activeTab: 1,
      tabs: [
        {
          title: 'Add companies',
          component: markRaw(AddCompanies),
        },
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
  },
};
</script>
