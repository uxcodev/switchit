<template>
  <div class='loader'>
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
  }),
};
</script>
<style lang="sass" scoped>

$border-color: #08f
$background-color: none //rgba(0, 0, 0, 0.8)
.loader
  background: $background-color
  padding: 20px
    border-radius: 6px

.lds-ring
  align-items: center
  display: inline-block
  position: relative
  width: 30px
  height: 30px

.lds-ring div
  box-sizing: border-box
  display: block
  position: absolute
  width: 30px
  height: 30px
  border: 2px solid
  border-radius: 50%
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite
  border-color: $border-color transparent transparent transparent

.lds-ring div:nth-child(1)
  animation-delay: -0.45s

.lds-ring div:nth-child(2)
  animation-delay: -0.3s

.lds-ring div:nth-child(3)
  animation-delay: -0.15s

@keyframes lds-ring
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
