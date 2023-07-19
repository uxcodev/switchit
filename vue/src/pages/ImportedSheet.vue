<template>
   <div class="main">
     <pre>
       <code>
         {{ companies }}
       </code>
     </pre>
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
@media only screen and (max-width: 767px)  
</style>
