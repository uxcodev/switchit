<template>
  
  <!-- <button @click="triggerAddCompany">+ Add company</button> -->
  <div class="content" >
      <h2>Companies</h2>
      <div class="table_header">
        <div class="row">
          <div class="field">Company</div>
          <!-- <div class="field">Email</div> -->
          <!-- <div class="field">Access requested</div> -->
          <!-- <div class="field status">Status</div> -->
        </div>
        <div class="option"></div>
      </div>
      <div class="table">
        <div v-for="(company, index) in companies" :key="index">
          <div class="item">
            <!-- <div class="row"  @click="$router.push({ path: '/createcompany', query: { id: company._id } })"> -->
            <div class="row"  @click="triggerEditCompany(company.id)">
              <div class="field-group" >
                <div class="field b">
                  {{ company.name }} 
                </div>
                <div class="help">
                  {{ company.id }} 
                </div>
                <!-- <div class="field light">
                  website: 
                  {{ company.homePage }}
                </div> -->
                <div class="field light">
                  {{ company.contact_email }}
                </div>
                <div class="field light" v>
                  domains: 
                  <span class="role" v-for="domain in company.domains" :key="domain">
                    {{ domain.domainName }}
                    <!-- {{ role.user.email }} -->
                  </span>
                </div>

              </div>
              <!-- <IconsCategoryAccess v-if="company.access" :access="company.access"/> -->
              <IconsCategoryAccess v-if="company.serviceType" :access="getCategories(company.serviceType)"/>

              
            </div>
            <!-- <div class='status_wrapper' :class="company.status">
              <select name="status" class="select status" v-model="company.status" @change="changeStatus(company)">
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="active">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div> -->
            <div class="option" @click="deleteCompany(company.id)">
              <span class="material-symbols-outlined">Delete</span>
            </div>
          </div>
        </div> 
      </div>
      <div>
        <!-- dynamic component -->
       
        <!-- <button class="mt10"  @click="$router.push({ path: '/addcompany,', props: {add:true} })" >+ Add</button> -->
      </div>
  </div>
</template>
<script>

import IconsCategoryAccess from '@/components/ui/IconsCategoryAccess.vue';
import bitwiseDecode from '@/helpers/bitwise'

export default {
  components: {
    IconsCategoryAccess
  },
  provide() {
    return {
      closeModal: () => { this.modalComponent = null },
    }
  },
  data() {
    return {
      companies: [],
      edit: false,
      add: false,
      modalComponent: null,
      categories: this.$store.getters.categories
    };
  },
  methods: {
    changeStatus(company) {
      this.updateCompany(company._id, { status: company.status })
    },
    async updateCompany(id, fields) {
      await this.$switchit.updateCompany(id, fields)
    },
    async deleteCompany(id) {
      await this.$switchit.deleteCompany(id)
      // await this.$switchit.editCompany(id, {name: 'DELETE'})      
      this.companies = this.companies.filter(company => company.id !== id)
    },
    getCategories(bitwiseNumber) {
      let number = bitwiseDecode(bitwiseNumber)
      return number
    },
    openCompany(id) {
      console.log('id: ', id)
    },
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
    triggerAddCompany() {
      this.$emit('open-modal', 'CreateCompany');
    },
    triggerEditCompany(id) {
      this.$emit('open-modal', 'CreateCompany', {companyId: id, editing: true});
    },
  },
  async mounted() {
    this.companies = (await this.$switchit.getFullCompanies()).model

    this.companies.sort((a, b) => {
      return new Date(b.created) - new Date(a.created)
    })

  },
}
</script>


<style lang="sass" scoped>
@import "/src/styles/variables.sass"


h3
  margin-block-end: 0

.content
  width: 100%  
  display: flex
  flex-direction: column
  align-content: center
  justify-content: center
  max-width: 900px
.table_header
  display: flex
  width: 100% 
  border-radius: 6px
  background-color: #546E7A
  padding: 6px 10px
  gap:10px
  margin-bottom: 10px
  border-radius: 4px
  cursor: pointer
  flex-grow:1
  color: #eee
  font-size: .7rem
  .row
    width:100%
    display: flex
    justify-content: space-between
    .field 
      padding: 0 10px
      width: 180px
      opacity: .6
      &.status
        width: 95px
  .option
    width: 50px
    padding: 10px 16px
    height:100%
    cursor: pointer
    border-radius: 0 6px 6px 0
    font-size: 1.5em
    color: blue
.table
  // background: #fff
  border-radius: 6px
  display: flex
  flex-direction: column
  gap: 10px
  width: 100%
  max-width: 900px
  .item
    background: #fff
    gap:10px
    justify-content: space-between
    align-items: center
    display: flex
    // background: #fafafa 
    border-radius: 4px
    cursor: pointer
    .row
      display: flex
      flex-direction: field
      align-items: center
      justify-content: space-between
      gap: 20px
      padding: 10px
      flex-grow:1
      &:hover
        background: #fcfcfc
      .field-group
        display: flex
        flex-direction: column
        gap: 0px
        padding: 4px 10px
        .field
          padding: 0
      .field
        padding: 10px
        max-width: 3000px
        &.b
          font-weight:600
        &.light
          color: #999
      .access_icons
        display: flex
        gap: 6px
        span
          font-size:1.5em
          opacity: .1
          color: #00BB8E
        span.active
          opacity: 1   
    .option
      width: 50px
      padding: 10px 16px
      height:100%
      cursor: pointer
      border-radius: 0 6px 6px 0
      font-size: 1.5em
      color: #999
      &:hover
        background: #eee
 
  .status_wrapper
    position: relative
    &:before
      position: absolute
      z-index:1
      content: ''
      padding: 0
      top: 6px
      left: 6px
      width: 10px
      height: 10px
      border-radius: 10px
      background-color: grey

    &.new:before
      background-color: white

    &.pending:before
      background-color: orange

    &.approved:before
      background-color: #00BFA5

    &.rejected:before
      background-color: red      

    .status
      outline: none
      z-index: 0
      position: relative
      display: flex
      width: 95px
      height: auto
      border: 0
      background-color: #eee
      border-radius:50px
      padding: 2px 16px 2px 20px
      font-size: .7rem
      background-size: 20px

.company
  display: flex
  gap: 4px      
  &-name
    cursor: pointer
    color: #0088ff
.country
  display: flex
  flex-direction: row
  gap: 4px
</style>