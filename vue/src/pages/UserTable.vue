<template>
  <div v-if="!edit && !add">
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
            </div>
            <div class="access_icons">
              <span :class="user.access.mortgage.status ? 'active' : ''" class="material-symbols-outlined">house</span>
              <span :class="user.access.insurance.status ? 'active' : ''" class="material-symbols-outlined">verified_user</span>
              <span :class="user.access.banking.status ? 'active' : ''" class="material-symbols-outlined">credit_card</span>
              <span :class="user.access.broadband.status ? 'active' : ''" class="material-symbols-outlined">language</span>
              <span :class="user.access.mobile.status ? 'active' : ''" class="material-symbols-outlined">smartphone</span>
              <span :class="user.access.utilities.status ? 'active' : ''" class="material-symbols-outlined">lightbulb</span>
              <span :class="user.access.auto.status ? 'active' : ''" class="material-symbols-outlined">directions_car</span>
            </div>

            <div class='status_wrapper' :class="user.status">
              <!-- <div :class="['dot', user.status]"></div> -->
              <select name="status" class="select status" v-model="user.status" @change="changeStatus(user)">
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div class="option" @click="deleteUser(user.id)">
            <span class="material-symbols-outlined">Delete</span>
          </div>
        </div>
      </div>
    </div>
    <button class="mt10" @click="add = true">+ Add</button>
  </div>
  <div v-if="edit">
    <!-- <SettingsUserEdit :selectedUser="selectedUser" @updateUser="updateUser" @closeEdit="close" /> -->
  </div>
  <div v-if="add">
    <!-- <SettingsUserCreate @createUser="createUser" @closeEdit="close" /> -->
    <!-- <SettingsUserCreate -->
  </div>
</template>

<script>




export default {
  components: {
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
    };
  },
  methods: {
    changeStatus(user) {
      // console.log(user)
      // console.log(user.status)
      // console.log(user._id)
      this.updateUser(user._id, { status: user.status })
    },
    async updateUser(id, fields) {
      let response = await this.$api.updateUser(id, fields)
      console.log(response)
    },
    async deleteUser(id) {
      console.log(id)
    },
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
  },
  async mounted() {
    this.users = await this.$api.getUsers()
    console.log(this.users)

    // console.log('UserTable')
    // console.log(this.users)
  },
}
</script>


<style lang="sass" scoped>
@import "/src/styles/variables.sass"


h3
  margin-block-end: 0

.table_header
  display: flex
  width: 100% 
  max-width: 900px
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
  width:900px 
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
    

</style>