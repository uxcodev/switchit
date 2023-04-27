<template>
  
  <div class="results-list">

    <div class="banner-success">{{ table.length }} people imported successfully.</div>
   
    <div v-for="(person, index) in table" :key="index" class="person">
      <div class="person-name">{{ person.first_name }} {{ person.last_name }}</div>
      <div class="person-contact-info">
        <div v-if="person.company">Company: {{ person.company }}</div>
        <div v-if="person.email">Email: {{ person.email }}</div>
        <div v-if="person.phone">Phone: {{ person.phone }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsList',
  props: {
    table: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.results-list 
  display: flex
  flex-direction: column
  gap: 16px
  height: 400px
  overflow-y: scroll
  padding: 20px 40px
.banner-success
  width: 100%
  border-radius: 6px
  background-color: rgba(192, 243, 239, 0.2)
  border: 1px solid rgba(43, 197, 187, 0.5)
  padding: 10px
  display: flex
  align-items: flex-start
.person 
  /* margin-bottom: 20px; */
  text-align: left
  &-name
    font-weight: bold
  &-contact-info 
    // text-align: left


</style>
