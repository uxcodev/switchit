<template>
  <div class="import-wrapper">
    <div class="content-area">
      <div v-if="!jsonTable" class="content">
        <div class="tags">
          <div v-for="(name, index) in displayedTags" :key="index" class="tag">
            <span>{{ name }}</span>
            <button @click="deletePerson(index)" class="close-btn">×</button>
          </div>
          <button v-if="additionalTagsCount" class="tags-additional" @click="toggleTags = !toggleTags">
            {{ toggleTags ? 'show less' : `+ ${additionalTagsCount} more` }}
          </button>

        </div>
        <div class="hit-area" :class="{ 'drag-over': isDragOver }" @dragenter.prevent="dragEnter" @dragleave.prevent="dragLeave" @dragover.prevent @drop.prevent="handleDrop">
          {{ "Drag and drop your file here" }}
          <br><br>
          <!-- {{ "All .csv, .xlsx, and .xls file types are supported" }} -->
          {{ ".pdf file types are supported" }}
        </div>
      </div>
      <div v-if="jsonTable && !newTable" class="content table-container">

        <table>
          <thead>
            <tr>
              <th v-for="(value, key) in jsonTablePreview[0]" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in jsonTablePreview" :key="rowIndex">
              <td v-for="(value, key) in row" :key="key">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <LoaderAni v-if="!mappingDictionary && spreadsheetFields"></LoaderAni>
      <div v-if="mappingDictionary && !newTable" class="content">
        <div>
          <h3 class="mt8">Map your table columns to the right fields in our database</h3>
          <FieldMap :jsonTable="jsonTable" :mappingDictionary="mappingDictionary"></FieldMap>
        </div>
      </div>

      <div v-if="newTable">
        <ImportedCompanies :table="newTable"></ImportedCompanies>
      </div>
    </div>
    <!-- <div class="button-panel"> -->
    <!-- <div class="toggle-container">
        <label for="publish-toggle">Publish when done</label>
        <input type="checkbox" id="publish-toggle" />
      </div> -->

    <div class="file_list">
      <div v-for="file in files" :key="file.name">
        {{ file.name }}<span class="material-symbols-outlined check">check</span>
      </div>
      <!-- <div>sample_doc.pdf</div> -->
    </div>
    <div class="buttons">
      <button @click="cancel" class="button__secondary">Cancel</button>
      <button :disabled="!files.length" @click="importFile">Import</button>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>

import FieldMap from './ImportCompanies_Import_Map.vue'
import ImportedCompanies from './ImportCompanies_Import_Results.vue';
import LoaderAni from '@/components/ui/LoaderAni.vue'


export default {
  components: { FieldMap, ImportedCompanies, LoaderAni },
  emits: ['handleFile', 'cancel'],
  data() {
    return {
      names: [],
      isDragOver: false,
      dragCounter: 0,
      spreadsheetFields: null,
      jsonTable: null,
      mappingDictionary: null,
      newTable: null,
      tags: [],
      toggleTags: false,
      tagsLimit: 8,
      additionalTags: 0,
      files: [],
    };
  },
  computed: {
    additionalTagsCount() {
      return this.names.length > this.tagsLimit ? this.names.length - this.tagsLimit : 0;
    },
    displayedTags() {
      return this.toggleTags ? this.names : this.names.slice(0, this.tagsLimit);
    },
  },
  watch: {
    names(names) {
      this.additionalTags = names.length > this.tagsLimit ? names.length - this.tagsLimit : 0
      this.tags = names.slice(0, this.tagsLimit)
    },
  },
  methods: {
    cancel() {
      console.log('cancel')
      this.$emit('cancel');
    },
    deletePerson(index) {
      this.names.splice(index, 1);
    },
    dragEnter() {
      this.isDragOver = true;
    },
    dragLeave() {
      this.isDragOver = false;
    },
    childEnter() {
      this.isDragOver = true;
    },
    childLeave() {
      this.isDragOver = false;
    },
    displayAllNameTags() {
      this.additionalTags = 0
      this.tags = this.names
      return this.names
    },
    importFile() {
      this.$emit('handleFile', this.files[0]);
    },
    async handleDrop(event) {

      // console.log('temporarily disabled')
      const selectedFile = event.dataTransfer.files[0];
      const formData = new FormData();
      formData.append('offerFile', selectedFile);

      // get name and extension
      const fileName = selectedFile.name;
      const fileExtension = fileName.split('.').pop();


      // emit 'handleFile'
      if (fileExtension === 'pdf') {
        let file = {
          formData: formData,
          name: fileName,
          extension: fileExtension
        }
        // this.$emit('handleFile', file);
        this.files[0] = file;
      }
      else {
        this.$toast_error.show({ message: 'Invalid file type. Please upload a .pdf file' });
      }
    },

  },
};
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"
h3
  text-align: left
  font-weight: bold
.import-wrapper 
  padding: 0
  display: flex
  flex-direction: column
  // gap: 20px
  background-color: #f6f6f6

.content-area
  background-color: #f6f6f6

.content
  display: flex
  flex-direction: column
  padding: 20px 40px
  gap: 10px

.tags 
  display: flex
  flex-wrap: wrap
  gap: 4px
  max-height: 400px
  overflow-y: scroll


.tag 
  background-color: #333
  color: white
  display: flex
  align-items: center
  border-radius: 4px
  padding: 2px 6px


.close-btn 
  color: grey
  background: none
  border: none
  margin-left: 5px
  cursor: pointer


.hit-area 
  display: flex
  flex-direction: column
  justify-content: center
  gap: 14px
  height: 120px
  padding: 30px 12px
  border-radius: 10px
  border: 2px dashed #dbdbdb
  background-color: #fbfbfb
    
  &.drag-over 
    border-color: #007bff 
    background-color: #f0f8ff


.hint-text 
  font-size: 14px
  color: #777


.button-panel 
  display: flex
  justify-content: space-between
  align-items: center
  background-color: white
  padding: 20px 40px

button
  cursor: pointer
  &:disabled
    opacity: .3
    cursor: default

.toggle-container 
  display: flex
  align-items: center
  gap: 5px

.tags-additional
  background: transparent
  border: none
  color: #08f

.buttons 
  background: white
  padding-top: 20px 
  width: 100%
  display: flex
  // flex-end
  justify-content: flex-end
  gap: 20px

.file_list
  display: flex
  gap: 5px
  flex-wrap: wrap
  margin-top: 0px
  padding: 10px 10px
  div 
    display: flex
    align-items: center
    gap: 4px

  .check
    color: $green
    font-size: 1.1rem

.cancel-btn,
.save-btn 
  padding: 10px 15px
  border-radius: 6px


.cancel-btn 
  background-color: transparent
  border: 2px solid #007bff
  color: #007bff


.save-btn 
  background-color: #007bff
  color: white
  border: none

.table-container
  width: 100%
  overflow: hidden
  position: relative
  &::after
    content: ''
    position: absolute
    top: 0
    right: 0
    bottom: 0
    width: 50px
    height: 100%
    background-image: linear-gradient(to left, rgba(246, 246, 246, 1), rgba(246, 246, 246, 0) 100%)
    pointer-events: none

  table 
    width: 50%
    overflow: hidden
    border-collapse: collapse
    font-size: .7rem
    white-space: nowrap
    position: relative

    th,
    td 
      padding: 8px
      text-align: left
      border-bottom: 1px solid #ddd
    tr
      position: relative
    tbody 
      tr:last-child
        opacity: .5
        td
          border-bottom: 1px solid #eee
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, .9), rgba(0, 0, 0, .2))
          -webkit-background-clip: text
          background-clip: text
          color: transparent
</style>
