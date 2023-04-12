<template>
  <div class="submenu">
    <button @click="show('SettingsCalendar')" :class="screen === 'SettingsCalendar' ? 'active' : ''">Calendar</button>
    <button @click="show('SettingsServices')" :class="screen === 'SettingsServices' ? 'active' : ''">Services</button>
    <!-- <button @click="show('SettingsServices')">Other</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['screen'],
  methods: {
    show(val) {
      // console.log(val)
      this.$emit("changePage", val)
    }
  }
}

</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"
.submenu
  display: flex
  button
    border-radius:0
    &:first-child
      border-radius: 6px 0 0 6px
    &:last-child
      border-radius: 0 6px 6px 0  
    &.active
      background-color: $darker
</style>