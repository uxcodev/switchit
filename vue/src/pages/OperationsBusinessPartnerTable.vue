<template>
  
  <!-- <button @click="triggerAddbusinessPartner">+ Add businessPartner</button> -->
  <div class="content" >
      <h2>Business Partners</h2>
      <div class="table_header">
        <div class="row">
          <div class="field">Business partner</div>
          <!-- <div class="field">Email</div> -->
          <!-- <div class="field">Access requested</div> -->
          <!-- <div class="field status">Status</div> -->
        </div>
        <div class="option"></div>
      </div>
      <div class="table">
        <div v-for="(businessPartner, index) in businessPartners" :key="index">
          <div class="item">
            <!-- <div class="row"  @click="$router.push({ path: '/createbusinessPartner', query: { id: businessPartner._id } })"> -->
            <!-- <div class="row"  @click="triggerEditbusinessPartner(businessPartner.id)"> -->
            <div class="row">
              <div class="field-group" >
                <div class="field b" @click="triggerEditbusinessPartner(businessPartner.id)">
                  {{ businessPartner.name }} 
                </div>
                <div class="help">
                  {{ businessPartner.id }} 
                </div>
                <!-- <div class="field light">
                  website: 
                  {{ businessPartner.homePage }}
                </div> -->
                <div class="field light">
                  {{ businessPartner.contact_email }}
                </div>
                <div class="field light" v>
                  user: 
                  <!-- <span class="users" v-for="(user, index) in businessPartner.users" :key="index">
                    {{ user.email }}
                  </span> -->
                  <span class="">
                    {{ businessPartner.email }}
                  </span>
                </div>
                <div class="field light" v>
                  domain:
                  <span class="" >
                    {{ businessPartner.domain }}
                    <!-- {{ role.user.email }} -->
                  </span>
                </div>

              </div>
              <!-- <IconsCategoryAccess v-if="businessPartner.access" :access="businessPartner.access"/> -->
              <IconsCategoryAccess v-if="businessPartner.serviceType" :access="getCategories(businessPartner.serviceType)"/>
              
              <div class='status_wrapper' :class="businessPartner.isApproved">
                <!-- <div :class="['dot', user.status]"></div> -->
                <select name="status" class="select status" v-model="businessPartner.isApproved" @change="changeStatus(businessPartner)">
                  <option :value="true">Approved</option>
                  <option :value="false">Not approved</option>
                </select>
              </div>
            </div>
            <!-- <div class='status_wrapper' :class="businessPartner.status">
              <select name="status" class="select status" v-model="businessPartner.status" @change="changeStatus(businessPartner)">
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="active">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div> -->
            <div class="option" @click="deleteBusinessPartner(businessPartner.id)">
              <span class="material-symbols-outlined">Delete</span>
            </div>
          </div>
        </div> 
      </div>
      <div>
        <!-- dynamic component -->
       
        <!-- <button class="mt10"  @click="$router.push({ path: '/addbusinessPartner,', props: {add:true} })" >+ Add</button> -->
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
      businessPartners: [],
      edit: false,
      add: false,
      modalComponent: null,
      categories: this.$store.getters.categories
    };
  },
  methods: {
    async changeStatus(businessPartner) {
      /* let response = await this.updatebusinessPartner(businessPartner.id, businessPartner)
      console.log('changeStatus: ', response)
      if (response?.data?.ok) {
        this.$toast_success.show({message: 'Status updated'})
      } else {
        businessPartner.isApproved = !businessPartner.isApproved
        this.$toast_error.show({message: response?.error})
      } 
      return */
      try {
        let response = await this.$switchit.editBusinessPartner(businessPartner.id, businessPartner)
        console.log('changeStatus: ', response)
        if (response.statusText === 'OK') {
          this.$toast.show({message: 'Status updated'})
        } else {
          businessPartner.isApproved = !businessPartner.isApproved
          this.$toast_error.show({message: response?.error})
        } 
        return
      } catch (error) {
        console.log('error: ', error)
        return error
      }
    },

    async updatebusinessPartner(id, fields) {
      delete fields.id
      try {
        let response = await this.$switchit.editBusinessPartner(id, fields)
        return response
      } catch (error) {
        console.log('error: ', error)
        return error
      }
    },
    async deleteBusinessPartner(id) {
      let response = await this.$switchit.deleteBusinessPartner(id)
      if (response?.data?.ok) {
        this.businessPartners = this.businessPartners.filter(businessPartner => businessPartner.id !== id)
      } else {
        this.$toast_error.show({message: response?.error})
      } 
      return
    },
    getCategories(bitwiseNumber) {
      let number = bitwiseDecode(bitwiseNumber)
      return number
    },
    openbusinessPartner(id) {
      console.log('id: ', id)
    },
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
    triggerAddbusinessPartner() {
      // this.$emit('open-modal', 'CreatebusinessPartner');
    },
    triggerEditbusinessPartner(id) {
      console.log('triggerEditbusinessPartner: ', id)
    },
  },
  async mounted() {
    this.businessPartners = await this.$switchit.getBusinessPartners()

    this.businessPartners.sort((a, b) => {
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

.businessPartner
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