<!-- src/components/ModalContent.vue -->
<template>
  <div>
    <!-- <TabNavigation :tabs="tabs" v-model:activeTab="activeTab" /> -->
    <h1>Upload Offer</h1>
    <Import @handleFile="handleFile" />
    <div v-for="(file, index) in files" :key="index">
      <p>{{ file.name }}</p>
    </div>
  </div>
</template>

<script>
import Import from './ImportOffer_DragAndDrop.vue'

export default {
  components: {
    Import
  },
  data() {
    return {
      files: [],
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
      console.log('handleFile emitted to parent', file)
      this.files.push(file);
      // get file name and pass it to parent
      this.$emit('handleFile', file);
    },
  },
};
</script>
