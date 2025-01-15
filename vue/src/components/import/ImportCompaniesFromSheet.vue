<template>
 
  <div>
    <div v-if="companies" class="content table-container">

      <table>
        <thead>
          <tr>
            <th v-for="(value, key) in companies[0]" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in companies.slice(0, 10)" :key="rowIndex">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- add help text -->
     <div class="help mb5">
      <strong>Note:</strong> Data imported from <a :href="$store.getters.importCompaniesUrl" class="link" >Google Sheets</a>
    </div>
    <button @click="importCompanies()">Import companies</button>
     <!-- <pre>
       <code>
         {{ companies }}
       </code>
     </pre> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      companies: []
    };
  },
  watch: {},
  methods: {

    async importCompanies() {
      let body = this.companies
      let response = await this.$switchit.importCompanies(body)
      console.log('response: ', response)
      this.$emit('save')
    }
  },
  async created() {
    // this.personas = this.$store.getters.personas
    this.research = this.$store.getters.research
    this.companies = this.$store.getters.companies
    if (!this.research) {
      await this.$store.dispatch('getData')
      // this.personas = this.$store.getters.personas
      this.companies = this.$store.getters.companies
      console.log('this.companies', this.companies)
    }
  },
};
</script>

<style lang="sass">

.persona
  cursor: pointer
  &:hover
    box-shadow: 0px 0px 10px #B5F2C6 !important

.table-container
  width: 100%
  overflow: hidden
  position: relative
  min-height: 120px
  padding-bottom: 40px

  &::after
    content: ''
    position: absolute
    top: calc(80%)  // Adjust the value as needed
    right: 0
    bottom: 0
    width: 100%
    background-image: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 100%)
    pointer-events: none

  table 
    width: 50%
    overflow: hidden
    border-collapse: collapse
    font-size: 0.7rem
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
        opacity: 0.5

        td
          border-bottom: 1px solid #eee
          background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2))
          -webkit-background-clip: text
          background-clip: text
          color: transparent
      
      tr:first-child
        opacity: 1 !important    
 
@media only screen and (max-width: 767px)  
</style>
