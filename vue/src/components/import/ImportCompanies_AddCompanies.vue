<template>
  <div class="import-wrapper">
    <div class="content-area">
      <div class="tags">
        <div v-for="(name, index) in names" :key="index" class="tag">
          <span>{{ name }}</span>
          <button @click="deletePerson(index)" class="close-btn">×</button>
        </div>
      </div>
      <div class="hit-area">
        <!-- Drag-and-drop file area goes here -->
        <p class="hint-text">Need help getting started? Download a template.</p>
      </div>
    </div>
    <div class="button-panel">
      <!-- <div class="toggle-container">
        <label for="publish-toggle">Publish when done</label>
        <input type="checkbox" id="publish-toggle" />
      </div> -->
      <div class="buttons">
        <button class="cancel-btn">Cancel</button>
        <button class="save-btn">Save</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      names: [],
    };
  },
  methods: {
    deletePerson(index) {
      this.names.splice(index, 1);
    },
  },
  mounted () {
    // this.names = this.$store.getters.names
  },
};
</script>

<style lang='sass' scoped>
.import-wrapper 
  display: flex
  flex-direction: column
  gap: 20px
  background-color: #f6f6f6


.content-area 
  padding: 20px 40px
  display: flex
  flex-direction: column
  gap: 6px

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
  gap: 14px
  padding: 30px 12px
  border-radius: 10px
  border: 2px dashed #dbdbdb
  background-color: #fbfbfb


.hint-text 
  font-size: 14px
  color: #777


.button-panel 
  display: flex
  justify-content: space-between
  align-items: center
  background-color: white
  padding: 20px 40px


.toggle-container 
  display: flex
  align-items: center
  gap: 5px


.buttons 
  display: flex
  gap: 20px


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

</style>
