<template>
    <div class="content" v-if="!edit && !add">
      <h2>Users</h2>
      <div class="table_header">
        <div class="row">
          <div class="field">User</div>
          <!-- <div class="field">Email</div> -->
          <div class="field">Access requested</div>
          <div class="field status">Status</div>
        </div>
        <div class="option"></div>
      </div>
      <div class="table">
        <div v-for="(user, index) in users" :key="index">
          <div class="item">
            <div class="row">
              <div class="field-group">
                <div class="field b">
                  {{ user.first_name }} {{ user.last_name }}
                </div>
                <div class="field light">
                  {{ user.email }}
                </div>
  
                <div class="field light company" v-for="role in user.roles" :key="role">
                  <span class="company-name" @click="openCompany(role.company?._id)">{{ role.company?.name }}</span>
                  <span class="country" v-for="country in role.company?.countries" :key="country">
                    {{ country }}
                  </span>
                </div>
  
              </div>
              <IconsCategoryAccess :access="user.access"/>
  
              <div class='status_wrapper' :class="user.status">
                <!-- <div :class="['dot', user.status]"></div> -->
                <select name="status" class="select status" v-model="user.status" @change="changeStatus(user)">
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="active">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div class="option" @click="deleteUser(user._id)">
              <span class="material-symbols-outlined">Delete</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button disabled="true" class="mt10" @click="add = false">+ Add</button>
      </div>
    </div>
</template>
<script>
import IconsCategoryAccess from '@/components/ui/IconsCategoryAccess.vue'

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
      users: [],
      edit: false,
      add: false,
      modalComponent: null,
      categories: this.$store.getters.categories
    };
  },
  methods: {
    changeStatus(user) {
      // // console.log(user)
      // // console.log(user.status)
      // // console.log(user._id)
      this.updateUser(user._id, { status: user.status })
    },
    async updateUser(id, fields) {
      let response = await this.$api_node.updateUser(id, fields)
      console.log(response)
    },
    async deleteUser(id) {
      let response = await this.$api_node.deleteUser(id)
      this.users = await this.$api_node.getUsers()
      console.log(response)
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
  },
  async mounted() {
    try {
      let response = await this.$api_node.getUsers()
      console.log('response: ', response)
      this.users = response
    } catch (error) {
      console.log('error: ', error)
      this.$toast_error.show({ message: error })
    }
    // console.log('this.users: ', this.users)
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
  background: #fff
  border-radius: 6px
  display: flex
  flex-direction: column
  gap: 10px
  width: 100%
  max-width: 900px
  .item
    gap:10px
    justify-content: space-between
    align-items: center
    display: flex
    // background: #fafafa 
    padding: 0 0 0 10px
    border-radius: 4px
    cursor: pointer
    .row
      display: flex
      flex-direction: field
      align-items: center
      justify-content: space-between
      gap: 20px
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
        width: 180px
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