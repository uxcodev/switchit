<template>
  <header>
    <div class="user-menu">
      <div>{{ user_name }}</div>
      <!-- <div class="avatar">
        <img
          :src="avatar"
          alt="User avatar"
        />
      </div> -->
      <div class="dropdown">
        <ul>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      user_name: "Nick Todd",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    };
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style lang="sass" scoped>
header
  display: flex
  justify-content: flex-end
  align-items: center
  background-color: white
  padding: 15px

.user-menu
  display: flex
  align-items: center
  gap: 10px

.avatar
  display: flex
  align-items: center
  justify-content: center
  width: 40px
  height: 40px
  border-radius: 50%
  position: relative
  overflow: hidden
  img
    width: 40px
    height: auto

.dropdown
  position: absolute
  top: 100%
  right: 0
  display: none

  .avatar:hover &
    display: block

  & ul
    list-style: none
    margin: 0
    padding: 0
    background-color: #fff
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)

  & li
    padding: 0.5rem

  & li:hover
    background-color: #eee
</style>
