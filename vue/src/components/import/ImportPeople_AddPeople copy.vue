<template>
  <div class="import-wrapper">
    <div class="content-area">
      <div class="tags">
        <div v-for="(name, index) in names" :key="index" class="tag">
          <span>{{ name }}</span>
          <button @click="deletePerson(index)" class="close-btn">×</button>
        </div>
      </div>
      <div class="master-form">
        <div class="input_person group row">

          <div class="input-container">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" placeholder="First name">
          </div>
          <div class="input-container">
            <label for="last-name"> </label>
            <input type="text" id="last-name" placeholder="Last name">
          </div>
          <div class="input-container">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Email">
          </div>
          <div class="input-container">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" placeholder="Phone">
          </div>
        </div>
    <button class="plus-button">+</button>
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

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      names: ['John', 'Michael', 'David'],
    };
  },
  methods: {
    deletePerson(index) {
      this.names.splice(index, 1);
    },
  },
  computed: {
    ...mapGetters([
      'getPeople'
    ]),
    people() {
      return this.getPeople;
    }
  },
  mounted() {
    let people = this.$store.getters.people
    console.log('people', people)
  }
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

.input_person
  display: flex
  justify-content: space-between
  align-items: flex-end
  gap: 10px
  max-width: 100%

.input-container 
  flex: 1
  display: flex
  flex-direction: column
  align-items: flex-start

  label 
    margin-bottom: 0rem
    // height:20px

  input
    width: 100%


.plus-button 
  border-radius: 50%
  width: 2rem
  height: 2rem
  font-size: 1.5rem
  border: none
  background-color: #ccc
  color: #fff
  display: flex
  justify-content: center
  align-items: center
  margin-top: 1rem

</style>
