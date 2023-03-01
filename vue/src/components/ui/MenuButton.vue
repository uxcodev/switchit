<template>
  <div
    id="nav-icon"
    :class="{ open: isOpen }"
    @click="toggleMenu"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  props: {},
  data() {},
  computed: {
    isOpen() {
      return this.$store.getters.isOpen;
    },
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch("toggleMenu");
    },
  },
};
</script>

<style lang="sass" scoped>
$scale: .5

#nav-icon
  z-index: 999
  width: 60px
  height: 45px
  position: relative
  -webkit-transform: rotate(0deg) scale($scale)
  -moz-transform: rotate(0deg)scale($scale)
  -o-transform: rotate(0deg)scale($scale)
  transform: rotate(0deg)scale($scale)
  -webkit-transition: .5s ease-in-out
  -moz-transition: .5s ease-in-out
  -o-transition: .5s ease-in-out
  transition: .5s ease-in-out
  cursor: pointer

  & span
    display: block
    position: absolute
    height: 8px
    width: 100%
    background: #333
    border-radius: 3px
    opacity: 1
    left: 0
    -webkit-transform: rotate(0deg)
    -moz-transform: rotate(0deg)
    -o-transform: rotate(0deg)
    transform: rotate(0deg)
    -webkit-transition: .25s ease-in-out
    -moz-transition: .25s ease-in-out
    -o-transition: .25s ease-in-out
    transition: .25s ease-in-out

  & span:nth-child(1)
    top: 0px
    -webkit-transform-origin: left center
    -moz-transform-origin: left center
    -o-transform-origin: left center
    transform-origin: left center

  & span:nth-child(2)
    top: 18px
    -webkit-transform-origin: left center
    -moz-transform-origin: left center
    -o-transform-origin: left center
    transform-origin: left center

  & span:nth-child(3)
    top: 36px
    -webkit-transform-origin: left center
    -moz-transform-origin: left center
    -o-transform-origin: left center
    transform-origin: left center

  &.open span:nth-child(1)
    -webkit-transform: rotate(45deg)
    -moz-transform: rotate(45deg)
    -o-transform: rotate(45deg)
    transform: rotate(45deg)
    top: -3px
    left: 8px

  &.open span:nth-child(2)
    width: 0%
    opacity: 0

  &.open span:nth-child(3)
    -webkit-transform: rotate(-45deg)
    -moz-transform: rotate(-45deg)
    -o-transform: rotate(-45deg)
    transform: rotate(-45deg)
    top: 39px
    left: 8px
</style>

