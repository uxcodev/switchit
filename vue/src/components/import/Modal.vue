<!-- src/components/Modal.vue -->
<template>
  <div v-if="isModalVisible" class="modal-overlay" @click.self="clickOutside">
    <div class="modal">
      <div @click="closeModal" class="clickable close-button material-symbols-outlined">
      close
    </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['update:isModalVisible'],
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:isModalVisible', false);
    },
    clickOutside() {
      console.log('clicked outside modal')
      // this.$emit('update:isModalVisible', false);
    },
  },
};
</script>

<style lang="sass">
@import "/src/styles/styles.sass"
.modal-overlay
  z-index: 999
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center

.modal
  background-color: white
  // padding: 2rem
  border-radius: 4px
  position: relative
  width: 80%
  max-width: 600px
  overflow: hidden

.close-button
  position: absolute
  top: 0.5rem
  right: 0.5rem
  background: none
  border: none
  font-size: 1.5rem
  cursor: pointer

</style>
